import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 기본 프로필 이미지 URL
const DEFAULT_PROFILE_IMAGE = "https://i.ibb.co/4dymRPK/image.png";

// Wrapper 스타일
const Wrapper = styled.div`
    height: 750px;
    width: 200px;
    background-color: #eeeff0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 사용자 정보 래퍼
const UserInfoWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

// 프로필 이미지
const UserImage = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
`;

// 사용자 ID 스타일
const UserIdWrapper = styled.p`
    margin-bottom: 30px;
`;

// 메뉴 링크 스타일
const MenuLinksWrapper = styled.div`
    margin-top: 40px; /* 로그아웃 버튼과 메뉴 항목 간의 간격 */
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const MenuLink = styled(Link)`
    text-decoration: none;
    color: #007bff;
    font-size: 14px;
    text-align: center;
    padding: 8px;
    width: 160px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #f0f0f0;
    }
`;

// 버튼 컨테이너
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 50px;
`;

// 기본 버튼 스타일
const Button = styled.button`
    padding: 8px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    width: 140px;
    text-align: center;

    &:hover {
        background-color: #0056b3;
    }
`;

// 카카오 버튼 스타일
const KakaoButton = styled(Button)`
    background-color: #fee500; /* 카카오 고유 색상 */
    color: #000; /* 검은색 텍스트 */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;

    &:hover {
        background-color: #ffcc00;
    }
`;

const LeftMenu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("/mypage/user", {
                withCredentials: true,
            });
            setUserInfo({
                nickname: response.data.nickname,
                userId: response.data.userId,
                profile_url: response.data.profile_url || DEFAULT_PROFILE_IMAGE,
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            setIsLoggedIn(false);
            setUserInfo(null);
        }
    };

    const handleLogout = () => {
        axios
            .post("/jwt-login/logout", {}, { withCredentials: true })
            .then(() => {
                setIsLoggedIn(false);
                setUserInfo(null);
                localStorage.removeItem("jwtToken");
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    const handleKakaoLogin = () => {
        axios.get("/kakaologin/location").then((response) => {
            const kakaoLoginUrl = response.data;
            if (kakaoLoginUrl) {
                window.location.href = kakaoLoginUrl;
            }
        });
    };

    const handleKakaoSignUp = () => {
        navigate("/jwt-login/join/kakao");
    };

    return (
        <Wrapper>
            {isLoggedIn ? (
                userInfo && (
                    <UserInfoWrapper>
                        <h3>{userInfo.nickname}님</h3>
                        <UserImage
                            src={userInfo.profile_url || DEFAULT_PROFILE_IMAGE}
                            alt="프로필 사진"
                        />
                        <UserIdWrapper>ID: {userInfo.userId}</UserIdWrapper>
                        <Button onClick={handleLogout}>로그아웃</Button>
                        <MenuLinksWrapper>
                            <MenuLink to="/myinfo">마이페이지</MenuLink>
                            <MenuLink to="/mypost">내가 쓴 글</MenuLink>
                            <MenuLink to="/mycomment">내가 댓글 단 글</MenuLink>
                            <MenuLink to="/bookmark">북마크</MenuLink>
                        </MenuLinksWrapper>
                    </UserInfoWrapper>
                )
            ) : (
                <ButtonWrapper>
                    <Button onClick={() => navigate("/jwt-login/login")}>
                        로그인
                    </Button>
                    <Button onClick={() => navigate("/jwt-login/join")}>
                        회원가입
                    </Button>
                    <KakaoButton onClick={handleKakaoLogin}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Kakao_logo.jpg"
                            alt="카카오 로고"
                            style={{ width: "30px", height: "30px", borderRadius: "10%" }}
                        />
                        간편 로그인 및 회원가입
                    </KakaoButton>
                </ButtonWrapper>
            )}
        </Wrapper>
    );
};

export default LeftMenu;
