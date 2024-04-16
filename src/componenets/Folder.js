import React from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";

import { deleteDoc, getDocs, query, where } from "firebase/firestore";
import { storage } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

import { database } from "../config/firebase";
import { ref } from "firebase/storage";

import FolderIcon from "../images/frefolder.svg";
import { useNavigate } from "react-router-dom";
import { sleep } from "../functions/sleep";

const Folder = ({ folder, update }) => {
  const [del, setDel] = useState(false);

  const navigate = useNavigate();

  const openFolder = () => {
    navigate("/treasure/" + folder.id, { state: { folder: folder } });
  };

  const deleteFolderAndSubFolders = async (fId) => {
    const q = query(database.folders, where("parentId", "==", fId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (subfolderDoc) => {
      const subfolderId = subfolderDoc.id;
      await deleteFolderAndSubFolders(subfolderId);
    });
    //FILES

    deleteDoc(await database.getFolderRef(fId));
  };

  const shareFolder = () => {
    //link

    const link = `http://localhost:3000/treasure/${folder.id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard: ");

    //ref f storage

    // const fileref = ref(
    //   storage,
    //   `/files/${currentUser.uid}/${folder.path
    //     .map((entry) => entry.name)
    //     .join("/")}/${folder.name}`
    // );
  };

  const delDoc = async () => {
    try {
      await deleteFolderAndSubFolders(folder.id);
      await sleep(500);
      update();
    } catch (error) {
      alert(error);
    }
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
              openFolder();
            }}
          >
            Open
          </DropdownItem>
          <DropdownItem key="download">Download</DropdownItem>
          <DropdownItem
            key="copy"
            description="Copy the Folder link"
            onPress={() => {
              shareFolder();
            }}
          >
            Copy link
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the Fodler"
            onPress={() => {
              delDoc();
            }}
          >
            Delete folder
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Folder;
