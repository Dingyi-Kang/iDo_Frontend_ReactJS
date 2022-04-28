import { useRef, useState, useEffect } from "react";
import api from "../Helper/api";
import { useNavigate } from "react-router-dom";
import {Button} from 'antd'

const Login = ({setLoginStatus, setUserAccount}) => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  let navigation = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(
        `/user/${user}`,
        {
          userName:user,
          password:pwd
        }
      );
      console.log(response?.data);
      if (response?.data===null){
        setErrMsg("No Such Account");
      }else if (response?.data.password !== pwd){
        setErrMsg("Wrong Passord");
      }
      else{
      setUser("");
      setPwd("");
      setLoginStatus(true)
      setUserAccount(userAccount=>({
        ...userAccount,
        ...response?.data
      }));
    }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 404) {
        setErrMsg("No Such Account");
      } 
      else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <main className="RegisterContainer">
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label style={{marginBottom: '10px'}} htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label style={{marginBottom: '10px'}} htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button className="button2">Sign In</button>
            </form>
            <p>
              
              <Button type="link" onClick={() => navigation('/register')}>Need an Account?</Button>
              <br />
              <span className="line">
                <Button type="link" onClick={() => navigation('/register')}>Sign Up</Button>
              </span>
            </p>
          </section>
      </main>
    </>
  );
};

export default Login;
