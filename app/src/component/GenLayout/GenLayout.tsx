import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { currentPage, genMenuOpen, globalStr, language } from "~/common";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { GenMenu } from "../GenMenu";
import { PageContent } from "../PageContent";
import { PageHeader } from "../PageHeader";
import { PageRoot } from "../PageRoot";
import { Text } from "../Text";
import { NavBar, Root } from "./styles";

export type GenLayoutProps = PropsWithChildren & {
  headerMenu: Record<string, () => void>;
};

export const GenLayout = ({ children, headerMenu }: GenLayoutProps) => {
  const [cp] = useAtom(currentPage);
  const lang = useAtomValue(language);
  const [, setGm] = useAtom(genMenuOpen);

  const openMenu = () => {
    setGm(true);
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
      <PageRoot>
        <PageHeader>
          <Flex
            css={{
              gap: 10,
              paddingLeft: 10,
              paddingBottom: 5,
              overflow: "auto",
            }}
          >
            {Object.keys(headerMenu).map((key) => (
              <Button
                onClick={headerMenu[key]}
                key={key}
                size="small"
                border="underline"
              >
                {globalStr[lang][key]}
              </Button>
            ))}
          </Flex>
        </PageHeader>
        <div
          style={{
            width: "calc(100% - 10px)",
            height: "calc(100% - 30px - 4rem)",
            flex: 1,
          }}
        >
          <PageContent>{children}</PageContent>
        </div>
      </PageRoot>
      <GenMenu extras={{ "main hud": "/" }} />
    </Root>
  );
};
