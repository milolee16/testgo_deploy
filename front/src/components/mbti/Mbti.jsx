import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const MBTIOCR = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const preprocessImage = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width * 2; // 해상도 2배 업스케일
                canvas.height = img.height * 2;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // 흑백 변환 + 대비 강화
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    const value = avg > 128 ? 255 : 0; // 흑백
                    data[i] = data[i + 1] = data[i + 2] = value;
                }
                ctx.putImageData(imageData, 0, 0);

                canvas.toBlob((blob) => resolve(blob), 'image/png');
            };
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const processedBlob = await preprocessImage(file);
            const { data: { text } } = await Tesseract.recognize(processedBlob, 'eng', {
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'
            });
            console.log('OCR 결과:', text);

            const mbtiMatch = text.match(/[EI][NS][FT][JP](-[AT])?/gi);
            setResult(mbtiMatch ? mbtiMatch.join(', ') : '결과를 찾을 수 없음');
        } catch (error) {
            console.error('OCR 실패:', error);
            setResult('OCR 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>MBTI 결과 업로드</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {loading && <p>분석 중...</p>}
            {result && <p>MBTI 결과: {result}</p>}
        </div>
    );
};

export default MBTIOCR;
