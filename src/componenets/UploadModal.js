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
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc } from "firebase/firestore";

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
const maxSize = "2097152";

const UploadModal = (props) => {
  const { children, stopLoading, ...otherProps } = props;
  const [selected, setSelected] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [folderName, setFolderName] = React.useState("");
  const [fileType, setFileType] = React.useState("textfiles");
  const [file, setFile] = React.useState(null);

  const handleFileLocalUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFile(file);
    console.log(file.size);
  };

  useEffect(() => {
    if (fileName !== "") {
      const updatedFile = new File([file], fileName, { type: file.type });
      setFile(updatedFile);
    }
  }, [fileName]);

  const handleSelectionChange = (e) => {
    setFileType(e.target.value);
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const addFolder = async (name, parent) => {
    await addDoc(database.folders, {
      name:  folderName ,
      // parentid :
      // userid :
      // path :
      createdAt : database.getCurrTime()
    });
  };

  const uploadToFireBase = async () => {
    if (file === null) return;
    if (file.size > maxSize) {
      alert("file too big");
      return;
    }
    const fileref = ref(storage, `${fileType}/${v4() + fileName} `);
    uploadBytes(fileref, file).then(() => {
      alert("File uploaded");
    });
  };

  const handleSubmit = async (action) => {
    if (selected === "file") {
      uploadToFireBase();
    } else if (selected === "folder") {
      addFolder().then(() => {
        alert("folder uploaded");
      });
    }

    action();
    await sleep(3000); // Sleep for 2 seconds
    stopLoading();
  };

  const cancel = (action) => {
    action();
    stopLoading();
  };

  return (
    <Modal
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
                  handleSubmit(onClose);
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
