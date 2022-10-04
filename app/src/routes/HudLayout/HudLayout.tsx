import { useAtom, useAtomValue } from "jotai";
import { connect, Msg } from "nats.ws";
import { useEffect } from "react";
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
  configOpen,
  genMenuOpen,
  hudPanelNames,
  hudPanelSelectionOpen,
  inodLayoutKey,
  queueInfo,
  sessionDataType,
  stateNats,
  stateSessionData,
  theme,
} from "~/common";
import { topicConnect, topicInfo, topicRoll, useNats } from "~/common/nats";
import { Button, Flex, GenMenu, Modal, Text } from "~/component";
import { Config } from "../Config";
import { HudChat } from "./pane";
import { RollerPane } from "./pane/RollerPane";
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
  const [, setGm] = useAtom(genMenuOpen);
  const [, setCo] = useAtom(configOpen);
  const [nats, setNats] = useAtom(stateNats);
  const { processIncoming, publish, getTopic } = useNats();
  const sessionData = useAtomValue(stateSessionData);
  const qInfo = useAtomValue(queueInfo);

  const [paneList, paneNames] = createTilePanes({
    chat: <HudChat />,
    npc: <HudPane>thiis is npc</HudPane>,
    roll: <RollerPane />,
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

  const processSessionData = async (data: sessionDataType) => {
    if (nats.connection != null) {
      nats.connection.drain();
      nats.connection.close();
      setNats({ connection: null, sub: null });
    }
    const nc = await connect({
      servers: data.nats,
      tls: null,
      token: "03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b",
    });
    setNats({
      connection: nc,
      sub: nc.subscribe(getTopic(topicRoll), { callback: processIncoming }),
    });
  };

  useEffect(() => {
    if (nats.connection == null || nats.sub == null) return;
    if (!sessionData.hosting) {
      publish(topicInfo, `Connected ${sessionData.browserID}`);
    }
  }, [nats, sessionData]);

  useEffect(() => {
    console.log(qInfo);
  }, [qInfo]);

  return (
    <>
      <HudToolbar>
        <Button size="small" onClick={openPanelList}>
          Pane
        </Button>
        <Button size="small" onClick={() => setGm(true)}>
          Gen
        </Button>
        <Button size="small" onClick={() => setCo(true)}>
          Config
        </Button>
        {nats.connection !== null && sessionData.hosting && (
          <Text size="small">Hosting on {sessionData.browserID}</Text>
        )}
        {nats.connection !== null && !sessionData.hosting && (
          <Text size="small">Connected to {sessionData.remote}</Text>
        )}
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
      <GenMenu title="Generator" />
      <Config saveCallback={processSessionData} />
    </>
  );
};
