Buffer.EMPTY = new Buffer(0);

module.exports = function (callback) {
    return function (res) {
        var boundary = null;
        var contentType = res.headers["content-type"];
        var match = contentType.match(/multipart\/x-mixed-replace;\s?boundary=(.*)/);
        if (match) {
            boundary = match[1] + "\r\n";
        }

        if (boundary === null) {
            res.emit("error", new Error("Unexpected content-type header " + contentType));
        }

        var state = "boundary";
        var buffer = Buffer.EMPTY;
        var headers = {};
        var contentLength = -1;

        res.on("data", function (data) {
            buffer = Buffer.concat([ buffer, data ]);

            while (buffer.length > 0) {
                switch (state) {
                    case "boundary":
                        var boundaryIndex = buffer.indexOf(boundary);
                        if (boundaryIndex !== -1) {
                            buffer = buffer.slice(boundaryIndex + boundary.length);
                            state = "header";
                        } else {
                            return;
                        }
                        break;
                    case "header":
                        var bodyIndex = buffer.indexOf("\r\n\r\n");
                        if (bodyIndex !== -1) {
                            var headerStrings = (buffer.slice(0, bodyIndex) + "").split("\r\n");
                            for (var i = 0; i < headerStrings.length; i++) {
                                var headerPair = headerStrings[i].replace(/: */, ":").split(":");
                                headers[headerPair[0].toLowerCase()] = headerPair[1];
                            }

                            if (headers["content-length"] === undefined) {
                                res.emit("error", new Error("Unexpected content-type header " + contentType));
                                res.emit("end");
                                return;
                            }

                            contentLength = ~~headers["content-length"];
                            res.emit("imageHeader", headers);

                            buffer = buffer.slice(bodyIndex + 4);
                            state = "body";
                        } else {
                            return;
                        }
                        break;
                    case "body":
                        var bufferLength = buffer.length;

                        if (contentLength > bufferLength) {
                            res.emit("imageData", buffer);
                            contentLength -= bufferLength;
                            buffer = Buffer.EMPTY;
                        } else {
                            res.emit("imageData", buffer.slice(0, contentLength));
                            contentLength = 0;
                            buffer = buffer.slice(contentLength);
                            res.emit("imageEnd");
                            state = "boundary";
                        }
                        break;
                }
            }
        });

        callback(res);
    };
};
