import{m as o}from"./maquinas-CYJwzj-N.js";const n=localStorage.getItem("activeUser")?localStorage.getItem("activeUser"):window.location.href="../index.html",e=JSON.parse(n),a=o.getAll().map(t=>t.name===e.maquina&&{...e,...t}).find(t=>t);console.log(a);document.body.innerHTML+=`
    <h2>Operario: ${a.name}</h2>
    <p>Maquina: ${a.maquina}</p>
    <p>Estado: ${a.status}</p>
    <p>Tonelage: ${a.toneladas} TON</p>
    <p>Ultimo mantenimiento: ${a.revision}</p>



    <button id="updateState">
      Actualizar estado de la máquina
    </button>
  `;const i=document.getElementById("updateState");i.addEventListener("click",()=>{const t=prompt("Ingrese el nuevo estado de la máquina:");t?(o.update(a.id,{status:t}),alert(`Estado actualizado a: ${t}`),window.location.reload()):alert("Estado no actualizado.")});
