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
import { ref, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { database, storage } from "../config/firebase";


import { useAuth } from "../contexts/AuthContext";

export default function ProfileModal(props) {
  const { children, stopLoading, update, ...otherProps } = props;
  const [fileName, setFileName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser ,updateUsername } = useAuth();

  // console.log(currentUser);

  //Locally uploading the folder
  const handleFileLocalUpload = (event) => {
    const file = event.target.files[0];
    setFileName(currentUser.uid);
    const updatedFile = new File([file], fileName, { type: file.type });
    setFile(updatedFile);
    console.log(updatedFile);
  };

  const uploadFile = async () => {
    console.log(file);
    const fileref = ref(storage, `/pfp/${currentUser.uid} `);
    const uploadTask = uploadBytes(fileref, file);
  };



  const confirmUpload = (action) => {
    uploadFile();
    if (newUsername !== "") {
      updateUsername(newUsername);
    }
    action();
    console.log(file);
  };

  //cancel
  const cancel = (action) => {
    action();
    //stopLoading();
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
