import axios from "axios";
import {useEffect, useState} from "react";
import {Link, Route, Router, Routes} from "react-router-dom";
import MLTest1 from "./MLTest1.jsx";
import MLTest2 from "./MLTest2.jsx";

const ML = () =>{
    const [con,setCon] = useState("disconnect");


    useEffect(() => {
        const fetchData = async () => {
                const res = await axios.get('/ml');
                console.log(res.data.con);
                setCon(res.data.con)
        };
        fetchData();
    }, []);

    return <div>
        <div><h2>flask {con}</h2></div>
        <div>
            <Link to="/ml/test1">
            <button>test1</button></Link> <Link to="/ml/test2"><button>test2</button> </Link></div>
        <Routes>
            <Route path="test1" element={<MLTest1 />} />
            <Route path="test2" element={<MLTest2 />} />
        </Routes>
    </div>
}

export default ML;