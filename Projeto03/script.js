let users = [];
let totalSales = 0;
let salesPerUser = {};

let chartData = {
    labels: [],
    datasets: [{
        label: 'Vendas por Usuário',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

let ctx = document.getElementById('salesChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function fillUserSelector() {
    var userSelect = document.getElementById('userSelect');
    userSelect.innerHTML = '';
    users.forEach(function (user) {
        var option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        userSelect.appendChild(option);
    });
}

function fillSalesPerUserList() {
    var salesPerUserList = document.getElementById('salesPerUserList');
    salesPerUserList.innerHTML = '';
    users.forEach(function (user) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = user + ': ' + (salesPerUser[user] || 0).toFixed(2);
        salesPerUserList.appendChild(listItem);
    });
}

document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    users.push(username);
    fillUserSelector();
    fillSalesPerUserList();
    userCount++;
    updateDashboard();
    $('#addUserModal').modal('hide');
});

document.getElementById('addSaleForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('userSelect').value;
    var saleAmount = parseFloat(document.getElementById('saleAmount').value);

    if (!salesPerUser[username]) {
        salesPerUser[username] = 0;
    }

    totalSales += saleAmount;
    salesPerUser[username] += saleAmount;

    fillSalesPerUserList();
    updateDashboard();
    $('#addSaleModal').modal('hide');
});

function updateDashboard() {
    document.getElementById('userCount').innerText = users.length;
    document.getElementById('totalSales').innerText = totalSales.toFixed(2);

    chartData.labels = users;
    chartData.datasets[0].data = users.map(function (user) {
        return salesPerUser[user] || 0;
    });

    myChart.update();
}