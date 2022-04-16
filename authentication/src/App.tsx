import * as React from "react";
import { GoogleLogin } from "react-google-login";
import "./App.css";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/atom/user";

const App = () => {
  const [user, setUser] = useRecoilState(userState);

  const responseGoogle = (response: any) => {
    console.log(response);
    
    const { name, tokenId, email, imageUrl } = response.profileObj;
    setUser({
      name,
      isLoggedIn: true,
      userImage: imageUrl,
      email,
      isLoading: false,
    });
  };
  console.log(process.env);

  return (
    <div className="App">
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID ?? ""}
        buttonText="Login"
        className="mt-4 w-32 text-black"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn
      />
    </div>
  );
};
export default App;
