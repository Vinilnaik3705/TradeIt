const apiKey = '';
const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NIFTY']; 

async function getStockData(symbol) {
  const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
  const data = await res.json();
  return {
    symbol: symbol,
    price: data.c,
    high: data.h,
    low: data.l,
  };
}

async function loadStocks() {
  const container = document.getElementById("stock-list");
  for (let symbol of symbols) {
    const stock = await getStockData(symbol);
    const item = document.createElement("li");
    item.innerHTML = `<strong>${stock.symbol}</strong> - Price: $${stock.price} | High: $${stock.high} | Low: $${stock.low}`;
    container.appendChild(item);
  }
}

window.onload = loadStocks;