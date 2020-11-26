/** @jsxImportSource @emotion/react */
import { ThemeProvider } from "@emotion/react";
import Layout from "./components/Layout";

const theme = {
  colors: {
    primary: "hotpink",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <div css={(theme: any) => ({ color: theme.colors.primary })}>
          <a href="#"> TEST</a>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
