import Veiculo from "./Veiculo.js";

export default class Moto extends Veiculo {
  #cilindradas;
  constructor(marca, modelo, ano, preco, cilindradas) {
    super(marca, modelo, ano, preco);
    this.#cilindradas = cilindradas;
  }

  get cilindradas() {
    return this.#cilindradas;
  }

  descricaoEspecifica() {
    return `Cilindradas: ${this.#cilindradas}cc`;
  }

  toString() {
    let result = `${super.toString()}`;

    if (this instanceof Moto) {
      result += ` ${this.descricaoEspecifica()}`;
    }
    return result;
  }

  //   toString() {
  //     return `${super.toString()} - ${this.descricaoEspecifica()}`;
  //   }
}