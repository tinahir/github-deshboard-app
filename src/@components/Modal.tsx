/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { HiX } from "react-icons/hi";

type Props = {
  title: string;
  isOpen: boolean;
  onDismiss: () => void;
  className?: string;
  children: React.ReactNode;
};

const Modal = (props: Props) => (
  <DialogOverlay
    css={css({ zIndex: 10 })}
    isOpen={props.isOpen}
    onDismiss={props.onDismiss}
  >
    <DialogContent
      aria-label="content"
      css={css({
        width: [`100vw`, `100vw`, `45em`],
        height: [`100vh`, `100vh`, `auto`],
        position: [`fixed`, `fixed`, `relative`],
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        mx: [0, 0, "auto"],
        my: [0, 0, "10vh"],
        overflow: `hidden`,
        p: 0,
      })}
      className={props.className}
    >
      <div
        css={css({
          p: 3,
          backgroundColor: `white`,
          borderBottom: `1px inset grey`,
          borderBottomColor: `gray.300`,
          height: `57px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        {props.title && <h2>{props.title}</h2>}
        <button
          css={css({
            color: `gray.400`,
            bg: "transparent",
            zIndex: 2,
            "&:hover, &:focus": {
              outline: `none`,
              color: `blue.600`,
            },
          })}
          onClick={props.onDismiss}
        >
          <span aria-hidden>
            <HiX size="24" />
          </span>
        </button>
      </div>
      {props.children}
    </DialogContent>
  </DialogOverlay>
);

export default Modal;
