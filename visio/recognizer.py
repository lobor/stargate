#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
import sys

cascadePath = "./visio/haarcascade_frontalface_alt.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

# For face recognition we will the the LBPH Face Recognizer
recognizer = cv2.createLBPHFaceRecognizer()

recognizer.load('./visio/model.xml')
# print sys.argv[1]
url = sys.argv[1]
# print url
cap=cv2.VideoCapture(url)
#
while True:
  ret, frame = cap.read()
  # cv2.imshow('Video', frame)

  img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

  # cv2.imwrite('./visio/lunette.jpg', frame)
  #
  # img = cv2.imread('./visio/lunette.jpg', cv2.IMREAD_GRAYSCALE)
  # cv2.imshow('Video', img)

  # second method
  predict_image = np.array(img, 'uint8')

  faces = faceCascade.detectMultiScale(predict_image)
  # cv2.imshow('{}'.format(len(faces)), img)
  if len(faces):
      for (x, y, w, h) in faces:
          nbr_actual = 1
          nbr_predicted, conf = recognizer.predict(predict_image[y: y + h, x: x + w])
          print '"label":{},"confidences":{}'.format(nbr_predicted, conf)

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
