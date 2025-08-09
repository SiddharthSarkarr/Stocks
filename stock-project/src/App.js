import logo from './logo.svg';
import './App.css';
import DarkModeToggle from './theme/DarkModeToggle';
import StockSearch from './components/StockSearch';
import StockChart from './components/StockChart';
import ExportCSV from './components/ExportCSV';
import { useState } from 'react';

function App() {

    const [stockData, setStockData] = useState({});
    const [symbols, setSymbols] = useState([]);  
    //IBM, SBI,  AAPL, TSLA
  return (
    <div className='app-container'>
      <div className='search-row'>
        <StockSearch setStockData={setStockData} setSymbols={setSymbols} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ExportCSV stockData={stockData} symbols={symbols}/>
          <DarkModeToggle />
        </div>
      </div>

      <StockChart stockData={stockData} symbols={symbols} />
      </div>
  );
}

export default App;

