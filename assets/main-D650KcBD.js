import{d as l,m as c}from"./maquinas-CHkRUbTc.js";class d{constructor({db:e}){this.db=e,this.key="usuarios"}add(e){if(!e)return console.error("Usuario no proporcionado");this.db.add(this.key,e)}addAll(e){if(!Array.isArray(e)||e.length===0)return console.error("No se proporcionaron usuarios válidos");e.forEach(i=>{this.add(i)})}getAll(){return this.data=this.db.get(this.key),this.data}getById(e){return this.data.find(i=>i.id===e)}update(e,i){const t=this.data.findIndex(s=>s.id===e);t!==-1&&(this.data[t]={...this.data[t],...i},this.db.add(this.key,this.data))}delete(e){this.db.delete(this.key,e)}clear(){this.db.clear(this.key)}}const a=new d({db:l});if(a.getAll().length===0){console.warn("No hay usuarios registrados. Agregando usuarios de prueba...");const n=[{username:"Juan H",maquina:"45",password:"pas1234*"},{username:"Aldo H",maquina:"67",password:"pas1234*"},{username:"José A",maquina:"93",password:"pas1234*"},{username:"Victor B",maquina:"54",password:"pas1234*"},{username:"Juan T",maquina:"74",password:"pas1234*"},{username:"Joan R",maquina:"59",password:"pas1234*"},{username:"Juan O",maquina:"69",password:"pas1234*"},{username:"Jaime O",maquina:"78",password:"pas1234*"},{username:"Daniel C",maquina:"89",password:"pas1234*"}];a.clear(),a.addAll(n)}class u{constructor(){this.alertContainer=null,this.alert=null,this.count=0}show(e,i="info"){this.alertContainer=document.createElement("div"),this.alert=document.createElement("ul"),this.alertContainer.className=`notification notification-${i}`,this.alertContainer.style.display="flex",this.alert.textContent=e,this.alertContainer.appendChild(this.alert),document.querySelector("body").appendChild(this.alertContainer);let t=document.querySelector("body").scrollHeight;this.alertContainer.animate([{transform:"translateY(0%)"},{transform:`translateY(${t-this.count}px)`}],{duration:500,easing:"ease-in-out",fill:"forwards"}),this.count=this.count+(this.alertContainer.scrollHeight+10);const s=document.querySelectorAll(".notification");setTimeout(()=>{s.forEach(r=>r.remove()),this.count=0,this.alertContainer.remove()},1200)}}const o=new u;class p{constructor({app:e}){this.app=e,this.usuarios=a.getAll(),this.list=JSON.parse(localStorage.getItem("operarios"))||this.usuarios,this.founded=[],this.formulario=null,this.inputNombre=null,this.init()}init(){this.app.innerHTML=`
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
        <div style="grid-column: 1/6;">
          <h4>Lista de prioridad</h4>
          <ul style="margin: 0 1rem;" class="priority-list list-group"></ul>
          
          <form id="formulario" class="formulario">
            <div class="form-group position-relative ">
              <input type="text" class="form-control" id="nombre" placeholder="Nombre del operario" autocomplete="off" autofocus> 
              <div class="form-dropdow position-absolute top-full">
                <ul class="list-group mt-3" id="listOfCoincidences"></li>
              </div>
            </div>

          </form>
        </div>
        <div style="grid-column: 6/12; display: flex; flex-direction: column; gap: 3rem;">
          <div>
            <h4>Maquinas Atrasadas</h4>
            <div style="align-items: flex-start;" class="flex flex-gap" id="maquinas"></div>
          </div>
          <div>
            <h4>Operarios disponibles</h4>
            <div>
              <ul class="list-group list-circles" id="operarios-disponibles"></ul>
            </div>
          </div>
        </div>
      </div>
    `,this.maquinas=this.app.querySelector("#maquinas"),this.formulario=this.app.querySelector("#formulario"),this.inputNombre=this.app.querySelector("#nombre"),this.listOfCoincidences=this.app.querySelector("#listOfCoincidences"),this.changeList(),this.renderList(),this.renderListOfMaquinas(),this.listenner()}renderListOfMaquinas(){this.maquinas.innerHTML=c.getAll().slice(0,4).filter(e=>e.status==="atrasada"||e.status==="mantenimiento").map(e=>`
          <div class="card position-relative">
            <div class="badge position-absolute bg-danger" style="border-radius: 40px; top: -10px; right: -10px; z-index: 1; padding: 0 10px;">
              ${e.status==="atrasada"?"Atrasada":e.status}
            </div>
            <div class="card-body">
              <strong>Maquina: ${e.name}</strong>
              <span>${a.getAll().find(i=>i.maquina===e.name)?.username}</span>
              <p>Toneladas: ${e.toneladas}Ton </p>
              <p>Mantencion: ${e.mantenimiento?"Al día":"Atrasada"}</p>
            </div>
          </div>
        `).join("")||`<p class="text-center">No hay máquinas atrasadas o en mantenimiento. 👍</p>
    `}changeList(){this.app.querySelector("#operarios-disponibles").innerHTML=`
    ${this.list.filter(e=>e.priority&&e.username).map(e=>`
          <li class="list-group-item">
            <span>${e.username[0].concat(e.username[e.username.length-1])}</span>
          </li>
            `).join("")||"No hay operarios disponibles"}
    `,this.app.querySelector(".priority-list").innerHTML=this.list.map((e,i)=>e.username?`
        <li class="list-group-item">
          <span>${i+1}</span> - <a href="#" class="operario">${e.priority?e.username:""}</a>
        </li>`:"").join(""),localStorage.setItem("operarios",JSON.stringify(this.list))}handlerSubmit(e){e.preventDefault()}handlerChange(e){if(!e.target.value){this.listOfCoincidences.innerHTML="";return}this.founded=this.list.filter(i=>i.username.toLowerCase().includes(e.target.value)),this.renderList()}handlerClick(e){if(e.preventDefault(),e.target.id==="login-button"){const i=document.querySelector("#username").value.trim(),t=document.querySelector("#password").value.trim();if(!i||!t)return o.show("Por favor, completa todos los campos.","warning");console.log("nombre de usuario:",i),console.log("contraseña:",t);const s=this.usuarios.find(r=>r.username===i&&r.password===t);console.log("user encontrado:",s),s?(localStorage.setItem("activeUser",JSON.stringify(s)),o.show("Inicio de sesión exitoso.","success"),this.app.querySelector(".collapse").classList.remove("show"),window.location.href="src/operario.html"):o.show("Usuario o contraseña incorrectos.","danger");return}if(e.target.dataset.navlink==="false"){const i=e.target.parentElement,t=i.querySelector(".collapse");if(t){t.classList.toggle("show");const s=t.classList.contains("show");i.setAttribute("data-collapse",s)}return}if(e.target.classList.contains("operario")){const i=e.target.textContent;this.list.filter(t=>t.username===i?(t.priority=!t.priority,!0):!1),this.list.sort((t,s)=>t.priority&&!s.priority?-1:!t.priority&&s.priority?1:0),this.changeList(),this.formulario.reset();return}if(e.target.classList.contains("coincidences")){const i=e.target.textContent;this.inputNombre.value=i,this.listOfCoincidences.innerHTML="",this.list.find(t=>t.username===i?(t.priority=!0,!0):!1),this.list.sort((t,s)=>t.priority&&!s.priority?-1:!t.priority&&s.priority?1:0),this.changeList(),this.formulario.reset()}}renderList(){this.listOfCoincidences.innerHTML=this.founded.map((e,i)=>`<li class="list-group-item coincidences">${e.username}</li>`).join("")}listenner(){this.formulario.addEventListener("submit",e=>this.handlerSubmit(e)),this.inputNombre.addEventListener("input",e=>this.handlerChange(e)),this.inputNombre.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){const i=this.app.querySelector("li.coincidences.active");if(i){const t=i.nextElementSibling;t&&t.classList.contains("coincidences")&&(t.classList.add("active"),i.classList.remove("active"))}else{const t=this.app.querySelector("li.coincidences");t&&t.classList.add("active")}}else if(e.key==="ArrowUp"){const i=this.app.querySelector("li.coincidences.active");if(i){const t=i.previousElementSibling;t&&t.classList.contains("coincidences")&&(t.classList.add("active"),i.classList.remove("active"))}else{const t=this.app.querySelector("li.coincidences:last-child");t&&t.classList.add("active")}}else if(e.key==="Enter"){const i=this.app.querySelector("li.coincidences.active");if(i){const t=i.textContent;this.inputNombre.value=t,this.listOfCoincidences.innerHTML="",this.list.find(s=>s.username===t?(s.priority=!0,!0):!1),this.list.sort((s,r)=>s.priority&&!r.priority?-1:!s.priority&&r.priority?1:0),this.changeList(),this.formulario.reset()}}}),this.app.addEventListener("click",e=>this.handlerClick(e)),this.app.addEventListener("resize",e=>{console.log("event resize",e.target);const i=this.app.querySelector(".menu-collapse");i&&(i.classList.remove("show"),i.setAttribute("data-collapse","false"))})}}new p({app:document.getElementById("app")});
