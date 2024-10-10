import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../css/MyInfo.css";
import "../../css/MyPage.css";
import Header from "../../components/my/Header";
import Sidebar from "../../components/my/Sidebar";
import axios from "axios";

export default function MyPost() {
  const [nickname, setNickname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/mypage/user', {
          withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
        });
        setUserInfo(response.data);
        setNickname(response.data.nickname);
        setPhoneNum(response.data.phone);
        setAddress(response.data.address);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const canChangePwd = async (e) => {
    e.preventDefault();
    if (password !== pwdCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      setPwdCheck('');
    } else {
      alert("변경이 가능합니다.");
    }
  };

  const canChangeNick = async (e) => {
    e.preventDefault();
    if (nickname === userInfo.nickname) {
      alert("이미 사용중인 닉네임입니다.");
      setNickname('');
    } else {
      alert("변경이 가능합니다.");
    }
  };

  const canEdit = async (e) => {
    e.preventDefault();
    if (window.confirm('정보를 변경하시겠습니까?')) {
      try {
        await axios.put(`/mypage/user`, {
          nickname,
          phone: phoneNum,
          address,
          email,
          password
        }, {
          withCredentials: true // 쿠키를 포함하여 서버로 요청을 보냄
        });
        alert('수정되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error("Failed to update user info:", error);
        alert('수정에 실패했습니다.');
      }
    }
  };

  return (
      <>
        <div className="root-wrap"> <Header /></div>
        <div className="side-wrap">
          <Sidebar />
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
                    <input type="file" id="newProfilePic" style={{ fontSize: '11px' }} />
                    <button style={{ fontSize: '11px', padding: '5px' }}>삭제</button>
                  </td>
                </tr>
                <tr>
                  <td className="info-item">이름</td>
                  <td>{userInfo.username}</td>
                </tr>
                <tr>
                  <td className="info-item">닉네임</td>
                  <td>
                    <input
                        type="text"
                        id="newNick"
                        value={nickname}
                        placeholder={userInfo.nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <NicknameCheck onClick={canChangeNick}>중복확인</NicknameCheck>
                  </td>
                </tr>
                <tr>
                  <td className="info-item">아이디</td>
                  <td>{userInfo.userId}</td>
                </tr>
                <tr>
                  <td className="info-item">비밀번호</td>
                  <td>
                    <input type="password" id="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td className="info-item">비밀번호 확인</td>
                  <td>
                    <input type="password" id="pwdCheck" value={pwdCheck}
                           onChange={(e) => setPwdCheck(e.target.value)} />
                    <NicknameCheck onClick={canChangePwd}>중복확인</NicknameCheck>
                  </td>
                </tr>
                <tr>
                  <td className="info-item">주소</td>
                  <td>
                    <input
                        type="text"
                        id="newAddress"
                        placeholder={userInfo.address}
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
                        placeholder={userInfo.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="info-item">전화번호</td>
                  <td>
                    <input type="text" id="phoneNum" value={phoneNum} name="phoneNum"
                           onChange={(e) => setPhoneNum(e.target.value)} />
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

// 스타일 컴포넌트 정의
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
  margin-top: 10px;
  font-size: 11px;
  padding: 5px;
`;

const NicknameCheck = styled.button`
  display: inline-block;
  margin-left: 5px;
  font-size: 11px;
  padding: 5px;
`;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import "../../css/MyInfo.css";
// import "../../css/MyPage.css";
// import { userData } from "../../data/userData";
// import Header from "../../components/my/Header";
// import Sidebar from "../../components/my/Sidebar";
// import axios from "axios";
//
// export default function MyPost() {
//   const [nickname, setNickname] = useState("");
//   const [phoneNum, setPhoneNum] = useState("");
//   const [password, setPassword] = useState("");
//   const [pwdCheck, setPwdCheck] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [userInfo, setUserInfo] = useState({});
//
//   const userId = 1; // 사용자 ID를 백엔드에서 인증 정보를 통해 얻도록 변경해야 합니다.
//   const isSamePwd = password === pwdCheck;
//   const isSameNick = nickname === userData[0].nickname; // 사용자가 입력한 닉네임과 기존 닉네임 비교
//
//   useEffect(() => {
//     // 컴포넌트 마운트 시 사용자 정보를 가져옵니다.
//     axios.get(`/mypage/user?id=${userId}`)
//         .then(response => {
//           setUserInfo(response.data);
//           setNickname(response.data.nickname);
//           setPhoneNum(response.data.phone);
//           setAddress(response.data.address);
//           setEmail(response.data.email);
//         })
//         .catch(error => console.error("Failed to fetch user info:", error));
//   }, []);
//
//   const canChangePwd = async (e) => {
//     e.preventDefault();
//     if (!isSamePwd) {
//       alert("비밀번호가 일치하지 않습니다.");
//       setPwdCheck('');
//     } else {
//       alert("변경이 가능합니다.");
//     }
//   };
//
//   const canChangeNick = async (e) => {
//     e.preventDefault();
//
//     if (!isSameNick) {
//       alert("이미 사용중인 닉네임입니다.");
//       setNickname('');
//     } else {
//       alert("변경이 가능합니다.");
//     }
//   };
//
//   const canEdit = async (e) => {
//     e.preventDefault();
//     if (window.confirm('정보를 변경하시겠습니까?')) {
//       try {
//         await axios.put(`/mypage/user/${userId}`, {
//           userId,
//           nickname,
//           phone: phoneNum,
//           address,
//           email,
//           password, // 필요한 경우 암호 필드도 포함
//         });
//         alert('수정되었습니다.');
//         window.location.reload();
//       } catch (error) {
//         console.error("Failed to update user info:", error);
//         alert('수정에 실패했습니다.');
//       }
//     }
//   };
//
//   return (
//       <>
//         <div className="root-wrap"> <Header /></div>
//         <div className="side-wrap">
//           <Sidebar />
//         </div>
//         <MyInfo>
//           <Title>회원 정보 수정</Title>
//           <Table>
//             <form id="info">
//               <table>
//                 <tbody>
//                 <tr>
//                   <td className="info-item">프로필 사진</td>
//                   <td>
//                     <input type="file" id="newProfilePic" style={{ fontSize: '11px' }} />
//                     <button style={{ fontSize: '11px', padding: '5px' }}>삭제</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">이름</td>
//                   <td>{userInfo.username}</td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">닉네임</td>
//                   <td>
//                     <input
//                         type="text"
//                         id="newNick"
//                         value={nickname}
//                         placeholder={userInfo.nickname}
//                         onChange={(e) => setNickname(e.target.value)}
//                     />
//                     <NicknameCheck onClick={canChangeNick}>중복확인</NicknameCheck>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">아이디</td>
//                   <td>{userInfo.userId}</td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">비밀번호</td>
//                   <td>
//                     <input type="password" id="password" value={password}
//                            onChange={(e) => setPassword(e.target.value)} />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">비밀번호 확인</td>
//                   <td>
//                     <input type="password" id="pwdCheck" value={pwdCheck}
//                            onChange={(e) => setPwdCheck(e.target.value)} />
//                     <NicknameCheck onClick={canChangePwd}>중복확인</NicknameCheck>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">주소</td>
//                   <td>
//                     <input
//                         type="text"
//                         id="newAddress"
//                         placeholder={userInfo.address}
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">이메일</td>
//                   <td>
//                     <input
//                         type="text"
//                         id="newEmail"
//                         placeholder={userInfo.email}
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="info-item">전화번호</td>
//                   <td>
//                     <input type="text" id="phoneNum" value={phoneNum} name="phoneNum"
//                            onChange={(e) => setPhoneNum(e.target.value)} />
//                   </td>
//                 </tr>
//                 </tbody>
//               </table>
//               <Edit onClick={canEdit}>수정</Edit>
//             </form>
//           </Table>
//         </MyInfo>
//       </>
//   );
// }
//
// // 스타일 컴포넌트 정의
// const MyInfo = styled.div`
//   margin-left: 400px;
//   margin-right: 50px;
//   justify-content: space-around;
// `;
//
// const Title = styled.div`
//   font-size: 20px;
//   display: inline-block;
// `;
//
// const Table = styled.div`
//   margin-top: 15px;
//   width: 85%;
// `;
//
// const Edit = styled.button`
//   margin-top: 10px;
//   font-size: 11px;
//   padding: 5px;
// `;
//
// const NicknameCheck = styled.button`
//   display: inline-block;
//   margin-left: 5px;
//   font-size: 11px;
//   padding: 5px;
// `;

