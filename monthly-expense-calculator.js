let expenseCategory = document.getElementById("expense-category");
let expenseAmount = document.getElementById("expense-amount");
let addButton = document.getElementById("add-expense");
let chart;
let expensesData = {};

const updateChart = () => {
    const ctx = document.getElementById("expensesChart").getContext("2d");

    const labels = Object.keys(expensesData);
    const values = Object.values(expensesData);
    const total = values.reduce((sum, val) => sum + val, 0);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    "#79C7C0", "#27CDBF", "#407979", "#6FB361", "#B1FFC2",
                    "#79E7FF", "#9BF045", "#46F3EA", "#FFCC80", "#41A4CF",
                    "#386F71", "#68E096", "#2BBF53"
                ]
                
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const percent = ((value / total) * 100).toFixed(1);
                            return `${context.label}: $${value} (${percent}%)`;
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
};

const updateTable = () => {
    const tableBody = document.querySelector("#expense-table tbody");
    tableBody.innerHTML = "";

    const total = Object.values(expensesData).reduce((sum, val) => sum + val, 0);

    for (const [category, amount] of Object.entries(expensesData)) {
        const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) + "%" : "0%";

        const row = document.createElement("tr");

        const categoryCell = document.createElement("td");
        categoryCell.textContent = category;

        const amountCell = document.createElement("td");
        amountCell.textContent = `$${amount.toFixed(2)}`;

        const percentageCell = document.createElement("td");
        percentageCell.textContent = percentage;

        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(percentageCell);

        tableBody.appendChild(row);
    }

    const totalDisplay = document.getElementById("total-expenses");
totalDisplay.textContent = `Total Monthly Expenses: $${total.toFixed(2)}`;

if (total === 0) {
    totalDisplay.style.display = "none";
} else {
    totalDisplay.style.display = "block";
}

};

addButton.addEventListener("click", () => {
    const category = expenseCategory.value;
    const amount = parseFloat(expenseAmount.value);

    if (isNaN(amount) || amount <= 0 || category === "") {
        alert("Please enter a valid amount and select a category.");
        return;
    }

    if (!expensesData[category]) {
        expensesData[category] = 0;
    }

    expensesData[category] += amount;

    updateChart();
    updateTable();

    expenseAmount.value = "";
});
