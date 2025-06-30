import "./style.css";
import { usuarios } from "./controller/usuarios.js";
import { maquinas } from "./controller/maquinas.js";
import { alert } from "./utils/alert.js";

class App {
  constructor({ app }) {
    this.app = app;
    this.usuarios = usuarios.getAll();
    this.list = JSON.parse(localStorage.getItem("operarios")) || this.usuarios;
    this.founded = [];
    this.formulario = null;
    this.inputNombre = null;
    this.init();
  }

  init() {
    this.app.innerHTML = `
      <nav>
        <div>
          <h1>Stack RyA</h1>
          <p>Aplicación de gestión de usuarios y máquinas</p>
        </div>
        <div class="show-meun-btn">
          <button id="show-menu-button">☰</button>
        </div>
        <div class="menu-collapse" data-collapse="false">
          <ul class="menu">
            <li>
              <a data-navlink="false" href="/Cuenta">Cuenta</a>
              <div class="collapse position-fixed" style="inset: 0; align-items: center; justify-content: center; z-index: 1000; background-color: rgba(0, 0, 0, 0.2);">
                <div>
                  <p>Por favor, inicia sesión para acceder a esta sección.</p>
                  <form id="login-form" style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
                    <div class="form-group">
                      <label for="username">Nombre de usuario:</label>
                      <input type="text" id="username" placeholder="Nombre de usuario" >
                    </div>
                    <div class="form-group">
                      <label for="password">Contraseña:</label>
                      <input type="password" id="password" placeholder="Contraseña" >
                    </div>
                    <button id="login-button" class="btn">Iniciar Sesión</button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <h4 style="grid-column: 1/8;">Lista de prioridad</h4>
        

        <h4 style="grid-column: 8/8;">Maquinas Atrasadas</h4>
        <div style="grid-column: 8/8; align-items: flex-start; flex-wrap: wrap; justify-content: center;" class="flex flex-gap" id="maquinas"></div>

        <ul style="grid-column: 1/8; margin: 0 1rem;" class="priority-list list-group"></ul>

        <form style="grid-column: 1/8;" id="formulario" class="formulario">
          <div class="form-group position-relative ">
            <input type="text" class="form-control" id="nombre" placeholder="Nombre del operario" autocomplete="off" autofocus required> 
            <div class="form-dropdow position-absolute top-full">
              <ul class="list-group mt-3" id="listOfCoincidences"></li>
            </div>
          </div>

        </form>

      </div>
    `;

    this.maquinas = this.app.querySelector("#maquinas");
    this.formulario = this.app.querySelector("#formulario");
    this.inputNombre = this.app.querySelector("#nombre");
    this.listOfCoincidences = this.app.querySelector("#listOfCoincidences");

    this.changeList();
    this.renderList();
    this.renderListOfMaquinas();
    this.listenner();
  }

  renderListOfMaquinas() {
    this.maquinas.innerHTML = maquinas
      .getAll()
      .filter((maquina) => {
        return (
          maquina.status === "atrasada" || maquina.status === "mantenimiento"
        );
      })
      .slice(0, 4)
      .map((maquina) => {
        return `
          <div class="card position-relative" >
            <div class="badge position-absolute bg-danger" style="border-radius: 40px; top: -10px; right: -10px; z-index: 1; padding: 0 10px;">
              ${maquina.status === "atrasada" ? "Atrasada" : maquina.status}
            </div>
            <div class="card-body">
              <strong>Maquina: ${maquina.name}</strong>
              <span>${
                usuarios
                  .getAll()
                  .find((operario) => operario.maquina === maquina.name)?.name
              }</span>
              <p>Toneladas: ${maquina.toneladas}Ton </p>
              <p>Mantencion: ${
                maquina.mantenimiento ? "Al día" : "Atrasada"
              }</p>
            </div>
          </div>
        `;
      })
      .join("");
  }

  changeList() {
    document.querySelector(".priority-list").innerHTML = this.list
      .map((item, i) => {
        if (!item.name) return "";

        return `
        <li class="list-group-item">
          <span>${i + 1}</span> - <a href="#" class="operario">${
          item.priority ? item.name : ""
        }</a>
        </li>`;
      })
      .join("");

    localStorage.setItem("operarios", JSON.stringify(this.list));
  }

