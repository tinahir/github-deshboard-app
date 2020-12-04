/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import Header from "@components/Header";

type Props = {
  children: JSX.Element;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Header></Header>

      <div
        css={css({
          position: "relative",
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
              px: [2, 3, 5],
              py: 5,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
