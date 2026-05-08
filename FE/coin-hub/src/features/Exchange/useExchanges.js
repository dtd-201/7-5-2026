import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// ✅ deterministic sparkline (KHÔNG random)
const generateSparkline = (seed = 50, key = "") => {
    let value = seed;

    // 👉 tạo hash từ id
    const hash = key
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const arr = [];

    for (let i = 0; i < 20; i++) {
        const change =
            Math.sin(i / 2 + hash) * 2 +
            Math.cos(i / 3 + hash) * 1;

        value += change;
        arr.push(Math.max(value, 0));
    }

    return arr;
};

// ✅ fetch + gắn sparkline
const fetchExchanges = async () => {
    const res = await axios.get(
        "https://api.coingecko.com/api/v3/exchanges"
    );

    return res.data
        .sort((a, b) => b.trust_score - a.trust_score)
        .map((item) => ({
            ...item,
            sparkline: generateSparkline(item.trust_score, item.id),
        }));
};

// ✅ hook
const useExchanges = () => {
    return useQuery({
        queryKey: ["exchanges"],
        queryFn: fetchExchanges,
        staleTime: 1000 * 60 * 5,
    });
};

export { useExchanges };