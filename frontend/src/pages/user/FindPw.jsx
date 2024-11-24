import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../css/FindId.css";

export default function FindPw() {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [authNum, setAuthNum] = useState("");

    const [validationState, setValidationState] = useState(false);
    const [message, setMessage] = useState("");

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleAuthNum = (e) => {
        setAuthNum(e.target.value);
    };

    const onAlert = (message) => {
        alert(message);
    };

    const handleCheckId = async () => {
        try {
            const response = await axios.get("/jwt-login/exist-id", {
                params: {id: id}
            });

            const {success, message} = response.data;

            setValidationState(success);
            setMessage(message);
            onAlert(message);

            try {
                const response2 = await axios.post("/jwt-login/get-email", {
                    id: id
                });

                const {success, email} = response2.data;
                setEmail(email);

                if(success) {
                    try {
                        const sendResponse = await axios.post("/jwt-login/pw-email", {
                            email: email
                        });
                        console.log("이메일 전송 요청 성공: ", sendResponse);
                    } catch (error) {
                        console.error("이메일 전송 요청 실패: ", error);
                    }
                }
            } catch (error2) {
                console.log("이메일 가져오기 요청 실패: ", error2);
            }

        } catch (error) {
            console.error("아이디 확인 요청 실패: ", error);
            setMessage("서버와 통신 오류");
            console.log(message);
        }
    }

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
                    const sendResponse = await axios.post("/jwt-login/pw-email", {
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

    return(
        <div className="page">
            <div className="noticeWrap">
                <p className="noticeTitle">비밀번호 찾기</p>
                <p className="notice">아이디를 입력하시면 계정에 등록된 이메일로</p>
                <p className="notice">비밀번호를 재설정 링크를 보내드립니다.</p>
            </div>

            <div className="contentWrap">
                <p className="findId_smallMsg">아이디</p>
                <div className="findId_inputAndBtnWrap">
                    <div className="findId_inputWrap">
                        <input
                            type="text"
                            className="input"
                            placeholder="아이디 입력"
                            value={id}
                            onChange={handleId}
                        />
                    </div>
                    <button className="findId_btn" onClick={handleCheckId}>확인</button>
                </div>
            </div>

        </div>
    )
}