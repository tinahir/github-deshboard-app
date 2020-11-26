/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type Props = {
  children: JSX.Element;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div
      css={css`
        position: relative;
        --bg-opacity: 1;
        background-color: rgba(255, 255, 255, var(--bg-opacity));
        min-height: 100vh;
      `}
    >
      {children}
    </div>
  );
};

export default Layout;
