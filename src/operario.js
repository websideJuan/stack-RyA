import './style.css';
import { maquinas } from "./controller/maquinas.js";

const userActive = localStorage.getItem("activeUser")
  ? localStorage.getItem("activeUser")
  : (window.location.href = "../index.html");
const user = JSON.parse(userActive);
const userAndMaquina = maquinas
  .getAll()
  .map((item) => item.name === user.maquina && { ...user, ...item })
  .find((item) => item);

document.body.innerHTML += `
    <h2>Operario: ${userAndMaquina.name}</h2>
    <p>Maquina: ${userAndMaquina.maquina}</p>
    <p>Estado: ${userAndMaquina.status}</p>
    <p>Tonelage: ${userAndMaquina.toneladas} TON</p>
    <p>Ultimo mantenimiento: ${userAndMaquina.revision}</p>



    <button id="updateState">
      Actualizar estado de la máquina
    </button>
  `;

const updateStateButton = document.getElementById("updateState");
updateStateButton.addEventListener("click", () => {
  const newStatus = prompt("Ingrese el nuevo estado de la máquina:");
  if (newStatus) {
    maquinas.update(userAndMaquina.id, { status: newStatus });
    alert(`Estado actualizado a: ${newStatus}`);
    window.location.reload();
  } else {
    alert("Estado no actualizado.");
  }
});
