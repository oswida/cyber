import { PropsWithChildren } from "react";
import { styled } from "~/common";
import { Flex } from "../Flex";
import { Overlay } from "../Overlay";

type Props = PropsWithChildren & {
  onClose?: () => void;
};

const PanelRoot = styled("div", {
  position: "fixed",
  bottom: 4,
  right: 4,
  width: 400,
  height: "calc(100% - 100px)",
  //   border: `solid 1px $green`,
  borderRadius: 10,
  zIndex: 1000,
  backgroundColor: "$background200",
  boxShadow: `-2px -2px 4px 2px #0fff50`,
  padding: 5,
  display: "flex",
  flexDirection: "column",
});

const CloseButton = styled("div", {
  height: 30 * 0.8,
  width: 30,
  color: "$pink",
  fontSize: 25,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
  userSelect: "none",
  position: "absolute",
  top: 10,
  right: 10,
});

export const InfoPanel = ({ onClose, children }: Props) => {
  return (
    <>
      <PanelRoot>
        <>
          {children}
          <CloseButton onClick={onClose} title="Close">
            ×
          </CloseButton>
        </>
      </PanelRoot>
    </>
  );
};
