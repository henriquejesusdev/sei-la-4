class Parquimetro {
  constructor() {
    this.tarifas = [
      { valor: 1.0, tempo: 30 }, // 30 minutos por R$1,00
      { valor: 2.0, tempo: 60 }, // 1 hora por R$2,00
      { valor: 3.5, tempo: 120 }, // 2 horas por R$3,50
    ];
  }

  calcularTempoETroco(valorPago) {
    if (valorPago < 1.0) {
      return {
        sucesso: false,
        mensagem: "Valor insuficiente! Mínimo de R$1,00",
      };
    }

    let tempoTotal = 0;
    let valorRestante = valorPago;

    // Calcula o tempo máximo possível com base nas tarifas
    for (let i = this.tarifas.length - 1; i >= 0; i--) {
      const tarifa = this.tarifas[i];
      while (valorRestante >= tarifa.valor) {
        tempoTotal += tarifa.tempo;
        valorRestante -= tarifa.valor;
        valorRestante = Number(valorRestante.toFixed(2)); // Evita problemas de precisão
      }
    }

    const troco = valorRestante > 0 ? valorRestante : 0;

    return {
      sucesso: true,
      tempo: tempoTotal,
      troco: troco,
      mensagem: this.formatarResultado(tempoTotal, troco),
    };
  }

  formatarResultado(tempo, troco) {
    const horas = Math.floor(tempo / 60);
    const minutos = tempo % 60;
    let resultado = `Tempo de estacionamento: `;

    if (horas > 0) {
      resultado += `${horas}h `;
    }
    if (minutos > 0) {
      resultado += `${minutos}min`;
    }

    if (troco > 0) {
      resultado += `<br>Troco: R$${troco.toFixed(2)}`;
    }

    return resultado;
  }
}

// Instância global do parquímetro
const parquimetro = new Parquimetro();

function processarPagamento() {
  const inputValor = document.getElementById("valor").value;
  const valor = parseFloat(inputValor);
  const resultadoDiv = document.getElementById("resultado");

  if (isNaN(valor) || inputValor === "") {
    resultadoDiv.innerHTML = "Por favor, insira um valor válido!";
    resultadoDiv.className = "resultado erro";
    return;
  }

  const resultado = parquimetro.calcularTempoETroco(valor);

  resultadoDiv.innerHTML = resultado.mensagem;
  resultadoDiv.className = `resultado ${
    resultado.sucesso ? "sucesso" : "erro"
  }`;

  // Limpa o input
  document.getElementById("valor").value = "";
}
