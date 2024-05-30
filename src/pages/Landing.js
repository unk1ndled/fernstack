import React from "react";
import Nav from "../componenets/Nav";
import Filepic from "../images/file.svg";
import Folder from "../images/frefolder.svg";
import Preview from "../images/preview.gif";
import Share from "../images/share.png";
import Free from "../images/free.jpg";

import Grid from "../componenets/Grid";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

const Landing = () => {
  return (
    <>
      <Nav></Nav>
      <Grid>
        {/* <div className="flex ">
          <div className="text-7xl font-mono text-center">
            A treasure that's just for you{" "}
          </div>
        </div> */}
        <div className="max-w-[900px]  m-3 gap-5 grid grid-cols-12 grid-rows-2 px-8">
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                store
              </p>
              <h4 className="text-white font-medium text-large">
                Upload files
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={Filepic}
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                store
              </p>
              <h4 className="text-white font-medium text-large">
                Upload Folders
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={Folder}
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                view
              </p>
              <h4 className="text-white font-medium text-large">
                Preview uploaded items
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={Preview}
            />
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-white bg-slate-950 font-medium text-2xl">
                Share with your friends
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={Share}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                try now
              </Button>
            </CardFooter>
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Gift
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                FREE 200mb for new users
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={Free}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <Button radius="full" size="sm">
                Get App
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Grid>
    </>
  );
};

export default Landing;
