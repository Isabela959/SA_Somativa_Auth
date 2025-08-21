// Classe Modelo do Usuário com seus atributos
export class Usuario {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public senha: string,
    public tipo: string // Pode ser "admin" ou "comum"
  ) { }

  // Método que transforma o objeto Usuario em um objeto simples (mapa)
  toMap(): { [key: string]: any } {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: this.tipo
    };
  }

  // fromMap() transforma as informações do BD -> objeto
  static fromMap(map: any): Usuario {
    return new Usuario(
      map.id,
      map.nome,
      map.email,
      map.senha,
      map.tipo
    );
  }
}
