import React, { useState } from 'react';
import axios from 'axios';

const StockSearch = ({ setStockData, setSymbols }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    const symbols = input.split(',').map(s => s.trim().toUpperCase());
    const res = await axios.post(
      //'http://localhost:5000/api/stocks/fetch',
      'https://stocks-as5n.onrender.com/api/stocks/fetch',
      { symbols },
      {
        headers: { Authorization: 'Bearer login-token' },
      }
    );
    // console.log("res",res)
    setStockData(res?.data);
    setSymbols(symbols);
  };

  return (
    <div>
      <input
        className='input-box'
        placeholder='Enter stock name'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className="search-button" onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default StockSearch;

