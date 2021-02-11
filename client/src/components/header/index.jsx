import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.section`
    padding: 10px;
    background: #3b5998;
    height: 75px;
    form {
        margin-right: 50px;
        display: inline-flex;

        input[type="text"] {
            margin-top: 5px;
            height: 40px;
        }

        button {
            margin-top: 5px;
            height: 40px;
            margin-left: 10px;
        }
    }
`;

const Submit = async (event, token, setLoggedIn) => {
  event.preventDefault();
  setLoggedIn(true);
};

const Logout = async (event, setLoggedIn, setErrorMessage) => {
  event.preventDefault();
  setLoggedIn(false);
  setErrorMessage(undefined);
};

const Header = ({
  token,
  setToken,
  loggedIn,
  setLoggedIn,
  setErrorMessage
}) =>{
  return (
    <HeaderWrapper>
      <Form className="float-right">
        {!loggedIn ? (
          <>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Access Token"
                onChange={(e) => setToken(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={(e) => Submit(e, token, setLoggedIn)}
              ariant="primary"
              type="submit"
            >
              Login
            </Button>
          </>
        ) : (
          <Button
            onClick={(e) => Logout(e, setLoggedIn, setErrorMessage)}
            ariant="primary"
            type="submit"
          >
            Log out
          </Button>
        )}
      </Form>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default Header;
