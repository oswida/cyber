import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import {
  DraggableTitle,
  PaneName,
  TabBarPropsWithAction,
  TabsBarConfig,
  useGetLeaf,
  useGetRootNode,
} from "react-tile-pane";
import {
  globalPaneNames,
  langHud,
  stateHudLayout,
  stateSessionData,
  styled,
} from "~/common";
import { useStorage } from "~/common/storage";

const thickness = 32;

const TabBarTitleRoot = styled(DraggableTitle, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "$background",
  cursor: "move",
  userSelect: "none",
  color: "$fontPrimary",
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: "$2",
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
  backgroundColor: "$background",
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
  backgroundColor: "$background",
});

const TabBarRoot = styled("div", {
  backgroundColor: "$background",
  width: "99%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  userSelect: "none",
  border: `solid 1px $darkblue`,
  borderRadius: "10px 0px",
  marginTop: "0.25%",
  marginLeft: "0.25%",
});

const TabBar = ({ tabs, onTab, action }: TabBarPropsWithAction) => {
  const getLeaf = useGetLeaf();
  const gpn = useAtomValue(globalPaneNames);
  const setHudLayout = useSetAtom(stateHudLayout);
  const getRootNode = useGetRootNode();
  const { saveLayout } = useStorage();
  const sessionData = useAtomValue(stateSessionData);

  const tabBar = useCallback(
    (tab: PaneName, i: number) => {
      return (
        <TabBarTitleRoot
          selected={i === onTab}
          name={tab}
          key={tab}
          onClick={() => action.switchTab(i)}
        >
          <TabBarTitle>{langHud[sessionData.lang!!][tab]}</TabBarTitle>
        </TabBarTitleRoot>
      );
    },
    [action, onTab]
  );

  const close = () => {
    const visible = gpn.filter((it) => getLeaf(it) !== undefined);
    if (visible.length > 1) {
      action.closeTab(onTab);
      setTimeout(() => {
        // delayed
        saveLayout(getRootNode());
      }, 500);
    }
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
