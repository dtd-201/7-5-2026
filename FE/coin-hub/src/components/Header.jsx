import React from "react";
import { Layout, Menu, theme, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

const { Header: AntHeader } = Layout;

function Header({ isDarkMode, setIsDarkMode }) {
  const items = [
    {
      key: "/home",
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "/exchange",
      label: <Link to="/exchange">Exchanges</Link>,
    },
    {
      key: "/watchlist",
      label: <Link to="/watchlist">Watchlist</Link>,
    },
  ];
  const {
    token: { colorBgElevated, colorText },
  } = theme.useToken();

  return (
    <AntHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: colorBgElevated,
        borderBottom: isDarkMode ? "1px solid #333" : "1px solid #f0f0f0",
        padding: "0 20px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", marginRight: 24 }}>
        <img
          src="/coingecko-api-favicon.svg"
          style={{ width: 35, marginRight: 8 }}
          alt="CoinHub Logo"
        />
        <span style={{ color: colorText, fontWeight: "bold", fontSize: 18 }}>
          CoinHub
        </span>
      </div>

      {/* Menu */}
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          borderBottom: "none",
          background: "transparent",
        }}
      />

      {/* Right side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginRight: "50px",
        }}
      >
        {/* Search */}
        <SearchBox isDarkMode={isDarkMode} />

        {/* Dark mode toggle */}
        <Switch
          checked={isDarkMode}
          onChange={(checked) => setIsDarkMode(checked)}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </div>
    </AntHeader>
  );
}

export default Header;
