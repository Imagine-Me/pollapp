import { Button, Typography } from "antd";
import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface RightSideContentProps {
  isLoggedIn: boolean;
  name: string;
  responseGoogle: (res: any) => void;
}

const { Title } = Typography;

const GoogleLoginStyled = styled((props) => {
  return <GoogleLogin {...props} />;
})`
  width: 120px;
`;

const RightSideContainer = styled((props) => {
  return <div {...props} />;
})`
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 120px;
  @media (max-width: 1020px) {
    display: none;
  }
`;
export const RightSideContent = ({
  isLoggedIn,
  name,
  responseGoogle,
}: RightSideContentProps) => {
  return (
    <>
      <Typography style={{ marginBottom: "20px" }}>
        <Title level={3}>
          {isLoggedIn
            ? `Hi ${name}, go to profile to create poll`
            : "Login to create your own poll."}
        </Title>
      </Typography>
      {isLoggedIn ? (
        <Link to="/user/polls">
          <Button size="large" shape="round" type="primary">
            PROFILE
          </Button>
        </Link>
      ) : (
        <GoogleLoginStyled
          clientId={process.env.GOOGLE_CLIENT_ID ?? ""}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn
        />
      )}
    </>
  );
};
export default RightSideContainer;
