import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import styled from "styled-components";
import Header from "./components/header";

const LeftSection = styled.section`
    left: 0;
    background-color: #00000;

    h3 {
        margin-top: 20px;
        font-size: 45px;
        font-weight: 700;
    }
    h4 {
        font-size: 40px;
    }
`;

const RightSection = styled.section`
    right: 0;
    background-color: #d3d3d3;
`;

const ErrorMessage = styled.section`
    margin-top: 40px;
    text-align: center;
`;

const App = () => {
    const [serverTime, setServerTime] = useState("0000000000");
    const [timeDifference, SetTimeDifference] = useState("00:00:00");
    const [errorMessage, SetErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    var headers = {
        Authorization: token,
    };

    useEffect(() => {
        if (loggedIn) {
            axios
                .get("http://localhost:3001/api/time", { headers })
                .then(function (response) {
                  console.log('hit')
                    setServerTime(response?.data?.epoch);
                })
                .catch(function (error) {
                    SetErrorMessage(
                        "You do not have permission to view this data"
                    );
                })
                .finally(function () {
                    setIsLoading(false);
                });
        }
    }, [serverTime, token, loggedIn]);

    return (
        <>
            <Header
                token={token}
                setToken={setToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
            />
            {!isLoading && !errorMessage && (
                <>
                    <LeftSection className="split">
                        <h2>Time</h2>
                        <h3>{serverTime}</h3>
                        <h4>{timeDifference}</h4>
                    </LeftSection>
                    <RightSection className="split">
                        <h2>Metrics</h2>
                    </RightSection>
                </>
            )}
            {!loggedIn && (
                <ErrorMessage>
                    <h2>Please enter an access token to view the data</h2>
                </ErrorMessage>
            )}
            {loggedIn && isLoading && (
                <ErrorMessage>
                    <h2>Data loading...</h2>
                </ErrorMessage>
            )}
            {errorMessage && (
                <ErrorMessage>
                    <h2>{errorMessage}</h2>
                </ErrorMessage>
            )}
        </>
    );
};

export default App;
