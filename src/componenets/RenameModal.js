import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { database } from "../config/firebase"; // Adjust the import path as necessary
import {  updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function RenameModal(props) {
  const { children, stopLoading, update, folder, ...otherProps } = props;
  const { currentUser, updateUsername, updatePhotoUrl } = useAuth();
  const [newFolderName, setNewFolderName] = useState("");

  const cancel = (action) => {
    action();
  };

  async function updateFolderNames(newName) {
    try {
      const folderDocRef = database.getFolderRef(folder.id);
      await updateDoc(folderDocRef, { name: newName });
      console.log("All folder names updated successfully.");
    } catch (error) {
      console.error("Error updating folder names:", error);
    }
  }

  const ConfirmUpdate = async (newName, action) => {
    try {
      await updateFolderNames(newName);
      action();
      window.location.reload();
    } catch (error) {
      console.error("Error updating folder name:", error);
    }
  };

  console.log(folder);
  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        hideCloseButton={true}
        {...otherProps}
        backdrop="blur"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="flex  items-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> </ModalHeader>

              <ModalBody className="w-4/5 mt-8">
                <Input
                  className="w-100% "
                  autoFocus
                  labelPlacement="outside"
                  label="New folder Name"
                  placeholder={folder.name}
                  value={newFolderName}
                  onValueChange={setNewFolderName}
                  variant="bordered"
                />

                <div className="flex py-2 px-1 justify-between"></div>
              </ModalBody>
              <ModalFooter className="w-4/5 flex justify-between">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    cancel(onClose);
                  }}
                >
                  Close
                </Button>
                <Button
                  color="secondary"
                  onPress={() => {
                    ConfirmUpdate(newFolderName, onClose);
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
