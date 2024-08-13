import { useNavigate } from "react-router-dom";
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

function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    return (
        <>
            <MainTitle />
            <hr/>
            <MainMenu />
            <ContentWrapper>
                <LeftMenu />
                <MainBoard />
                <BestBoard />
            </ContentWrapper>
        </>
    );
}

export default MainPage;