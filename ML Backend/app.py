import os
import re
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS
from scipy.sparse import hstack
from flask import Flask,url_for,redirect,request,render_template,jsonify,send_from_directory

# app = Flask(__name__)
app = Flask(__name__, 
            static_folder='dist/assets', 
            template_folder='dist')

CORS(app)

@app.route('/<path:filename>')
def serve_root_files(filename):
    if os.path.exists(os.path.join('dist', filename)):
        return send_from_directory('dist', filename)
    
    return render_template("index.html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

with open("bin/scaler.pkl","rb") as f:
    scaler = pickle.load(f)

with open("bin/vectorizer.pkl","rb") as f:
    vectorizer = pickle.load(f)

with open("bin/model.pkl","rb") as f:
    model = pickle.load(f)


def getSpamCommon(message):
    feature_names = vectorizer.get_feature_names_out()
    importance = model.feature_log_prob_[1] - model.feature_log_prob_[0]
    spam_scores = dict(zip(feature_names, importance))

    message = re.findall(r"\b\w+\b", message.lower())
    message = " ".join(message)

    detected = set()
    for word in message.lower().split():
        if word in spam_scores and spam_scores[word] > 1:
            detected.add(word)

    return " ".join(list(detected))

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
    proba = model.predict_proba(searchFinal)[0]

    # hamProb = float(proba[0])
    spamProb = float(proba[1])
    spamProb = round(spamProb * 100, 2)
    # hamProb = round(hamProb * 100, 2)

    spamWords = ""
    if predVal==1:
        spamWords = getSpamCommon(message)

    return jsonify({
        "status":"success",
        "prediction": predVal,
        "spamProbability": spamProb,
        "spamWords":spamWords,
        "contentAnalysis": {
        "characters": charCount,
        "words": wordCount,
        "digits": digitCount,
        "urls": urlCount,
        "currency": currencyCount,
        "exclamation": exclamationCount
    }
    })