import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../css/MyInfo.css";
import "../../css/MyPage.css";
import { userData } from "../../data/userData";
import Header from "../../components/my/Header"
import Sidebar from "../../components/my/Sidebar"
import axios from 'axios'

export default function MyPost() {
  const [nickname, setNickname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const isSamePwd = password === pwdCheck;
  const isSameNick = nickname === userData[0].nickname;


  const canChangePwd = async(e) => {
    e.preventDefault();
    if (!isSamePwd){
      alert("비밀번호가 일치하지 않습니다.");
      setPwdCheck('');
    }
    else {
      alert("변경이 가능합니다.");
    }
  };
  const canChangeNick = async(e) => {
    e.preventDefault();

    if (!isSameNick){
      alert("이미 사용중인 닉네임입니다.");
      setNickname('');
    }
    else {
      alert("변경이 가능합니다.");
    }
  };
  const canEdit = async(e) => {
    e.preventDefault();
    if(window.confirm('정보를 변경하시겠습니까?')){
      alert('수정되었습니다.');
      window.location.reload();
    }
  };
  return (
      <>
        <div className = "root-wrap"> <Header /></div>
        <div className="side-wrap">
          <Sidebar/>
        </div>
        <MyInfo>
          <Title>회원 정보 수정</Title>
          <Table>
            <form id="info">
            <table>
              <tbody>
              <tr>
                <td className="info-item">프로필 사진</td>
                <td>
                  <input type="file" id="newProfilePic" style = {{fontSize: '11px'}}/>
                  <button style = {{fontSize: '11px', padding: '5px'}}>삭제</button>
                </td>
              </tr>
              <tr>
                <td className="info-item">이름</td>
                <td>{userData[0].name}</td>

              </tr>
              <tr>
                <td className="info-item">닉네임</td>
                <td>
                  <input
                      type="text"
                      id="newNick"
                      value={nickname}
                      placeholder={userData[0].nickname}
                      onChange={(e) => setNickname(e.target.value)}
                  />
                  <NicknameCheck onClick={canChangeNick}>중복확인</NicknameCheck>
                </td>
              </tr>
              <tr>
                <td className="info-item">아이디</td>
                <td>{userData[0].id}</td>
              </tr>
              <tr>
                <td className="info-item">비밀번호</td>
                <td>
                  <input type="password" id="password" value ={password}
                         onChange={(e) => setPassword(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td className="info-item">비밀번호 확인</td>
                <td>
                  <input type="password" id="pwdCheck" value ={pwdCheck}
                         onChange={(e) => setPwdCheck(e.target.value)}/>
                  <NicknameCheck onClick={canChangePwd}>중복확인</NicknameCheck>
                </td>
              </tr>
              <tr>
                <td className="info-item">주소</td>
                <td>
                  <input
                      type="text"
                      id="newAddress"
                      placeholder={userData[0].address}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="info-item">이메일</td>
                <td>
                  <input
                      type="text"
                      id="newEmail"
                      placeholder={userData[0].email}
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="info-item">전화번호</td>
                <td>
                  {/*<input type="text" id="newPhone1" placeholder={userData[0].phone1} />*/}
                  {/*&nbsp;-&nbsp;*/}
                  {/*<input type="text" id="newPhone2" placeholder={userData[0].phone2} />*/}
                  {/*&nbsp;-&nbsp;*/}
                  {/*<input type="text" id="newPhone3" placeholder={userData[0].phone3}/>*/}
                  <input type="text" id="phoneNum" value ={phoneNum} name = "phoneNum"
                         onChange={(e) => setPhoneNum(e.target.value)}/>
                </td>
              </tr>
              </tbody>
            </table>
              <Edit onClick={canEdit}>수정</Edit>
            </form>
          </Table>

        </MyInfo>
      </>
  );
}

const MyInfo = styled.div`
  margin-left: 400px;
  margin-right: 50px;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 20px;
  display: inline-block;
`;

const Table = styled.div`
  margin-top: 15px;
  width: 85%;
`;

const Edit = styled.button`
  margin-top : 10px;
  font-size: 11px;
  padding: 5px;
`;
const NicknameCheck = styled.button`
    display: inline-block;
    margin-left: 5px;
  font-size: 11px;
  padding: 5px;
  
`;