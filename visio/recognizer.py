#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
from PIL import Image

# For face detection we will use the Haar Cascade provided by OpenCV.
cascadePath = "haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

# For face recognition we will the the LBPH Face Recognizer
recognizer = cv2.createLBPHFaceRecognizer()

# Perform the tranining
recognizer.load('./lionel.xml')

img = cv2.imread('./lionel/lionel.jpg',cv2.IMREAD_GRAYSCALE)
# img = cv2.imread('./brad.jpg',cv2.IMREAD_GRAYSCALE)


# second method
predict_image = np.array(img, 'uint8')
faces = faceCascade.detectMultiScale(predict_image)
for (x, y, w, h) in faces:
    nbr_actual = 1
    nbr_predicted, conf = recognizer.predict(predict_image[y: y + h, x: x + w])
    print ""
    print "{} : {}".format(nbr_actual, conf)
    print ""
