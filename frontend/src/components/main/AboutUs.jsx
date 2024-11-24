import React from "react";
import styled from "styled-components";
import { FaComments, FaBullhorn, FaInfoCircle, FaClipboardList, FaStar } from "react-icons/fa"; // 아이콘 추가

// 스타일 정의
const AboutWrapper = styled.div`
    padding: 50px 20px;
    background-color: #f7f7f7;
    color: #333;
    font-family: Arial, sans-serif;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 50px;
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: bold;
    color: #2f4f4f; /* 짙은 녹색 */
    margin-bottom: 10px;
`;

const Subtitle = styled.h3`
    font-size: 1.5em;
    color: #555;
`;

const Content = styled.div`
    max-width: 900px;
    margin: 0 auto;
    text-align: left;
    font-size: 1.2em;
    line-height: 1.8em;
    color: #333;
    margin-bottom: 50px;
`;

const Highlight = styled.span`
    color: #2f4f4f; /* 짙은 녹색 */
    font-weight: bold;
`;

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 30px;
`;

const FeatureCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;

    h4 {
        font-size: 1.2em;
        color: #2f4f4f;
        margin: 15px 0;
    }

    p {
        font-size: 0.9em;
        color: #555;
        margin-top: 10px;
    }

    svg {
        font-size: 2em;
        color: #2f4f4f; /* 짙은 녹색 */
    }
`;

const ServiceSection = styled.div`
    max-width: 900px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        font-size: 1.5em;
        color: #2f4f4f;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.1em;
        line-height: 1.8em;
        color: #555;
    }

    ul {
        margin-top: 20px;
        list-style: disc;
        padding-left: 20px;
    }

    ul li {
        font-size: 1.1em;
        margin-bottom: 10px;
        color: #555;
    }
`;

const TechStackWrapper = styled.div`
    margin: 50px auto;
    max-width: 900px;
    text-align: left;
    font-size: 1.2em;
`;

const TechStackItem = styled.div`
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #555;
    display: flex;
    align-items: center;

    &::before {
        content: "✔";
        margin-right: 10px;
        color: #2f4f4f;
    }
`;

const Footer = styled.div`
    margin-top: 50px;
    text-align: center;
    font-size: 0.9em;
    color: #666;
`;

function AboutUs() {
    return (
        <AboutWrapper>
            <Header>
                <Title>TOWN-IN (사람인)</Title>
                <Subtitle>지역 커뮤니티 플랫폼</Subtitle>
            </Header>

            <Content>
                <p>
                    <Highlight>comTown</Highlight> 팀은 <Highlight>Computer</Highlight>와 <Highlight>마을</Highlight>의 결합을 의미하며,
                    지역 커뮤니티와 기술을 융합한 새로운 가능성을 제시합니다.
                </p>
                <p>
                    <Highlight>동덕여자대학교 창업동아리</Highlight>의 컴퓨터학과 학생 5명이 함께한 프로젝트로,
                    지역 주민들이 정보를 공유하고 소통하며 커뮤니티를 형성할 수 있도록 돕는 <Highlight>TOWN-IN</Highlight>을 개발했습니다.
                </p>
            </Content>

            <FeatureGrid>
                <FeatureCard>
                    <FaComments />
                    <h4>자유 게시판</h4>
                    <p>사용자들이 자유롭게 의견을 나누고 소통할 수 있는 공간</p>
                </FeatureCard>

                <FeatureCard>
                    <FaInfoCircle />
                    <h4>정보 게시판</h4>
                    <p>지역 정보를 공유하고, 최신 소식을 빠르게 확인</p>
                </FeatureCard>

                <FeatureCard>
                    <FaBullhorn />
                    <h4>홍보 게시판</h4>
                    <p>지역 이벤트 및 홍보글을 통해 경제적 연결 강화</p>
                </FeatureCard>

                <FeatureCard>
                    <FaClipboardList />
                    <h4>내 활동 관리</h4>
                    <p>내가 작성한 댓글, 게시물을 쉽게 확인하고 관리</p>
                </FeatureCard>

                <FeatureCard>
                    <FaStar />
                    <h4>스크랩 기능</h4>
                    <p>관심 있는 게시물을 저장하여 나중에 다시 확인</p>
                </FeatureCard>
            </FeatureGrid>

            <ServiceSection>
                <h3>왜 TOWN-IN을 만들었나요?</h3>
                <p>
                    유명한 지역 기반 서비스는 대개 <Highlight>커뮤니티가 부속 기능</Highlight>에 불과합니다.
                    메인으로 커뮤니티를 다루는 경우는 거의 없으며, 지역 주민 간의 소통이 제한적입니다.
                </p>
                <p>
                    이에 착안하여 <Highlight>TOWN-IN</Highlight>은 커뮤니티를 <Highlight>메인</Highlight>으로 설정한
                    플랫폼을 만들었습니다. 대학교 커뮤니티 애플리케이션인 <Highlight>에브리타임(에타)</Highlight>처럼,
                    지역 주민들에게 정보를 공유하고 자유롭게 의견을 나눌 수 있는 공간을 제공합니다.
                </p>
                <ul>
                    <li>지역 주민 간의 실시간 소통과 연결</li>
                    <li>커뮤니티 중심의 지역 경제 활성화</li>
                    <li>지역 정보를 빠르게 공유할 수 있는 효율적인 플랫폼</li>
                </ul>
            </ServiceSection>

            <TechStackWrapper>
                <h3>기술 스택</h3>
                <TechStackItem>Spring Boot로 백엔드 개발 및 REST API 제공</TechStackItem>
                <TechStackItem>AWS S3를 활용한 이미지 및 파일 저장</TechStackItem>
                <TechStackItem>Redis를 사용한 세션 관리 및 캐싱</TechStackItem>
                <TechStackItem>AWS RDS(MySQL)를 사용한 데이터베이스 구축</TechStackItem>
                <TechStackItem>React를 사용한 프론트엔드 개발</TechStackItem>
                <TechStackItem>Styled-components로 깔끔한 UI 구현</TechStackItem>
            </TechStackWrapper>

            <Footer>© 2024 TOWN-IN by comTown Team. All Rights Reserved.</Footer>
        </AboutWrapper>
    );
}

export default AboutUs;
