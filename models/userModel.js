export class User {
  constructor({ nombre, apellido, email, password, rol = "user" }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.createdAt = new Date();
  }
}
