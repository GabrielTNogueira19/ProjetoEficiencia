
let equipamentos = {};

fetch("consumo-equipamentos.json")
    .then(resposta => resposta.json())
    .then(dados => {
        equipamentos = dados;
        adicionarEquipamento("residencial");
        adicionarEquipamento("industrial");
    })
    .catch(() => {
        document.getElementById("resultado-residencial").textContent = "Erro ao carregar JSON.";
        document.getElementById("resultado-industrial").textContent = "Erro ao carregar JSON.";
    });

function adicionarEquipamento(area) {
    let lista = document.getElementById(area + "-itens");
    let linha = document.createElement("div");
    linha.className = "calc-item";

    let tipo = area === "residencial" ? "Eletrodoméstico" : "Máquina";

    let label = document.createElement("label");
    label.textContent = tipo;

    let select = document.createElement("select");

    equipamentos[area].forEach(equipamento => {
        let opcao = document.createElement("option");
        opcao.value = equipamento.consumo_w;
        opcao.textContent = equipamento.nome + " (" + equipamento.consumo_w + " W)";
        select.appendChild(opcao);
    });

    let labelHoras = document.createElement("label");
    labelHoras.textContent = "Horas de uso por dia";

    let horas = document.createElement("input");
    horas.type = "number";
    horas.min = "0";
    horas.max = "24";
    horas.step = "0.5";
    horas.value = "1";

    let remover = document.createElement("button");
    remover.type = "button";
    remover.textContent = "Remover";
    remover.className = "calc-remover";

    remover.onclick = () => linha.remove();

    linha.append(label, select, labelHoras, horas, remover);
    lista.appendChild(linha);
}

function mostrarArea(area) {
    document.getElementById("area-residencial").style.display = "none";
    document.getElementById("area-industrial").style.display = "none";
    document.getElementById("area-" + area).style.display = "block";

    document.getElementById("botao-residencial").className = "calc-aba";
    document.getElementById("botao-industrial").className = "calc-aba";
    document.getElementById("botao-" + area).className = "calc-aba calc-aba-ativa";
}

function calcularConsumo(area) {
    let linhas = document.querySelectorAll("#" + area + "-itens .calc-item");
    let dias = Number(document.getElementById(area + "-dias").value);
    let tarifa = Number(document.getElementById(area + "-tarifa").value);
    let resultado = document.getElementById("resultado-" + area);

    if (linhas.length === 0 || dias < 1 || dias > 31) {
        resultado.textContent = "Adicione um equipamento e confira os dias do mês.";
        return;
    }

    let consumo = 0;

    linhas.forEach(linha => {
        let potencia = Number(linha.querySelector("select").value);
        let horas = Number(linha.querySelector("input").value);

        if (horas < 0 || horas > 24 || linha.querySelector("input").value === "") {
            consumo = -1;
            return;
        }

        consumo += potencia * horas * dias / 1000;
    });

    if (consumo < 0) {
        resultado.textContent = "Informe horas entre 0 e 24.";
        return;
    }

    let texto = "Consumo total estimado: " + consumo.toFixed(2) + " kWh por mês.";

    if (tarifa > 0) {
        texto += " Custo estimado: R$ " + (consumo * tarifa).toFixed(2) + ".";
    }

    resultado.textContent = texto;
}
