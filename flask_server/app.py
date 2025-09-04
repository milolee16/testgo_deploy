# ml-flask/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
app = Flask(__name__)
CORS(app)  # 모든 도메인 허용 (개발용)

@app.route('/ml', methods=['get'])
def predict():
    result = {'con' : 'connected'}
    # data = request.json  # 클라이언트에서 JSON 보내면 받음
    # 여기서 ML 모델 처리
    # 예시: 그냥 받은 데이터 그대로 반환
    # result = {'input': data, 'prediction': 'dummy_result'}
    return jsonify(result), 200

@app.route('/ml/test1', methods=['post'])
def test1():
    data = request.json
    texts = data.get("texts", [])
    results = []
    for text in texts:
        polarity = TextBlob(text).sentiment.polarity
        sentiment = "Positive" if polarity >= 0 else "Negative"
        results.append({"text": text, "sentiment": sentiment, "score": polarity})
    return jsonify(results), 200

@app.route("/ml/schedule", methods=["POST"])
def schedule():
    data = request.get_json()
    print("📦 받은 데이터:", data)
    return jsonify({"status": "received", "count": len(data)})
if __name__ == '__main__':
    # 개발용 서버
    app.run(host='0.0.0.0', port=5000, debug=True)