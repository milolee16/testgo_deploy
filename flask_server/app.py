# ml-flask/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
from datetime import datetime
import requests
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


OLLAMA_API_URL = "http://192.168.0.22:11434/api/generate"
OLLAMA_MODEL = "llama3"


@app.route("/ml/schedule", methods=["POST"])
def schedule():
    messages = request.get_json()
    print("📦 받은 데이터:", messages)

    # 메시지를 문자열로 변환 (발화 순서 그대로)
    conversation = "\n".join([f"{m['sender']} : {m['message']}" for m in messages])
    # 오늘 날짜 기준 (예: "이번 주 주말" 같은 표현 파싱용)
    today = datetime.now().strftime("%Y-%m-%d")
    # 프롬프트 구성
    prompt = f"""
한글로 대답 해주세요.  
당신은 일정 추출 전문가입니다.
다음은 두 사람이 나눈 대화입니다. 대화에서 약속이나 일정이 있는지 확인하고, 있다면 아래 JSON 형식으로 변환하세요.

오늘 날짜는 {today}입니다.
    JSON 형식:
{{
  "is_schedule": true/false,
  "title": "",
  "start_time": "YYYY-MM-DDTHH:MM:SS",
  "end_time": "YYYY-MM-DDTHH:MM:SS",
  "all_day": 0 or 1,
  "location": "",
  "description": "",
  "recurrence_rule": null
}}

규칙:
- 날짜는 가능한 정확히 ISO 8601 형식으로 작성 (YYYY-MM-DDTHH:MM:SS).
- '이번 주 주말'과 같은 표현은 오늘 날짜를 기준으로 해석.
- 시간이 명시되지 않으면 all_day = 1로 설정하고 start_time, end_time은 날짜만 지정.
- location이 없으면 null로 설정.
- 반복되는 일정이 아니라면 recurrence_rule = null.
- 대화에 일정이 없으면 is_schedule = false로 설정하고 나머지는 null.
- title은 일정의 핵심 요약 (예: "점심 약속", "회의").
- description은 대화 내용을 참고하여 추가적인 정보를 포함 (예: "홍대에서 점심 먹고 카페 가기").

대화:
\"\"\"  
{conversation}
\"\"\"
"""
    # Ollama 요청
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt.strip(),
        "stream": False
    }
    response = requests.post(OLLAMA_API_URL, json=payload)
    result = response.json()
    print(response.text)
    # 결과 리턴
    return jsonify({
        "raw_response": result.get("response", "").strip()
    })
if __name__ == '__main__':
    # 개발용 서버
    app.run(host='0.0.0.0', port=5000, debug=True)