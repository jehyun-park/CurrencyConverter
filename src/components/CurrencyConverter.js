import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CurrencyConverter.css';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [amount, setAmount] = useState();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(`${API_URL}${fromCurrency}`);
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('환율 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function convertCurrency() {
    if (!exchangeRates || !exchangeRates[toCurrency]) return 0;
    return (amount * exchangeRates[toCurrency]).toFixed(2);
  }

  return (
    <div className="currency-converter">
      <h1>환율 계산기</h1>
      <div className="select-container">
        <div>
          <label htmlFor="from-currency">From</label>
          <select
            id="from-currency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KRW">KRW</option>
            <option value="JPY">JPY</option>
            <option value="PHP">PHP</option>
          </select>
        </div>
        <div>
          <label htmlFor="to-currency">To</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KRW">KRW</option>
            <option value="JPY">JPY</option>
            <option value="PHP">PHP</option>
          </select>
        </div>
      </div>

      <div className="amount-container">
        <label htmlFor="amount">금액:</label>
        <input
          id="amount"
          type="number"
          min="0"
          value={amount}
          onChange={handleAmountChange}
        />
        <p>
          {amount} {fromCurrency} = {convertCurrency()} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