  handlerSubmit(event) {
    event.preventDefault();
    const nombre = this.formulario.querySelector("#nombre").value.trim();
    if (!nombre) return alert.show("Por favor, ingresa un nombre válido.");

    const existingUser = this.list.find((usuario) => usuario.name === nombre);
    if (existingUser) {
      alert.show("El operario ya existe en la lista.");
      this.formulario.reset();
      return;
    }
  }

  handlerChange(event) {
    if (!event.target.value) {
      this.listOfCoincidences.innerHTML = ``;
      return;
    }
    this.founded = this.list.filter((usuario) =>
      usuario.name.toLowerCase().includes(event.target.value)
    );
    this.renderList();
  }

  handlerClick(event) {
    event.preventDefault();
    if (event.target.id === "login-button") {
      const username = document.querySelector("#username").value.trim();
      const password = document.querySelector("#password").value.trim();

      if (!username || !password) {
        return alert.show("Por favor, completa todos los campos.", 'warning');
      }
      console.log("nombre de usuario:", username);  
      console.log("contraseña:", password);
      
      const user = this.usuarios.find(
        (usuario) => usuario.name === username && usuario.password === password
      );

      if (user) {
        localStorage.setItem("activeUser", JSON.stringify(user));
        alert.show("Inicio de sesión exitoso.", "success");
        this.app.querySelector(".collapse").classList.remove("show");
        window.location.href = "src/operario.html";
      } else {
        alert.show("Usuario o contraseña incorrectos.", "danger");
      }
      return; 
    }

    if (event.target.dataset.navlink === "false") {
      const parent = event.target.parentElement;
      const collapse = parent.querySelector(".collapse");

      if (collapse) {
        collapse.classList.toggle("show");
        const isCollapsed = collapse.classList.contains("show");
        parent.setAttribute("data-collapse", isCollapsed);
      }
      return;
    }

    if (event.target.classList.contains("operario")) {
      const selectedName = event.target.textContent;

      this.list.filter((usuario) => {
        if (usuario.name === selectedName) {
          usuario.priority = !usuario.priority; // Cambia el estado de prioridad
          return true;
        }
        return false;
      });

      this.list.sort((a, b) => {
        if (a.priority && !b.priority) return -1; // a es prioritario, b no
        if (!a.priority && b.priority) return 1; // b es prioritario, a no
        return 0; // Ambos tienen la misma prioridad
      });
      this.changeList();
      this.formulario.reset();
      return;
    }

    if (event.target.classList.contains("coincidences")) {
      const selectedName = event.target.textContent;
      this.inputNombre.value = selectedName;
      this.listOfCoincidences.innerHTML = "";

      this.list.find((usuario) => {
        if (usuario.name === selectedName) {
          usuario.priority = true; // Marca el operario como prioritario
          return true;
        }
        return false;
      });

      this.list.sort((a, b) => {
        if (a.priority && !b.priority) return -1; // a es prioritario, b no
        if (!a.priority && b.priority) return 1; // b es prioritario, a no
        return 0; // Ambos tienen la misma prioridad
      });

      this.changeList();
      this.formulario.reset();
    }
  }

  renderList() {
    this.listOfCoincidences.innerHTML = this.founded
      .map(
        (item, i) =>
          `<li class="list-group-item coincidences">${item.name}</li>`
      )
      .join("");
  }

  listenner() {
    this.formulario.addEventListener("submit", (e) => this.handlerSubmit(e));
    this.inputNombre.addEventListener("input", (e) => this.handlerChange(e));
    this.app.addEventListener("click", (e) => this.handlerClick(e));
    this.app.addEventListener("resize", (e) => {
      console.log('event resize', e.target);
      const collapse = this.app.querySelector(".menu-collapse");
      if (collapse) {
        collapse.classList.remove("show");
        collapse.setAttribute("data-collapse", "false");
        
      }
    });
  }
}

new App({ app: document.getElementById("app") });
