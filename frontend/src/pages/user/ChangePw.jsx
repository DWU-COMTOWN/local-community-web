import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import "../../css/ChangePw.css";

export default function ChangePw() {

    const [pw, setPw] = useState("");
    const [checkPw, setCheckPw] = useState("");

    const navibate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    // 유효성
    const [notAllow, setNotAllow] = useState(true);
    const [pwAllow, setPwAllow] = useState(false);
    const [checkPwAllow, setCheckPwAllow] = useState(false);

    // 메세지
    const [pwMsg, setPwMsg] = useState("");
    const [checkPwMsg, setCheckPwMsg] = useState("");

    const onChangePw = (e) => {
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,100}$/;
        const currentPw = e.target.value;

        setPw(currentPw);

        if(!pwRegExp.test(currentPw)) {
            setPwMsg("영문, 숫자, 특수문자 포함 8자 이상");
            setPwAllow(false);
        } else {
            setPwMsg("");
            setPwAllow(true);
        }
    };

    const onChangeCheckPw = (e) => {
        const currentPwCheck = e.target.value;
        setCheckPw(currentPwCheck);

        if(pw != currentPwCheck) {
            setCheckPwMsg("비밀번호가 일치하지 않습니다.");
            setPwAllow(false)
        } else {
            setCheckPwMsg("비밀번호가 일치합니다.");
            setPwAllow(true);
        }
    };

    const onSubmit = async () => {
        if(pw === checkPw) {
            try {
                await axios.post(`http://localhost:8080/jwt-login/change-pw?token=${token}`, { newPassword: pw });
                alert("비밀번호가 성공적으로 변경되었습니다.");
                window.location.href = "/jwt-login/login"
            } catch(error) {
                alert("비밀번호 변경에 실패했습니다.");
            }
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    useEffect(() => {
        if(pw === "" && checkPw === "") {
            setCheckPwMsg("");
            setCheckPwAllow(false);
        } else if((checkPw && pw !== checkPw) || (checkPw === "")) {
            setCheckPwMsg("비밀번호가 일치하지 않습니다.");
            setCheckPwAllow(false);
        } else {
            setCheckPwMsg("비밀번호가 일치합니다.");
            setCheckPwAllow(true);
        }
    });

    return (
        <div className="page">
            <div className="noticeWrap">
                <p className="noticeTitle">비밀번호 변경</p>
                <p className="notice">새로운 비밀번호를 입력해주세요.</p>
            </div>

            <div className="contentWrap">
                <p className="ChangePw_smallMsg">새 비밀번호</p>
                <div className="ChangePw_inputWrap">
                    <input
                        type="password"
                        className="input"
                        value={pw}
                        onChange={onChangePw}/>
                </div>
                <div className="ChangePw_errorMessage">{pwMsg}</div>

                <p className="findId_smallMsg">새 비밀번호 확인</p>
                <div className="ChangePw_inputWrap">
                    <input
                        type="password"
                        className="input"
                        value={checkPw}
                        onChange={onChangeCheckPw}/>
                </div>
                <div className="ChangePw_errorMessage"
                     style={{color: checkPwAllow ? '#53b463' : 'red'}}>
                    {checkPwMsg}</div>

                <div className="ChangePw_btnWrap">
                    <button className="ChangePw_btn" onClick={onSubmit}>변경</button>
                </div>
            </div>
        </div>
    )
}