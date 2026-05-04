import { Input, Row, Col, Avatar, Typography, Space, Tag, theme } from "antd";
import { SearchOutlined, CloseOutlined, FireOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import SparkLineChart from "../features/coins/SparkLineChart";
import api from "../services/api";

const { Text } = Typography;

function SearchBox() {
  const [trending, setTrending] = useState([]);
  const [coinDetail, setCoinDetail] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState("trending");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debounceRef = useRef(null);

  const hoverTimeout = useRef(null);
  const cache = useRef({});
  const lastId = useRef(null);

  const { token } = theme.useToken();

  // API trending
  const fetchTrending = async () => {
    const res = await api.get("/search/trending");
    setTrending(res.data?.coins?.slice(0, 6).map((c) => c.item) || []);
  };

  // API detail + cache
  const fetchDetail = async (id) => {
    if (cache.current[id]) {
      const { detail, chart } = cache.current[id];
      setCoinDetail(detail);
      setChartData(chart);
      return;
    }

    try {
      const [detailRes, chartRes] = await Promise.all([
        api.get(`/coins/${id}`),
        api.get(`/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: 7 },
        }),
      ]);

      const prices = chartRes.data.prices.map((p) => p[1]);

      cache.current[id] = {
        detail: detailRes.data,
        chart: prices,
      };

      setCoinDetail(detailRes.data);
      setChartData(prices);
    } catch (err) {
      if (err.response?.status !== 429) console.error(err);
    }
  };

  useEffect(() => {
    fetchTrending();
    return () => clearTimeout(hoverTimeout.current);
  }, []);

  const handleHover = (coin) => {
    if (lastId.current === coin.id) return;
    lastId.current = coin.id;

    setSelectedId(coin.id);

    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      fetchDetail(coin.id);
    }, 200);
  };

  const handleSearch = (value) => {
    setQuery(value);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setSearchResult([]);
        return;
      }

      try {
        const res = await api.get("/search", {
          params: { query: value },
        });

        setSearchResult(res.data.coins || []);
      } catch (err) {
        console.error(err);
      }
    }, 400);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* INPUT */}
      <Input
        placeholder="Search Token, Dex Pairs, NFT..."
        prefix={<SearchOutlined />}
        onFocus={() => setOpen(true)}
        variant="outlined"
        style={{ width: 320, borderRadius: 999 }}
      />

      {/* POPUP */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 45,
            right: 0,
            width: 860,
            background: token.colorBgElevated,
            color: token.colorText,
            borderRadius: 12,
            boxShadow: token.boxShadowSecondary,
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 14px",
              borderBottom: `1px solid ${token.colorBorder}`,
            }}
          >
            <Input
              variant="borderless"
              prefix={<SearchOutlined />}
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <CloseOutlined
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* BODY */}
          <Row style={{ height: 460 }}>
            {/* LEFT */}
            <Col
              style={{
                width: "60%",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: 0,
                borderRight: `1px solid ${token.colorBorder}`,
              }}
            >
              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "6px 10px",
                  borderBottom: `1px solid ${token.colorBorder}`,
                }}
              >
                <Tag
                  color={activeTab === "trending" ? "green" : "default"}
                  onClick={() => setActiveTab("trending")}
                >
                  <FireOutlined /> Trending
                </Tag>
                <Tag>NFTs</Tag>
                <Tag>Categories</Tag>
              </div>

              {/* Section */}
              <div
                style={{
                  padding: "4px 10px",
                  fontSize: 11,
                  color: token.colorTextSecondary,
                  background: token.colorBgContainer,
                  marginBottom: 2,
                }}
              >
                Trending Search 🔥
              </div>

              {/* LIST */}
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  padding: "4px 6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {(query ? searchResult : trending).map((item) => {
                  const isTrending = !query;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => handleHover(item)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 60px 70px",
                        alignItems: "center",
                        padding: "6px 10px",
                        borderRadius: 6,
                        cursor: "pointer",
                        background:
                          selectedId === item.id
                            ? token.colorBgTextHover
                            : "transparent",
                        transition: "all 0.2s",
                      }}
                    >
                      {/* LEFT */}
                      <Space size={8}>
                        <Avatar
                          src={isTrending ? item.small : item.thumb}
                          size={20}
                        />
                        <Text style={{ fontSize: 13 }}>{item.name}</Text>
                      </Space>

                      {/* SYMBOL */}
                      <Text
                        type="secondary"
                        style={{ fontSize: 11, textAlign: "right" }}
                      >
                        {item.symbol.toUpperCase()}
                      </Text>

                      {/* RIGHT */}
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: "right",
                          color: isTrending
                            ? item.data?.price_change_percentage_24h?.usd > 0
                              ? token.colorSuccess
                              : token.colorError
                            : token.colorTextSecondary,
                        }}
                      >
                        {isTrending
                          ? `${Math.abs(
                              item.data?.price_change_percentage_24h?.usd || 0,
                            ).toFixed(2)}%`
                          : `#${item.market_cap_rank || "N/A"}`}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </Col>

            {/* RIGHT */}
            <Col
              style={{
                width: 260,
                flexShrink: 0,
                padding: 16,
                height: "100%",
                overflow: "hidden",
              }}
            >
              {coinDetail ? (
                <>
                  <Text strong style={{ fontSize: 16 }}>
                    {coinDetail.name} Stats
                  </Text>

                  <div style={{ marginTop: 12 }}>
                    {[
                      ["Rank", `#${coinDetail.market_cap_rank}`],
                      [
                        "Price",
                        `$${coinDetail.market_data.current_price.usd.toLocaleString()}`,
                      ],
                      [
                        "24h%",
                        `${coinDetail.market_data.price_change_percentage_24h.toFixed(
                          2,
                        )}%`,
                      ],
                      [
                        "Market Cap",
                        `$${coinDetail.market_data.market_cap.usd.toLocaleString()}`,
                      ],
                      [
                        "24h Volume",
                        `$${coinDetail.market_data.total_volume.usd.toLocaleString()}`,
                      ],
                    ].map(([label, value], i) => (
                      <Row
                        key={i}
                        justify="space-between"
                        style={{
                          padding: "8px 0",
                          borderBottom:
                            i !== 4 ? `1px solid ${token.colorBorder}` : "none",
                        }}
                      >
                        <Text type="secondary">{label}</Text>
                        <Text>{value}</Text>
                      </Row>
                    ))}
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <Text type="secondary">Last 7 Days</Text>
                    <SparkLineChart data={chartData} />
                  </div>
                </>
              ) : (
                <Text type="secondary">Hover coin to view</Text>
              )}
            </Col>
          </Row>

          {/* FOOTER */}
          <div
            style={{
              padding: 10,
              borderTop: `1px solid ${token.colorBorder}`,
              fontSize: 12,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
