import { useAtom } from "jotai";
import { useEffect } from "react";
import { currentPage } from "~/common";
import { PageRoot, PageHeader, Flex, Button, PageContent } from "~/component";
import { Layout } from "../Layout";

export const PlaceGen = () => {
  const [cp, setCp] = useAtom(currentPage);
  useEffect(() => {
    setCp("Miejsce");
  }, []);

  const generate = () => {};

  const clean = () => {};

  const exportCards = () => {};

  return (
    <Layout>
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
            <Button onClick={() => generate()} title="Generuj">
              Generuj
            </Button>
            <Button onClick={clean} title="Wyczyść">
              WYCZYŚĆ
            </Button>
            <Button onClick={() => exportCards()} title="Eksportuj">
              Eksport
            </Button>
          </Flex>
        </PageHeader>
        <PageContent></PageContent>
      </PageRoot>
    </Layout>
  );
};
