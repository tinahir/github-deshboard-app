/** @jsxImportSource @emotion/react */
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { tokens } from "./theme";

import Layout from "@components/Layout";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <ThemeProvider theme={tokens}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/:repo" element={<Dashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
