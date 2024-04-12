import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Divider, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../utils/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../utils/EyeSlashFilledIcon ";
import { FcGoogle } from "react-icons/fc";
import Icon from "../images/logo.svg";
import { auth, googleProvider } from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState();

  const { login, signInWithGoogle } = useAuth();
  console.log(error);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError();
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/treasure");
    } catch (error) {
      setError("An error occurred while verifying your account.");
    }
  }

  const signInWithPopUp = async () => {
    try {
      await signInWithGoogle();
      navigate("/treasure");
    } catch (e) {
      setError("An error occurred while verifying your account.");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen max-w-full max-h-full ">
      <div className="flex flex-row w-4/5 h-4/5  gap-4  mr-4">
        <div className="flex justify-center items-center flex-col w-1/2 h-full pr-8 ">
          <Logo src={Icon}></Logo>
          <p className=" text-5xl text-neutral-200 text-center font-bold mt-10 ">
            Choubik Loubik
            <p style={{ color: "#9455d3" }}>Mimic</p>
            Bin Idik
          </p>
        </div>

        <Divider orientation="vertical"></Divider>
        <div className="flex items-center flex-col w-1/2 h-full ml- mt-12 gap-8 ">
          <p
            className="  text-4xl font-semibold -mt-16"
            style={{ color: "#9455d3" }}
          >
            Login
          </p>
          <Input
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className="w-2/3 mt-8 "
            isInvalid={error ? true : false}
            ref={emailRef}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            ref={passwordRef}
            isInvalid={error ? true : false}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon
                    EyeFilledIcon
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-2/3"
          />

          {error && (
            <p className=" -mt-5" style={{ color: "#f01362" }}>
              Please Enter valid Data
            </p>
          )}

          <Button
            onClick={handleSubmit}
            className="w-1/3"
            color="secondary"
            variant="shadow"
          >
            Login now !
          </Button>
          <Link to="/register">i don't have an account😥</Link>

          <Divider className="mt-8 mb-8 w-2/3"></Divider>

          <Button
            onClick={signInWithPopUp}
            className=" w-2/5 h-12"
            color="secondary"
            variant="ghost"
            startContent={<FcGoogle />}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

const Logo = styled.img`
  height: 40%;
  width: 40%;
`;

export default Login;
