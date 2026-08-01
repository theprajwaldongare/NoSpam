import os
import re
import pickle
import requests
import numpy as np
import pandas as pd
from flask_cors import CORS
from scipy.sparse import hstack
from flask import Flask,url_for,redirect,request,render_template,jsonify,send_from_directory

app = Flask(__name__)

CORS(app)

with open("bin/scaler.pkl","rb") as f:
    scaler = pickle.load(f)

with open("bin/vectorizer.pkl","rb") as f:
    vectorizer = pickle.load(f)

with open("bin/model.pkl","rb") as f:
    model = pickle.load(f)

@app.route("/predict",methods=["POST"])
def predictSpam():
    reqData = request.get_json()
    message = reqData.get("message","")

    searchMessage = vectorizer.transform([message])

    charCount = len(message)
    wordCount = len(message.split())
    digitCount = len(re.findall(r"\d", message))
    urlCount = len(re.findall(r"http|www", message))
    currencyCount = len(re.findall(r"£|\$|₹", message))
    exclamationCount = message.count("!")

    extraSearch = [[
        charCount,
        wordCount,
        digitCount,
        urlCount,
        currencyCount,
        exclamationCount
    ]]
    extraSearch = scaler.transform(extraSearch)
    searchFinal = hstack([searchMessage, extraSearch])

    pred = model.predict(searchFinal)
    predVal = pred.item()

    return jsonify({
        "status":"success",
        "message": predVal
    })