document.addEventListener('DOMContentLoaded', () => {
  const homePriceInput = document.getElementById('homePrice');
  const downPaymentInput = document.getElementById('downPayment');
  const mortgageRateInput = document.getElementById('mortgageRate');
  const rentAmountInput = document.getElementById('rentAmount');
  const timeInput = document.getElementById('timeInput');

  const decreaseBtn = document.getElementById('decreaseBtn');
  const increaseBtn = document.getElementById('increaseBtn');
  const calculateBtn = document.getElementById('calculateBtn');

  const buyTotalEl = document.getElementById('buyTotal');
  const rentTotalEl = document.getElementById('rentTotal');
  const comparisonChartEl = document.getElementById('comparisonChart');
  const comparisonTable = document.getElementById('comparisonTable').getElementsByTagName('tbody')[0];

  let chartInstance;

  function calculate() {
    const homePrice = parseFloat(homePriceInput.value) || 0;
    const downPaymentPercent = parseFloat(downPaymentInput.value) || 0;
    const mortgageRate = parseFloat(mortgageRateInput.value) / 100 || 0;
    const rentAmount = parseFloat(rentAmountInput.value) || 0;
    const years = parseInt(timeInput.value) || 1;

    const downPayment = (downPaymentPercent / 100) * homePrice;
    const loanAmount = homePrice - downPayment;
    const monthlyMortgageRate = mortgageRate / 12;
    const months = years * 12;

    // Mortgage payment formula
    const mortgagePayment = loanAmount * (monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, months)) / (Math.pow(1 + monthlyMortgageRate, months) - 1);

    const buyTotal = downPayment + (mortgagePayment * months);
    const rentTotal = rentAmount * months;

    buyTotalEl.textContent = `$${buyTotal.toFixed(2)}`;
    rentTotalEl.textContent = `$${rentTotal.toFixed(2)}`;

    comparisonTable.innerHTML = '';
    const buyTotals = [];
    const rentTotals = [];
    for (let year = 1; year <= years; year++) {
      const annualBuy = downPayment + (mortgagePayment * year * 12);
      const annualRent = rentAmount * year * 12;
      buyTotals.push(annualBuy);
      rentTotals.push(annualRent);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${year}</td>
        <td>$${annualBuy.toFixed(2)}</td>
        <td>$${annualRent.toFixed(2)}</td>
      `;
      comparisonTable.appendChild(row);
    }

    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(comparisonChartEl.getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from({ length: years }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Buy Cost',
            data: buyTotals,
            borderColor: '#24FFDE', // bright blue
            fill: false,
            tension: 0.3,
          },
          {
            label: 'Rent Cost',
            data: rentTotals,
            borderColor: '#0A3D62', // dark blue
            fill: false,
            tension: 0.3,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Buy vs Rent Over Time' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  decreaseBtn.addEventListener('click', () => {
    let value = parseInt(timeInput.value) || 1;
    if (value > 1) timeInput.value = value - 1;
    calculate();
  });

  increaseBtn.addEventListener('click', () => {
    let value = parseInt(timeInput.value) || 1;
    timeInput.value = value + 1;
    calculate();
  });

  calculateBtn.addEventListener('click', calculate);

  // Initial calculation on page load
  calculate();
});
