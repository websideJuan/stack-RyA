import { db } from "../db/db.js";

class Usuarios {
  constructor({ db }) {
    this.db = db;
    this.key = 'usuarios';
  }

  add(usuario) {
    if (!usuario) return console.error('Usuario no proporcionado')
    this.db.add(this.key, usuario);
  }

  addAll(usuarios) {
    if (!Array.isArray(usuarios) || usuarios.length === 0) {  
      return console.error('No se proporcionaron usuarios válidos');
    }
    usuarios.forEach(usuario => {
      this.add(usuario);
    });
  }


  getAll() {
    this.data = this.db.get(this.key);
    return this.data;
  }

  getById(id) {
    return this.data.find(usuario => usuario.id === id);
  } 

  update(id, updatedUsuario) {
    const index = this.data.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedUsuario };
      this.db.add(this.key, this.data);
    }
  }

  delete(id) {
    this.db.delete(this.key, id);
  }

  clear() {
    this.db.clear(this.key);
  }
}

export const usuarios = new Usuarios({ db: db });


export class Operarios extends Usuarios {
  constructor({ db }) {
    super({ db });
    this.key = 'operarios';
    this.data = this.db.get(this.key) || [];
  }
} 



// const usuariosTest = () => {
//   usuarios.clear();
//   usuarios.add({ name: 'Juan', age: 30 });
//   usuarios.add({ name: 'Maria', age: 25 });
  
//   console.log('Todos los usuarios:', usuarios.getAll());
  
//   const usuario = usuarios.getById(usuarios.getAll()[0].id);
//   console.log('Usuario por ID:', usuario);
  
//   usuarios.update(usuario.id, { age: 31 });
//   console.log('Usuario actualizado:', usuarios.getById(usuario.id));
  
//   usuarios.delete(usuario.id);
//   console.log('Usuarios después de eliminar:', usuarios.getAll());
// }

// usuariosTest(); // Descomentar para probar la funcionalidad


const operarios = [
  {name: 'Juan', maquina: '45', password: 'pas1234*'},
  {name: 'Aldo', maquina: '67', password: 'pas1234*'},
  {name: 'José', maquina: '59', password: 'pas1234*'},
  {name: 'Victor', maquina: '54', password: 'pas1234*'},
  {name: 'Juan T', maquina: '74', password: 'pas1234*'},
  {name: 'Joan', maquina: '59', password: 'pas1234*'},
  {name: 'Juan O', maquina: '69', password: 'pas1234*'},
  {name: 'Jaime', maquina: '78', password: 'pas1234*'},
  {name: 'Daniel C', maquina: '89', password: 'pas1234*'},
]

usuarios.clear();
usuarios.addAll(operarios);

// const dataOperarios = operarios.map(usuario => {
//   usuario.id = window.crypto.randomUUID(); // Genera un id único
//   return {
//     id: usuario.id,
//     name: usuario.name,
//     maquina: usuario.maquina
//   };
// });




// usuarios.add({ name: 'Bryan', maquina: '90' });