from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("energy_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Example: expecting 5 features in correct order
    features = np.array(data["features"]).reshape(1, -1)

    prediction = model.predict(features)[0]

    return jsonify({"predicted_load": float(prediction)})

@app.route("/", methods=["GET"])
def home():
    return "Energy Prediction API is running!"

if __name__ == "__main__":
    app.run()
