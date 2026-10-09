let imagens = [
    "/EficienciaEnergetica/acess/assets/imagem_eletrica1.png",
    "/EficienciaEnergetica/acess/assets/imagem_eletrica2.png",
    "/EficienciaEnergetica/acess/assets/imagem_eletrica3.png",
    "/EficienciaEnergetica/acess/assets/imagem_eletrica4.png",
];

let posicao = 0;

function trocarImagem() {
    posicao = posicao + 1;

    if (posicao == 4) {
        posicao = 0;
    }

    document.getElementById("imagem").src = imagens[posicao];
}

setInterval(trocarImagem, 2000);