import React, { useState } from "react";
import "./App.scss";
import styled from "styled-components";
import Header from "./components/header";

const LeftSection = styled.section`
    left: 0;
    background-color: #00000;

    h3 {
        font-size: 70px;
        font-weight: 700;
    }
`;

const RightSection = styled.section`
    right: 0;
    background-color: #d3d3d3;
`;

function App() {
    const [serverTime, setServerTime] = useState("0000000000");
    const [timeDifference, SetTimeDifference] = useState("00:00:00");

    return (
        <>
            <Header />
            <LeftSection className="split">
                <h2>Time</h2>
                <h3>{serverTime}</h3>
                <h4>{timeDifference}</h4>
            </LeftSection>
            <RightSection className="split">
                <h2>Metrics</h2>
            </RightSection>
        </>
    );
}

export default App;
