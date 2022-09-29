import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";
import { currentPage, language, modalOpen } from "~/common";
import { Button, Flex, LinkButton, Overlay, Text } from "~/component";
import { NavBar, Root } from "./styles";

export const Layout = ({ children }: { children: any }) => {
  const [mv, setMv] = useAtom(modalOpen);
  const [cp] = useAtom(currentPage);
  const lang = useAtomValue(language);

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
        <Overlay id="menu">
          <Flex direction="column" css={{ gap: 10 }}>
            <LinkButton to="/npc" onClick={closeMenu}>
              {lang == "en" ? "NPC" : "Bohater niezależny"}
            </LinkButton>
            <LinkButton to="/place" onClick={closeMenu}>
              {lang == "en" ? "Place" : "Miejsce"}
            </LinkButton>
            <LinkButton to="/corpo" onClick={closeMenu}>
              Zaibatsu
            </LinkButton>
            <LinkButton to="/node" onClick={closeMenu}>
              {lang == "en" ? "Infonode" : "Infowęzeł"}
            </LinkButton>
            <LinkButton to="/job" onClick={closeMenu}>
              {lang == "en" ? "Job" : "Robota"}
            </LinkButton>
          </Flex>
        </Overlay>
      )}
    </Root>
  );
};
