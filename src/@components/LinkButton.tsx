/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LinkButton = styled(Link)(
  css({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 5,
    py: 3,
    borderWidth: 1,
    borderColor: "transparent",
    fontWeight: 600,
    borderRadius: "medium",
    bg: "blue.700",
    color: "rgba(255,255,255,1)",
    fontSize: 3,
    lineHeight: 1.5,
    cursor: "pointer",
    textDecoration: "none",
    ":hover, :focus": { bg: "blue.500" },
  })
);

export default LinkButton;
