function createMatrix() {
    const size = parseInt(document.getElementById("size").value);
    if (isNaN(size) || size <= 0) {
        alert("Por favor, ingrese un tamaño válido.");
        return;
    }

    const matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.innerHTML = '';

    const table = document.createElement("table");
    table.className = "matrix-table";

    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j <= size; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-cell";
            input.placeholder = j === size ? `B${i+1}` : `A${i+1}${j+1}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    matrixContainer.appendChild(table);
    document.querySelector(".solve-btn").style.display = "block";
}

function solveSystem() {
    const size = parseInt(document.getElementById("size").value);
    const matrix = [];
    const inputs = document.querySelectorAll(".matrix-cell");

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j <= size; j++) {
            matrix[i][j] = parseFloat(inputs[i * (size + 1) + j].value);
            if (isNaN(matrix[i][j])) {
                alert("Por favor, ingrese todos los valores de la matriz.");
                return;
            }
        }
    }

    document.getElementById("steps").innerHTML = "";
    const result = gaussJordan(matrix, size);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Solucion:<br>";
    result.forEach((value, index) => {
        resultDiv.innerHTML += `x${index + 1} = ${value.toFixed(2)}<br>`;
    });
}

function gaussJordan(matrix, size) {
    for (let i = 0; i < size; i++) {
        const pivot = matrix[i][i];
        for (let j = i; j <= size; j++) {
            matrix[i][j] /= pivot;
        }
        displayStep(matrix, size, `Convertir el elemento de la posición [${i+1},${i+1}] a 1`);

        for (let j = 0; j < size; j++) {
            if (j !== i) {
                const factor = matrix[j][i];
                for (let k = i; k <= size; k++) {
                    matrix[j][k] -= factor * matrix[i][k];
                }
                displayStep(matrix, size, `Convertir el elemento en la posición [${j+1},${i+1}] a 0`);
            }
        }
    }

    return matrix.map(row => row[size]);
}

function displayStep(matrix, size, title) {
    const stepsDiv = document.getElementById("steps");

    const titleElement = document.createElement("div");
    titleElement.className = "step-title";
    titleElement.innerText = title;
    stepsDiv.appendChild(titleElement);

    const table = document.createElement("table");
    table.className = "step-table";

    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j <= size; j++) {
            const cell = document.createElement("td");
            cell.innerText = matrix[i][j].toFixed(2);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    stepsDiv.appendChild(table);
}
