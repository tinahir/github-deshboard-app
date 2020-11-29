/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import * as React from "react";
import Input from "@components/Input";
import LinkButton from "@components/LinkButton";

const Home: React.FunctionComponent = () => {
  const [org, setOrg] = React.useState("buzzn");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.trim();
    setOrg(value);
  };
  return (
    <main
      css={css({
        px: [2, 5],
        mt: 9,
      })}
    >
      <div>
        <h1
          css={css({
            fontSize: [7, 9],
            m: 0,
            textAlign: "center",
          })}
        >
          Search Github repos, pull requests and collobrators
        </h1>
        <div
          css={css({
            mt: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: ["column", "row"],
          })}
        >
          <div
            css={css({
              width: ["100%", "60%", "50%"],
            })}
          >
            <Input
              placeholder="Seach Github Organization"
              maxLength={64}
              value={org}
              onChange={handleChange}
            />
          </div>
          <div
            css={css({
              ml: [0, 4],
              mt: [4, 0],
              width: ["100%", "auto"],
            })}
          >
            <LinkButton to={`/dashboard/${org}`}>
              Lunch Repository Dashboard
            </LinkButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
