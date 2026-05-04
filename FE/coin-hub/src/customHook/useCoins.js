import { useEffect, useState } from "react";
import api from "../services/api";

function useCoins(page = 1) {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCoins = async () => {
            try {
                setLoading(true);
                const res = await api.get("/coins/markets", {
                    params: {
                        vs_currency: "usd",
                        price_change_percentage: "1h,24h,7d",
                        order: "market_cap_desc",
                        per_page: 20,
                        page,
                        sparkline: true,
                    },
                });
                console.log(res.data);
                setCoins(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        getCoins();
    }, [page]);

    return { coins, loading };
}

export default useCoins;