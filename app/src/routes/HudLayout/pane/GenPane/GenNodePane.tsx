import { useAtomValue } from "jotai";
import Scrollbars from "react-custom-scrollbars-2";
import { stateGenerator, language, styled } from "~/common";
import { Flex, Button } from "~/component";
import { NodeCard } from "~/routes/NodeGen/NodeCard";
import { useNodeGen } from "~/routes/NodeGen/useNodeGen";
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
});

export const GenNodePane = () => {
  const gen = useAtomValue(stateGenerator);
  const lang = useAtomValue(language);
  const { clean, importData, exportData, generate } = useNodeGen();

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
        <Scrollbars>
          <Content>
            {Object.keys(gen.node).map((k) => (
              <NodeCard size="small" data={gen.node[k]!!} key={k}></NodeCard>
            ))}
          </Content>
        </Scrollbars>
      </ContentRoot>
    </HudPane>
  );
};
