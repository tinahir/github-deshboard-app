/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

const Header: React.FunctionComponent = () => {
  return (
    <div
      css={css({
        px: 5,
        pt: 5,
      })}
    >
      <nav
        css={css({
          display: "flex",
          alignItems: "center",
          height: 10,
        })}
      >
        <div
          css={css({
            width: "flex",
            alignItems: "center",
          })}
        >
          <Link to="/">
            <FiGithub size="40" color="blue" />
          </Link>
        </div>
        <div
          css={css({
            ml: 5,
          })}
        >
          <Link
            to="/"
            css={css({
              textDecoration: "none",
              color: "blue.600",
              fontWeight: 500,
            })}
          >
            Home
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
