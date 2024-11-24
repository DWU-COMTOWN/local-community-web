import React, {useEffect, useState} from "react";
import styled from "styled-components";
import '../../css/Main.css';

const TopWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 1%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleDiv = styled.div`
    font-size: 50px;
    width: 500px;
    height: 80px;
    background-color: green;
    text-align: center;
    color: white;
    text-shadow: 10px 0px 10px #4d4d4d;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

function MainTitle(props) {
    const {} = props;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isKakaoUser, setIsKakaoUser] = useState(false);

    useEffect(() => {
        fetch("/jwt-login/check-auth", {
            method: "GET",
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                setIsLoggedIn(data.isAuth);
                setIsKakaoUser(data.kakaoUser);
            })
            .catch(error => {
                console.error("Error: ", error);
            });
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
                    alert("로그아웃 성공");
                    window.location.href = "/";
                } else {
                    alert("로그아웃 실패");
                }
            }).catch(error => {
            console.error("Error: ", error);
            alert("에러 발생");
        });
    };

    return (
        <>
            <TopWrapper>
                {/*<div><a className="topBox" href="/jwt-login/login">로그인</a></div>
                <div><a className="topBox" href="/jwt-login/join">회원가입</a></div>
                <div><a className="topBox" onChange={handleLogout}>로그아웃</a> </div>
*/}
                {isLoggedIn ? (
                    <div><a className="topBox" onClick={handleLogout}>로그아웃</a></div>
                ) : (
                    <>
                        <div><a className="topBox" href="/jwt-login/login">로그인</a></div>
                        <div><a className="topBox" href="/jwt-login/join">회원가입</a></div>
                    </>
                )}
            </TopWrapper>
            <hr/>
            <TitleWrapper>
                <TitleDiv>TOWN - IN(人)</TitleDiv>
            </TitleWrapper>
        </>
    );
}

export default MainTitle;