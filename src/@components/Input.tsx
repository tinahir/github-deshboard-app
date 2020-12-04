/** @jsxImportSource @emotion/react */
import css from "@styled-system/css";
import styled from "@emotion/styled";

const Input = styled("input")(
  css({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    appearance: "none",
    px: 3,
    py: 3,
    borderWidth: 2,
    borderColor: "gray.300",
    bg: "white",
    fontWeight: 500,
    borderRadius: "medium",
    fontSize: 3,
    lineHeight: 1.5,
    outlineColor: "blue.500",
  })
);

export default Input;
