import {Link} from "react-router-dom";

const Home = () => {
    return <div>
        <div>
            <Link to="/chat"><button>chat</button></Link>
            <Link to="/login"><button>login</button></Link>
            <Link to="/board"><button>board</button></Link>
            <Link to="/mbti"><button>mbti</button></Link>
            <Link to="/ml"><button>flask 연동</button></Link>
            <Link to="/firebase"><button>firebase file-upload</button></Link>
        </div>
    </div>
}
export default Home;