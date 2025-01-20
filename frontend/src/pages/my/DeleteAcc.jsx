import React, {useEffect, useState} from "react";
import styled from "styled-components";
import "../../css/MyInfo.css";
import "../../css/MyPage.css";
import { userData } from "../../data/userData";
import Header from "../../components/my/Header"
import Sidebar from "../../components/my/Sidebar"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function DeleteAcc() {

    const [userInfo, setUserInfo] = useState({});
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axiosInstance.get("/mypage/user", {
                    withCredentials: true, // 쿠키를 포함하여 서버로 요청을 보냄
                });
                setUserInfo(response.data);
                setUserId(response.data.userId);  // 수정: 정확한 필드명 사용
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        getUserInfo();
    }, []);

    const handleLogout = () => {
        fetch("/jwt-login/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if(response.ok) {
                    window.location.href = "/";
                }
            }).catch(error => {
            console.error("로그아웃 에러 발생: ", error);
        });
    };

    const deleteAcc = async (e) => {
        e.preventDefault();

        console.log("userInfo:", userInfo)
        console.log("userId:", userId);

        if (window.confirm("탈퇴하시겠습니까?")) {
            try {
                await axiosInstance.delete("/jwt-login/withdraw", {
                    params: {userId}
                });
                alert("탈퇴되었습니다.");
                handleLogout();
            } catch (error) {
                console.error("회원 탈퇴 실패");
            }
        }
    };
    return (
            <>
                <div className="root-wrap"><Header/></div>
                <div className="side-wrap">
                    <Sidebar/>
                </div>
                <Deleteacc>
                    <Title>회원 탈퇴</Title><p/>
                    <button onClick={deleteAcc}>탈퇴하기</button>
                </Deleteacc>
            </>
    );
}

const Deleteacc = styled.div`
    margin-left: 400px;
    margin-right: 50px;
    justify-content: space-around;
`;

const Title = styled.div`
    font-size: 20px;
    display: inline-block;
`;
