import React from "react";
import '../../css/Main.css';
import styled from "styled-components";

const Wrapper = styled.div`
    height: 750px;
    background-color: #eeeff0;
    padding: 0.5%;
    margin-right: 0.5%;
`;

function LeftMenu(props) {
    const {} = props;

    return (
        <>
            <Wrapper>
                <div className="leftmenu">
                    <center>
                        <form name="loginForm" method="get" action="left_menu.jsp" target="left">
                            <fieldset>
                                <legend align="center">LOGIN</legend>
                                <p>ID : <input type="text" name="id" size="12"/></p>
                                <p>PW : <input type="password" name="pw" size="12"/></p>
                                <p align ="center">
                                    <input type="submit" value="로그인"/>&nbsp;
                                    <input type="reset" value="재작성"/>
                                </p>
                            </fieldset>
                        </form>
                        <br/>
                        회원이 아니신 분은<a href= "#" target="right"></a><br/>
                        <input type="button" className="move" value="회원가입" />
                        <br/><br/><br/>

                        <Link to='/myinfo'>
                            <div className="mymenu">마이페이지</div>
                            <br/>
                        </Link>
                        <Link to='/mypost'>
                            <div className="mymenu">내가 쓴 글</div>
                            <br/>
                        </Link><Link to='/mycomment'>
                        <div className="mymenu">내가 댓글 단 글</div>
                        <br/>
                        </Link>
                        <Link to='/bookmark'>
                            <div className="mymenu">북마크</div>
                            <br/>
                        </Link>

                        <br/><br/>

                        <img src="../image/ban1.jpg" width="200px" height="50px"/><br/><br/>
                        <img src="../image/ban2.jpg" width="200px" height="50px"/><br/><br/>
                        <img src="../image/ban3.jpg" width="200px" height="50px"/>
                    </center>
                </div>
            </Wrapper>
        </>
    );
}

export default LeftMenu;
