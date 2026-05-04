import {
  PieChartOutlined,
  WalletOutlined,
  LineChartOutlined,
  DatabaseOutlined,
  FileOutlined,
  GiftOutlined,
  BellOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
const { Sider } = Layout;

function Sidebar() {
  const items = [
    { key: "1", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "2", icon: <WalletOutlined />, label: "Portfolio" },
    { key: "3", icon: <LineChartOutlined />, label: "Market" },
    { key: "4", icon: <DatabaseOutlined />, label: "Staking" },
    { key: "5", icon: <FileOutlined />, label: "All files" },
    { key: "6", icon: <GiftOutlined />, label: "Rewards" },
    {
      key: "sub1",
      label: "Activities",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "History" },
        { key: "10", label: "Reports" },
      ],
    },
    { key: "7", icon: <BellOutlined />, label: "Notifications" },
    { key: "8", icon: <SettingOutlined />, label: "Settings" },
  ];

  return (
    <Sider
      width={250}
      theme="dark"
      style={{ minHeight: "100vh", borderRadius: "24px", overflow: "hidden" }}
    >
      <div className="flex items-center gap-[10px] pl-[28px] pr-4 py-6 cursor-pointer">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 19L22 16V13L3 16V19Z" fill="#ea580c" />
          <path d="M5 14L19 11.5V9.5L5 12V14Z" fill="#f97316" />
          <path d="M7 10.5L16 9V7.5L7 9V10.5Z" fill="#fdba74" />
        </svg>

        <div className="flex flex-col justify-center gap-[5px]">
          <span
            className="text-[20px] font-bold tracking-wide"
            style={{ color: "#ffffff", lineHeight: "1" }}
          >
            Bitgrow
          </span>
          <span
            className="text-[12px] font-medium mt-1.5"
            style={{ color: "#6b7280", lineHeight: "1" }}
          >
            Staking assets
          </span>
        </div>
      </div>
      <Menu mode="inline" theme="dark" items={items} />
    </Sider>
  );
}

export default Sidebar;
