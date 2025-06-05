let savingsInput = document.getElementById("savings-amount");
let expensesInput = document.getElementById("monthly-expenses");
let button = document.getElementById("button");
let result = document.getElementById("result");
let chart;

// Function to create or update the chart
const createChart = (labels, data) => {
    const ctx = document.getElementById("runwayChart").getContext("2d");

    // Create a gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(0, 123, 255, 0.5)");  // Blue at the top
    gradient.addColorStop(1, "rgba(0, 123, 255, 0.1)");  // Transparent blue at the bottom

    // Destroy existing chart if needed
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Savings Over Time",
                data: data,
                borderColor: "rgba(0, 123, 255, 1)",  // Bright blue line
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

const calculateBurnRate = () => {
    const savings = parseFloat(savingsInput.value);
    const monthlyExpenses = parseFloat(expensesInput.value);

    if (isNaN(savings) || isNaN(monthlyExpenses) || monthlyExpenses <= 0) {
        result.textContent = "Please enter valid numbers.";
        return;
    }

    let balance = savings;
    let months = 0;
    const labels = [];
    const data = [];

    while (balance > 0) {
        labels.push(`Month ${months}`);
        data.push(balance);
        balance -= monthlyExpenses;
        months++;
    }

    // Format the result in months and years
    if (months <= 12) {
        result.textContent = `${months} month${months === 1 ? "" : "s"}.`;
    } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        result.textContent = `${years} year${years === 1 ? "" : "s"} and ${remainingMonths} month${remainingMonths === 1 ? "" : "s"}.`;
    }

    // Create or update the chart
    createChart(labels, data);
};

button.addEventListener("click", calculateBurnRate);

// Initialize a default chart on page load
window.addEventListener("load", () => {
    const defaultLabels = ["Month 0", "Month 1", "Month 2"];
    const defaultData = [1000, 800, 600];  // Example data
    createChart(defaultLabels, defaultData);

    // Optional: Show a default message
    result.textContent = "Enter your savings and expenses to see how long your money will last.";
});
