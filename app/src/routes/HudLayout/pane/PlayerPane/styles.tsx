import { styled } from "~/common";
import { Flex, Input } from "~/component";

export const ListRoot = styled("div", {
  border: "1px solid $darkblue",
  borderRadius: 5,
  padding: 5,
  height: 300,
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  flex: 1,
  marginBottom: 10,
  overflowY: "auto",
});

export const ContentRoot = styled("div", {
  background: "$background",
  outline: "none",
  border: "solid 1px $darkblue",
  borderRadius: 5,
  padding: 5,
  height: 100,
});

export const ContentItem = styled(Flex, {
  borderRadius: 5,
  padding: 10,
  width: "calc(100% - 20px)",
  backgroundColor: "$background",
  variants: {
    selected: {
      true: {
        backgroundColor: "$background200",
      },
    },
  },
});

export const PFInput = styled(Input, {
  background: "transparent",
  borderBottom: "solid 1px $darkblue",
  variants: {
    center: {
      true: {
        textAlign: "center",
      },
    },
  },
  marginBottom: 10,
});

export const SelectableItem = styled(Flex, {
  padding: 3,
  borderRadius: 5,
  backgroundColor: "transparent",
  variants: {
    selected: {
      true: {
        backgroundColor: "$background200",
      },
    },
  },
});
