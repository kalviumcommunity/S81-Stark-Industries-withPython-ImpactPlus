import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from db import programs_collection


def load_training_data():
    programs = list(programs_collection.find())
    if not programs:
        return None, None
    data = pd.DataFrame(programs)
    data = data.dropna(subset=["cost", "beneficiaries", "category", "region", "impact_score"])
    if data.empty:
        return None, None 
    X = data[["cost", "beneficiaries", "category", "region"]]
    y = data["impact_score"]
    return X, y


def build_model():
    X, y = load_training_data()
    if X is None or y is None or X.empty:
        return None
    categorical = ["category", "region"]
    numeric = ["cost", "beneficiaries"]

    transformer = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
        ],
        remainder="passthrough",
    )
    pipeline = Pipeline(
        steps=[("transformer", transformer), ("regressor", LinearRegression())]
    )
    pipeline.fit(X, y)
    return pipeline


def predict_impact_score(model, payload):
    if not model:
        raise ValueError("Model is not trained.")
    features = [
        {
            "cost": payload.get("cost", 0),
            "beneficiaries": payload.get("beneficiaries", 0),
            "category": payload.get("category", "General"),
            "region": payload.get("region", "Unknown"),
        }
    ]
    prediction = model.predict(features)
    return round(float(prediction[0]), 4)
