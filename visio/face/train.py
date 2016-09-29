#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
from PIL import Image
import json

with open('./config/visio/config.json') as data_file:
    config = json.load(data_file)

if False == cv2.useOptimized():
    cv2.setUseOptimized(True)


faceCascade = cv2.CascadeClassifier(config['haar_cascade'])

recognizer = cv2.createLBPHFaceRecognizer(config['radius'], config['neighbors'], config['grid_x'], config['grid_y'], config['threshold'])

images = []
labels = []
index = 0

model_paths = os.listdir(config['collection'])
for model_path in model_paths:
    model_path = config['collection'] + '/' + model_path
    image_paths = os.listdir(model_path)
    # print image_paths
    for image_path in image_paths:
        image_path = model_path + '/' + image_path
        # print image_path
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        image = cv2.equalizeHist(image)

        image = np.array(image, 'uint8')
        faces = faceCascade.detectMultiScale(image)
        if len(faces):
            for (x, y, w, h) in faces:
                crop_image = image[y: y + h, x: x + w]
                crop_image = cv2.Canny(crop_image,50,50)
                images.append(crop_image)
                labels.append(index)
        else:
            os.remove(image_path)
    index += 1

# Perform the tranining
if len(images):
    recognizer.train(images, np.array(labels))
    recognizer.save(config['modelFace'])
else:
    print 'not face'
