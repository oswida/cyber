import { PropsWithChildren } from "react";
import { styled } from "~/common";
import { Overlay } from "../Overlay";

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

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose?: () => void;
  opacity?: "less" | "more" | "full";
};

export const Modal = ({ children, isOpen, onClose, opacity }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Overlay id="overlay" opacity={opacity}>
          {children}
          {onClose !== undefined && (
            <CloseButton onClick={onClose} title="Close">
              ×
            </CloseButton>
          )}
        </Overlay>
      )}
    </>
  );
};
