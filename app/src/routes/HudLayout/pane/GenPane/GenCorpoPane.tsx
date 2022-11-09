import { useAtomValue } from "jotai";
import { stateGenerator, language, styled, toCorpoInfo } from "~/common";
import { Flex, Button } from "~/component";
import { CorpoCard } from "~/routes/CorpoGen/CorpoCard";
import { useCorpoGen } from "~/routes/CorpoGen/useCorpoGen";
import { HudPane } from "../../styles";

const ContentRoot = styled("div", {
  width: "100%",
  height: "100%",
  padding: 5,
  backgroundColor: "$background",
  display: "flex",
  flexDirection: "column",
});

const Content = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  flex: 1,
  overflow: "auto",
});

export const GenCorpoPane = () => {
  const gen = useAtomValue(stateGenerator);
  const lang = useAtomValue(language);
  const { clean, importData, exportData, generate } = useCorpoGen();

  return (
    <HudPane>
      <ContentRoot>
        <Flex
          css={{
            gap: 10,
            marginBottom: 5,
            justifyContent: "center",
          }}
        >
          <Button size="small" border="underline" onClick={generate}>
            Gen
          </Button>
          <Button size="small" border="underline" onClick={clean}>
            Clear
          </Button>
          <Button size="small" border="underline" onClick={exportData}>
            Eksport
          </Button>
          <Button size="small" border="underline" onClick={importData}>
            Import
          </Button>
        </Flex>

        <Content>
          {Object.keys(gen.corpo).map((k) => (
            <CorpoCard
              size="small"
              data={toCorpoInfo(gen.corpo[k])}
              key={k}
            ></CorpoCard>
          ))}
        </Content>
      </ContentRoot>
    </HudPane>
  );
};
