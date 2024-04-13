import React from "react";
import styled from "styled-components";

const Grid = ({ children, ...props }) => {
  return (
    <GridC className="flex flex-col justify-between " {...props}>
      <div className="bg-gradient-to-t from-transparent to-black h-unit-2xl"></div>
      <Wrapper> {children} </Wrapper>
      <div className="bg-gradient-to-t from-black to-transparent h-unit-3xl"></div>
    </GridC>
  );
};

const GridC = styled.div`
  min-height: 90vh;
  width: 100%;
  background: #000;
  background-image: linear-gradient(
      rgba(155, 155, 255, 0.07) 0.1em,
      transparent 0.1em
    ),
    linear-gradient(90deg, rgba(155, 155, 255, 0.07) 0.1em, transparent 0.1em);
  background-size: 2em 2em;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: space-evenly;
`;

export default Grid;
