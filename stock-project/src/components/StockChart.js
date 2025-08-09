import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const StockChart = ({ stockData, symbols }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!symbols?.length) return null;

  const getTimeSeries = (symbol) => {
    const data = stockData[symbol]?.['Time Series (5min)'] || {};
    const timestamps = Object.keys(data);

    if (timestamps.length === 0) return { labels: [], prices: [] };
    const latestDate = timestamps?.map(ts => ts.split(" ")[0])?.sort((a, b) => new Date(b) - new Date(a))[0];

    const filtered = timestamps?.filter(ts => ts.startsWith(latestDate))?.sort((a, b) => new Date(a) - new Date(b));

    const labels = filtered;
    const prices = filtered.map(ts => parseFloat(data?.[ts]?.['4. close']));

    return { labels, prices };
  };

  const datasets = symbols.map((symbol, i) => {
    const { labels, prices } = getTimeSeries(symbol);
    return {
      label: symbol,
      data: prices,
      fill: false,
      borderColor: isDarkMode ? '#a0a0a0' : '#c5bcbc', 
      backgroundColor: isDarkMode ? '#5a9bd4' : '#2a5b9b',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 5,
      borderWidth: 1
    };
  });

//   console.log("datasets",datasets?.[0]?.data);
//   console.log("isDarkMode:", isDarkMode); 

  const labels = getTimeSeries(symbols[0])?.labels;
  const textColor = isDarkMode ? '#ffffff' : '#222';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: { weight: 'bold' }
        }
      },
      title: {
        display: true,
        text: 'Stock Prices (Latest Day)',
        color: textColor,
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `Price: ₹${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          color: textColor,
          font: { weight: 'bold' }
        },
        ticks: {
          color: textColor,
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: isDarkMode ? '#444444' : '#e0e0e0',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (₹)',
          color: textColor,
          font: { weight: 'bold' }
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: isDarkMode ? '#444444' : '#e0e0e0',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <>
    {datasets?.[0]?.data?.length > 0 ? 
    <Line
      data={{
        labels,
        datasets,
      }}
      options={options}
    />
     : <div className='' style={{color:"red", display:"flex", justifyContent:"center", fontWeight:"bolder", margin:"10px"}}>NO Data Found</div>
    }
    </>
  );
};

export default StockChart;
