import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../css/Login.css";
import axiosInstance from "../../api/axiosInstance";

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [kakaoLocation, setKakaoLocation] = useState("");
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate('/jwt-login/join');
    };

    const handleFindIdClick = () => {
        navigate('/jwt-login/find-id');
    };

    const handleFindPwClick = () => {
        navigate('/jwt-login/find-pw');
    }

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePw = (e) => {
        setPw(e.target.value);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if(token) {
            axiosInstance.post("/jwt-decode", {token})
                .then(response => {
                    const userId = response.data.userId;
                    setUserId(userId);
                    setSuccess("카카오 로그인 성공");
                })
                .catch(error => {
                    console.error("토큰 부호화 실패");
                    setError("카카오 로그인 실패");
                });
        }
    },[]);

    const handleKakaoLogin = () => {
        axiosInstance.get("/kakaologin/location")
            .then(response => {
                const kLocation = response.data;
                setKakaoLocation(kLocation);

                if(kLocation) {
                    window.location.href = kLocation;
                }
            })
            .catch(error => {
                console.error("kakaoLocation 가져오는 중 에러 발생");
            });
    };

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/jwt-login/login", {
                userId: id,
                password: pw,
            });
            if (response.status === 200) {
                // setSuccess("로그인 성공");
                setError("");
                // 로그인 성공 후 JWT 토큰을 localStorage에 저장
                localStorage.setItem('jwtToken', response.data.jwtToken);

                console.log(response.data.jwtToken);
                console.log(localStorage.getItem('jwtToken'));
                // 로그인 성공 후 페이지 이동
                window.location.href = "/";
            }
        } catch (error) {
            setError("로그인 실패: 로그인 아이디 또는 비밀번호가 틀렸습니다.");
            setSuccess("");
        }
    };

    return (
        <div className="page">
            <div className="titleWrap">로그인</div>
            <div className="contentWrap">
                <div className="inputWrap">
                    <input
                        type="text"
                        className="input"
                        placeholder="아이디"
                        value={id}
                        onChange={handleId}
                    />
                </div>
                <div className="inputWrap">
                    <input
                        type="password"
                        className="input"
                        placeholder="비밀번호"
                        value={pw}
                        onChange={handlePw}
                    />
                </div>
            </div>
            <div>
                <button className="loginButton" onClick={handleLogin}>로그인</button>
            </div>
            {error && <div className="errorMessage">{error}</div>}
            {success && <div className="successMessage">{success}</div>}
            <div className="signupAndFindWrap">
                <div className="findWrap">
                    <button className="findButton" onClick={handleFindIdClick}>아이디 찾기&nbsp;&nbsp;|</button>
                </div>
                &nbsp;&nbsp;
                <div className="findWrap">
                    <button className="findButton" onClick={handleFindPwClick}>비밀번호 찾기&nbsp;&nbsp;|</button>
                </div>
                &nbsp;&nbsp;
                <div className="signupWrap">
                    <button className="signupButton" onClick={handleSignUpClick}>회원가입</button>
                </div>
            </div>

            <div className="simpleLoginWrap">
                <div className="simpleLoginBar"></div>
                <div className="simpleLoginTitle">간편 로그인</div>
                <div className="simpleLoginBar"></div>
            </div>
            <div className="kakaoLoginWrap">
                <button onClick={handleKakaoLogin}>카카오 로그인</button>
            </div>
        </div>
    );
}


// import React, { useState } from "react";
// import axios from "axios";
// import "../../css/Login.css";
//
// export default function Login() {
//   const [id, setId] = useState("");
//   const [pw, setPw] = useState("");
//
//   const handleId = (i) => {
//     setId(i.target.value);
//   };
//   const handlePw = (p) => {
//     setPw(p.target.value);
//   };
//
//   const HorizonLine = () => {
//     return (
//       <div
//         style={{
//           width: "330px",
//           textAlign: "center",
//           borderBottom: "1px solid #aaa",
//           lineHeight: "0.1em",
//           margin: "10px 0 20px",
//         }}
//       >
//         <span style={{ background: "#fff" }}></span>
//       </div>
//     );
//   };
//
//   return (
//     <div className="page">
//       <div className="titleWrap">로그인</div>
//
//       {/* 로그인 폼 */}
//       <div className="contentWrap">
//         <div className="inputWrap">
//           <input
//             type="text"
//             className="input"
//             placeholder="아이디"
//             value={id}
//             onChange={handleId}
//           />
//         </div>
//
//         <div className="inputWrap">
//           <input
//             type="password"
//             className="input"
//             placeholder="비밀번호"
//             value={pw}
//             onChange={handlePw}
//           />
//         </div>
//       </div>
//
//       {/* 로그인 버튼 */}
//       <div>
//         <button className="loginButton">로그인</button>
//       </div>
//
//       {/* 회원가입 및 아이디&비밀번호 찾기 링크 */}
//       <div className="signupAndFindWrap">
//         <div className="signupWrap">
//           <button className="signupButton">회원가입</button>
//         </div>
//         &nbsp;&nbsp;
//         <div className="findWrap">
//           <button className="findButton">아이디·비밀번호 찾기</button>
//         </div>
//       </div>
//       <HorizonLine />
//     </div>
//   );
// }