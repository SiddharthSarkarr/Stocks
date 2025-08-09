const axios = require('axios');

const fetchStock = async (symbols) => {
  const apiKey = process.env.API_KEY;
  const result = {};

  for (const symbol of symbols) {
    const res = await axios.get(
    //   `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=360min&apikey=${"XQZT9RZLQHSSS0B8"}`
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${"XQZT9RZLQHSSS0B8"}`
    );
    result[symbol] = res.data;
  }

  return result;
};

module.exports = fetchStock;
