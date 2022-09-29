import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import {
  createTilePanes,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useGetRootNode,
  useMovePane,
} from "react-tile-pane";
import {
  hudPanelActive,
  hudPanelNames,
  hudPanelSelectionOpen,
  inodLayoutKey,
  theme,
} from "~/common";
import { Button, Flex, Modal, Text } from "~/component";
import { HudChat } from "./panels";
import { stretchBarConfig } from "./StretchBar";
import { HudPane, HudRoot, HudToolbar } from "./styles";
import { tabBarConfig } from "./TabBar";

const AutoSaveLayout = () => {
  const getRootNode = useGetRootNode();
  localStorage.setItem(inodLayoutKey, JSON.stringify(getRootNode()));
  return <></>;
};

const PaneButton = ({ name }: { name: string }) => {
  const getLeaf = useGetLeaf();
  const move = useMovePane();
  const shown = getLeaf(name) !== undefined;

  return (
    <>
      {!shown && (
        <Button onClick={() => move(name, [0.99, 0.5])}>{name}</Button>
      )}
    </>
  );
};

export const HudLayout = () => {
  const [hudSel, setHudSel] = useAtom(hudPanelSelectionOpen);
  const localRoot = localStorage.getItem(inodLayoutKey);

  const [paneList, paneNames] = createTilePanes({
    chat: <HudChat />,
    npc: <HudPane>thiis is npc</HudPane>,
    roll: <HudPane>Dice Roller</HudPane>,
    notes: <HudPane>Notes</HudPane>,
    board: <HudPane>board</HudPane>,
  });

  const rootPane: TileBranchSubstance = {
    children: [
      {
        children: [
          paneNames.chat,
          paneNames.npc,
          paneNames.board,
          paneNames.notes,
          paneNames.roll,
        ],
        grow: 1,
      },
    ],
  };

  const layoutRoot = localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : rootPane;

  const openPanelList = () => {
    setHudSel(true);
  };

  return (
    <>
      <HudToolbar>
        <Button size="small" onClick={openPanelList}>
          Panels
        </Button>
        <Button size="small">Generators</Button>
        <Button size="small">Config</Button>
      </HudToolbar>
      <HudRoot>
        <TileProvider
          rootNode={layoutRoot}
          tilePanes={paneList}
          pane={{
            style: {
              backgroundColor: theme.colors.background.value,
            },
          }}
          stretchBar={stretchBarConfig}
          tabBar={tabBarConfig}
        >
          <TileContainer />
          <AutoSaveLayout />
          <Modal isOpen={hudSel} onClose={() => setHudSel(false)}>
            <Flex direction="column" css={{ gap: 10 }}>
              <Text>Click on the button to make panel visible</Text>
              {hudPanelNames.map((it) => (
                <PaneButton key={it} name={it} />
              ))}
            </Flex>
          </Modal>
        </TileProvider>
      </HudRoot>
    </>
  );
};
