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
import { database, storage } from "../config/firebase";

import FolderIcon from "../images/frefolder.svg";
import { useNavigate } from "react-router-dom";
import { sleep } from "../functions/sleep";
import { deleteObject, ref } from "firebase/storage";
import { updateStorage } from "../functions/updatestorage";
import { useAuth } from "../contexts/AuthContext";

const Folder = ({ folder, update }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const openFolder = () => {
    navigate("/treasure/" + folder.id, { state: { folder: folder } });
  };

  const deleteFolderAndSubFolders = async (fId) => {
    let freedstorage = 0;

    //recursive folder deletion
    const q = query(database.folders, where("parentId", "==", fId));
    const querySnapshot = await getDocs(q);

    for (const subfolderDoc of querySnapshot.docs) {
      freedstorage += await deleteFolderAndSubFolders(subfolderDoc.id);
    }

    //file deletion
    const files = query(database.files, where("folderId", "==", fId));
    const filequerySnapshot = await getDocs(files);

    for (const file of filequerySnapshot.docs) {
      try {
        const formattedFile = database.formatDoc(file);
        await deleteDoc(database.getFileRef(formattedFile.id));
        const storageFileRef = ref(storage, formattedFile.url);
        await deleteObject(storageFileRef);
        freedstorage += formattedFile.size;
      } catch (error) {
        console.error(error);
      }
    }

    deleteDoc(database.getFolderRef(fId));
    return freedstorage;
  };

  const shareFolder = () => {
    const link = `http://localhost:3000/treasure/${folder.id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard: ");

    //ref f storage

    // const folderRef = ref(
    //   storage,
    //   `/files/${currentUser.uid}/${folder.path
    //     .map((entry) => entry.name)
    //     .join("/")}/${folder.name}`
    // );
  };

  const delDoc = async () => {
    try {
      const freed = await deleteFolderAndSubFolders(folder.id);
      updateStorage("subtract", freed, currentUser.uid).then(() => {
        update();
      });
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
