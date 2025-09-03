// Login.jsx
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            {user ? (
                <div>
                    <h3>환영합니다, {user.name}님!</h3>
                    <img src={user.picture} alt="프로필" width="50" />
                    <button onClick={() => {
                        googleLogout();
                        setUser(null);
                    }}>로그아웃</button>
                </div>
            ) : (
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log('로그인 성공:', decoded);
                        setUser(decoded);
                    }}
                    onError={() => {
                        console.log('로그인 실패');
                    }}
                />
            )}
        </div>
    );
};

export default Login;

