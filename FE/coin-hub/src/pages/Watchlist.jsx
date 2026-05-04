import { Avatar, Button, Popconfirm, Table } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import useCoins from "../customHook/useCoins";
import SparkLineChart from "../features/coins/SparkLineChart";

import { Typography } from "antd";
const { Title } = Typography;

function Watchlist() {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const { coins, loading } = useCoins(1);

  // lọc coin yêu thích
  const favoriteCoins = coins.filter((coin) => favorites.includes(coin.id));

  const columns = [
    {
      title: "",
      width: 60,
      render: (_, record) => {
        const isFav = favorites.includes(record.id);

        return (
          <span
            onClick={() => toggleFavorite(record.id)}
            style={{ cursor: "pointer" }}
          >
            {isFav ? (
              <StarFilled style={{ color: "#fadb14" }} />
            ) : (
              <StarOutlined />
            )}
          </span>
        );
      },
    },

    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },

    {
      title: "Coin",
      dataIndex: "name",
      render: (_, record) => (
        <div className="coin-cell">
          <Avatar src={record.image} />
          <span className="coin-name">
            {record.name} ({record.symbol.toUpperCase()})
          </span>
        </div>
      ),
    },

    {
      title: "Price",
      dataIndex: "current_price",
      render: (price) => `$${price.toLocaleString()}`,
    },

    {
      title: "1h",
      dataIndex: "price_change_percentage_1h_in_currency",
      render: (v) => {
        const isUp = v > 0;
        return (
          <span style={{ color: isUp ? "green" : "red" }}>
            {isUp ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {v?.toFixed(2)}%
          </span>
        );
      },
    },

    {
      title: "24h",
      dataIndex: "price_change_percentage_24h_in_currency",
      render: (v) => {
        const isUp = v > 0;
        return (
          <span style={{ color: isUp ? "green" : "red" }}>
            {isUp ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {v?.toFixed(2)}%
          </span>
        );
      },
    },

    {
      title: "7d",
      dataIndex: "price_change_percentage_7d_in_currency",
      render: (v) => {
        const isUp = v > 0;
        return (
          <span style={{ color: isUp ? "green" : "red" }}>
            {isUp ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {v?.toFixed(2)}%
          </span>
        );
      },
    },

    {
      title: "Last 7 Days",
      render: (_, record) => (
        <SparkLineChart data={record.sparkline_in_7d?.price || []} />
      ),
    },

    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Remove khỏi Watchlist?"
          onConfirm={() => toggleFavorite(record.id)}
        >
          <Button danger size="small">
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title
        level={2}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <StarFilled style={{ color: "#fadb14" }} />
        Watchlist
      </Title>

      <Table
        columns={columns}
        dataSource={favoriteCoins}
        rowKey="id"
        loading={loading}
        locale={{
          emptyText: "Chưa có coin yêu thích",
        }}
      />
    </div>
  );
}

export default Watchlist;
