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

images = []
labels = []


def get_images_and_labels(path):
    image_paths = [os.path.join(path, f) for f in os.listdir(path) if not f.endswith('.sad')]
    images = []
    labels = []
    for image_path in image_paths:
        image = Image.open(image_path).convert('L')
        image = np.array(image, 'uint8')
        faces = faceCascade.detectMultiScale(image)
        for (x, y, w, h) in faces:
            images.append(image[y: y + h, x: x + w])
            labels.append(1)
    return images, labels


images, labels = get_images_and_labels('./lionel')

# Perform the tranining
recognizer.train(images, np.array(labels))
recognizer.save('./lionel.xml')
