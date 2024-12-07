import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCurrencyData() {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch currency data: ${res.status}`);
        }
        const result = await res.json();
        setData(result[currency] || {});
      } catch (err) {
        console.error("Error fetching currency data:", err);
        setError(err.message);
        setData({});
      }
    }

    fetchCurrencyData();
  }, [currency]);

  if (error) {
    console.error("Currency Info Error:", error);
  }

  return data;
}

export default useCurrencyInfo;
