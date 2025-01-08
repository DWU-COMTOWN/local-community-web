import { useNavigate, Routes, Route  } from "react-router-dom";
import styled from "styled-components";
import '../../css/Main.css';
import MainTitle from "../../components/main/MainTitle";
import MainMenu from "../../components/main/MainMenu";
import MainBoard from "../../components/main/MainBoard";
import BestBoard from "../../components/main/BestBoard";
import LeftMenu from "../../components/main/LeftMenu";

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 1%;
`;

const StyledHr = styled.hr`
    margin: 8px 0; /* 위아래 간격 */
    border: 1px solid #ccc; /* 선 스타일 */
`;

function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    return (
        <>
            <MainTitle />
            <StyledHr />
            <MainMenu />
            <StyledHr />
            <ContentWrapper>
                <LeftMenu />
                <MainBoard />
                <BestBoard />
            </ContentWrapper>
        </>
    );
}

export default MainPage;