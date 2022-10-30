import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
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
  doExport,
  doImport,
  genMenuOpen,
  globalPaneNames,
  hudPanelSelectionOpen,
  keyframes,
  langHud,
  prettyToday,
  queueInfo,
  SessionInfo,
  SessionPack,
  stateBoardNotes,
  stateHudLayout,
  stateNats,
  stateNotification,
  statePlayers,
  statePrivateNotes,
  stateSessionData,
  stateStorageSize,
  theme,
} from "~/common";
import { useNats } from "~/common/nats";
import { useNotify } from "~/common/notify";
import { useStorage } from "~/common/storage";
import { Button, Flex, GenMenu, Modal, Text } from "~/component";
import { Config } from "../Config";
import { playerLayout } from "./layout";
import { DrawPane } from "./pane/DrawPane";
import { GenCorpoPane } from "./pane/GenPane/GenCorpoPane";
import { GenNodePane } from "./pane/GenPane/GenNodePane";
import { NotesPane } from "./pane/NotesPane";
import { PlayerPane } from "./pane/PlayerPane";
import { RollerPane } from "./pane/RollerPane";
import { stretchBarConfig } from "./StretchBar";
import { HudRoot, HudToolbar } from "./styles";
import { tabBarConfig } from "./TabBar";

const fadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

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
  const {
    loadLayout,
    saveLayout,
    savePrivateNotes,
    saveBoardNotes,
    savePlayers,
  } = useStorage();
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
  const { notify } = useNotify();
  const nt = useAtomValue(stateNotification);
  const [players, setPlayers] = useAtom(statePlayers);
  const [board, setBoard] = useAtom(stateBoardNotes);
  const [notes, setNotes] = useAtom(statePrivateNotes);

  useEffect(() => {
    const [pl, pn] = createTilePanes({
      "gen:zaibatsu": <GenCorpoPane />,
      "gen:node": <GenNodePane />,
      roll: <RollerPane />,
      notes: <NotesPane isBoard={false} />,
      board: <NotesPane isBoard={true} />,
      players: <PlayerPane />,
      draw: <DrawPane />,
    });
    setPaneList(pl);
    setPaneNames(pn);
  }, []);

  useEffect(() => {
    setGpn(Object.keys(paneNames));
    const localRoot = loadLayout();
    setLayoutRoot(
      localRoot ? (localRoot as TileBranchSubstance) : playerLayout
    );
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

  const importSession = () => {
    doImport((data: any) => {
      setPlayers(data.players);
      setBoard(data.board);
      setNotes(data.notes);
      notify(`Session imported`, 5000);
    });
  };

  const exportSession = () => {
    const filename = `session-${prettyToday()}.json`;
    const data: SessionPack = {
      players: players,
      board: board,
      notes: notes,
    };
    doExport(data, filename);
    notify(`Session exported to ${filename}`, 5000);
  };

  return (
    <>
      <HudToolbar>
        <Flex>
          <Button size="small" onClick={openPanelList}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Button size="small" onClick={() => setCo(true)}>
            {langHud[sessionData.lang!!].config}
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
          <Flex css={{ alignItems: "center", gap: 10, marginLeft: 20 }}>
            <Button size="x-small" border="underline" onClick={importSession}>
              Import
            </Button>
            <Text size="small">Hosting on {sessionData.browserID}</Text>
            <Button size="x-small" border="underline" onClick={exportSession}>
              {langHud[sessionData.lang!!].export}
            </Button>
          </Flex>
        )}
        {nats.connection !== null && !sessionData.hosting && (
          <Text size="small" css={{ marginLeft: 20 }}>
            {langHud[sessionData.lang!!].connected_to} {sessionData.remote}
          </Text>
        )}
        <Flex css={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text size="middle" css={{ opacity: 0.8 }} className="blink">
            {nt}
          </Text>
        </Flex>
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
                <Text>{langHud[sessionData.lang!!].restore_layout_desc}</Text>
                <Button onClick={() => handleLayoutChange(playerLayout)}>
                  {langHud[sessionData.lang!!].player_layout}
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
