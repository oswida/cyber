import { useAtom, useAtomValue } from "jotai";
import { connect } from "nats.ws";
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
  queueInfo,
  sessionDataType,
  stateNats,
  stateSessionData,
  stateStorageSize,
  theme,
} from "~/common";
import { topicInfo, topicRoll, useNats } from "~/common/nats";
import { useStorage } from "~/common/storage";
import { Button, Flex, GenMenu, Modal, Text } from "~/component";
import { Config } from "../Config";
import { GenCorpoPane } from "./pane/GenPane/GenCorpoPane";
import { GenNodePane } from "./pane/GenPane/GenNodePane";
import { NotesPane } from "./pane/NotesPane";
import { RollerPane } from "./pane/RollerPane";
import { stretchBarConfig } from "./StretchBar";
import { HudRoot, HudToolbar } from "./styles";
import { tabBarConfig } from "./TabBar";

const AutoSaveLayout = () => {
  const { saveLayout } = useStorage();
  const getRootNode = useGetRootNode();
  saveLayout(getRootNode());
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
  const { loadLayout } = useStorage();
  const storageSize = useAtomValue(stateStorageSize);

  const localRoot = loadLayout();

  const [, setGm] = useAtom(genMenuOpen);
  const [, setCo] = useAtom(configOpen);
  const [nats, setNats] = useAtom(stateNats);
  const { processIncoming, publish, getTopic } = useNats();
  const sessionData = useAtomValue(stateSessionData);
  const qInfo = useAtomValue(queueInfo);

  const [paneList, paneNames] = createTilePanes({
    "gen:zaibatsu": <GenCorpoPane />,
    "gen:node": <GenNodePane />,
    roll: <RollerPane />,
    notes: <NotesPane isBoard={false} />,
    board: <NotesPane isBoard={true} />,
  });

  const rootPane: TileBranchSubstance = {
    children: [
      {
        children: ["roll"],
        onTab: 0,
        grow: 0.25,
      },
      {
        children: [
          {
            children: [
              {
                children: ["board", "notes"],
                onTab: 0,
                grow: 0.6,
              },
              {
                children: ["gen:node", "gen:zaibatsu"],
                onTab: 1,
                grow: 0.4,
              },
            ],
            isRow: true,
            grow: 1,
          },
        ],
        isRow: false,
        grow: 0.75,
      },
    ],
    isRow: true,
    grow: 1,
  };

  const layoutRoot = localRoot ? (localRoot as TileBranchSubstance) : rootPane;

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
        </Flex>
        {nats.connection !== null && sessionData.hosting && (
          <Text size="small">Hosting on {sessionData.browserID}</Text>
        )}
        {nats.connection !== null && !sessionData.hosting && (
          <Text size="small">Connected to {sessionData.remote}</Text>
        )}
        <Text size="small">{storageSize} B</Text>
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
