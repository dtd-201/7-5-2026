import { Tag, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import SparkLineChart from "../coins/SparkLineChart";

// ✅ format USD chuẩn
const formatCurrency = (value) => {
  if (value == null) return "-";
  return "$" + Number(value).toLocaleString();
};

// ✅ cache sparkline
const sparklineCache = new Map();

const getSparkline = (record) => {
  if (!record?.id) return [];

  if (sparklineCache.has(record.id)) {
    return sparklineCache.get(record.id);
  }

  let value = record.trust_score || 50;
  const arr = [];

  for (let i = 0; i < 20; i++) {
    const change = Math.sin(i / 2) * 2;
    value += change;
    arr.push(Math.max(value, 0));
  }

  sparklineCache.set(record.id, arr);
  return arr;
};

// ✅ volume helper
const getVolumeUSD = (record) => {
  const value =
    record?.trade_volume_24h_btc_normalized ?? record?.trade_volume_24h_btc;

  if (value == null) return null;

  const BTC_PRICE = 65000;
  return value * BTC_PRICE;
};

// ✅ columns definition
const columns = [
  {
    title: "#",
    key: "rank",
    render: (_, record) => (
      <span className="text-gray-500">{record?.trust_score_rank ?? "-"}</span>
    ),
    width: 60,
  },

  {
    title: "Exchange",
    dataIndex: "name",
    key: "exchange",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record?.image}
          alt={record?.name}
          className="w-6 h-6 rounded-full"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/24?text=E";
          }}
        />
        <span className="font-semibold">{record?.name}</span>
      </div>
    ),
  },

  {
    title: (
      <div className="flex items-center gap-1">
        Trust Score
        <Tooltip title="CoinGecko Trust Score">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    dataIndex: "trust_score",
    key: "trust_score",
    render: (score) => (
      <Tag className="bg-green-100 text-green-600 border-none font-semibold">
        {score != null ? `${score}/10` : "-"}
      </Tag>
    ),
    width: 120,
  },

  {
    title: "24h Volume",
    key: "volume",
    render: (_, record) => {
      const usd = getVolumeUSD(record);
      return formatCurrency(usd);
    },
  },

  {
    title: "Last 7 Days",
    key: "chart",
    render: (_, record) => (
      <div style={{ width: 120, height: 60 }}>
        <SparkLineChart data={record.sparkline} />
      </div>
    ),
  },
];

export { columns };
