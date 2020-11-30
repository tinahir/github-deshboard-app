/** @jsxImportSource @emotion/react */
import * as React from "react";
import css from "@styled-system/css";

type Props = {
  children: string;
};

const MessageBox: React.FunctionComponent<Props> = ({ children }) => (
  <div
    css={css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      my: 8,
      mx: 5,
    })}
  >
    <div
      css={css({
        fontSize: [4, 6, 8],
        color: "gray.900",
        textAlign: "center",
      })}
    >
      {children}
    </div>
  </div>
);

export default MessageBox;
