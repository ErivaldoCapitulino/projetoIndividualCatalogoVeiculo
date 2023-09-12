export default class Catalogo {
  constructor() {
    this.veiculos = [];
  }

  pesquisarVeiculo(marca) {
    const encontrados = this.veiculos.filter(
      (veiculo) => veiculo.marca.toLowerCase() === marca.toLowerCase()
    );
    return encontrados;
  }

  inserirVeiculo(veiculo) {
    this.veiculos.push(veiculo);
  }

  editarVeiculoPorMarca(marca, novoPreco) {
    const indiceVeiculo = this.veiculos.findIndex(
      (veiculo) => veiculo.marca.toLowerCase() === marca.toLowerCase()
    );

    if (indiceVeiculo !== -1) {
      // Atualiza o preço do veículo encontrado
      this.veiculos[indiceVeiculo].preco = novoPreco;
      return true;
    }
    return false;
  }

  excluirVeiculoPorMarca(marca) {
    const veiculoIndex = this.veiculos.findIndex((veiculo) => veiculo.marca === marca);

    if (veiculoIndex !== -1) {
      this.veiculos.splice(veiculoIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}
