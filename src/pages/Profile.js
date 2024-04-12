import React from "react";
import NavUser from "../componenets/NavUser";
import { Spacer, Image, Divider, Card, Tooltip } from "@nextui-org/react";
import Pfp from "../images/frerein.jpg";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <div className=" flex flex-col items-center">
      <NavUser></NavUser>
      <Spacer y={7} />
      <div className="p-4 flex items-center min-h-unit-8xl w-10/12 bg-neutral-950 rounded-lg border-neutral-900 border- border-2">
        <div className="text-3xl font-mono text-secondary flex flex-col items-center w-80  ">
          <div className="text-neutral-600">Hi again</div>
          <Spacer y={3} />
          <Tooltip placement="bottom" content="update name">
            <Image
              isPressable
              radius="full"
              className=" h-80  object-cover"
              src={
                currentUser && currentUser.photoURL ? currentUser.photoURL : Pfp
              }
            />
          </Tooltip>
          <Spacer y={3} />

          <Tooltip placement="bottom" content="update profile">
            <Card
              isPressable
              className=" text-secondary flex flex-col items-center p-2"
            >
              <div>{currentUser.displayName}</div>
            </Card>
          </Tooltip>
        </div>
        <Spacer x={6} />
        <Divider className="h-52" orientation="vertical" />
      </div>
    </div>
  );
};

export default Profile;
