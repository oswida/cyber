import { PropsWithChildren } from "react";
import { styled } from "~/common";
import { Overlay } from "~/component";

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
  position: "fixed",
  top: 10,
  right: 10,
});

export const Modal = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren & { isOpen: boolean; onClose?: () => void }) => {
  return (
    <>
      {isOpen && (
        <Overlay id="overlay">
          {children}
          {onClose !== undefined && (
            <CloseButton onClick={onClose}>×</CloseButton>
          )}
        </Overlay>
      )}
    </>
  );
};
