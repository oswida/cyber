import { LinkButton } from "~/component";
import { NavBar, Root } from "./styles";

export const Layout = ({ children }: { children: any }) => {
  return (
    <Root>
      <NavBar>
        <LinkButton to="/npc">Postać</LinkButton>
        <LinkButton to="/place">Miejsce</LinkButton>
        <LinkButton to="/corpo">Zaibatsu</LinkButton>
        <LinkButton to="/node">Infowęzeł</LinkButton>
        <LinkButton to="/job">Robota</LinkButton>
      </NavBar>
      {children}
    </Root>
  );
};
