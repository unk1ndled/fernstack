import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { database, storage } from "../config/firebase";

import { useAuth } from "../contexts/AuthContext";

export default function ProfileModal(props) {
  const { children, stopLoading, update, ...otherProps } = props;
  const [fileName, setFileName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser, updateUsername, updatePhotoUrl } = useAuth();

  // console.log(currentUser);

  //Locally uploading the folder
  const handleFileLocalUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const uploadFile = async () => {
    try {
      const fileref = ref(storage, `/pfp/${currentUser.uid}`);
      const listResult = await listAll(fileref);

      if (listResult.items.length > 0) {
        const itemToDelete = listResult.items[0];
        await deleteObject(itemToDelete);
        console.log("File deleted successfully.");
      }
      const uploadTask = uploadBytes(fileref, file);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      updatePhotoUrl(downloadURL);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmUpload = async (action) => {
    if (file && file.type.startsWith("image/")) {
      await uploadFile();
    } else {
      file && alert("Enter a Valid image format");
    }

    if (newUsername !== "") {
      await updateUsername(newUsername);
    }
    action();
    window.location.reload();
  };

  const cancel = (action) => {
    action();
  };

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
              <input
                type="file"
                onChange={(e) => handleFileLocalUpload(e)}
                style={{ display: "none" }}
              />
              <Button
                color="secondary"
                variant="faded"
                className=" w-3/4 h-14 "
                onPress={() => {
                  document.querySelector('input[type="file"]').click();
                }}
              >
                upload file
              </Button>
              <ModalBody className="w-4/5 mt-8">
                <Input
                  className="w-100%"
                  autoFocus
                  label="New Username"
                  placeholder="Enter your new  username"
                  value={newUsername}
                  onValueChange={setNewUsername}
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
                    confirmUpload(onClose);
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
