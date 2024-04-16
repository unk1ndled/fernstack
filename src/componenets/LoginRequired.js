import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Navbar } from "@nextui-org/react";
import Grid from "./Grid";
import { useNavigate } from "react-router-dom";
import { sleep } from "../functions/sleep";

const LoginRequired = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const mimir = async () => await sleep(500);
    mimir().then(() => {
      setLoad(false);
    });
  }, []);

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      {load ? (
        <div className="flex w-lvw h-lvh justify-center items-center" >    <CircularProgress color="secondary" label="Loading..." /></div>
      ) : (
        <>
          <div className="h-unit-2xl bg-black">
            <Grid>
              <div className="w-lvw flex flex-col justify-center items-center gap-11">
                <div className="font-extrabold font-mono text-8xl text-secondary-200">
                  Login first, okay?
                </div>
                <Button
                  className="text-4xl font-mono font-extralight text-danger-200"
                  onPress={login}
                  variant="light"
                  size="lg"
                  color="danger"
                >
                  my fault og
                </Button>
              </div>
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default LoginRequired;
