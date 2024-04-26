import React, { useEffect, useState } from "react";
import Coffre from "../images/Coffre.gif";
import Doc from "../images/file.svg";
import Pdf from "../images/pdf.svg";
import Video from "../images/video.svg";
import { database, storage } from "../config/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

import { ROOT_FOLDER } from "../hooks/useFolder";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardFooter,
  Image,
  DropdownSection,
} from "@nextui-org/react";
import { Hand } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { updateStorage } from "../functions/updatestorage";

const KILO_BYTE = 1024;

const File = ({ file, currentFolder, update }) => {
  const [pic, setPic] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    switch (file.type) {
      case "images":
        return setPic(file.url);
      case "pdfs":
        return setPic(Pdf);
      case "textfiles":
        return setPic(Doc);
      case "videos":
        return setPic(Video);
      default:
        return setPic(Coffre);
    }
  }, [file]);

  const deleteFile = async () => {
    try {
      await deleteDoc(doc(database.files, file.id));
      const fileRef = ref(storage, file.url);
      await deleteObject(fileRef)
        .then(() => {
          updateStorage("subtract", file.size, currentUser.uid).then(() => {
            update();
          });
        })
        .catch((error) => {
          alert("Service error XoX");
        });
    } catch (error) {
      // console.error("Error deleting file:", error);
    }
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Card shadow="sm" isPressable>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={file.name}
              className="w-full object-cover h-[140px]"
              src={pic}
            />
          </CardBody>
          <CardFooter className="text-sm justify-evenly">
            <b
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name}
            </b>
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="text-default-500"
            >
              {Math.floor(file.size / KILO_BYTE)} kb
            </p>
          </CardFooter>
        </Card>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions" showDivider>
          <DropdownItem key="open">Open file</DropdownItem>
          <DropdownItem key="copy" description="Copy the file link">
            Copy link
          </DropdownItem>
          <DropdownItem key="download" description="">
            Download File
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            onPress={() => deleteFile()}
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default File;
