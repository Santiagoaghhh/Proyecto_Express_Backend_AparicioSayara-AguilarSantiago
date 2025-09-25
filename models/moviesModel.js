export class Movie {
    constructor({ titulo, descripcion, categoria, anio, imagen, aprobada = false }) {
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.categoria = categoria; 
      this.anio = anio;
      this.imagen = imagen || null;
      this.aprobada = aprobada; 
      this.createdAt = new Date();
    }
  }
  