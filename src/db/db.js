class DB {
  constructor() {
    this.db = localStorage;
    this.data;
  }

  add(key, value) {
    const existingValue = this.get(key);
    
    if (!existingValue) {
      this.data = [];
    } else {
      this.data = existingValue;
    }

    value.id = window.crypto.randomUUID(); // Generate a unique ID
    value.createdAt = new Date().toISOString(); // Add a timestamp
    
    this.data.push(value);
    this.db.setItem(key, JSON.stringify(this.data));
  }

  update(key, value) {
    const existingValue = this.get(key);
    if (!existingValue) {
      this.data = [];
    } else {
      this.data = existingValue;
    }

    const index = this.data.findIndex(item => item.id === value.id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...value };
    }
    this.db.setItem(key, JSON.stringify(this.data));
  }

  clear(key) {
    this.db.removeItem(key);
  }

  get(key) {
    return JSON.parse(this.db.getItem(key)) || [];
  }

  delete(key, id) {
    const existingValue = this.get(key);
    if (!existingValue) {
      this.data = [];
    } else {
      this.data = existingValue;
    }

    this.data = this.data.filter(item => item.id !== id);
    this.db.setItem(key, JSON.stringify(this.data));
  }

}
export const db = new DB();


// test 

// db.add('usuarios', { name: 'Juan', age: 30 });
// db.add('usuarios', { name: 'Maria', age: 25 });

// db.update('usuarios', { id: 'some-id', name: 'Juan Updated' });
// console.log(db.get('usuarios'));
// db.delete('usuarios', 'some-id');
// db.clear('usuarios');
// console.log(db.get('usuarios'));
// db.add('operarios', { name: 'Aldo', maquina: '67', password: 'pas1234*' });