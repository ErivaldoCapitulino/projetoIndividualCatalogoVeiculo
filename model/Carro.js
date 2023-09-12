import Veiculo from "./Veiculo.js";

export default class Carro extends Veiculo {

  #combustivel;

  constructor(marca, modelo, ano, preco, combustivel) {
    super(marca, modelo, ano, preco);
    this.#combustivel = combustivel;
  }

  get combustivel() {
    return this.#combustivel;
  }

  descricaoEspecifica() {
    return `Tipo de Combustível: ${this.#combustivel}`;
  }

  toString() {
    let result = `${super.toString()}`;

    if (this instanceof Carro) {
      result += ` ${this.descricaoEspecifica()}`;
    }
    return result;
  }

}