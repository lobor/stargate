#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
import sys
import json

cascadePath = "./visio/haarcascade_frontalface_alt.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

# For face recognition we will the the LBPH Face Recognizer
recognizer = cv2.createLBPHFaceRecognizer()

recognizer.load('./visio/model.xml')
# print sys.argv[1]
collections = sys.argv[1].split(',')

# For face detection we will use the Haar Cascade provided by OpenCV.
# cascadePath = "./visio/haarcascade_profileface.xml"



# img = cv2.imread('./visio/collections/orphee/11731744_465483000299784_1637727013185137186_o.jpg', cv2.IMREAD_GRAYSCALE)
# img = cv2.imread('./visio/lunette.jpg')
# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

img = cv2.imread('./visio/lunette.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# second method
predict_image = np.array(img, 'uint8')
faces = faceCascade.detectMultiScale(predict_image)
if len(faces):
    results = {}
    for (x, y, w, h) in faces:
        nbr_predicted, conf = recognizer.predict(predict_image[y: y + h, x: x + w])
        if nbr_predicted not in results:
            results[nbr_predicted] = []

        results[nbr_predicted].append(conf)
    data = {}
    for label, confs in results.iteritems():
        add = 0
        for conf in confs:
            add += conf
        data[collections[label]] = add / len(confs)
    print json.dumps(data)
