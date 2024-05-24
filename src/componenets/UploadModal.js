import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  RadioGroup,
  Divider,
  cn,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { database, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 } from "uuid";

import { addDoc } from "firebase/firestore";

import { useAuth } from "../contexts/AuthContext";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { updateStorage } from "../functions/updatestorage";
import { formatSize } from "../functions/formatSize";

const types = [
  {
    value: "image",
    collection: "images",
  },
  {
    value: "pdf",
    collection: "pdfs",
  },
  {
    value: "video",
    collection: "videos",
  },
  {
    value: "text",
    collection: "textfiles",
  },
];

//2mb
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

const UploadModal = (props) => {
  const {
    children,
    setUploadProgress,
    stopLoading,
    currentFolder,
    setShowUpload,
    update,
    ...otherProps
  } = props;
  const [selected, setSelected] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [folderName, setFolderName] = React.useState("");
  const [fileType, setFileType] = React.useState("textfiles");
  const [formattedSize, setFormattedSize] = React.useState(null);

  const [file, setFile] = React.useState(null);
  const { currentUser } = useAuth();

  const resetModal = () => {
    setSelected("");
    setFileName("");
    setFolderName("");
    setFile(null);
  };

  //side effect for renaming
  useEffect(() => {
    if (file && fileName !== "") {
      const updatedFile = new File([file], fileName, { type: file.type });
      setFile(updatedFile);
    }
  }, [fileName]);

  useEffect(() => {
    if (file !== null) {
      setFormattedSize(formatSize(file.size));
    }
  }, [file]);

  //selecting file type
  const handleSelectionChange = (e) => {
    setFileType(e.target.value);
  };

  //Locally uploading the folder
  const handleFileLocalUpload = (event) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      setFileName(file.name);
      setFile(file);
    }
  };

  //cancel
  const cancel = (action) => {
    action();
    stopLoading();
  };

  
  const uploadFolder = async () => {
    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    console.log(path);

    await addDoc(database.folders, {
      name: folderName,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrTime(),
    }).then(() => {
      update();
    });
  };

  const getParentFolder = () => {
    if (currentFolder.path.length > 0) {
      return `${currentFolder.path.map((entry) => entry.name).join("/")}/`;
    } else {
      return "";
    }
  };

  const uploadFile = async () => {
    if (file === null) return;
    const UNIQUE_FILENAME = v4() + file.name;
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${UNIQUE_FILENAME}`
        : `${getParentFolder()}${currentFolder.name}/${UNIQUE_FILENAME}`;
    const fileref = ref(storage, `files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(fileref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //toast progress
        setUploadProgress(progress);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(database.files, {
            url: downloadURL,
            name: fileName,
            folderId: currentFolder.id,
            userId: currentUser.uid,
            size: file.size,
            formattedSize: formattedSize,
            type: fileType,
            // Hall of shame fileref: "files/" + currentUser.uid + "/" + filePath,
            createdAt: database.getCurrTime(),
          }).then(() => {
            updateStorage("add", file.size, currentUser.uid).then(() => {
              update();
            });
          });
        });
      }
    );
  };
  const confirmUpload = async (action) => {
    //the user has to pick something to upload first
    if (fileName !== "" || folderName !== "") {
      let uploadPromise;
      if (selected === "file") {
        if (file.size > MAX_UPLOAD_SIZE) {
          alert("file too big");
          return;
        }
        uploadPromise = uploadFile();
      } else if (selected === "folder") {
        uploadPromise = uploadFolder();
      }
      action();
      setShowUpload(true);
      resetModal();
      await uploadPromise;
    }
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      hideCloseButton={true}
      {...otherProps}
      backdrop="blur"
      size="4xl"
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
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Upload to your treasure
            </ModalHeader>
            <ModalBody className="flex flex-row justify-evenly">
              <RadioGroup
                label="Item type"
                description="Items can be modified later"
                value={selected}
                onValueChange={setSelected}
              >
                <CustomRadio description="should be under xxxmb" value="file">
                  File
                </CustomRadio>
                <CustomRadio value="folder">Folder</CustomRadio>
              </RadioGroup>
              <Divider className="h-52" orientation="vertical" />
              <div className="w-64">
                {selected === "file" && (
                  <div className="flex flex-col gap-5 items-center">
                    {/* technical element to make uploading work its invisible */}
                    <input
                      type="file"
                      onChange={(e) => handleFileLocalUpload(e)}
                      style={{ display: "none" }}
                    />
                    <Button
                      color="secondary"
                      variant="faded"
                      className="min-w-72"
                      onPress={() => {
                        document.querySelector('input[type="file"]').click();
                      }}
                    >
                      upload file
                    </Button>
                    <Input
                      isRequired
                      type="text"
                      label="File name"
                      className="max-w-xs"
                      value={fileName}
                      onValueChange={setFileName}
                    ></Input>
                    <Select
                      labelPlacement="inside"
                      label="File type"
                      className="max-w-xs"
                      selectedKeys={[fileType]}
                      onChange={handleSelectionChange}
                    >
                      {types.map((type) => (
                        <SelectItem key={type.collection} value={type.value}>
                          {type.value}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
                {selected === "folder" && (
                  <Input
                    isRequired
                    type="text"
                    label="Folder name"
                    className="max-w-xs"
                    value={folderName}
                    onValueChange={setFolderName}
                  />
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  cancel(onClose);
                }}
              >
                Close
              </Button>
              <Button
                color="secondary"
                variant="flat"
                onPress={() => {
                  confirmUpload(onClose);
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      color={"secondary"}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-secondary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default UploadModal;
