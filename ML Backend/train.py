import pickle
import numpy as np
import pandas as pd
from scipy.sparse import hstack
from sklearn.naive_bayes import MultinomialNB
from sklearn.preprocessing import MinMaxScaler
from sklearn.feature_extraction.text import CountVectorizer


df = pd.read_csv("Datasets/Originals/email.csv")

df = df.drop_duplicates()

df['charCount'] = df['Message'].str.len()
df['wordCount'] = df['Message'].str.split().str.len()
df["digitCount"] = df["Message"].str.count(r"\d")
df["urlCount"] = df["Message"].str.count(r"http|www")
df["currencyCount"] = df["Message"].str.count(r"£|\$|₹")
df["exclamationCount"] = df["Message"].str.count("!")

df['Category'] = df['Category'].map({'ham': 0, 'spam': 1})
df.rename(columns={'Category': 'spam'}, inplace=True)

target = df['spam']
df.drop(columns=['spam'],inplace=True)

countV = CountVectorizer()

messageVectors = countV.fit_transform(df['Message'])

extraFeatures = df[
    ['charCount',
     'wordCount',
     'digitCount',
     'urlCount',
     'currencyCount',
     'exclamationCount']
]

scaler = MinMaxScaler()


extraTrain = scaler.fit_transform(extraFeatures)
xTrainFinal = hstack([messageVectors, extraTrain])


model = MultinomialNB()

model.fit(xTrainFinal,target)



with open("bin/vectorizer.pkl","wb") as f:
    pickle.dump(countV,f)

with open("bin/scaler.pkl","wb") as f:
    pickle.dump(scaler,f)

with open("bin/model.pkl","wb") as f:
    pickle.dump(model,f)