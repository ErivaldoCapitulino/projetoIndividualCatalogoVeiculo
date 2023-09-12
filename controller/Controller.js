import Catalogo from "../model/Catalogo.js";
import Moto from "../model/Moto.js";
import Carro from "../model/Carro.js";
import Veiculo from "../model/Veiculo.js";

export default class Controller {

  constructor() {

    this.catalogo = new Catalogo();
    this.initialize();
    // Elementos do modal de edição
    this.modalEditar = document.getElementById("modal-editar");
    this.novoPrecoInput = document.getElementById("novo-preco-input");
    this.botaoConfirmarEditar = document.getElementById("botao-confirmar-editar");
    this.botaoFecharModalEditar = document.getElementById("botao-fechar-modal-editar");

    // Botão "Editar" que abre o modal
    this.botaoEditar = document.getElementById("botao-editar");
    this.botaoEditar.addEventListener("click", this.abrirModalEditar.bind(this));
  }

  abrirModalEditar() {

    const marcaInput = document.getElementById("marca-pesquisa");
    const marca = marcaInput.value.trim();

    if (marca !== null && marca.trim() !== "") {
      const veiculoParaEditar = this.catalogo.pesquisarVeiculo(marca);

      if (veiculoParaEditar) {
        this.catalogo.pesquisarVeiculo(marca);
        const novoPreco = parseFloat(prompt("Digite o novo preço:"));

        if (!isNaN(novoPreco)) {
          this.catalogo.editarVeiculoPorMarca(marca, novoPreco)
          this.catalogo.editarVeiculoPorMarca(marca, novoPreco); // Chama o método de edição
          alert("Veículo editado com sucesso!");
          this.listarVeiculos();
        } else {
          alert("Por favor, digite um novo preço válido.");
        }
      } else {
        alert("Veículo não encontrado.");
      }
    }
  }

  adicionarVeiculo() {
    const tipoVeiculo = document.getElementById("tipo-veiculo");
    const marcaInput = document.getElementById("marca-input");
    const modeloInput = document.getElementById("modelo-input");
    const anoInput = document.getElementById("ano-input");
    const precoInput = document.getElementById("preco-input");
    const cilindradasDiv = document.getElementById("cilindradas-div");
    const combustivelDiv = document.getElementById("combustivel-div");
    const cilindradasInput = document.getElementById("cilindradas-input");
    const combustivelInput = document.getElementById("combustivel-input");

    const vehiclesTotalNumber = document.getElementById("vehiclesTotalNumber");
    vehiclesTotalNumber.innerText = `Quantidade total de veículos: ${Veiculo.quantidadeTotalVeiculos()}`;


    const marca = marcaInput.value.trim();
    const modelo = modeloInput.value.trim();
    const ano = parseInt(anoInput.value);
    const preco = parseFloat(precoInput.value);

    const limparInputs = (...campos) => {
      campos.forEach((campo) => (campo.value = ""));
    };

    if (marca && modelo && ano && preco) {
      if (tipoVeiculo.value === "moto") {
        const cilindradas = parseInt(cilindradasInput.value);
        if (cilindradas) {
          const veiculo = new Moto(marca, modelo, ano, preco, cilindradas);
          this.catalogo.inserirVeiculo(veiculo);
          this.listarVeiculos();
          limparInputs(marcaInput, modeloInput, anoInput, precoInput, cilindradasInput);
        } else {
          alert("Preencha as cilindradas corretamente.");
        }
      } else if (tipoVeiculo.value === "carro") {
        const combustivel = combustivelInput.value.trim();
        if (combustivel) {
          const veiculo = new Carro(marca, modelo, ano, preco, combustivel);
          this.catalogo.inserirVeiculo(veiculo);
          this.listarVeiculos();
          limparInputs(marcaInput, modeloInput, anoInput, precoInput, combustivelInput);
        } else {
          alert("Preencha o tipo de combustível corretamente.");
        }
      }
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  }

  pesquisarVeiculo() {
    const marcaInput = document.getElementById("marca-pesquisa");
    const marca = marcaInput.value.trim();

    if (marca) {
      const resultados = this.catalogo.pesquisarVeiculo(marca);
      this.exibirResultados(resultados);
    } else {
      alert("Digite a marca para pesquisa.");
    }
  }

  excluirVeiculo() {
    const marcaInput = document.getElementById("marca-pesquisa");
    const marca = marcaInput.value.trim();

    if (marca) {
      const resultado = this.catalogo.excluirVeiculoPorMarca(marca);

      if (resultado) {
        alert(`Veículo da marca "${marca}" foi excluído.`);
        this.listarVeiculos();
      } else {
        alert(`Nenhum veículo da marca "${marca}" foi encontrado.`);
      }
      marcaInput.value = "";
    } else {
      alert("Digite a marca para exclusão.");
    }
  }

  listarVeiculos() {
    const veiculoList = document.getElementById("veiculo-list");
    veiculoList.innerHTML = "";

    for (const veiculo of this.catalogo.veiculos) {
      const li = document.createElement("li");
      li.textContent = veiculo.toString();
      veiculoList.appendChild(li);
    }
  }

  exibirResultados(resultados) {
    const veiculoList = document.getElementById("veiculo-list");
    veiculoList.innerHTML = "";

    if (resultados.length > 0) {
      for (const veiculo of resultados) {
        const li = document.createElement("li");
        li.textContent = veiculo.toString();
        veiculoList.appendChild(li);
      }
    } else {
      const li = document.createElement("li");
      li.textContent = `Nenhum veículo da marca encontrada.`;
      veiculoList.appendChild(li);
    }
  }

  initialize() {
    const tipoVeiculo = document.getElementById("tipo-veiculo");
    const cilindradasDiv = document.getElementById("cilindradas-div");
    const combustivelDiv = document.getElementById("combustivel-div");

    const botaoAdicionar = document.getElementById("botao-adicionar");
    botaoAdicionar.addEventListener("click", this.adicionarVeiculo.bind(this));

    const botaoPesquisar = document.getElementById("botao-pesquisar");
    botaoPesquisar.addEventListener("click", this.pesquisarVeiculo.bind(this));

    const botaoListar = document.getElementById("botao-listar");
    botaoListar.addEventListener("click", () => {
      this.listarVeiculos();
    });

    const botaoExcluir = document.getElementById("botao-excluir");
    botaoExcluir.addEventListener("click", () => {
      this.excluirVeiculo();
    });

    tipoVeiculo.addEventListener("change", () => {
      if (tipoVeiculo.value === "moto") {
        cilindradasDiv.style.display = "block";
        combustivelDiv.style.display = "none";
      } else if (tipoVeiculo.value === "carro") {
        cilindradasDiv.style.display = "none";
        combustivelDiv.style.display = "block";
      } else {
        cilindradasDiv.style.display = "none";
        combustivelDiv.style.display = "none";
      }
    });

  }

}

const controller = new Controller();
