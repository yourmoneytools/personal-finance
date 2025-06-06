const expensesInput = document.getElementById("monthly-expenses");
const coverMonthsInput = document.getElementById("months-to-cover");
const savingsInput = document.getElementById("monthly-savings");
const goalOutput = document.getElementById("goal");
const timeOutput = document.getElementById("time");
let chart;

const calculateEmergencyFund = () => {
    const monthlyExpenses = parseFloat(expensesInput.value);
    const monthsToCover = parseFloat(coverMonthsInput.value);
    const monthlySavings = parseFloat(savingsInput.value);

    if (
        isNaN(monthlyExpenses) ||
        isNaN(monthsToCover) ||
        isNaN(monthlySavings) ||
        monthlyExpenses <= 0 ||
        monthsToCover <= 0 ||
        monthlySavings <= 0
    ) {
        goalOutput.textContent = "Please enter valid numbers.";
        timeOutput.textContent = "";
        return;
    }

    const goal = monthlyExpenses * monthsToCover;
    goalOutput.textContent = `$${goal.toLocaleString()}`;

    let currentTotal = 0;
    let months = 0;
    const labels = [];
    const data = [];

    while (currentTotal < goal) {
        currentTotal += monthlySavings;
        months++;
        labels.push(`Month ${months}`);
        data.push(Math.min(currentTotal, goal));
    }

    if (months <= 12) {
        timeOutput.textContent = `${months} month${months === 1 ? "" : "s"}`;
    } else {
        const years = Math.floor(months / 12);
        const remaining = months % 12;
        timeOutput.textContent = `${years} year${years === 1 ? "" : "s"} and ${remaining} month${remaining === 1 ? "" : "s"}`;
    }

    const ctx = document.getElementById("emergencyChart").getContext("2d");

    // Create a gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(36, 255, 222, 0.6)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");

    // Destroy existing chart
    if (chart) {
        chart.destroy();
    }

    // Create a new chart
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Emergency Fund Growth",
                data: data,
                borderColor: "#24FFDE",
                backgroundColor: gradient,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: true } }
        }
    });
};

// Ensure this runs after DOM loads
window.addEventListener("load", () => {
    // Provide default values
    if (!expensesInput.value) expensesInput.value = "1000";
    if (!coverMonthsInput.value) coverMonthsInput.value = "6";
    if (!savingsInput.value) savingsInput.value = "200";

    calculateEmergencyFund();
});

// Optionally: Also recalculate on input change
document.querySelectorAll("#monthly-expenses, #months-to-cover, #monthly-savings").forEach(input => {
    input.addEventListener("input", calculateEmergencyFund);
});
