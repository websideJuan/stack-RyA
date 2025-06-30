import{d as l,m as d}from"./maquinas-DQrjGjQt.js";class c{constructor({db:t}){this.db=t,this.key="usuarios"}add(t){if(!t)return console.error("Usuario no proporcionado");this.db.add(this.key,t)}addAll(t){if(!Array.isArray(t)||t.length===0)return console.error("No se proporcionaron usuarios válidos");t.forEach(e=>{this.add(e)})}getAll(){return this.data=this.db.get(this.key),this.data}getById(t){return this.data.find(e=>e.id===t)}update(t,e){const i=this.data.findIndex(s=>s.id===t);i!==-1&&(this.data[i]={...this.data[i],...e},this.db.add(this.key,this.data))}delete(t){this.db.delete(this.key,t)}clear(){this.db.clear(this.key)}}const a=new c({db:l});if(a.getAll().length===0){console.warn("No hay usuarios registrados. Agregando usuarios de prueba...");const o=[{name:"Juan",maquina:"45",password:"pas1234*"},{name:"Aldo",maquina:"67",password:"pas1234*"},{name:"José",maquina:"59",password:"pas1234*"},{name:"Victor",maquina:"54",password:"pas1234*"},{name:"Juan T",maquina:"74",password:"pas1234*"},{name:"Joan",maquina:"59",password:"pas1234*"},{name:"Juan O",maquina:"69",password:"pas1234*"},{name:"Jaime",maquina:"78",password:"pas1234*"},{name:"Daniel C",maquina:"89",password:"pas1234*"}];a.clear(),a.addAll(o)}class u{constructor(){this.alertContainer=null,this.alert=null,this.count=0}show(t,e="info"){this.alertContainer=document.createElement("div"),this.alert=document.createElement("ul"),this.alertContainer.className=`notification notification-${e}`,this.alertContainer.style.display="flex",this.alert.textContent=t,this.alertContainer.appendChild(this.alert),document.querySelector("body").appendChild(this.alertContainer);let i=document.querySelector("body").scrollHeight;this.alertContainer.animate([{transform:"translateY(0%)"},{transform:`translateY(${i-this.count}px)`}],{duration:500,easing:"ease-in-out",fill:"forwards"}),this.count=this.count+(this.alertContainer.scrollHeight+10);const s=document.querySelectorAll(".notification");setTimeout(()=>{s.forEach(n=>n.remove()),this.count=0,this.alertContainer.remove()},1200)}}const r=new u;class p{constructor({app:t}){this.app=t,this.usuarios=a.getAll(),this.list=JSON.parse(localStorage.getItem("operarios"))||this.usuarios,this.founded=[],this.formulario=null,this.inputNombre=null,this.init()}init(){this.app.innerHTML=`
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
    `,this.maquinas=this.app.querySelector("#maquinas"),this.formulario=this.app.querySelector("#formulario"),this.inputNombre=this.app.querySelector("#nombre"),this.listOfCoincidences=this.app.querySelector("#listOfCoincidences"),this.changeList(),this.renderList(),this.renderListOfMaquinas(),this.listenner()}renderListOfMaquinas(){this.maquinas.innerHTML=d.getAll().filter(t=>t.status==="atrasada"||t.status==="mantenimiento").slice(0,4).map(t=>`
          <div class="card position-relative" >
            <div class="badge position-absolute bg-danger" style="border-radius: 40px; top: -10px; right: -10px; z-index: 1; padding: 0 10px;">
              ${t.status==="atrasada"?"Atrasada":t.status}
            </div>
            <div class="card-body">
              <strong>Maquina: ${t.name}</strong>
              <span>${a.getAll().find(e=>e.maquina===t.name)?.name}</span>
              <p>Toneladas: ${t.toneladas}Ton </p>
              <p>Mantencion: ${t.mantenimiento?"Al día":"Atrasada"}</p>
            </div>
          </div>
        `).join("")}changeList(){document.querySelector(".priority-list").innerHTML=this.list.map((t,e)=>t.name?`
        <li class="list-group-item">
           ${e+1} - <a href="#" class="operario">${t.priority?t.name:""}</a>
        </li>`:"").join(""),localStorage.setItem("operarios",JSON.stringify(this.list))}handlerSubmit(t){t.preventDefault();const e=this.formulario.querySelector("#nombre").value.trim();if(!e)return r.show("Por favor, ingresa un nombre válido.");if(this.list.find(s=>s.name===e)){r.show("El operario ya existe en la lista."),this.formulario.reset();return}}handlerChange(t){if(!t.target.value){this.listOfCoincidences.innerHTML="";return}this.founded=this.list.filter(e=>e.name.toLowerCase().includes(t.target.value)),this.renderList()}handlerClick(t){if(t.preventDefault(),t.target.id==="login-button"){const e=document.querySelector("#username").value.trim(),i=document.querySelector("#password").value.trim();if(!e||!i)return r.show("Por favor, completa todos los campos.","warning");console.log("nombre de usuario:",e),console.log("contraseña:",i);const s=this.usuarios.find(n=>n.name===e&&n.password===i);s?(localStorage.setItem("activeUser",JSON.stringify(s)),r.show("Inicio de sesión exitoso.","success"),this.app.querySelector(".collapse").classList.remove("show"),window.location.href="src/operario.html"):r.show("Usuario o contraseña incorrectos.","danger");return}if(t.target.dataset.navlink==="false"){const e=t.target.parentElement,i=e.querySelector(".collapse");if(i){i.classList.toggle("show");const s=i.classList.contains("show");e.setAttribute("data-collapse",s)}return}if(t.target.classList.contains("operario")){const e=t.target.textContent;this.list.filter(i=>i.name===e?(i.priority=!i.priority,!0):!1),this.list.sort((i,s)=>i.priority&&!s.priority?-1:!i.priority&&s.priority?1:0),this.changeList(),this.formulario.reset();return}if(t.target.classList.contains("coincidences")){const e=t.target.textContent;this.inputNombre.value=e,this.listOfCoincidences.innerHTML="",this.list.find(i=>i.name===e?(i.priority=!0,!0):!1),this.list.sort((i,s)=>i.priority&&!s.priority?-1:!i.priority&&s.priority?1:0),this.changeList(),this.formulario.reset()}}renderList(){this.listOfCoincidences.innerHTML=this.founded.map((t,e)=>`<li class="list-group-item coincidences">${t.name}</li>`).join("")}listenner(){this.formulario.addEventListener("submit",t=>this.handlerSubmit(t)),this.inputNombre.addEventListener("input",t=>this.handlerChange(t)),this.app.addEventListener("click",t=>this.handlerClick(t)),this.app.addEventListener("resize",t=>{console.log("event resize",t.target);const e=this.app.querySelector(".menu-collapse");e&&(e.classList.remove("show"),e.setAttribute("data-collapse","false"))})}}new p({app:document.getElementById("app")});
