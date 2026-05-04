import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

function SparkLineChart({ data = [], isUp }) {
  const safeData = Array.isArray(data)
    ? data
    : typeof data === "string"
      ? data.split(",").map(Number)
      : [];

  const formattedData = safeData.map((price, index) => ({
    index,
    price,
  }));

  const autoIsUp =
    safeData.length > 1 && safeData[safeData.length - 1] > safeData[0];

  const finalIsUp = isUp ?? autoIsUp;

  const color = finalIsUp ? "#16c784" : "#ea3943";

  return (
    <ResponsiveContainer width="100%" height={70}>
      <LineChart data={formattedData}>
        <YAxis domain={["dataMin", "dataMax"]} hide />

        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SparkLineChart;
