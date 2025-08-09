import React from 'react';
import { CSVLink } from 'react-csv';
import { FaFileCsv } from 'react-icons/fa';

const ExportCSV = ({ stockData, symbols }) => {
  const rows = [];

  Object.keys(stockData).forEach(symbol => {
    const series = stockData?.[symbol]?.['Time Series (5min)'];
    for (let time in series) {
      rows?.push({
        Symbol: symbol,
        Time: time,
        Price: series[time]['4. close'],
      });
    }
  });

  const fileName = `${symbols.join('_')}.csv`;

  return (
    <button style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '1px 6px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#f9f9f9',
      cursor: 'pointer'
    }}>
      
      <CSVLink 
        data={rows} 
        // filename='stock.csv' 
        filename = {fileName}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
       <FaFileCsv color="#2d7d2d" size={18} />
      </CSVLink>
    </button>
  );
};

export default ExportCSV;
