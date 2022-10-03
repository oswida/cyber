import { styled } from "~/common";

export const RollInfo = styled("div", {
  border: `solid 1px $green`,
  padding: 10,
  borderRadius: 5,
  position: "relative",
});

export const RollButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  height: "100%",

  justifyContent: "center",
});

export const RollHistoryRoot = styled("div", {
  border: "1px solid $darkblue",
  borderRadius: 5,
  padding: 5,
  height: 150,
  width: "99%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
});
