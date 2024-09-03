import React from "react";
import styled from "styled-components";
import "../../css/MyInfo.css";
import "../../css/MyPage.css";
import { userData } from "../../data/userData";
import Header from "../../components/my/Header"
import Sidebar from "../../components/my/Sidebar"
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function DeleteAcc() {
    const deleteAcc = (e) => {
        e.preventDefault();
        //const navigate = useNavigate();
        // if (window.confirm("탈퇴하시겠습니까?")) {
        //
        //     axios.delete()
        //     .then(()=> {
        //         alert("탈퇴되었습니다.");
        //         navigate('/');
        //         }
        //     )
        // }

    };
    return (
        <>
            <div className = "root-wrap"> <Header /></div>
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