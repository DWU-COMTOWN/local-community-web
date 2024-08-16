import React from "react";
import styled from "styled-components";
import "../../css/MyInfo.css";
import "../../css/MyPage.css";
import { userData } from "../../data/userData";
import Header from "../../components/my/Header"
import Sidebar from "../../components/my/Sidebar"

export default function MyPost() {
  const canChange = () => {};

  return (
      <>
        <div className = "root-wrap"> <Header /></div>
        <div className="side-wrap">
          <Sidebar/>
        </div>
        <Mypost>
          <Title>회원 정보 수정</Title>
          <Edit>수정</Edit>
          <Table>
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
                      placeholder={userData[0].nickname}
                  />
                  <NicknameCheck onClick={canChange}>중복확인</NicknameCheck>
                </td>
              </tr>
              <tr>
                <td className="info-item">아이디</td>
                <td>{userData[0].id}</td>
              </tr>
              <tr>
                <td className="info-item">비밀번호</td>
                <td>
                  <input type="password" id="newPwd"/>
                </td>
              </tr>
              <tr>
                <td className="info-item">비밀번호 확인</td>
                <td>
                  <input type="password" id="pwdCheck"/>
                </td>
              </tr>
              <tr>
                <td className="info-item">주소</td>
                <td>
                  <input
                      type="text"
                      id="newAddress"
                      placeholder={userData[0].address}
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
                  />
                </td>
              </tr>
              <tr>
                <td className="info-item">전화번호</td>
                <td>
                  <input
                      type="text"
                      maxlength="3"
                      id="newPhone1"
                      placeholder={userData[0].phone1}
                  />
                  &nbsp;-&nbsp;
                  <input
                      type="text"
                      maxlength="4"
                      id="newPhone2"
                      placeholder={userData[0].phone2}
                  />
                  &nbsp;-&nbsp;
                  <input
                      type="text"
                      maxlength="4"
                      id="newPhone3"
                      placeholder={userData[0].phone3}
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </Table>
        </Mypost>
      </>
  );
}

const Mypost = styled.div`
  margin-left: 400px;
  margin-right: 50px;
  width: 60%;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 20px;
  display: inline-block;
`;

const Table = styled.div`
  margin-top: 15px;
`;

const Edit = styled.button`
    float : right;
  font-size: 11px;
  padding: 5px;
`;
const NicknameCheck = styled.button`
    display: inline-block;
    margin-left: 10px;
  font-size: 11px;
  padding: 5px;
  
`;