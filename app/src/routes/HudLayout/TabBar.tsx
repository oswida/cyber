import { useCallback, useMemo } from "react";
import {
  DraggableTitle,
  PaneName,
  TabBarPropsWithAction,
  TabsBarConfig,
  useGetLeaf,
} from "react-tile-pane";
import { hudPanelNames, styled } from "~/common";

const thickness = 30;

const TabBarTitleRoot = styled(DraggableTitle, {
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "$background",
  cursor: "move",
  userSelect: "none",
  color: "$fontPrimary",
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: "$1",
  variants: {
    selected: {
      true: {
        color: "$blue",
      },
    },
  },
});

const TabBarTitle = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const TabBarContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 10,
  marginLeft: 10,
  backgroundColor: "$background",
});

const TabBarCloseButton = styled("div", {
  height: thickness * 0.8,
  width: thickness,
  color: "$pink",
  fontSize: 25,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
  userSelect: "none",
});

const TabBarRoot = styled("div", {
  background: "$background",
  width: "99%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  userSelect: "none",
  border: `solid 1px $darkblue`,
  // borderRadius: 15,
  borderRadius: "10px 0px",
  marginTop: "0.25%",
  marginLeft: "0.25%",
  minWidth: 280,
});

const TabBar = ({ tabs, onTab, action }: TabBarPropsWithAction) => {
  const getLeaf = useGetLeaf();

  const tabBar = useCallback(
    (tab: PaneName, i: number) => {
      return (
        <TabBarTitleRoot
          selected={i === onTab}
          name={tab}
          key={tab}
          onClick={() => action.switchTab(i)}
        >
          <TabBarTitle>{tab}</TabBarTitle>
        </TabBarTitleRoot>
      );
    },
    [action, onTab]
  );

  const close = () => {
    const visible = hudPanelNames.filter((it) => getLeaf(it) !== undefined);
    if (visible.length > 1) action.closeTab(onTab);
  };

  return useMemo(
    () => (
      <TabBarRoot>
        <TabBarContainer>{tabs.map(tabBar)}</TabBarContainer>
        <TabBarCloseButton onClick={close}>×</TabBarCloseButton>
      </TabBarRoot>
    ),
    [action, onTab, tabBar, tabs]
  );
};

export const tabBarConfig: TabsBarConfig = {
  render: TabBar,
  thickness: thickness,
  position: "top",
  preBox: {
    isRow: false,
    isReverse: false,
  },
};
