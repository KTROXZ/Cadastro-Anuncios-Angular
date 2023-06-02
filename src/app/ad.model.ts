export class Ad {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    expirationDate?: Date;
    image?: string;
    status?: string;
  
    constructor(
      id?: number,
      title?: string,
      description?: string,
      price?: number,
      expirationDate?: Date,
      image?: string,
      status?: string
    ) {
      this.id = id || 0; // atribuir 0 como valor padrão para id se não for fornecido
      this.title = title || '';
      this.description = description || '';
      this.price = price || 0;
      this.expirationDate = expirationDate || new Date();
      this.image = image || '';
      this.status = status || '';
    }
  }
  