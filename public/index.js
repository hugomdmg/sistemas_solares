function mostrarAnadir() {
  document.getElementById("parrafo").innerHTML = `
  <div id="parrafo">
    <div>
        <td>
        <tr><div>Nombre Sistema: </div><input type="text" id="system"/></tr>
        <button type = 'text' onclick= 'anadir()'>añadir sistema</button>
        </td>
    </div>

    <div id="mensaje"></div>
  </div>
    `;
}

function anadir() {
  fetch("/sistemas/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ system: document.getElementById("system").value }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      document.getElementById("mensaje").innerHTML = `<p>${datos.mensaje}</p>`;
    });
}

function mostrarAnadirPlanetas() {
    document.getElementById("anadirplaneta").innerHTML = `
  <div id="parrafo">
    <p>Introduzca los datos del planeta:</p>
    <table>
        <td>
        <tr><div>Nombre sistema: </div><input type="text" id="sistema"/></tr>
        <tr><div>Nombre planeta: </div><input type="text" id="planeta"/></tr>
        <tr><div>apoapsis: </div><input type="text" id="apoapsis"/></tr>
        <tr><div>periapsis: </div><input type="text" id="periapsis"/></tr>
        <tr><div>color: </div><input type="text" id="color"/></tr>
        <button type = 'text' onclick= 'anadirPlanetas()'>añadir planeta</button>
        </td>
    </table>
    <div id="mensaje"></div>
  </div>
    `;
}

function anadirPlanetas() {
    let sistema = document.getElementById('sistema').value;
    let planeta = {
        nombre: document.getElementById('planeta').value,
        apoapsis: document.getElementById('apoapsis').value,
        periapsis: document.getElementById('periapsis').value,
        color: document.getElementById('color').value,
    }
  fetch('/sistemas/guardarplaneta', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({sistema: sistema, planeta}),
  } );
}

function eliminar(i) {
  fetch("/sistemas/borrar", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sistema: i }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      mostrarSistemas();
    });
}

function mostrarSistemas() {
  let id = '';
  let parrafo = "";
  fetch("/sistemas/mostrar")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      for (let i = 0; i < datos.length; i++) {
        parrafo += `
            <td>
                <tr><div>Sistema: ${datos[i].sistema}</div></tr>
                <tr><div>Planetas: </tr>
                <tr><button onclick="eliminar('${datos[i].sistema}')">eliminar</button></tr>
                <tr><button onclick="mostrarAnadirPlanetas()">añadir planetas</button></tr>
            </td>
            `;
      }
      document.getElementById(
        "parrafo"
      ).innerHTML = `<div id='parrafo'>
                    <table>${parrafo}</table>
                    <div>Nombre sistema: </div><input type="text" id="simulacion"/>
                    <button type = 'text' onclick= 'simulacion()'>ver simulación</button>
                    <div id='anadirplaneta'></div>
                    </div>
                    `;
    });
}




//--------------------------

      
  let canvasLineas = document.getElementById("lineas");
  let ctx = canvasLineas.getContext("2d");

  function nuevaOrbita(x, y, c1, c2, i, a, b, t, color) {
    function dibujar(x, y, x1, y1, xcola, ycola) {
      ctx.beginPath();
      if (x1 == 0) {
        ctx.strokeStyle = "black";
      } else {
        ctx.strokeStyle = color;
      }
      ctx.lineWidth = 10;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 9;
      ctx.moveTo(x1, y1);
      ctx.lineTo(xcola, ycola);
      ctx.stroke();
    }

    function sumar() {
        
      if (true) {
        //vamos a hacer que i sea la velocidad
        i = i + 0.001;
        icola = i - Math.PI/2
        let x1 = x;
        let y1 = y;
        x = Math.sin(i * Math.PI) * a + c1;
        y = Math.cos(i * Math.PI) * b + c2;

        xcola = Math.sin(icola * Math.PI) * a + c1;
        ycola = Math.cos(icola * Math.PI) * b + c2;
        dibujar(x, y, x1, y1, xcola, ycola);
      }
      
      return i;
    }
    setInterval(sumar, t);
  }


function simulacion(){
    let simulacion = document.getElementById('simulacion').value;
    fetch(`/sistemas/mostrar/simulacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sistema: simulacion }),
      } ).then(function(res){
          return res.json();
      }).then(function(datos){
          console.log(datos)
         for(let i = 0; i<datos[0].planetas.length; i++){
             let periapsis = parseFloat(datos[0].planetas[i].apoapsis)
             let apoapsis = parseFloat(datos[0].planetas[i].periapsis)
             let color = `${datos[0].planetas[i].color}`
             nuevaOrbita(0, 0,400, 250, 0, periapsis*20, apoapsis*20, apoapsis*apoapsis, color);
         }
      })

}

function registrar(){
  let usuario = document.getElementById('usuario').value;
  let contrasena = document.getElementById('contrasena').value;
  console.log(contrasena)
  fetch('/usuarios/registrar',  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario: usuario, contrasena: contrasena }),
  } ).then(function(res){
    return res.json();
  }).then(function(datos){
    console.log(datos)
    if(!datos.error){
      document.getElementById('mensajes').innerHTML = `
      <p id='mensajes'>${datos.mensaje}</p>
      `
      setTimeout(() => {
        document.getElementById('mensajes').innerHTML = `
      <p id='mensajes'></p>
      `
      }, 2000);
    }else{
      document.getElementById('mensajes').innerHTML = `<p>ha habido un problema de conexión, vuelva a intentarlo</p>`
      
    }
  })
  
}

function entrar(){
  let usuario = document.getElementById('usuario').value;
  let contrasena = document.getElementById('contrasena').value;
  fetch('/usuarios/entrar',  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario: usuario, contrasena: contrasena }),
  } ).then(function(res){
    return res.json();
  }).then(function(datos){
    console.log(datos)
    if(datos.estado){
      document.getElementById('cabecera').innerHTML = `
      <header>
        <button onclick="mostrarAnadir()"><h3>Añadir sistema</h3></button>
        <button onclick="mostrarSistemas()"><h3>Ver sistemas</h3></button>
        <button onclick="mostrarSimulador()"><h3>Simulador tiro</h3></button>
      </header>
      `
    }else{
      document.getElementById('mensajes').innerHTML = `
      <p id='mensajes'>${datos.mensaje}</p>
      `
      setTimeout(() => {
        document.getElementById('mensajes').innerHTML = `
      <p id='mensajes'></p>
      `
      }, 2000);
    }
  })
}
  

    
