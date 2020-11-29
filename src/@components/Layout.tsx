/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import Header from "@components/Header";

type Props = {
  children: JSX.Element;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div
      css={css({
        position: "relative",
        bg: "gray.100",
        minHeight: "100vh",
      })}
    >
      <div
        css={css({
          maxWidth: "1280px",
          mx: "auto",
        })}
      >
        <div
          css={css({
            width: "100%",
          })}
        >
          <Header></Header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
