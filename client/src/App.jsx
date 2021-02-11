import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import styled from 'styled-components';
import Header from './components/header';
import { formatTimer } from './util/formatTimer';

const MainSection = styled.section`
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

const ErrorMessage = styled.section`
    margin-top: 40px;
    text-align: center;
`;

const App = () => {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [secondsNow, setDateSecondsNow] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Wouldn't live here in a real app
  const headers = {
    Authorization: token,
  };

  useEffect(() => {
    if (loggedIn) {
      const interval = setInterval(() => {
        setIsLoading(true);
        axios
          .get('http://localhost:3001/api/time', { headers })
          .then(response => {
            setDateSecondsNow(response.data.epoch);
          })
          .catch(error => {
            setErrorMessage(error);
          })
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (isLoading) {
    return (
      <ErrorMessage>
        <h2>Data loading...</h2>
      </ErrorMessage>
    )
  }

  if (errorMessage) {
    return (
      <ErrorMessage>
        <h2>{errorMessage}</h2>
      </ErrorMessage>
    )
  }

  return (
    <>
      <Header
        token={token}
        setToken={setToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setErrorMessage={setErrorMessage}
      />
      <MainSection className="split">
        <h2>Time</h2>
        <h3>{formatTimer(secondsNow)}</h3>
      </MainSection>
    </>
  );
};

export default App;
