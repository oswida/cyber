import { styled } from "@stitches/react";
import { Flex } from "~/component";

export const PageHeader = styled(Flex, {
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  width: "100%",
  maxWidth: "100vw",
  paddingLeft: 10,
  paddingRight: 10,
  position: "absolute",
  top: 0,
});
