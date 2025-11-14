from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Correct path to model file
model_path = os.path.join(os.path.dirname(__file__), "energy_model.pkl")
model = joblib.load(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # expecting 5 features in correct order
    features = np.array(data["features"]).reshape(1, -1)

    prediction = model.predict(features)[0]

    return jsonify({"predicted_load": float(prediction)})

@app.route("/", methods=["GET"])
def home():
    return "Energy Prediction API is running!"

if __name__ == "__main__":
    app.run()
    
