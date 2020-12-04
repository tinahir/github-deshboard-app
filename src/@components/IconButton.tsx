/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import styled from "@emotion/styled";

const IconButton = styled.button(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    fontWeight: 500,
    borderRadius: "medium",
    bg: "transparent",
    color: "blue.600",
    ":hover, :focus": {
      color: "blue.400",
    },
    svg: {
      width: 6,
      height: 6,
    },
    fontSize: 3,
    lineHeight: 1.5,
    cursor: "pointer",
    outline: 0,
    ":active": {
      transform: "scale(0.90)",
    },
  })
);

export default IconButton;
