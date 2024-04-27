import React from "react";
import styled from "styled-components";
import File from "../componenets/File";
import Nav from "../componenets/NavUser";
import Toast from "../componenets/Toast";
import { sleep } from "../functions/sleep";
import Folder from "../componenets/Folder";
import { useEffect, useState } from "react";
import { useFolder } from "../hooks/useFolder";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import BreadCrumb from "../componenets/BreadCrumb";
import UploadModal from "../componenets/UploadModal";
import UploadButton from "../componenets/UploadButton";
import LoginRequired from "../componenets/LoginRequired";
import { getmaxstorage } from "../functions/getmaxstorage";
import { getusedstorage } from "../functions/getusedstorage";
import { Divider, Progress, Spacer, useDisclosure } from "@nextui-org/react";

const Treasure = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [usedStorage, setUsedStorage] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(-1);

  const { currentUser } = useAuth();
  const { state: folder_ } = useLocation();
  const id_ = folder_ != null ? folder_.folder.id : null;
  const currentFolder = useFolder(id_, folder_);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const folder = currentFolder.folder;
  const refresh = currentFolder.refreshChildren;

  useEffect(() => {
    const initused = async () => {
      setUsedStorage(await getusedstorage(currentUser.uid));
    };
    sleep(500).then(() => {
      initused();
    });
  }, [currentFolder]);

  const refreshChildren = () => {
    refresh();
    setLoading(false);
    setShowUpload(false);
  };
  const Upload = () => {
    onOpen();
    setLoading(true);
  };

  useEffect(() => {
    setValue((usedStorage / getmaxstorage()) * 100);
  }, [usedStorage]);

  return (
    <div >
      {currentUser.uid ? (
        <>
          <Nav></Nav>
          <Divider></Divider>
          <Container>
            <Spacer y={4} />
            <div className="flex items-center justify-start text-purple-700 text-4xl font-mono h-12 w-100">
              Treasure
            </div>
            <Spacer y={4} />
            <Progress
              aria-label="used capacity"
              color="secondary"
              isStriped
              size="md"
              value={value}
              showValueLabel={true}
              label="treasure used capacity"
              className="max-w-md font-mono"
            />
            <Spacer y={4} />
            <UploadButton onPress={Upload} isLoading={isLoading}></UploadButton>
            <UploadModal
              setShowUpload={setShowUpload}
              isOpen={isOpen}
              currentFolder={folder}
              onOpenChange={onOpenChange}
              setUploadProgress={setUploadProgress}
              stopLoading={setLoading}
              update={refreshChildren}
            ></UploadModal>
            <Spacer y={7} />
            <div className="w-7/12 flex items-start ">
              <BreadCrumb folder={folder}></BreadCrumb>
            </div>
            <Spacer y={3} />
            {/* upload toast */}
            {isLoading && showUpload && <Toast value={uploadProgress}></Toast>}
            <Grid>
              <Body>
                <div className=" gap-4 grid grid-cols-2  sm:grid-cols-6">
                  {currentFolder &&
                    currentFolder.childFiles.map((item, index) => (
                      <File
                        key={index}
                        file={item}
                        update={refreshChildren}
                        currentFolder={folder}
                      ></File>
                    ))}
                  {currentFolder &&
                    currentFolder.childFolders.map((item, index) => (
                      <Folder
                      
                        key={index}
                        folder={item}
                        update={refreshChildren}
                      ></Folder>
                    ))}
                </div>
              </Body>
            </Grid>
          </Container>
        </>
      ) : (
        <LoginRequired>Error: User not authenticated</LoginRequired>
      )}
    </div>
  );
};

const Grid = styled.div`
  min-height: 90vh;
  width: 60.1%;
  background: #000;
  background-image: linear-gradient(
      rgba(155, 155, 255, 0.07) 0.1em,
      transparent 0.1em
    ),
    linear-gradient(90deg, rgba(155, 155, 255, 0.07) 0.1em, transparent 0.1em);
  background-size: 3em 3em;
`;

const Body = styled.div`
  padding: 3em;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Treasure;
