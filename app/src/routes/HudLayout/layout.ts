import {
  createTilePanes,
  TileBranchSubstance,
  TileContainer,
  TileProvider,
  useGetLeaf,
  useGetRootNode,
  useMovePane,
} from "react-tile-pane";

export const gmLayout: TileBranchSubstance = {
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
              children: ["board", "notes", "players"],
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

export const playerLayout: TileBranchSubstance = {
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
              children: ["board", "notes", "players"],
              onTab: 0,
              grow: 1.0,
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
