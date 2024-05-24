import { getStorage, ref, deleteObject } from "firebase/storage";
import { database, storage } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Coffre from "../images/Coffre.gif";
import Video from "../images/video.svg";
import Doc from "../images/file.svg";
import Pdf from "../images/pdf.svg";

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
  Button,
} from "@nextui-org/react";

import { Hand } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { updateStorage } from "../functions/updatestorage";
import styled, { keyframes } from "styled-components";


const File = ({ file, currentFolder, update }) => {
  const [pic, setPic] = useState();
  const { currentUser } = useAuth();
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    switch (file.type) {
      case "images":
        setPic(file.url);
        break;
      case "pdfs":
        setPic(Pdf);
        break;
      case "textfiles":
        setPic(Doc);
        break;
      case "videos":
        setPic(Video);
        break;
      default:
        setPic(Coffre);
    }
  }, [file]);

  const copyFileLink = ()=>{
    console.log(file.url)
  }

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

  //avrg gpt generated function
  const downloadFile = async () => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";

      xhr.onload = (event) => {
        const blob = xhr.response;
        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);
        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      };
      // Open the XMLHttpRequest with the file URL
      xhr.open("GET", file.url);

      // Send the XMLHttpRequest to initiate the download
      xhr.send();
    } catch (error) {
      console.error("Error downloading file : ", error);
    }
  };

  const openFileCard = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-md">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <Card shadow="sm" width="80%" maxWidth="800px">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt="File Preview"
              className="w-full object-cover h-[400px]"
              src={file.url}
            />
          </CardBody>
          <CardFooter className="text-center text-sm">
            <Button
              variant="flat"
              color="default"
              onPress={() => setShowCard(false)}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const copyLink = (fileUrl) => {
    navigator.clipboard
      .writeText(fileUrl)
      .then(() => {
        alert("File link copied to clipboard!");
      })
      .catch((error) => {
        alert("Failed to copy file link. Please try again.");
      });
  };

  return (
    <div>
      {showCard && openFileCard()}
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
            <CardFooter className="flex gap-2 text-sm justify-evenly">
              <b className="max-w-20 overflow-hidden">
                <MarqueeContainer>{file.name}</MarqueeContainer>
              </b>
              <p className="text-default-500 text-nowrap">
                {file.formattedSize}
              </p>
            </CardFooter>
          </Card>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Info" showDivider>
            <DropdownItem key="name" isDisabled>
              name : {file.name}
            </DropdownItem>
            <DropdownItem key="size" isDisabled>
              size : {file.size} bytes
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              key="open"
              description="Open file"
              onPress={() => {
                setShowCard(true); // Set showCard to true to display the card
              }}
            >
              Open File{" "}
            </DropdownItem>
            <DropdownItem
              key="copy"
              description="Copy the file link"
              onPress={() => {
                copyLink(file.url);
              }}
            >
              Copy link
            </DropdownItem>
            <DropdownItem
              key="download"
              description=""
              onPress={() => downloadFile()}
            >
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
    </div>
  );
};

const MarqueeAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const MarqueeContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${MarqueeAnimation} 5s linear infinite; /* Adjust duration as needed */
`;

export default File;
