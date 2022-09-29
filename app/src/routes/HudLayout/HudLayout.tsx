import { useMemo } from "react";
import {
  createTilePanes,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
} from "react-tile-pane";
import useLocalStorageState from "use-local-storage-state";
import { hudStorageKey, theme } from "~/common";
import { Button } from "~/component";
import { AutoSaveLayout } from "./AutoSave";
import { HudChat } from "./panels";
import { stretchBarConfig } from "./StretchBar";
import { HudPane, HudRoot, HudToolbar } from "./styles";
import { tabBarConfig } from "./TabBar";

export const HudLayout = () => {
  const [layout] = useLocalStorageState<string>(hudStorageKey, {
    defaultValue: "",
  });

  const panes = useMemo(() => {
    const [list, els] = createTilePanes({
      chat: <HudChat />,
      npc: <HudPane>thiis is npc</HudPane>,
      roll: <HudPane>Dice Roller</HudPane>,
      notes: <HudPane>Notes</HudPane>,
      board: <HudPane>board</HudPane>,
    });
    if (layout !== "") {
      const root = JSON.parse(layout) as TileBranchSubstance;
      return { root, list };
    }
    const root: TileBranchSubstance = {
      children: [
        {
          children: [els.chat, els.npc, els.board, els.notes, els.roll],
          grow: 1,
        },
      ],
    };
    return { root, list };
  }, [layout]);

  return (
    <>
      <HudToolbar>
        <Button size="small">Panels</Button>
        <Button size="small">Generators</Button>
        <Button size="small">Config</Button>
      </HudToolbar>
      <HudRoot>
        <TileProvider
          rootNode={panes.root}
          tilePanes={panes.list}
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
        </TileProvider>
      </HudRoot>
    </>
  );
};
