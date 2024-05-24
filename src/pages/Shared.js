import React, { useEffect, useState } from "react";
import Nav from "../componenets/Nav";
import Grid from "../componenets/Grid";
import Icon from "../images/Coffre.gif";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { database } from "../config/firebase";
import { getDocs, query, where } from "firebase/firestore";

const Shared = () => {
  const location = useLocation();
  const user = location.pathname.split("/")[3];
  const folderId = location.pathname.split("/")[5];
  const [files, setFiles] = useState();

  useEffect(() => {
    const fetchitems = async () => {
      const q = query(database.files, where("folderId", "==", folderId));
      const querySnapshot = await getDocs(q);
      setFiles(querySnapshot.docs.map(database.formatDoc));
    };
    fetchitems();
    return () => {};
  }, []);
  // http://localhost:3000/shared/users/unkindled/folders/folderid
  console.log(files);

  return (
    <>
      <Nav></Nav>
      <Grid>
        <Card className="min-w-9/12">
          <CardHeader className="flex justify-between gap-3">
            <div className="flex font-mono flex-col  gap-2">
              <p className="text-md text-default-500">
                shared ressource from :
              </p>
              <div className="flex flex-row gap-4">
                <p className=" uppercase font-black text-secondary-500 text-7xl">
                  {user}
                </p>
                <p className=" self-end text-default-500 text-2xl">
                  is it a mimic ?
                </p>
              </div>
            </div>
            <Image className="w-28" radius="sm" src={Icon} />
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="h-full grid gap-2  grid-cols-5 overflow-y-auto scrollbar-hide">
              {files != undefined &&
                files.map((file, index) => (
                  <div className="flex items-center justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300  bg-neutral-950 rounded-md  border-neutral-700 border-1 w-[160px] h-[130px]">
                    <div >
                      <div>{file.name}</div>
                      <div>{file.formattedSize}</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon>
              Discover our service
            </Link>
          </CardFooter>
        </Card>
      </Grid>
    </>
  );
};

export default Shared;
