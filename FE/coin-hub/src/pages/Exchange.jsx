import "../index.css";
import { Table, Select } from "antd";
import { BankOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useExchanges } from "../features/Exchange/useExchanges";
import { columns } from "../features/Exchange/columns";

function Exchange() {
  const { data, isLoading, error } = useExchanges();

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Top Crypto Exchanges Ranked by Trust Score
      </h2>

      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        As of today, we track 180 crypto exchanges with a total 24h trading
        volume of $105 Billion, a -19.27% change in the last 24 hours.
        Currently, the 3 largest cryptocurrency exchanges are Binance, Coinbase
        Exchange, and Bybit. Total tracked crypto exchange reserves currently
        stands at $257 Billion.
      </p>

      {/* NAV BAR */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-green-100 text-green-600 font-medium">
            <BankOutlined />
            Crypto Exchanges
          </div>

          <span className="text-gray-600 cursor-pointer">
            Decentralized Exchanges
          </span>
          <span className="text-gray-600 cursor-pointer">Derivatives</span>
          <span className="text-gray-600 cursor-pointer">Perp DEXs</span>
          <span className="text-gray-600 cursor-pointer">Exchange API</span>
        </div>

        <Select
          defaultValue="all"
          style={{ width: 180 }}
          options={[{ value: "all", label: "All Countries" }]}
        />
      </div>

      {/* 🔥 ERROR */}
      {error && (
        <div className="text-red-500 mb-4">Failed to load exchange data</div>
      )}

      {/* 🔥 TABLE */}
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
        pagination={false}
      />

      {/* 🔥 BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-gray-200 hover:bg-gray-300 p-3 rounded-lg shadow"
      >
        <ArrowUpOutlined />
      </button>
    </div>
  );
}

export default Exchange;
