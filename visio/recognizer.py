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
url = sys.argv[1]
collections = sys.argv[2].split(',')
# print url
cap=cv2.VideoCapture(url)
#
while True:
  ret, frame = cap.read()
  # cv2.imshow('Video', frame)

  img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

  cv2.imwrite('./visio/lunette.jpg', img)
  #
  # img = cv2.imread('./visio/lunette.jpg', cv2.IMREAD_GRAYSCALE)
  # cv2.imshow('Video', img)

  # second method
  image = cv2.imread('./visio/lunette.jpg')
  image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  predict_image = np.array(image, 'uint8')
  # predict_image = np.array(img, 'uint8')

  faces = faceCascade.detectMultiScale(predict_image)
  # cv2.imshow('{}'.format(len(faces)), img)
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

  if cv2.waitKey(1) == 27:
    exit(0)


# For face detection we will use the Haar Cascade provided by OpenCV.
# cascadePath = "./visio/haarcascade_profileface.xml"


# Perform the tranining
# recognizer.load('./visio/model.xml')

# img = cv2.imread(img, cv2.IMREAD_GRAYSCALE)
# # img = cv2.imread('./visio/lunette.jpg', cv2.IMREAD_GRAYSCALE)
#
# # second method
# predict_image = np.array(img, 'uint8')
# faces = faceCascade.detectMultiScale(predict_image)
#
# if len(faces):
#     for (x, y, w, h) in faces:
#         nbr_actual = 1
#         nbr_predicted, conf = recognizer.predict(predict_image[y: y + h, x: x + w])
#         print '{"label":{},"confidences":{}}'.format(nbr_predicted, conf)
