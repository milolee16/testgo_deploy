import React, { useEffect, useRef } from "react";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

const FabricEditor = () => {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const canvasWidth = 400;
    const canvasHeight = 400;
    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: "#f0f0f0",
        });
    }, []);

    // 배경 이미지 업로드
    const handleUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, (img) => {
            const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
                img.set({
                    left: 0,
                    top: 0,
                    selectable: false,
                    scaleX: scale,
                    scaleY: scale
                });
                fabricCanvas.current.setBackgroundImage(img, fabricCanvas.current.renderAll.bind(fabricCanvas.current));
            });
        };
        reader.readAsDataURL(file);
    };

    // 스티커 추가
    const addSticker = (url) => {
        fabric.Image.fromURL(url, (img) => {
            img.set({
                left: 100,
                top: 100,
                scaleX: 0.3,
                scaleY: 0.3,
                hasControls: true,
                selectable: true,
            });
            fabricCanvas.current.add(img);
        });
    };

    // 이미지 저장
    const handleSave = () => {
        const dataURL = fabricCanvas.current.toDataURL({
            format: "png",
            quality: 1,
        });
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = dataURL;
        link.click();
    };
    // 저장 후 캔버스에 다시 로드
    const handleSaveAndReload = () => {
        const dataURL = fabricCanvas.current.toDataURL({
            format: "png",
            quality: 1,
        });

        // 기존 div에 이미지 추가
        const container = document.getElementById("preview-container");
        container.innerHTML = ""; // 기존 내용 지우기
        const img = document.createElement("img");
        img.src = dataURL;
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        container.appendChild(img);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleUpload} />
            <button onClick={() => addSticker("/stickers/girl.png")}>❤️ 스티커 추가</button>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleSaveAndReload}>저장 후 다시 캔버스에 로드</button>
            <canvas ref={canvasRef}></canvas>
            <div id="preview-container">여기에~~</div>
        </div>
    );
};

export default FabricEditor;
