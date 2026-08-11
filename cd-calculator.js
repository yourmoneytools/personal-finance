let initialAmountInput = document.getElementById("initialAmount");
let timeInput = document.getElementById("timeInput");
let interestInput = document.getElementById("interest");
let resultSpan = document.getElementById("result");
let monthsButton = document.getElementById("monthsBtn");
let yearsButton = document.getElementById("yearsBtn");
let calculateButton = document.getElementById("calculateBtn");

let decreaseBtn = document.getElementById("decreaseBtn");
let increaseBtn = document.getElementById("increaseBtn");

decreaseBtn.addEventListener("click", () => {
let current = parseInt(timeInput.value) || 0;
if (current > 0) {
    timeInput.value = current - 1;
    calculateInterest();
}
});

increaseBtn.addEventListener("click", () => {
let current = parseInt(timeInput.value) || 0;
timeInput.value = current + 1;
calculateInterest();
});

// initialAmountInput.addEventListener("input", calculateInterest);
// interestInput.addEventListener("input", calculateInterest);
// timeInput.addEventListener("input", calculateInterest);




let isMonths = true;

monthsButton.addEventListener("click", () => {
    isMonths = true;
    monthsButton.classList.add("active");
    yearsButton.classList.remove("active");
    calculateInterest(); // update chart on unit toggle
});

yearsButton.addEventListener("click", () => {
    isMonths = false;
    yearsButton.classList.add("active");
    monthsButton.classList.remove("active");
    calculateInterest(); // update chart on unit toggle
});

calculateButton.addEventListener("click", () => {
    calculateInterest();
});

let chart;

function calculateInterest() {
    let principal = parseFloat(initialAmountInput.value);
    let time = parseFloat(timeInput.value);
    let annualRate = parseFloat(interestInput.value) / 100;

    if (!principal || !time || !annualRate) {
    alert("Please fill in all fields with valid numbers.");
    return;
    }

    let values = [];
    let labels = [];

    if (isMonths) {
    let totalMonths = time;
    let monthlyRate = annualRate / 12;

    for (let i = 0; i <= totalMonths; i++) {
        let amount = principal * Math.pow(1 + monthlyRate, i);
        values.push(amount.toFixed(2));
        labels.push(`Month ${i}`);
    }
    } else {
    let totalYears = time;

    for (let i = 0; i <= totalYears; i++) {
        let amount = principal * Math.pow(1 + annualRate, i);
        values.push(amount.toFixed(2));
        labels.push(`Year ${i}`);
    }
    }

    let finalAmount = values[values.length - 1];
    resultSpan.innerText = `$${parseFloat(finalAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    })}`;


// 
let tableBody = document.querySelector("#interestTable tbody");
    tableBody.innerHTML = ""; // Clear old rows

    for (let i = 0; i <= time; i++) {
    let amount = parseFloat(values[i]);
    let interestEarned = i === 0 ? 0 : amount - parseFloat(values[i - 1]);

    let periodLabel = isMonths ? `Month ${i}` : `Year ${i}`;
    let row = `
        <tr>
        <td>${periodLabel}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${i === 0 ? "$0.00" : `$${interestEarned.toFixed(2)}`}</td>
        </tr>
    `;
    tableBody.innerHTML += row;
    }
// 


    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = values;
        chart.update();
    } else {
        const ctx = document.getElementById('interestChart').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 255, 211, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: labels,
        datasets: [{
            label: 'Compound Interest Growth',
            data: values,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#24FFDE',
            tension: 0.3
        }]
        },
        options: {
        responsive: true,
        scales: {
            y: {
            beginAtZero: false
            }
        }
        }
    });
    }
}

// 👇 Run once when the page loads
calculateInterest();

// pdf downloader
document.getElementById("downloadPdfBtn").addEventListener("click", function () {
    // Target the content you want to download
    const content = document.querySelector(".results");
  
    // Options for the PDF (you can tweak this)
    const options = {
      margin:       0.5,
      filename:     "cd-calculator-results.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "in", format: "letter", orientation: "portrait" }
    };
  
    // Generate and save the PDF
    html2pdf().set(options).from(content).save();
  });
  