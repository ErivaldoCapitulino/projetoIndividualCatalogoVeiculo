export default class Veiculo {
  #marca;
  #modelo;
  #ano;
  #preco;
  static #quantidadeTotal = 0;
  constructor(marca, modelo, ano, preco) {
    this.#marca = marca;
    this.#modelo = modelo;
    this.#ano = ano;
    this.#preco = preco;
    Veiculo.#quantidadeTotal++;
  }

  get marca() {
    return this.#marca;
  }

  get modelo() {
    return this.#modelo;
  }

  get ano() {
    return this.#ano;
  }

  get preco() {
    return this.#preco;
  }

  set preco(novoPreco) {
    this.#preco = novoPreco;
  }

  static quantidadeTotalVeiculos() {
    return Veiculo.#quantidadeTotal;
  }

  toString() {
    return `${this.marca} ${this.modelo} (${this.ano}) - R$${this.preco.toFixed(2)}`;
  }

  descricaoEspecifica() {
    return ""; // Este método será sobrescrito nas subclasses
  }
}


// Criado só para mostrar o conceito de prototype
Veiculo.prototype.toString = function () {
  return `${this.marca} ${this.modelo} (${this.ano}) - R$${this.preco.toFixed(2)}`;
};

// Exemplo de uso:
const meuVeiculo = new Veiculo("Toyota", "Corolla", 2022, 30000);
console.log(meuVeiculo.toString());