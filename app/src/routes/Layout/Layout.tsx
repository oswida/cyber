import { Outlet } from "react-router-dom";
import { LinkButton } from "~/component";
import { NavBar, Root } from "./styles";

export const Layout = () => {
  return (
    <Root>
      <NavBar>
        <LinkButton to="/">Postać</LinkButton>
        <LinkButton to="/">Miejsce</LinkButton>
        <LinkButton to="/">Korpo</LinkButton>
        <LinkButton to="/">Cybermod</LinkButton>
        <LinkButton to="/">Robota</LinkButton>
      </NavBar>
      <Outlet />
    </Root>
  );
};
