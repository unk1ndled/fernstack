import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Spacer,
} from "@nextui-org/react";
import Icon from "../images/logo.svg";
import styled from "styled-components";

const Nav = (props) => {
  return (
    <Navbar  shouldHideOnScroll maxWidth="full">
      <NavbarBrand>
        <Logo src={Icon} />
        <Spacer />
        <p className="font-bold text-inherit text-3xl font-mono">not-a-mimic</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

const Logo = styled.img`
  height: 60%;
`;
export default Nav;
