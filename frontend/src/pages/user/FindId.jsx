import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../css/FindId.css";

export default function FindId() {
    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [findId, setFindId] = useState("");

    const [validationState, setValidationState] = useState(false);
    const [message, setMessage] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleAuthNum = (e) => {
        setAuthNum(e.target.value);
    }

    const onAlert = (message) => {
        alert(message);
    };

    const handleCheckEmail = async () => {
        try{
            const response = await axios.get("/jwt-login/exist-email", {
                params: {email: email}
            });

            const {success, message} = response.data;

            setValidationState(success);
            setMessage(message);
            onAlert(message);

            if(success) {
                try {
                    const sendResponse = await axios.post("/jwt-login/id-email", {
                        email: email
                    });
                    console.log("이메일 전송 요청 성공: ", sendResponse);
                } catch (error) {
                    console.error("이메일 전송 요청 실패: ", error);
                }
            }

        } catch (error) {
            console.error("이메일 확인 요청 실패: ", error);
            setMessage("서버와 통신 오류");
            console.log(message);
        }
    }

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post("/jwt-login/verify-code", {
                email: email,
                code: authNum
            });

            const {success, message} = response.data;

            setMessage(message);
            onAlert(message);

            console.log("인증 번호 확인 요청 성공: ", response)

            if(success) {
                try {
                    const response2 = await axios.get("/jwt-login/find-id", {
                        params: {email: email}
                    });
                    console.log("아이디 가져오기 요청 성공");

                    const {success, userId} = response2.data;
                    setFindId(userId);

                } catch (error) {
                    console.error("아이디 가져오기 요청 실패: ", error);
                }
            }

        } catch(error) {
            console.error("인증 번호 확인 요청 실패: ", error);
            setMessage("서버와 통신 오류");
            onAlert(message);
        }
    }

    return(
        <div className="page">
            <div className="noticeWrap">
                <p className="noticeTitle">아이디 찾기</p>
                <p className="notice">계정에 등록된 이메일을 인증하시면</p>
                <p className="notice">사용 중인 계정의 아이디를 알려드립니다.</p>
            </div>

            <div className="contentWrap">
                <p className="findId_smallMsg">이메일</p>
                <div className="findId_inputAndBtnWrap">
                    <div className="findId_inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="sample@google.com"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <button className="findId_btn" onClick={handleCheckEmail}>인증 요청</button>
                </div>
                &nbsp;

                <p className="findId_smallMsg">인증번호</p>
                <div className="findId_inputAndBtnWrap">
                    <div className="findId_inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="인증번호 입력"
                            value={authNum}
                            onChange={handleAuthNum}
                        />
                    </div>
                    <button className="findId_btn" onClick={handleVerifyCode}>인증</button>
                </div>
            </div>

            {findId && (
                <div className="findId_smallMsg">
                    <p className="notice">인증하신 이메일로 등록된 아이디는 <b>{findId}</b> 입니다.</p>
                </div>
            )}
        </div>
    )
}