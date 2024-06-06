// Lógica de autenticación
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtiene los valores de usuario y contraseña
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Simulación de autenticación (puedes agregar tu lógica aquí)
    if (username === 'admin' && password === 'admin123') {
        // Muestra el dashboard y oculta el formulario de login
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Inicializar gráficas
var chartAccX, chartAccY, chartAccZ, chartGyroX, chartGyroY, chartGyroZ;

function initCharts() {
    var ctxAccX = document.getElementById('acc-x-chart').getContext('2d');
    chartAccX = new Chart(ctxAccX, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Acelerómetro X',
                data: [],
                borderColor: 'blue',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctxAccY = document.getElementById('acc-y-chart').getContext('2d');
    chartAccY = new Chart(ctxAccY, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Acelerómetro Y',
                data: [],
                borderColor: 'green',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctxAccZ = document.getElementById('acc-z-chart').getContext('2d');
    chartAccZ = new Chart(ctxAccZ, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Acelerómetro Z',
                data: [],
                borderColor: 'red',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctxGyroX = document.getElementById('gyro-x-chart').getContext('2d');
    chartGyroX = new Chart(ctxGyroX, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Giroscopio X',
                data: [],
                borderColor: 'orange',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctxGyroY = document.getElementById('gyro-y-chart').getContext('2d');
    chartGyroY = new Chart(ctxGyroY, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Giroscopio Y',
                data: [],
                borderColor: 'purple',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctxGyroZ = document.getElementById('gyro-z-chart').getContext('2d');
    chartGyroZ = new Chart(ctxGyroZ, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Giroscopio Z',
                data: [],
                borderColor: 'brown',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para actualizar una gráfica con un nuevo dato
function updateChart(chart, newData) {
    chart.data.labels.push('');
    chart.data.datasets[0].data.push(newData);

    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}

// Actualizar datos y gráficas
function updateData() {
    var newDataAccX = Math.random() * 100;
    var newDataAccY = Math.random() * 100;
    var newDataAccZ = Math.random() * 100;
    var newDataGyroX = Math.random() * 100;
    var newDataGyroY = Math.random() * 100;
    var newDataGyroZ = Math.random() * 100;

    document.getElementById('acc-x-value').textContent = newDataAccX.toFixed(2);
    document.getElementById('acc-y-value').textContent = newDataAccY.toFixed(2);
    document.getElementById('acc-z-value').textContent = newDataAccZ.toFixed(2);
    document.getElementById('gyro-x-value').textContent = newDataGyroX.toFixed(2);
    document.getElementById('gyro-y-value').textContent = newDataGyroY.toFixed(2);
    document.getElementById('gyro-z-value').textContent = newDataGyroZ.toFixed(2);

    updateChart(chartAccX, newDataAccX);
    updateChart(chartAccY, newDataAccY);
    updateChart(chartAccZ, newDataAccZ);
    updateChart(chartGyroX, newDataGyroX);
    updateChart(chartGyroY, newDataGyroY);
    updateChart(chartGyroZ, newDataGyroZ);

    setTimeout(updateData, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    updateData();
});
