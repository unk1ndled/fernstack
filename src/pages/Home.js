import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import File from "../componenets/File";
import { Divider, Progress, Spacer, useDisclosure } from "@nextui-org/react";
import Coffre from "../images/Coffre.gif";
import Frerein from "../images/frieren.gif";
import Fern from "../images/fern-eating-grapes-sour-grapes.gif";

import Nav from "../componenets/NavUser";
import Folder from "../componenets/Folder";
import UploadButton from "../componenets/UploadButton";
import UploadModal from "../componenets/UploadModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [value, setValue] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 1 : 2 * v));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <Spacer y={4} />
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
