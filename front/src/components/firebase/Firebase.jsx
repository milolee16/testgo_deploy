import {useState} from "react";
import axios from "axios";

const Firebase = () => {
    const [file, setFile] = useState(null);
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const uploadHandler = async () => {
        if (!file) {
            alert("파일을 선택하세요.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('api/firebase', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("업로드 성공: " + response.data);
        } catch (error) {
            console.error("업로드 실패", error);
            alert("업로드 실패");
        }
        }
        return <div>
            <div>mz-section (firebase file upload)
                <input type="file" onChange={onFileChange}/>
                <button onClick={uploadHandler}>upload</button>
            </div>
        </div>
}
export default Firebase;