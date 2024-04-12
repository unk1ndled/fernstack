import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Divider, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../utils/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../utils/EyeSlashFilledIcon ";
import { FcGoogle } from "react-icons/fc";
import Icon from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmedRef = useRef();
  const [error, setError] = useState();

  const { signup, signInWithGoogle } = useAuth();
  console.log(error);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError();
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      alert("An error occurred while creating your account.")
      setError(error.code);
    }
  }

  const signInWithPopUp = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen max-w-full max-h-full ">
      <div className="flex flex-row w-4/5 h-4/5  gap-4  ">
        <div className="flex flex-col w-1/2 h-full  mt-8">
          <Logo src={Icon}></Logo>
          <p className=" text-4xl font-bold text-white mt-10 ">
            Choubik loubik Mimic bin Idik
          </p>
        </div>

        <Divider orientation="vertical"></Divider>
        <div className="flex items-center flex-col w-1/2 h-full ml- mt-12 gap-8 ">
          <Input
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className="w-2/3 mt-8 "
            ref={emailRef}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            ref={passwordRef}
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

          <Input
            label=" Password Confirmation"
            variant="bordered"
            placeholder="Confirm your password"
            ref={passwordConfirmedRef}
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
          <Button
            className="w-1/3"
            color="primary"
            variant="shadow"
            onClick={handleSubmit}
          >
            Register
          </Button>

          <Link to="/" className=" text-blue-600 underline">
            Nah i'm good😎
          </Link>

          <Divider className="mt-8 mb-8 w-2/3"></Divider>

          <Button
            onClick={signInWithPopUp}
            className=" w-2/5 h-12"
            color="primary"
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
  height: 30%;
  width: 30%;
  margin-left: 4rem;
  margin-top: 4rem;
`;

export default SignUp;
