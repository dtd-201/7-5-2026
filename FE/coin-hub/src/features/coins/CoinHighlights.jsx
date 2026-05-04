import {
  App,
  Avatar,
  Card,
  Col,
  List,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import "../../styles/ListCoin.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FireFilled,
  RocketFilled,
} from "@ant-design/icons";
import useCoins from "../../customHook/useCoins";
import SparkLineChart from "./SparkLineChart";

const { Title, Text } = Typography;

function CoinHighlights() {
  const { message } = App.useApp();

  const [globalData, setGlobalData] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { coins, loading: coinsLoading } = useCoins(1);

  const [marketCapHistory, setMarketCapHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);

  const topGainers = (coins || [])
    .filter((c) => c?.price_change_percentage_24h_in_currency > 0)
    .sort(
      (a, b) =>
        (b?.price_change_percentage_24h_in_currency || 0) -
        (a?.price_change_percentage_24h_in_currency || 0),
    )
    .slice(0, 3);

  const getCoinHightlightsData = async () => {
    try {
      setLoading(true);

      const [globalRes, trendingRes] = await Promise.all([
        api.get("/global"),
        api.get("/search/trending"),
      ]);

      setGlobalData(globalRes?.data?.data || null);
      setTrendingCoins(trendingRes?.data?.coins?.slice(0, 3) || []);
    } catch (error) {
      message.error("Đã xảy ra lỗi vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const getChartData = async () => {
    try {
      const res = await api.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: true,
        },
      });

      const coins = res.data;

      const length = coins[0].sparkline_in_7d.price.length;

      let marketHistory = new Array(length).fill(0);

      coins.forEach((coin) => {
        coin.sparkline_in_7d.price.forEach((p, i) => {
          marketHistory[i] += p;
        });
      });

      setMarketCapHistory(marketHistory);

      // volume (fake tương tự)
      const volumes = coins.map((c) => c.total_volume);
      setVolumeHistory(volumes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoinHightlightsData();
    getChartData();
  }, []);

  // format tiền
  const formatCurrency = (value) => {
    if (!value) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // % change
  const PercentageChange = ({ value = 0 }) => {
    const isPositive = value >= 0;
    const color = isPositive ? "#16c784" : "#ea3943";

    return (
      <Text style={{ color, fontWeight: 600 }}>
        {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
        {Math.abs(value).toFixed(1)}%
      </Text>
    );
  };

  return (
    <section>
      <Row gutter={[16, 16]}>
        {/* Market Cap */}
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ height: "100%", borderRadius: "12px" }}
            styles={{ body: { padding: "20px" } }}
          >
            <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
              {globalData && (
                <>
                  <Title level={3}>
                    {formatCurrency(globalData.total_market_cap?.usd)}
                  </Title>

                  <SparkLineChart
                    data={marketCapHistory}
                    isUp={globalData.market_cap_change_percentage_24h_usd >= 0}
                  />

                  <Space>
                    <Text type="secondary">Market Cap</Text>
                    <PercentageChange
                      value={
                        globalData.market_cap_change_percentage_24h_usd ?? 0
                      }
                    />
                  </Space>
                </>
              )}
            </Skeleton>
          </Card>
        </Col>

        {/* Volume */}
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ height: "100%", borderRadius: "12px" }}
            styles={{ body: { padding: "20px" } }}
          >
            <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
              {globalData && (
                <>
                  <Title level={3}>
                    {formatCurrency(globalData.total_volume?.usd)}
                  </Title>

                  <SparkLineChart
                    data={volumeHistory}
                    isUp={
                      volumeHistory.length > 1 &&
                      volumeHistory[volumeHistory.length - 1] >=
                        volumeHistory[0]
                    }
                  />

                  <Text type="secondary">24h Trading Volume</Text>
                </>
              )}
            </Skeleton>
          </Card>
        </Col>

        {/* Trending */}
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ height: "100%", borderRadius: "12px" }}
            styles={{ body: { padding: "20px" } }}
          >
            <Space style={{ marginBottom: 16 }}>
              <FireFilled style={{ color: "#f56a00" }} />
              <Text strong>Trending</Text>
            </Space>

            <Skeleton loading={loading} active avatar paragraph={{ rows: 2 }}>
              {(Array.isArray(trendingCoins) ? trendingCoins : []).map(
                (item, index) => {
                  const coin = item?.item;
                  if (!coin) return null;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                      }}
                    >
                      <Space>
                        <Avatar src={coin.thumb} size="small" />
                        <Text strong>{coin.name}</Text>
                      </Space>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Text strong>
                          {coin.data?.price
                            ? `$${coin.data.price.toLocaleString()}`
                            : "N/A"}
                        </Text>
                        <br />
                        <PercentageChange
                          value={
                            coin.data?.price_change_percentage_24h?.usd ?? 0
                          }
                        />
                      </div>
                    </div>
                  );
                },
              )}
            </Skeleton>
          </Card>
        </Col>

        {/* Top Gainers */}
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{ height: "100%", borderRadius: "12px" }}
            styles={{ body: { padding: "20px" } }}
          >
            <Space style={{ marginBottom: 16 }}>
              <RocketFilled style={{ color: "#eb2f96" }} />
              <Text strong>Top Gainers</Text>
            </Space>

            <Skeleton
              loading={coinsLoading}
              active
              avatar
              paragraph={{ rows: 2 }}
            >
              {topGainers.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                  }}
                >
                  <Space>
                    <Avatar src={item.image} size="small" />
                    <Text strong>{item.name}</Text>
                  </Space>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Text strong>
                      $
                      {item.current_price?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                    <br />
                    <PercentageChange
                      value={item.price_change_percentage_24h_in_currency ?? 0}
                    />
                  </div>
                </div>
              ))}
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default CoinHighlights;
