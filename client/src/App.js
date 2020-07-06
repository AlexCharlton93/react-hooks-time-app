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

const calculateTimeDifference = (serverTime, setTimeDifference) => {
    const clientDate = new Date();
    const serverDate = serverTime * 1000;
    const secondsDifference = (clientDate - serverDate) / 1000;
    setTimeDifference(
        new Date(secondsDifference * 1000).toISOString().substr(11, 8)
    );
};

// Commented this code out, was an attempt to increment timer by 1 second,
// Didn't manage to get functional under time constraints

// const updateTimer = (serverTime, setTimeDifference) => {
//     setTimeDifference(formatTimer(Date.now() - serverTime * 1000));
// };

// const formatTimer = (seconds) => {
//     const s = ("0" + Math.floor((seconds / 1000) % 60)).substr(-2);
//     const m = ("0" + Math.floor((seconds / (60 * 1000)) % 60)).substr(-2);
//     const h = ("0" + Math.floor(seconds / (60 * 60 * 1000)));
//     return h + ":" + m + ":" + s;
// };

const App = () => {
    const [serverTime, setServerTime] = useState("");
    const [refreshInterval, setRefreshInterval] = useState(0);
    const [timeDifference, setTimeDifference] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    var headers = {
        Authorization: token,
    };

    useEffect(() => {
        if (loggedIn && !errorMessage) {
            const intervalId = setInterval(() => {
                axios
                    .get("http://localhost:3001/api/time", { headers })
                    .then(function (response) {
                        console.log("hit");
                        setServerTime(response?.data?.epoch);
                        setRefreshInterval(30000);
                        setErrorMessage(undefined);

                        // Show time difference from client and server
                        calculateTimeDifference(
                            response?.data?.epoch,
                            setTimeDifference
                        );
                    })
                    .catch(function (error) {
                        setErrorMessage(
                            "You do not have permission to view this data"
                        );
                    })
                    .finally(function () {
                        setIsLoading(false);
                    });
            }, refreshInterval);
            return () => clearInterval(intervalId);
        }
    }, [headers, refreshInterval, serverTime, token, loggedIn, errorMessage]);

    // useEffect(() => {
    //     if (loggedIn && refreshInterval > 1000) {
    //         const interval = setInterval(() => {
    //             updateTimer(serverTime, setTimeDifference);
    //         }, 1000);
    //         return () => clearInterval(interval);
    //     }
    // }, [refreshInterval, loggedIn, serverTime]);

    return (
        <>
            <Header
                token={token}
                setToken={setToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setErrorMessage={setErrorMessage}
            />
            {!isLoading && !errorMessage && loggedIn && (
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
            {errorMessage && loggedIn && (
                <ErrorMessage>
                    <h2>{errorMessage}</h2>
                </ErrorMessage>
            )}
        </>
    );
};

export default App;
