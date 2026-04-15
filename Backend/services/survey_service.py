from datetime import datetime
import re
from threading import Lock

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from db import surveys_collection

DEFAULT_LABELS = ["Excellent", "Good", "Better", "Neutral", "Bad", "Poor"]
MIN_TRAINING_SAMPLES = 2

BOOTSTRAP_SENTIMENT_DATA = [
    ("excellent", "Excellent"),
    ("amazing", "Excellent"),
    ("awesome", "Excellent"),
    ("fantastic", "Excellent"),
    ("perfect", "Excellent"),
    ("outstanding", "Excellent"),
    ("exceptional", "Excellent"),
    ("brilliant", "Excellent"),
    ("superb", "Excellent"),
    ("best", "Excellent"),
    ("good", "Good"),
    ("great", "Good"),
    ("nice", "Good"),
    ("helpful", "Good"),
    ("useful", "Good"),
    ("strong", "Good"),
    ("effective", "Good"),
    ("smooth", "Good"),
    ("clear", "Good"),
    ("solid", "Good"),
    ("better", "Better"),
    ("improved", "Better"),
    ("improvement", "Better"),
    ("fair", "Better"),
    ("decent", "Better"),
    ("okay", "Neutral"),
    ("fine", "Neutral"),
    ("average", "Neutral"),
    ("mixed", "Neutral"),
    ("normal", "Neutral"),
    ("okayish", "Neutral"),
    ("acceptable", "Neutral"),
    ("ordinary", "Neutral"),
    ("standard", "Neutral"),
    ("neutral", "Neutral"),
    ("bad", "Bad"),
    ("poor", "Bad"),
    ("slow", "Bad"),
    ("difficult", "Bad"),
    ("hard", "Bad"),
    ("confusing", "Bad"),
    ("frustrating", "Bad"),
    ("late", "Bad"),
    ("weak", "Bad"),
    ("terrible", "Poor"),
    ("awful", "Poor"),
    ("horrible", "Poor"),
    ("worst", "Poor"),
    ("broken", "Poor"),
    ("broke", "Poor"),
    ("useless", "Poor"),
    ("unreliable", "Poor"),
    ("disappointing", "Poor"),
    ("pathetic", "Poor"),
    ("not bad", "Good"),
    ("not too bad", "Good"),
    ("not poor", "Better"),
    ("not terrible", "Good"),
    ("not awful", "Good"),
    ("not great", "Better"),
    ("not excellent", "Better"),
    ("pretty good", "Good"),
    ("quite good", "Good"),
    ("really good", "Good"),
    ("very good", "Good"),
    ("very bad", "Poor"),
    ("quite bad", "Bad"),
    ("not very good", "Better"),
    ("not very bad", "Good"),
    ("this is the best one i ever saw", "Excellent"),
    ("absolutely amazing and outstanding work", "Excellent"),
    ("perfect experience and excellent support", "Excellent"),
    ("fantastic result and very useful", "Excellent"),
    ("good and very helpful overall", "Good"),
    ("really good service and friendly staff", "Good"),
    ("this was a good experience", "Good"),
    ("solid outcome and nice support", "Good"),
    ("good not great", "Better"),
    ("better than before", "Better"),
    ("improved compared to last time", "Better"),
    ("a better option than the previous one", "Better"),
    ("it was okay", "Neutral"),
    ("average experience overall", "Neutral"),
    ("nothing special but fine", "Neutral"),
    ("mixed feelings about this", "Neutral"),
    ("bad experience and slow support", "Bad"),
    ("not good and somewhat frustrating", "Bad"),
    ("poor quality and confusing instructions", "Poor"),
    ("terrible result and the worst so far", "Poor"),
]

SHORT_FEEDBACK_LABELS = {
    "excellent": "Excellent",
    "amazing": "Excellent",
    "awesome": "Excellent",
    "fantastic": "Excellent",
    "perfect": "Excellent",
    "outstanding": "Excellent",
    "exceptional": "Excellent",
    "brilliant": "Excellent",
    "superb": "Excellent",
    "best": "Excellent",
    "good": "Good",
    "great": "Good",
    "nice": "Good",
    "helpful": "Good",
    "useful": "Good",
    "strong": "Good",
    "effective": "Good",
    "smooth": "Good",
    "clear": "Good",
    "solid": "Good",
    "better": "Better",
    "improved": "Better",
    "improvement": "Better",
    "fair": "Better",
    "decent": "Better",
    "okay": "Neutral",
    "fine": "Neutral",
    "average": "Neutral",
    "mixed": "Neutral",
    "normal": "Neutral",
    "acceptable": "Neutral",
    "ordinary": "Neutral",
    "standard": "Neutral",
    "neutral": "Neutral",
    "bad": "Bad",
    "poor": "Bad",
    "slow": "Bad",
    "difficult": "Bad",
    "hard": "Bad",
    "confusing": "Bad",
    "frustrating": "Bad",
    "late": "Bad",
    "weak": "Bad",
    "terrible": "Poor",
    "awful": "Poor",
    "horrible": "Poor",
    "worst": "Poor",
    "broken": "Poor",
    "broke": "Poor",
    "useless": "Poor",
    "unreliable": "Poor",
    "disappointing": "Poor",
    "pathetic": "Poor",
}

NEGATIVE_WORDS = {"not", "no", "never", "without", "hardly", "barely"}

