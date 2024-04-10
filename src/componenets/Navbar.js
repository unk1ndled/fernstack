import React from "react";
import styled from "styled-components";
import Icon from "../images/logo.svg";
import { Button } from "@nextui-org/button";

const Navbar = (props) => {
  return (
    <Container bgc={props.bgc}>
      <LeftWrapper>
        <Logo src={Icon}></Logo>
        <div className="text-zinc-500">/</div>
        <div className="text-zinc-100 text-2xl font-medium	 ">Fernstack</div>
      </LeftWrapper>
      <RightWrapper>
      </RightWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 8vh;
  background-color: ${(props) => props.bgc || "#0A0A0A"};
  border-bottom: #2d2d2d solid 0.1mm;
  color: #ededed;
  padding-left: 1.5em;
  padding-right: 1.5em;
  box-sizing: border-box;
`;
const LeftWrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1em;

  /* -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;  */
`;
const RightWrapper = styled(LeftWrapper)`
  justify-content: end;
`;

const Logo = styled.img`
  height: 75%;
`;

export default Navbar;
