import axios from "axios";

const MLTest1 = () => {

    const testword = async () => {
        const res = await axios.get('/ml/test1')
        console.log(res.data);
    }

    return <div>ml test 1
        <button onClick={testword}>test</button>
    </div>
}

export default MLTest1;