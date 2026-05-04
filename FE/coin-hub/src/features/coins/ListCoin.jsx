import { Avatar, Table } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import useCoins from "../../customHook/useCoins";
import { useContext, useState } from "react";
import SparkLineChart from "./SparkLineChart";
import { FavoriteContext } from "../../context/FavoriteContext";

function ListCoin() {
  const [page, setPage] = useState(1);

  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const columns = [
    {
      title: "",
      width: 60,
      fixed: "left",
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
      width: 100,
      render: (_, __, index) => (page - 1) * 20 + index + 1,
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
      sorter: (a, b) => a.current_price - b.current_price,
      render: (price) => (
        <div className="price-cell">
          <button className="buy-btn">Buy</button>
          <span className="price-text">${price.toLocaleString()}</span>
        </div>
      ),
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
  ];

  const { coins, loading } = useCoins(page);

  return (
    <Table
      className="custom-table"
      pagination={{
        current: page,
        pageSize: 20,
        total: 100,
        onChange: (p) => setPage(p),
      }}
      columns={columns}
      dataSource={coins}
      rowKey="id"
      loading={loading}
    />
  );
}

export default ListCoin;
