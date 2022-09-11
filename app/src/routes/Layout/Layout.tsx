import { LinkButton } from "~/component";
import { NavBar, Root } from "./styles";

export const Layout = ({ children }: { children: any }) => {
  return (
    <Root>
      <NavBar>
        <LinkButton to="/?id=npc">Postać</LinkButton>
        <LinkButton to="/">Miejsce</LinkButton>
        <LinkButton to="/?id=corpo">Korpo</LinkButton>
        <LinkButton to="/">Cybermod</LinkButton>
        <LinkButton to="/">Robota</LinkButton>
      </NavBar>
      {children}
    </Root>
  );
};
