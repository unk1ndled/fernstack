import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

import FolderIcon from "../images/frefolder.svg";
import { useNavigate } from "react-router-dom";

const Folder = ({ folder }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/treasure/" + folder.id, { state: { folder: folder } });
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Card shadow="sm" isPressable>
          <CardHeader className="text-small justify-between">
            <b>{folder.name}</b>
            <p className="text-default-500">{folder.size}</p>
          </CardHeader>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={folder.name}
              className="w-full object-cover h-[140px]"
              src={FolderIcon}
            />
          </CardBody>
        </Card>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions" showDivider>
          <DropdownItem
            key="open"
            description="Check folder contents"
            onPress={() => {
              handleClick();
            }}
          >
            Open
          </DropdownItem>
          <DropdownItem key="download">Download</DropdownItem>
          <DropdownItem key="copy" description="Copy the Folder link">
            Copy link
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the Fodler"
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Folder;
