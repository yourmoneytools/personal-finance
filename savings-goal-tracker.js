let goalAmountInput = document.getElementById("goalAmount");
let currentSavingsInput = document.getElementById("currentSavings");
let monthlyContributionInput = document.getElementById("monthlyContribution");
let interestRateInput = document.getElementById("interestRate");
let button = document.getElementById("calculateBtn");
let result = document.getElementById("result");
let chart; // To store the chart instance

const calculate = () => {
    const goalAmount = parseFloat(goalAmountInput.value);
    const currentSavings = parseFloat(currentSavingsInput.value);
    const monthlyContribution = parseFloat(monthlyContributionInput.value);
    const annualInterestRate = parseFloat(interestRateInput.value) / 100;

    if (
        isNaN(goalAmount) ||
        isNaN(currentSavings) ||
        isNaN(monthlyContribution) ||
        isNaN(annualInterestRate) ||
        monthlyContribution <= 0
    ) {
        result.textContent = "Please enter valid numbers.";
        return;
    }

    let currentTotal = currentSavings;
    let months = 0;
    const labels = [];
    const data = [];
    const interestData = [];
    const tbody = document.querySelector("#progressTable tbody");
    tbody.innerHTML = ""; // Clear previous rows

    while (currentTotal < goalAmount && months < 1000) { // safeguard against infinite loop
        const monthlyInterest = currentTotal * (annualInterestRate / 12);
        currentTotal += monthlyInterest + monthlyContribution;
        months++;
        labels.push(`Month ${months}`);
        data.push(currentTotal.toFixed(2));
        interestData.push(monthlyInterest.toFixed(2));

        // Add row to table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${months}</td>
            <td>$${currentTotal.toFixed(2)}</td>
            <td>$${monthlyInterest.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    }

    // Display result in months & years
    if (months <= 12) {
        result.textContent = `${months} month${months === 1 ? "" : "s"}.`;
    } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        result.textContent = `${years} year${years === 1 ? "" : "s"} and ${remainingMonths} month${remainingMonths === 1 ? "" : "s"}.`;
    }

    // Destroy previous chart if it exists
    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById("savingsChart").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 255, 211, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Total Savings",
                data: data,
                borderColor: "#24FFDE",
                backgroundColor: gradient,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

button.addEventListener("click", calculate);

// Optional: trigger calculation on load
calculate();
