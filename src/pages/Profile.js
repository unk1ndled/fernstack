import { useState } from "react";
import {
  Spacer,
  Image,
  Divider,
  Card,
  Tooltip,
  CardBody,
  CircularProgress,
  CardFooter,
  Button,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import Pfp from "../images/frerein.jpg";
import React, { useEffect } from "react";
import { sleep } from "../functions/sleep";
import NavUser from "../componenets/NavUser";
import { useAuth } from "../contexts/AuthContext";
import ProfileModal from "../componenets/ProfileModal";
import LoginRequired from "../componenets/LoginRequired";
import { getmaxstorage } from "../functions/getmaxstorage";
import { getusedstorage } from "../functions/getusedstorage";

const Profile = () => {
  const { currentUser } = useAuth();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [usedStorage, setUsedStorage] = useState(0);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const Upload = () => {
    onOpen();
    // console.log("hi");
    //setLoading(true);
  };

  useEffect(() => {
    const initused = async () => {
      setUsedStorage(await getusedstorage(currentUser.uid));
    };
    sleep(500).then(() => {
      initused();
    });
  }, [currentUser]);

  useEffect(() => {
    setValue((usedStorage / getmaxstorage()) * 100);
  }, [usedStorage]);

  const reRenderBod = () => {
    window.location.reload();
  };

  return (
    <>
      {currentUser.uid ? (
        <div className=" flex flex-col items-center">
          <NavUser></NavUser>
          <Spacer y={7} />
          <div className="p-4 flex items-center justify-evenly min-h-unit-8xl w-10/12 bg-neutral-950 rounded-lg border-neutral-900 border- border-2">
            <div className="text-3xl font-mono text-secondary flex flex-col items-center w-80  ">
              <div className="text-neutral-600">Hi again</div>
              <Spacer y={3} />
              <Tooltip placement="bottom" content="update name">
                <Image
                  isPressable
                  radius="full"
                  className=" h-80  object-cover"
                  src={
                    currentUser && currentUser.photoURL
                      ? currentUser.photoURL
                      : Pfp
                  }
                />
              </Tooltip>
              <ProfileModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                update={reRenderBod}
              ></ProfileModal>
              <Spacer y={3} />
              <Tooltip placement="bottom" content="update profile">
                <Card
                  isPressable
                  onPress={Upload}
                  className=" text-secondary flex flex-col items-center p-2"
                >
                  <div>{currentUser.displayName}</div>
                </Card>
              </Tooltip>
            </div>
            <Spacer x={1} />
            <Divider className="h-52" orientation="vertical" />
            <Spacer x={1} />
            <div className="flex flex-col gap-10 w-7/12">
              <Card className=" h-unit-72 ">
                <CardBody className="justify-center items-center pb-0">
                  <CircularProgress
                    classNames={{
                      svg: "w-36 h-36 drop-shadow-md",
                      indicator: "stroke-secondary",
                      track: "stroke-secondary/10",
                      value: "text-3xl font-semibold text-secondary",
                    }}
                    value={value}
                    strokeWidth={4}
                    showValueLabel={true}
                  />
                </CardBody>
                <CardFooter className="justify-center items-center pt-0">
                  <Chip
                    classNames={{
                      base: "border-1 border-secondary/30",
                      content: "text-secondary/90 text-small font-semibold",
                    }}
                    variant="bordered"
                  >
                    {Math.floor(usedStorage/1024)} kilo bytes used
                  </Chip>
                </CardFooter>
              </Card>
              <Button color="danger" variant="light">
                reset storage
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <LoginRequired></LoginRequired>
      )}
    </>
  );
};

export default Profile;
