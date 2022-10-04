import { styled } from "~/common";

export const RollInfo = styled("div", {
  border: `solid 1px $green`,
  marginTop: 10,
  padding: 10,
  borderRadius: 5,
  width: "90%",
  position: "relative",
});

export const RollButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  justifyContent: "center",
});

export const RollHistoryRoot = styled("div", {
  border: "1px solid $darkblue",
  borderRadius: 5,
  padding: 5,
  height: 200,
  width: "calc(100% - 10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  flex: 1,
});
