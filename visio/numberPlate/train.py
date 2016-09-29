#!/usr/bin/python

# Import the required modules
import cv2, os
import numpy as np
from PIL import Image
import sys
import pytesseract

img = sys.argv[1]

pathImg = './visio/numberPlate/' + img + '.jpg';
pathImgTmp = './tmp/ocr.jpg';
toto = Image.open(pathImg)
imageBase = cv2.imread(pathImg)
image = imageBase
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
image = cv2.GaussianBlur(image,(5,5),0)
image = cv2.Sobel(image, cv2.CV_8U, 1, 0, ksize=3)
_, image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)

se = cv2.getStructuringElement(cv2.MORPH_RECT,(23,2))
image = cv2.morphologyEx(image, cv2.MORPH_CLOSE, se)
contours, _ = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

def validate(cnt):
    rect = cv2.minAreaRect(cnt)
    box = cv2.cv.BoxPoints(rect)
    box = np.int0(box)
    output = False
    width = rect[1][0]
    height = rect[1][1]

    if ((width != 0) & (height != 0)):
        if (((height / width > 3) & (width / height < 6) & (height > width)) | ((width / height > 3) & (height / width < 1) & (width > height))):
            if((height * width < 9000) & (height * width > 480)):
                output=True
    return output

for cnt in contours:
    if validate(cnt):
        rect = cv2.minAreaRect(cnt)
        box = cv2.cv.BoxPoints(rect)
        box = np.int0(box)

        if box[0][0] > box[1][0]:
            x = box[0][0]
        else:
            x = box[1][0]

        if box[0][1] < box[1][1]:
            y = box[0][1]
        else:
            y = box[1][1]

        if box[3][0] < box[2][0]:
            w = box[2][0]
        else:
            w = box[3][0]

        if box[3][1] > box[2][1]:
            h = box[3][1]
        else:
            h = box[2][1]

        print box

        w -= x
        h -= y


        crop_image = imageBase[y: y + h, x: x + w]

        cv2.imshow("img", crop_image)
        cv2.waitKey(1000)

        # crop_image = cv2.cvtColor(crop_image, cv2.COLOR_BGR2GRAY)
        # crop_image = cv2.GaussianBlur(crop_image,(5,5),0)
        # crop_image = cv2.Canny(crop_image,50,50)
        # # _, crop_image = cv2.threshold(crop_image, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        # cv2.imwrite(pathImgTmp, crop_image)
        # toto = Image.open(pathImgTmp)
        # print pytesseract.image_to_string(toto, 'fra')
        #
        # cv2.imshow("img", crop_image)
        # cv2.waitKey(1000)
        # cv2.drawContours(imageBase, [box], 0, (0,0,255),2)

# for cnt in contours:
#     rect = cv2.minAreaRect(cnt)
#     box = cv2.cv.BoxPoints(rect)
#     box = np.array(box, 'int0')
#     cv2.drawContours(imageBase, [box], 0, (0,255,0),2)

# contoursParse = []
# for cnt in contours:
#     rect = cv2.minAreaRect(cnt)
#     box = cv2.cv.BoxPoints(rect)
#     box = np.int0(box)
#     width = rect[1][0]
#     height = rect[1][1]
#
#     if ((width != 0) & (height != 0)):
#         if (((height / width > 3) & (width / height < 6) & (height > width)) | ((width / height > 3) & (height / width < 1) & (width > height))):
#             if((height * width < 9000) & (height * width > 480)):
#                 contoursParse.append(cnt)
#
# for ctn in contoursParse:
#     rect=cv2.minAreaRect(cnt)
#     box=cv2.cv.BoxPoints(rect)
#     box=np.int0(box)
#     cv2.drawContours(imageBase, [box], 0, (0,0,255),2)



# image = cv2.equalizeHist(image)
# image = cv2.Canny(image,50,50)

# image = np.array(image, 'uint8')

# cv2.imshow("img", imageBase)
# cv2.waitKey(1000)
