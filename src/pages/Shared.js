import React, { useEffect, useState } from "react";
import Nav from "../componenets/Nav";
import Grid from "../componenets/Grid";
import Icon from "../images/Coffre.gif";
import { saveAs } from 'file-saver';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { database } from "../config/firebase";
import { getDocs, query, where } from "firebase/firestore";
import JSZip from "jszip";

const Shared = () => {
  const location = useLocation();
  const user = location.pathname.split("/")[3];
  const folderId = location.pathname.split("/")[5];
  const [files, setFiles] = useState();


  const downloadFilesAsZip = async (files) => {
    const zip = new JSZip();
    for (const file of files) {
        try {
            const response = await fetch(file.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file.url}: ${response.statusText}`);
            }
            const blob = await response.blob();
            const fileName = file.name
            zip.file(fileName, blob);
        } catch (error) {
            console.error(`Failed to download ${file.url}:`, error);
            alert(`Failed to download ${file.url}: ${error.message}`);
            return;
        }
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${user}_shared_file.zip`);
};



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
            {/* <Image className="w-28" radius="sm" src={Icon} /> */}
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="h-full grid gap-2  grid-cols-5 overflow-y-auto scrollbar-hide">
              {files != undefined &&
                files.map((file, index) => (
                  <div className="flex items-center justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300  bg-neutral-950 rounded-md  border-neutral-700 border-1 w-[160px] h-[130px]">
                    <div className="flex flex-col justify-center items-center font-mono">
                      <div className="max-w-20 text-nowrap truncate">{file.name}</div>
                      <div>{file.formattedSize}</div>
                      <div>{file.type}</div>

                    </div>
                  </div>
                ))}
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between">
            <Link isExternal showAnchorIcon>
              Discover our service
            </Link>
            <Button onPress={()=>{downloadFilesAsZip(files)}} color="secondary" variant="faded">
              download
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    </>
  );
};

export default Shared;
