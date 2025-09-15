import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import DetailPage from './pages/DetailPage';
import WritePage from './pages/WritePage';
import axios from "axios";
import Chat from "./components/chat/Chat.jsx";
import Login from "./components/login/Login.jsx";
import Home from "./components/Home..jsx";
import MBTI from "./components/mbti/Mbti.jsx";
import ML from "./components/ml/ML.jsx";
import Firebase from "./components/firebase/Firebase.jsx";

function App() {
    const [con, setCon] = useState();
    // boot 연결 확인
    axios.get("/api/data")
        .then(res => setCon(res.data.message))

    return (

        <div style={{ margin: '0 auto', padding: '20px'}}>
            <Link to="/"> <h1>React & Spring Boot!! {con}</h1></Link>
            <span>CI/CD test 123</span>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/board" element={<BoardPage/>}/>
                <Route path="/board/:id" element={<DetailPage/>}/>
                <Route path="/write" element={<WritePage/>}/>
                <Route path="/edit/:id" element={<WritePage/>}/>
                <Route path="/mbti" element={<MBTI/>}/>
                <Route path="/ml/*" element={<ML/>}/>
                <Route path="/firebase" element={<Firebase />}/>
            </Routes>
        </div>
    );
}

export default App;