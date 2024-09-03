import React from "react";
import styled from "styled-components";
import '../../css/Main.css';
import { useNavigate } from 'react-router-dom';

const TopMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const MenuWrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: #eeeff0;
`;

function MainMenu(props) {
    const {} = props;

    const navigate = useNavigate();

    const handleClick = (id, category) => {
        navigate(`/posts`, { state: { categoryId: id, category: category } });
    };


    return (
        <>
            <TopMenuWrapper>
                <nav id="topMenu">
                    <ul>
                        <li className="topMenuLi"> <a className="menuLink" href="#">About us</a></li>
                        <li>|</li>
                        <li className="topMenuLi"><a className="menuLink">Comunity</a>
                            <ul className="submenu">
                                <li><a target="middle" className="submenuLink longLink" onClick={() => handleClick(4, "자유")}>자유 게시판</a></li>
                                <li><a className="submenuLink longLink" onClick={() => handleClick(5, "정보")}>정보 게시판</a></li>
                                <li><a className="submenuLink longLink" onClick={() => handleClick(6, "홍보")}>홍보 게시판</a></li>
                            </ul>
                        </li>
                        <li>|</li>
                        <li className="topMenuLi"><a className="menuLink">Review</a>
                            <ul className="submenu">
                                <li><a className="submenuLink" onClick={() => handleClick(7, "식당")}>식당</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(8, "카페·베이커리")}>카페·베이커리</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(9, "의료")}>의료</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(10, "패션·미용")}>패션·미용</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(11, "동물")}>동물</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(12, "교육")}>교육</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(13, "여가")}>여가</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(14, "기타")}>기타</a></li>
                            </ul>
                        </li>
                        <li>|</li>
                        <li className="topMenuLi"><a className="menuLink">HELP</a>
                            <ul className="submenu">
                                <li><a className="submenuLink" onClick={() => handleClick(15, "분실")}>분실</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(16, "실종")}>실종</a></li>
                                <li><a className="submenuLink" onClick={() => handleClick(17, "사고")}>사고</a></li>
                            </ul>
                        </li>
                        <li>|</li>
                        <li className="topMenuLi"><a className="menuLink" href="#">FAQ</a></li>
                    </ul>
                </nav>
            </TopMenuWrapper>

            <hr/>

            <MenuWrapper>
                <div>
                    <table className="menu">
                        <tbody>
                            <tr valign="top">
                                <td>
                                    <dl>
                                        <dt><a target="middle" className="txt" onClick={() => handleClick(4, "자유")}>🆓 자유 게시판</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(5, "정보")}> &nbsp; ℹ &nbsp; 정보 게시판</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(6, "홍보")}>📢 홍보 게시판</a></dt>
                                    </dl>
                                </td>

                                <td>
                                    <dl>
                                        <dt><a className="txt" onClick={() => handleClick(7, "식당")}>🍴 식당</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(8, "카페·베이커리")}>☕ 카페·베이커리</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(9, "의료")}>🏥 의료</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(10, "패션·미용")}>💄 패션·미용</a></dt>
                                    </dl>
                                </td>

                                <td>
                                    <dl>
                                        <dt><a className="txt" onClick={() => handleClick(11, "동물")}>🐾 동물</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(12, "교육")}>🏫 교육</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(13, "여가")}>🎉 여가</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(14, "기타")}>✴ 기타</a></dt>
                                    </dl>
                                </td>

                                <td>
                                    <dl>
                                        <dt><a className="txt" onClick={() => handleClick(15, "분실")}>🚩 분실</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(16, "실종")}>🆘 실종</a></dt>
                                        <dt><a className="txt" onClick={() => handleClick(17, "사고")}>🚨 사고</a></dt>
                                    </dl>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </MenuWrapper>
        </>
    );
}

export default MainMenu;