PHRASE_SENTIMENT_HINTS = {
    "not bad": "Good",
    "not too bad": "Good",
    "not poor": "Better",
    "not terrible": "Good",
    "not awful": "Good",
    "not great": "Better",
    "not excellent": "Better",
    "pretty good": "Good",
    "quite good": "Good",
    "really good": "Good",
    "very good": "Good",
    "very bad": "Poor",
    "quite bad": "Bad",
    "not very good": "Better",
    "not very bad": "Good",
}

_MODEL_CACHE = {"model": None, "count": -1}
_MODEL_CACHE_LOCK = Lock()


def _load_sentiment_training_data():
    records = surveys_collection.find(
        {"feedback": {"$exists": True}, "sentiment": {"$exists": True}},
        {"feedback": 1, "sentiment": 1},
    )

    feedbacks = []
    labels = []
    for record in records:
        feedback = str(record.get("feedback", "")).strip()
        sentiment = record.get("sentiment")
        if not feedback or sentiment not in DEFAULT_LABELS:
            continue
        feedbacks.append(feedback)
        labels.append(sentiment)

    bootstrap_feedbacks = [text for text, _ in BOOTSTRAP_SENTIMENT_DATA]
    bootstrap_labels = [label for _, label in BOOTSTRAP_SENTIMENT_DATA]

    feedbacks = bootstrap_feedbacks + feedbacks
    labels = bootstrap_labels + labels

    if len(feedbacks) < MIN_TRAINING_SAMPLES or len(set(labels)) < 2:
        return None, None

    return feedbacks, labels


def _normalize_feedback(text):
    text = str(text).lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    words = [word for word in text.split() if word]

    normalized_words = []
    negate_next = False
    for word in words:
        if word in {"not", "no", "never", "without"}:
            negate_next = True
            normalized_words.append(word)
            continue

        if negate_next:
            normalized_words.append(f"not_{word}")
            negate_next = False
        else:
            normalized_words.append(word)

    return " ".join(normalized_words)


def _extract_sentiment_signal(text):
    text = str(text).lower().strip()
    for phrase, label in PHRASE_SENTIMENT_HINTS.items():
        if phrase in text:
            return phrase

    words = text.split()
    if not words:
        return ""

    if len(words) <= 3:
        cleaned_words = [re.sub(r"[^a-z0-9]", "", word) for word in words]
        if len(cleaned_words) >= 2 and cleaned_words[0] in NEGATIVE_WORDS:
            signal = cleaned_words[-1]
            label = SHORT_FEEDBACK_LABELS.get(signal)
            if label == "Excellent":
                return "good"
            if label == "Good":
                return "bad"
            if label == "Better":
                return "neutral"

        for word in cleaned_words:
            if word in SHORT_FEEDBACK_LABELS:
                return word

    for index, word in enumerate(words):
        cleaned = re.sub(r"[^a-z0-9]", "", word)
        if cleaned in SHORT_FEEDBACK_LABELS:
            previous = re.sub(r"[^a-z0-9]", "", words[index - 1]) if index > 0 else ""
            if previous in NEGATIVE_WORDS:
                if SHORT_FEEDBACK_LABELS[cleaned] == "Excellent":
                    return "good"
                if SHORT_FEEDBACK_LABELS[cleaned] == "Good":
                    return "bad"
                if SHORT_FEEDBACK_LABELS[cleaned] == "Better":
                    return "neutral"
            return cleaned

    return ""


def _build_sentiment_model():
    X, y = _load_sentiment_training_data()
    if X is None or y is None:
        return None

    model = Pipeline(
        steps=[
            (
                "vectorizer",
                TfidfVectorizer(
                    preprocessor=_normalize_feedback,
                    ngram_range=(1, 2),
                    min_df=1,
                ),
            ),
            (
                "classifier",
                LogisticRegression(max_iter=1000, multi_class="auto", class_weight="balanced"),
            ),
        ]
    )
    model.fit(X, y)
    return model


def _get_sentiment_model():
    total = surveys_collection.count_documents({})

    with _MODEL_CACHE_LOCK:
        if _MODEL_CACHE["model"] is not None and _MODEL_CACHE["count"] == total:
            return _MODEL_CACHE["model"]

        model = _build_sentiment_model()
        _MODEL_CACHE["model"] = model
        _MODEL_CACHE["count"] = total
        return model


def compute_survey_adjustment_factor():
    surveys = list(surveys_collection.find())
    total = len(surveys)
    if total == 0:
        return 1.0

    positive = sum(
        1
        for survey in surveys
        if survey.get("sentiment") in ["Excellent", "Good", "Better"]
    )
    negative = sum(
        1
        for survey in surveys
        if survey.get("sentiment") in ["Bad", "Poor"]
    )

    ratio = (positive - negative) / max(total, 1)
    adjustment = max(min(ratio * 0.1, 0.25), -0.25)
    return round(1.0 + adjustment, 4)


def predict_survey_sentiment(feedback):
    signal = _extract_sentiment_signal(feedback)
    if signal:
        return SHORT_FEEDBACK_LABELS.get(signal, "Neutral")

    model = _get_sentiment_model()
    if model is not None:
        predicted = model.predict([str(feedback)])[0]
        if predicted in DEFAULT_LABELS:
            return predicted

    return "Neutral"


def build_survey_document(feedback):
    sentiment = predict_survey_sentiment(feedback)
    return {
        "feedback": feedback,
        "sentiment": sentiment,
        "created_at": datetime.utcnow().isoformat() + "Z",
    }
