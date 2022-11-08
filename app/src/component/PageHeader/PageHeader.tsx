import { styled } from "@stitches/react";
import { Flex } from "../Flex";

export const PageHeader = styled(Flex, {
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "100%",
  position: "absolute",
  top: -10,
  left: -10,
  padding: 5,
});
