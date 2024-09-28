import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../css/FindId.css";

export default function FindId() {
    const [phone, setPhone] = useState("");
    const [authNum, setAuthNum] = useState("");

    const [validationState, setValidationState] = useState(false);
    const [message, setMessage] = useState("");

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleAuthNum = (e) => {
        setAuthNum(e.target.value);
    }

    const onAlert = (message) => {
        alert(message);
    };

    const handleCheckPhone = async () => {
        try{
            const response = await axios.get("/jwt-login/check-phone", {
                params: {phone: phone}
            });

            const {success, message} = response.data;
            console.log(success);
            console.log(message);
            setValidationState(success);
            setMessage(message);
            onAlert(message);
        } catch (error) {
            console.error("휴대폰 번호 확인 요청 실패: ", error);
            setMessage("서버와 통신 오류");
            console.log(message);
        }
    }

    return(
        <div className="page">
            <div className="noticeWrap">
                <p className="noticeTitle">아이디 찾기</p>
                <p className="notice">계정에 등록된 휴대폰 번호를 인증하시면</p>
                <p className="notice">사용 중인 계정의 아이디를 알려드립니다.</p>
            </div>

            <div className="contentWrap">
                <p className="findId_smallMsg">휴대폰 번호 (숫자만 입력)</p>
                <div className="findId_inputAndBtnWrap">
                    <div className="findId_inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="010-1234-5678"
                            value={phone}
                            onChange={handlePhone}
                            maxLength={13}
                        />
                    </div>
                    <button className="findId_btn" onClick={handleCheckPhone}>인증 요청</button>
                </div>
                <p className="infoMessage">인증번호가 카카오톡으로 전송되었습니다.</p>
                &nbsp;

                <div className="findId_inputAndBtnWrap">
                    <div className="findId_inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="인증번호 입력"
                            value={authNum}
                            onChange={handleAuthNum}
                            maxLength={8}
                        />
                    </div>
                    <button className="findId_btn">인증</button>
                </div>
            </div>
        </div>
    )
}