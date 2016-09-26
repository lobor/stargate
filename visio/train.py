#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
from PIL import Image


# cascadePath = "./visio/haarcascade_profileface.xml"
cascadePath = "./visio/haarcascade_frontalface_alt.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

recognizer = cv2.createLBPHFaceRecognizer()

images = []
labels = []

def get_images_and_labels(path):
    model_paths = [os.path.join(path, f) for f in os.listdir(path) if not f.endswith('.sad')]
    images = []
    labels = []
    index = 0
    for model_path in model_paths:
        image_paths = [os.path.join(model_path, f) for f in os.listdir(model_path) if not f.endswith('.sad')]
        for image_path in image_paths:
            image = cv2.imread(image_path)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            image = np.array(image, 'uint8')
            faces = faceCascade.detectMultiScale(image)
            for (x, y, w, h) in faces:
                images.append(image[y: y + h, x: x + w])
                labels.append(index)
        index += 1
    return images, labels


images, labels = get_images_and_labels('./visio/collections')


# Perform the tranining
if len(images):
    recognizer.train(images, np.array(labels))
    recognizer.save('./visio/model.xml')
else:
    print 'not face'
