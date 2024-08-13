import React, { useState } from "react";
import axios from "axios";
import "../../css/Login.css";

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePw = (e) => {
        setPw(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("/jwt-login/login", {
                userId: id,
                password: pw,
            });
            if (response.status === 200) {
                setSuccess("로그인 성공");
                setError("");
                localStorage.setItem('jwtToken', response.data.jwtToken); // If the token is returned in the response
                // Redirect or update UI as needed
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
                <div className="signupWrap">
                    <button className="signupButton">회원가입</button>
                </div>
                &nbsp;&nbsp;
                <div className="findWrap">
                    <button className="findButton">아이디·비밀번호 찾기</button>
                </div>
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