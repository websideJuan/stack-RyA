import { db } from "../db/db.js";

class Maquinas {
  constructor({ db }) {
    this.db = db;
    this.key = "maquinas";
  }

  add(maquina) {
    if (!maquina) return console.error("Maquina no proporcionada");

    maquina.id = window.crypto.randomUUID(); // Genera un id único
    this.db.add(this.key, maquina);
  }

  addAll(maquinas) {
    if (!Array.isArray(maquinas) || maquinas.length === 0) {
      return console.error("No se proporcionaron maquinas válidas");
    }

    maquinas.forEach((maquina) => this.add(maquina));
  }

  getAll() {
    this.data = this.db.get(this.key) || [];
    return this.data;
  }

  getById(id) {
    return this.getAll().find((maquina) => maquina.id === id);
  }

  update(id, updatedMaquina) {
    const index = this.data.findIndex((maquina) => maquina.id === id);
    if (index !== -1) {
      this.db.update(this.key, { id, ...updatedMaquina });
    }
  }

  delete(id) {
    this.data = this.data.filter((maquina) => maquina.id !== id);
    this.db.add(this.key, this.data);
  }

  clear() {
    this.db.clear(this.key);
  }

  set updatedStateOfMaquinas({ maquinasID, updatedMaquinas }) {
    this.maquina = this.getById(maquinasID);

    if (!this.maquina) {
      console.error(`Maquina con ID ${maquinasID} no encontrada`);
      return;
    }

    this.maquina = { ...this.maquina, ...updatedMaquinas };

    this.update(maquinasID, updatedMaquinas);
  }

  get updatedStateOfMaquinas() {
    return this.data;
  }
}

export const maquinas = new Maquinas({ db: db });

// Example usage:

// maquinas.clear();
// maquinas.add({ name: '45', tipo: 'Horquilla', toneladas: 2, status: 'atrasada', revision: '2023-10-01' });
// maquinas.addAll([{ name: 'Maquina 2', status: 'en mantenimiento' }, { name: 'Maquina 3', status: 'inactiva' }]);
// console.log(maquinas.getAll());


if (maquinas.getAll().length === 0) {
  const maquinasDataTest = [
    {
      name: "45",
      tipo: "Horquilla",
      toneladas: 3,
      status: "atrasada",
      revision: "2023-10-01",
    },
    {
      name: "67",
      tipo: "Horquilla",
      toneladas: 3,
      status: "en mantenimiento",
      revision: "2023-10-05",
    },
    {
      name: "69",
      tipo: "Horquilla",
      toneladas: 2.5,
      status: "atrasada",
      revision: "2023-10-10",
    },
    {
      name: "59",
      tipo: "Horquilla",
      toneladas: 3,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "74",
      tipo: "Horquilla",
      toneladas: 3,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "89",
      tipo: "Horquilla",
      toneladas: 3,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "65",
      tipo: "Horquilla",
      toneladas: 3,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "44",
      tipo: "Horquilla",
      toneladas: 3,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "90",
      tipo: "Horquilla",
      toneladas: 3,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "51",
      tipo: "Horquilla",
      toneladas: 5,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "70",
      tipo: "Horquilla",
      toneladas: 7,
      status: "Activa",
      revision: "2023-10-01",
    },
    {
      name: "00",
      tipo: "Horquilla",
      toneladas: 7,
      status: "Activa",
      revision: "2023-10-01",
    },
  ];

  maquinas.clear();
  maquinas.addAll(maquinasDataTest);
}
// console.log(maquinas.getAll());
// console.log(maquinas.getById('some-id'));

// maquinas.update('some-id', { status: 'en mantenimiento' });
// console.log(maquinas.getAll());

// maquinas.delete('some-id');
// console.log(maquinas.getAll());

// const maquinasData = maquinas.getAll();
// function getByTag(tag) {
//   return maquinasData.find((maquina) => maquina.name === tag);
// }

// const maqauina45 = getByTag("67");
// console.log(maqauina45);

// maquinas.updatedStateOfMaquinas = {
//   maquinasID: maqauina45.id,
//   updatedMaquinas: { status: "activo", revision: "2023-10-15" },
// };
