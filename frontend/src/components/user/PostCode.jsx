import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const scriptUrl =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const Postcode = ({ onAddressChange }) => {
  const [address, setAddress] = useState("");
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    onAddressChange(fullAddress);
    console.log(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div>
      <button className="addressButton" type="button" onClick={handleClick}>
        주소 검색
      </button>
    </div>
  );
};

export default Postcode;
