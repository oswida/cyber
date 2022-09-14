import { LinkButton } from "~/component";
import { NavBar, Root } from "./styles";

export const Layout = ({ children }: { children: any }) => {
  return (
    <Root>
      <NavBar>
        <LinkButton to="/?id=npc">Postać</LinkButton>
        <LinkButton to="/?id=place">Miejsce</LinkButton>
        <LinkButton to="/?id=corpo">Zaibatsu</LinkButton>
        <LinkButton to="/?id=node">Infowęzeł</LinkButton>
        <LinkButton to="/?id=job">Robota</LinkButton>
      </NavBar>
      {children}
    </Root>
  );
};
