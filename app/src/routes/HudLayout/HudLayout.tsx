import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTilePanes,
  TileBranchSubstance,
  TileContainer,
  TilePane,
  TileProvider,
  useGetLeaf,
  useGetRootNode,
  useMovePane,
} from "react-tile-pane";
import {
  configOpen,
  genMenuOpen,
  globalPaneNames,
  hudPanelSelectionOpen,
  queueInfo,
  SessionInfo,
  stateHudLayout,
  stateNats,
  stateSessionData,
  stateStorageSize,
  theme,
} from "~/common";
import { useNats } from "~/common/nats";
import { useStorage } from "~/common/storage";
import { Button, Flex, GenMenu, Modal, Text } from "~/component";
import { Config } from "../Config";
import { gmLayout, playerLayout } from "./layout";
import { GenCorpoPane } from "./pane/GenPane/GenCorpoPane";
import { GenNodePane } from "./pane/GenPane/GenNodePane";
import { NotesPane } from "./pane/NotesPane";
import { PlayerPane } from "./pane/PlayerPane";
import { RollerPane } from "./pane/RollerPane";
import { stretchBarConfig } from "./StretchBar";
import { HudRoot, HudToolbar } from "./styles";
import { tabBarConfig } from "./TabBar";

const PaneButton = ({ name }: { name: string }) => {
  const getLeaf = useGetLeaf();
  const move = useMovePane();
  const shown = getLeaf(name) !== undefined;
  const setHudLayout = useSetAtom(stateHudLayout);
  const getRootNode = useGetRootNode();
  const { saveLayout } = useStorage();

  return (
    <>
      {!shown && (
        <Button
          onClick={() => {
            move(name, [0.99, 0.5]);
            setHudLayout(getRootNode());
            setTimeout(() => {
              // delayed
              saveLayout(getRootNode());
            }, 500);
          }}
        >
          {name}
        </Button>
      )}
    </>
  );
};

export const HudLayout = () => {
  const [hudSel, setHudSel] = useAtom(hudPanelSelectionOpen);
  const { loadLayout, saveLayout } = useStorage();
  const storageSize = useAtomValue(stateStorageSize);
  const [, setGm] = useAtom(genMenuOpen);
  const [, setCo] = useAtom(configOpen);
  const nats = useAtomValue(stateNats);
  const { connectNats } = useNats();
  const sessionData = useAtomValue(stateSessionData);
  const qInfo = useAtomValue(queueInfo);
  const setGpn = useSetAtom(globalPaneNames);
  const [paneList, setPaneList] = useState<TilePane[]>([]);
  const [paneNames, setPaneNames] = useState<Record<string, string>>({});
  const [layoutRoot, setLayoutRoot] = useAtom(stateHudLayout);

  useEffect(() => {
    const [pl, pn] = createTilePanes({
      "gen:zaibatsu": <GenCorpoPane />,
      "gen:node": <GenNodePane />,
      roll: <RollerPane />,
      notes: <NotesPane isBoard={false} />,
      board: <NotesPane isBoard={true} />,
      players: <PlayerPane />,
    });
    setPaneList(pl);
    setPaneNames(pn);
  }, []);

  useEffect(() => {
    setGpn(Object.keys(paneNames));
    const localRoot = loadLayout();
    setLayoutRoot(localRoot ? (localRoot as TileBranchSubstance) : gmLayout);
  }, [paneNames]);

  const openPanelList = () => {
    setHudSel(true);
  };

  const processSessionData = (data: SessionInfo) => {
    connectNats(data);
  };

  const handleLayoutChange = (node: TileBranchSubstance) => {
    setHudSel(false);
    saveLayout(node);
    window.location.href = window.location.href;
  };

  return (
    <>
      <HudToolbar>
        <Flex>
          <Button size="small" onClick={openPanelList}>
            Pane
          </Button>
          <Button size="small" onClick={() => setGm(true)}>
            Gen
          </Button>
          <Button size="small" onClick={() => setCo(true)}>
            Config
          </Button>
          <Text
            size="middle"
            color="blue"
            css={{ alignSelf: "center", marginLeft: 20 }}
          >
            {sessionData.username}
          </Text>
        </Flex>
        {nats.connection !== null && sessionData.hosting && (
          <Text size="small">Hosting on {sessionData.browserID}</Text>
        )}
        {nats.connection !== null && !sessionData.hosting && (
          <Text size="small">Connected to {sessionData.remote}</Text>
        )}
        <Text size="small">{storageSize} B</Text>
      </HudToolbar>
      {layoutRoot && (
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
            <Modal isOpen={hudSel} onClose={() => setHudSel(false)}>
              <Flex direction="column" css={{ gap: 10 }}>
                <Text>Click on the button to make panel visible</Text>
                {Object.keys(paneNames).map((it) => (
                  <PaneButton key={it} name={it} />
                ))}
                <Text>Click to restore predefined layout</Text>
                <Button onClick={() => handleLayoutChange(gmLayout)}>
                  GM Layout
                </Button>
                <Button onClick={() => handleLayoutChange(playerLayout)}>
                  Player Layout
                </Button>
              </Flex>
            </Modal>
          </TileProvider>
        </HudRoot>
      )}
      <GenMenu title="Generator" />
      <Config saveCallback={processSessionData} />
    </>
  );
};
