import React, { useState } from "react";
import axios from "axios";
import "../../css/SignUp.css";
import Postcode from "../../components/user/PostCode";

export default function SignUp() {

  // 초기값
  const emailList = ["gmail.com", "naver.com", "hanmail.net", "daum.net"];
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState(emailList[0]);

  // 오류메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwCheckMessage, setPwCheckMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPhone1, setIsPhone1] = useState(false);
  const [isPhone2, setIsPhone2] = useState(false);
  const [isPhone3, setIsPhone3] = useState(false);

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,25}$/;

    if(!idRegExp.test(currentId)){
      setIdMessage("대소문자 또는 숫자를 이용하여 4~25자리를 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("");
      setIsId(true);
    }
  };

  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const PwRegExp =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if(!PwRegExp.test(currentPw)) {
      setPwMessage("숫자, 영문자, 특수문자를 조합하여 8자리 이상을 입력해주세요.");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  const onChangePwCheck = (e) => {
    const currentPwCheck = e.target.value;
    setPwCheck(currentPwCheck);
    if(pw !== currentPwCheck) {
      setPwCheckMessage("비밀번호가 일치하지 않습니다.");
      setIsPwCheck(false);
    } else {
      setPwCheckMessage("비밀번호가 일치합니다.");
      setIsPwCheck(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    const nameRegExp = /^[a-zA-Z|ㄱ-ㅎ가-힣 ]*$/;

    if(!nameRegExp.test(currentName)) {
      setNameMessage("한글과 영문만을 입력해주세요.")
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onChangePhone1 = (e) => {
    const currentPhone = e.target.value;
    setPhone1(currentPhone);
    const phoneRegExp = /^[0-9]{2,3}$/;

    if(!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("양식이 올바르지 않습니다.");
      setIsPhone1(false);
    } else {
      setPhoneMessage("");
      setIsPhone1(true);
    }
  };

  const onChangePhone2 = (e) => {
    const currentPhone = e.target.value;
    setPhone2(currentPhone);
    const phoneRegExp = /^[0-9]{3,4}$/;

    if(!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("양식이 올바르지 않습니다.");
      setIsPhone2(false);
    } else {
      setPhoneMessage("");
      setIsPhone2(true);
    }
  };

  const onChangePhone3 = (e) => {
    const currentPhone = e.target.value;
    setPhone3(currentPhone);
    const phoneRegExp = /^[0-9]{3,4}$/;

    if(!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("양식이 올바르지 않습니다.");
      setIsPhone3(false);
    } else {
      setPhoneMessage("");
      setIsPhone3(true);
    }
  };

  const handleAddressChange = (address) => {
    setAddress(address);
  };

  const handleEmailSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleSignUp = async () => {
    const signUpData = {
      userId: id,
      password: pw,
      passwordCheck: pwCheck,
      username: name,
      address,
      phone: `${phone1}-${phone2}-${phone3}`,
      email: `${email}@${selected}`,
      nickname: nickname,
    };
    console.log(signUpData);

    try {
      const response = await axios.post("/jwt-login/join", signUpData);
      if (response.data === "회원가입 성공") {
        window.location.href = "/jwt-login/login";
      } else {
        console.error("회원가입 실패:", response.data);
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
      <div className="signupPage">
        <div className="titleWrap">회원가입</div>
        <div className="signup_contentWrap">
          <div className="signup_inputTitle">아이디</div>
          <div className="signup_inputWrap">
            <input type="text" className="input" value={id} onChange={onChangeId} />
            <button className="checkButton">중복 확인</button>
          </div>
          <div className="errorMessage">{idMessage}</div>

          <div className="signup_inputTitle">비밀번호</div>
          <div className="signup_inputWrap">
            <input type="password" className="input" value={pw} onChange={onChangePw} />
          </div>
          <div className="errorMessage">{pwMessage}</div>

          <div className="signup_inputTitle">비밀번호 확인</div>
          <div className="signup_inputWrap">
            <input type="password" className="input" value={pwCheck} onChange={onChangePwCheck} />
          </div>
          <div className="errorMessage">{pwCheckMessage}</div>

          <div className="signup_inputTitle">이름</div>
          <div className="signup_inputWrap">
            <input type="text" className="input" value={name} onChange={onChangeName} />
          </div>
          <div className="errorMessage">{nameMessage}</div>

          <div className="signup_inputTitle">닉네임</div>
          <div className="signup_inputWrap">
            <input type="text" className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>

          <div className="signup_inputTitle">주소 검색</div>
          <div className="addressWrap">
            <div className="signup_addressInputWrap">
              <input type="text" className="input" readOnly value={address} />
            </div>
            <Postcode onAddressChange={handleAddressChange} />
          </div>

          <div className="signup_inputTitle">전화번호</div>
          <div>
            <div className="signup_phoneInputWrap">
              <input type="text" className="input" maxLength={3}
                     onChange={onChangePhone1} />
            </div>
            &nbsp;-&nbsp;
            <div className="signup_phoneInputWrap">
              <input type="text" className="input" maxLength={4}
                     onChange={onChangePhone2} />
            </div>
            &nbsp;-&nbsp;
            <div className="signup_phoneInputWrap">
              <input type="text" className="input" maxLength={4}
                     onChange={onChangePhone3} />
            </div>
          </div>
          <div className="errorMessage">{phoneMessage}</div>

          <div className="signup_inputTitle">이메일</div>
          <div className="signup_emailWrap">
            <div className="signup_emailInputWrap">
              <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div> &nbsp;@&nbsp;
            <div className="signup_emailList">
              <select className="selectEmailWrap" onChange={handleEmailSelect} value={selected}>
                {emailList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <button className="joinButton" onClick={handleSignUp}>가입하기</button>
        </div>
      </div>
  );
}