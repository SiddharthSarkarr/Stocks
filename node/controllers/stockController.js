const fetchStock = require('../utils/fetchStock');

exports.getStockData = async (req, res) => {
  const { symbols } = req.body;
  try {
    const data = await fetchStock(symbols);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};
