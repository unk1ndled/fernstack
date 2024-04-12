import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import {
  Divider,
  Progress,
  Spacer,
  Breadcrumbs,
  BreadcrumbItem,
  useDisclosure,
} from "@nextui-org/react";

import Coffre from "../images/Coffre.gif";
import Frerein from "../images/frieren.gif";
import Fern from "../images/fern-eating-grapes-sour-grapes.gif";

import { database } from "../config/firebase";

import { getDocs, getDoc, collection, doc } from "firebase/firestore";

import File from "../componenets/File";
import Nav from "../componenets/NavUser";
import Folder from "../componenets/Folder";
import UploadButton from "../componenets/UploadButton";
import UploadModal from "../componenets/UploadModal";

const Test = () => {
  const [value, setValue] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [currentFolder, setCurrentFolder] = React.useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 1 : 2 * v));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const lul = async () => {
  //     const docsnap = await getDoc(
  //       doc(db, "folders", "8QtorMFQaepzi5D6wPTG")
  //     );
  //     console.log(docsnap.data());
  //   };
  //   lul();
  // }, []);

  const uploadFile = async (file, folderid) => {};



  const list = [
    {
      title: "frerein",
      img: Frerein,
      size: "1mb",
    },
    {
      title: "frerein",
      img: Frerein,
      size: "1mb",
    },
    {
      title: "frerein",
      img: Frerein,
      size: "1mb",
    },
    {
      title: "Fern",
      img: Fern,
      size: "20gb",
    },

    {
      title: "mimic",
      img: Coffre,
      size: "7gb",
    },
  ];

  const folders = [
    {
      title: "School",
      size: "100mb",
    },
    {
      title: "Spice",
      size: "100mb",
    },
  ];

  const Upload = () => {
    onOpen();
    setLoading(true);
  };

  return (
    <div>
      <Nav></Nav>
      <Divider></Divider>
      <Container>
        <Spacer y={4} />
        <div className="flex items-center justify-start  text-purple-700 text-4xl font-mono h-12 w-100">
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
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          stopLoading={setLoading}
        ></UploadModal>
        <Spacer y={7} />
        <div className="w-7/12 flex items-start ">
          <Breadcrumbs color="secondary" variant="light">
            <BreadcrumbItem>root</BreadcrumbItem>
            <BreadcrumbItem>folder 1</BreadcrumbItem>
            <BreadcrumbItem>folder 2</BreadcrumbItem>
            <BreadcrumbItem>folder 3</BreadcrumbItem>
            <BreadcrumbItem>folder 4</BreadcrumbItem>
            <BreadcrumbItem>folder 5</BreadcrumbItem>
            <BreadcrumbItem>folder 6</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <Spacer y={3} />
        <Grid>
          <Body>
            <div className=" gap-4 grid grid-cols-2  sm:grid-cols-6">
              {list.map((item, index) => (
                <File key={index} item={item}></File>
              ))}
              {folders.map((item, index) => (
                <Folder key={index} item={item}></Folder>
              ))}
            </div>
          </Body>
        </Grid>
      </Container>
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

export default Test;
