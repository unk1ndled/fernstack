import React from "react";
import { Button } from "@nextui-org/react";
import Grid from "./Grid";
import { useNavigate } from "react-router-dom";

const LoginRequired = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="h-unit-2xl bg-black"></div>
      <Grid>
        <div className="w-lvw  flex flex-col justify-center items-center gap-11">
          <div className="font-extrabold font-mono text-8xl text-secondary-200">
            Login first ok?
          </div>
          <Button className = "text-4xl font-mono font-extralight text-danger-200" onPress={login} variant="light" size="lg" color="danger">
            my fault og
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default LoginRequired;
