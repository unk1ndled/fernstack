import React, { useEffect, useState } from "react";
import Coffre from "../images/Coffre.gif";
import Docs from "../images/docs.svg";
import Pdf from "../images/pdf.svg";
import Video from "../images/video.svg";

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
const KILO_BYTE = 1024;

const File = ({ file, update }) => {
  const [pic, setPic] = useState();

  console.log(file);

  useEffect(() => {
    switch (file.type) {
      case "images":
        return setPic(file.url);
      case "pdfs":
        return setPic(Pdf);
      case "textfiles":
        return setPic(Docs);
      case "videos":
        return setPic(Video);
      default:
        return setPic(Coffre);
    }
  }, [file]);

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
          <CardFooter className="text-sm justify-between">
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
          <DropdownItem key="copy" description="Copy the Folder link">
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
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default File;
