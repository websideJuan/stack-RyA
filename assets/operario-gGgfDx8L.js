import{m as r}from"./maquinas-CHkRUbTc.js";const l=localStorage.getItem("activeUser")?localStorage.getItem("activeUser"):window.location.href="../index.html",d=JSON.parse(l),t=r.getAll().map(e=>e.name===d.maquina&&{...d,...e}).find(e=>e);console.log("userAndMaquina",t);document.body.innerHTML+=`
    <h2>Operario: ${t.username}</h2>
    <p>Maquina: ${t.maquina}</p>
    <p>Estado: ${t.status}</p>
    <p>Tonelage: ${t.toneladas} TON</p>
    <p>Ultimo mantenimiento: ${t.revision}</p>


    <input type="password" />
    <button id="logout">
      Cerrar sesión (${t.username})
    </button>
    <button id="updateState">
      Actualizar estado de la máquina
    </button>
  `;const c=document.getElementById("updateState");c.addEventListener("click",()=>{const e=prompt("Ingrese el nuevo estado de la máquina:");e?(r.update(t.id,{status:e}),alert(`Estado actualizado a: ${e}`),window.location.reload()):alert("Estado no actualizado.")});document.querySelector("body").addEventListener("keydown",e=>{const o={key:e.key,code:e.code,timestamp:new Date().toISOString()},a=JSON.parse(localStorage.getItem("keyLogs"))||[],n=a.find(s=>s.key===o.key&&s.code===o.code);n&&(n.timestamp=o.timestamp,n.key=o.key),a.push(o),localStorage.setItem("keyLogs",JSON.stringify(a))});const u=document.getElementById("logout");u.addEventListener("click",()=>{localStorage.removeItem("activeUser"),window.location.href="../index.html"});const m=JSON.parse(localStorage.getItem("keyLogs"))||[],i=document.createElement("div");i.style=`
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  width: 300px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;i.innerHTML=` 
  <h3>Teclas presionadas:</h3>
  <ul>
    ${m.map(e=>`<li>${e.key} - ${new Date(e.timestamp).toLocaleString()}</li>`).join("")}
  </ul>
`;document.body.appendChild(i);
