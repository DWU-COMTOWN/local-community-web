import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 메뉴 전체 컨테이너
const TopMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: #2d2d2d;
    padding: 10px 0;
    font-family: Arial, sans-serif;
    position: relative;
    width: 800px;
    margin: 0 auto;
    border-radius: 3px; /* 모서리 */
    //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
`;

// 상단 메뉴 바
const TopMenu = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px; /* 메뉴 바 전체 너비 */
    max-width: 1200px; /* 최대 너비 */
`;

// 개별 메뉴 아이템
const MenuItem = styled.div`
    position: relative;
    flex: 1; /* 모든 메뉴 항목이 동일한 크기로 나뉨 */
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: red; /* 강조 색상 */
    }

    /* 구분 선 추가 */
    &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 100%; /* 구분 선의 높이 */
        background-color: white;
    }

    &:last-child::after {
        display: none; /* 마지막 항목의 구분 선 제거 */
    }
`;

// 서브 메뉴 전체
const SubMenu = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: darkseagreen;
    padding: 10px 0;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;

    ${MenuItem}:hover &,
    &:hover {
        display: block; /* 서브 메뉴와 부모 메뉴에서 마우스가 떠나지 않도록 유지 */
    }
`;

// 서브 메뉴 항목
const SubMenuItem = styled.div`
    color: white;
    padding: 10px 20px;
    font-size: 14px;
    text-align: center; /* 텍스트 가운데 정렬 */
    display: flex; /* 플렉스 박스를 사용해 수직/수평 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #77a877;
        color: red;
    }
`;

function MainMenu() {
    const navigate = useNavigate();

    const handleClick = (id, category) => {
        navigate(`/posts`, { state: { categoryId: id, category: category } });
    };

    return (
        <TopMenuWrapper>
            <TopMenu>
                <MenuItem>About us</MenuItem>
                <MenuItem>
                    Community
                    <SubMenu>
                        <SubMenuItem onClick={() => handleClick(4, "자유")}>
                            자유 게시판
                        </SubMenuItem>
                        <SubMenuItem onClick={() => handleClick(5, "정보")}>
                            정보 게시판
                        </SubMenuItem>
                        <SubMenuItem onClick={() => handleClick(6, "홍보")}>
                            홍보 게시판
                        </SubMenuItem>
                    </SubMenu>
                </MenuItem>
                <MenuItem>
                    Review
                    <SubMenu>
                        <SubMenuItem onClick={() => handleClick(7, "식당")}>
                            식당
                        </SubMenuItem>
                        <SubMenuItem
                            onClick={() => handleClick(8, "카페·베이커리")}
                        >
                            카페·베이커리
                        </SubMenuItem>
                        <SubMenuItem onClick={() => handleClick(9, "의료")}>
                            의료
                        </SubMenuItem>
                        <SubMenuItem onClick={() => handleClick(10, "패션·미용")}>
                            패션·미용
                        </SubMenuItem>
                    </SubMenu>
                </MenuItem>
                <MenuItem>
                    HELP
                    <SubMenu>
                        <SubMenuItem onClick={() => handleClick(15, "분실")}>
                            분실
                        </SubMenuItem>
                        <SubMenuItem onClick={() => handleClick(16, "실종")}>
                            실종
                        </SubMenuItem>
                        <SubMenuItem onClick={() => handleClick(17, "사고")}>
                            사고
                        </SubMenuItem>
                    </SubMenu>
                </MenuItem>
            </TopMenu>
        </TopMenuWrapper>
    );
}

export default MainMenu;
