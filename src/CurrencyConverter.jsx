import React, { useEffect, useState } from "react";

function Currency() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [curr, setCurr] = useState({});
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);

  const url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_g5Ds0dxjF3jAakQVLeaaCJaPnVyb00rXBzJxVFiI";

  const fetchURL = async () => {
    try {
      const response = await fetch(url);
      const d = await response.json();
      setCurr(d["data"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchURL();
  }, []);

  useEffect(() => {
    let fromCurr = curr[from];
    let toCurr = curr[to];
    if (fromCurr && toCurr) {
      let fromValue = fromCurr.value;
      let toValue = toCurr.value;
      setResult((amount * toValue / fromValue).toFixed(2));
    }
  }, [from, to, amount, curr]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Currency Converter
        </h1>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <select
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">From</option>
            {Object.keys(curr).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">To</option>
            {Object.keys(curr).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Converted Amount:{" "}
            <span className="text-blue-600 font-bold">{result}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Currency;
