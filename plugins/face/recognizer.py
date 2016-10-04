#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
import sys
import json

with open('./config/visio/config.json') as data_file:
    config = json.load(data_file)


if False == cv2.useOptimized():
    cv2.setUseOptimized(True)

url = sys.argv[1]
collections = sys.argv[2].split(',')

faceCascade = cv2.CascadeClassifier(config['haar_cascade'])
recognizer = cv2.createLBPHFaceRecognizer(config['radius'], config['neighbors'], config['grid_x'], config['grid_y'], config['threshold'])

recognizer.load(config['modelFace'])

cap=cv2.VideoCapture(url)

while True:
    ret, frame = cap.read()
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    image = np.array(image, 'uint8')
    image = cv2.equalizeHist(image)

    faces = faceCascade.detectMultiScale(image)

    if len(faces):
        results = {}
        for (x, y, w, h) in faces:
            crop_image = image[y: y + h, x: x + w]
            crop_image = cv2.Canny(crop_image,50,50)
            nbr_predicted, conf = recognizer.predict(crop_image)
            if nbr_predicted not in results:
                results[nbr_predicted] = []

            # if conf < 50:
            #     print 'write img'
            #     cv2.imwrite('./visio/collections/{}/{}.jpg'.format(collections[nbr_predicted], conf), img)

            results[nbr_predicted].append(conf)
        data = {}
        for label, confs in results.iteritems():
            add = 0
            for conf in confs:
                add += conf
            data[collections[label]] = add / len(confs)
        print json.dumps(data)

    if cv2.waitKey(1) == 27:
        exit(0)
