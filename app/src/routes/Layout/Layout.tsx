import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { currentPage, menuVisible } from "~/common";
import { Button, Flex, LinkButton, MenuOverlay, Text } from "~/component";
import { NavBar, Root } from "./styles";

export const Layout = ({ children }: { children: any }) => {
  const [mv, setMv] = useAtom(menuVisible);
  const [cp] = useAtom(currentPage);

  const openMenu = () => {
    setMv(true);
  };

  const closeMenu = () => {
    setMv(false);
  };

  return (
    <Root>
      <NavBar>
        <Flex
          css={{
            alignContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          {cp && (
            <Text
              color="pink"
              weight={"700"}
              css={{ marginLeft: 10, textTransform: "uppercase" }}
            >
              <span className="blink">&gt; </span>
              {cp}
            </Text>
          )}
        </Flex>
      </NavBar>
      {children}
      {mv && (
        <MenuOverlay id="menu">
          <Flex direction="column" css={{ gap: 10 }}>
            <LinkButton to="/npc" onClick={closeMenu}>
              Postać
            </LinkButton>
            <LinkButton to="/place" onClick={closeMenu}>
              Miejsce
            </LinkButton>
            <LinkButton to="/corpo" onClick={closeMenu}>
              Zaibatsu
            </LinkButton>
            <LinkButton to="/node" onClick={closeMenu}>
              Infowęzeł
            </LinkButton>
            <LinkButton to="/job" onClick={closeMenu}>
              Robota
            </LinkButton>
          </Flex>
        </MenuOverlay>
      )}
    </Root>
  );
};
