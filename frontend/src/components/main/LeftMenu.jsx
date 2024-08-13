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
                                <p>ID : <input type="text" name="id" size="12" value=""/></p>
                                <p>PW : <input type="password" name="pw" size="12" value=""/></p>
                                <p align ="center">
                                    <input type="submit" value="로그인"/>&nbsp;
                                    <input type="reset" value="재작성"/>
                                </p>
                            </fieldset>
                        </form>
                        <br/>
                        회원이 아니신 분은<a href= "member.html" target="right"></a><br/>
                        <input type="button" className="move" value="회원가입" onClick="javascript:window.open('member.html','')"/>
                        <br/><br/><br/>

                        <div className="mymenu"><a href="#" className="txt2">나의 글</a></div><br/>
                        <div className="mymenu"><a href="#" className="txt2">나의 댓글</a></div><br/>
                        <div className="mymenu"><a href="#" className="txt2">좋아요한 글</a></div><br/>
                        <div className="mymenu"><a href="#" className="txt2">스크랩한 글</a></div><br/>

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