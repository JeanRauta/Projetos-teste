var linhas, colunas, bombas, matriz, tabela;

function gerarMatriz(l, c) {
    matriz = [];
    for (var i = 0; i < l; i++) {
        matriz[i] = new Array(c).fill(0);
    }
    console.log(matriz);
}
function gerarTabela(l, c) {
    gerarMatriz(l, c);
    var str = "";
    for (var i = 0; i < l; i++) {
        str += "<tr>";
        for (var j = 0; j < c; j++) {
            if (c === 9) {
                str += "<td class='blocked' style='width: 40px; height: 40px; font-size: 20px;'></td>";
            } else if(c === 16) {
                str += "<td class='blocked' style='width: 23px; height: 23px;  font-size: 12px;'></td>";
            }else if(c === 20) {
                str += "<td class='blocked' style='width: 18px; height: 18px; font-size: 9px;'></td>";
            }
        }
        str += "</tr>";
    }
    tabela.innerHTML = str;
}
function mostrarMatriz() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) {
                tabela.rows[i].cells[j].innerHTML = "&#128163;";
            } else {
                tabela.rows[i].cells[j].innerHTML = matriz[i][j];
            }
            
        }
    }
}
function gerarBombas() {
    for (var i = 0; i < bombas;) {
        var linha = Math.floor((Math.random() * linhas));
        var coluna = Math.floor((Math.random() * colunas));
        if (matriz[linha][coluna] === 0) {
            matriz[linha][coluna] = -1;
            i++;
        }
    }
}
function gerarNumero(l, c) {
    var count = 0;
    for (var i = l - 1; i <= l + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
                if (matriz[i][j] === -1) {
                    count++;
                }
            }
        }
    }
    matriz[l][c] = count;
}
function gerarNumeros() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] !== -1) {
                gerarNumero(i, j);
            }
        }
    }
}
function bandeira(event) {
    var cell = event.target;
    var linha = cell.parentNode.rowIndex;
    var coluna = cell.cellIndex;

    if (cell.className === "blocked") {
        cell.className = "flag";
        cell.style.backgroundColor = '#aad751';
        cell.innerHTML = "&#128681;";
    } else if (cell.className === "flag") {
        cell.className = "blocked";
        cell.innerHTML = "";
    }

    
    if (cell.className !== "flag") {
        cell.style.backgroundColor = '';
    }

    return false;
}
function reiniciarJogo() {
    let caratriste = document.querySelector("h1")
    caratriste.innerText = "Campo 🙂 Minado";
    gerarMatriz()
    init();
}
function init() {
    tabela = document.getElementById("tabela");
    var tamcell = document.querySelector("td")
    tabela.onclick = verificar;
    tabela.oncontextmenu = bandeira;
    var diff = document.getElementById("dificuldade");
    switch (parseInt(diff.value)) {
        case 0:
            linhas = 9;
            colunas = 9;
            bombas = 10;
            break;
        case 1:
            linhas = 16;
            colunas = 16;
            bombas = 40;
            break;
        case 2:
            linhas = 20;
            colunas = 20;
            bombas = 75;
            break;
        default:
            linhas = 20;
            colunas = 20;
            bombas = 399;
        break;
    }
    gerarTabela(linhas, colunas);
    gerarBombas();
    gerarNumeros();
}
function limparCelulas(l, c) {
    for (var i = l - 1; i <= l + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
                var cell = tabela.rows[i].cells[j];
                if (cell.className !== "blank") {
                    switch (matriz[i][j]) {
                        case -1:
                            break;
                        case 0:
                            cell.innerHTML = "";
                            cell.className = "blank";
                            limparCelulas(i, j);

                            break;
                        default:
                            cell.innerHTML = matriz[i][j];
                            cell.className = "n" + matriz[i][j];
                    }
                }
            }
        }
    }
    
}
function mostrarBombas() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) {
                var cell = tabela.rows[i].cells[j];
                cell.innerHTML = "&#128163;";
                cell.className = "blank";
            }
        }
    }
}
function verificar(event) {
    var cell = event.target;
    if (cell.className !== "flag") {
        var linha = cell.parentNode.rowIndex;
        var coluna = cell.cellIndex;
        switch (matriz[linha][coluna]) {
            case -1:
                mostrarBombas();
                cell.style.backgroundColor = "red";
                cell.innerHTML = "&#128165;"
                let caratriste = document.querySelector("h1")
                caratriste.innerText = "Campo 🙁 Minado";
                tabela.onclick = undefined;
                tabela.oncontextmenu = undefined;
                break;
            case 0:
                limparCelulas(linha, coluna);
                break;
            default:
                cell.innerHTML = matriz[linha][coluna];
                cell.className = "n" + matriz[linha][coluna];
        }
        fimDeJogo();
    }
}
function fimDeJogo() {
    var cells = document.querySelectorAll(".blocked, .flag");
    if (cells.length === bombas) {
        mostrarBombas();
        tabela.onclick = undefined;
        tabela.oncontextmenu = undefined;
        alert("Você venceu!");
    }
}
function registerEvents() {
    init();
    var diff = document.getElementById("dificuldade");
    diff.onchange = init;

    var reiniciarBotao = document.getElementById("reiniciarJogo");
    reiniciarBotao.onclick = reiniciarJogo;
}

onload = registerEvents;