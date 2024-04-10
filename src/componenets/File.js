import React from "react";
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

const File = ({ item }) => {
  const { img, size, title } = item;
  
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Card
          shadow="sm"
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={title}
              className="w-full object-cover h-[140px]"
              src={img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{title}</b>
            <p className="text-default-500">{size}</p>
          </CardFooter>
        </Card>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions" showDivider>
          <DropdownItem key="open"  >
              Open file
          </DropdownItem>
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
