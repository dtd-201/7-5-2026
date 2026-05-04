import { ConfigProvider, theme, Layout, App as AntdApp } from "antd";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Exchange from "./pages/Exchange";
import Watchlist from "./pages/Watchlist";

const { Content: AntContent, Footer: AntFooter } = Layout;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <Layout style={{ minHeight: "100vh" }}>
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          <AntContent style={{ padding: "24px" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </AntContent>

          <Footer isDarkMode={isDarkMode} />
          <AntFooter style={{ textAlign: "center" }}>CoinHub ©2026</AntFooter>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
