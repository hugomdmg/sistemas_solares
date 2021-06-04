let canvasLineas = document.getElementById("lissajous");
let ctx = canvasLineas.getContext("2d");

function nuevaOrbita(x, y, c1, c2, i, fase, a, b, t, color) {
  function dibujar(x, y, x1, y1) {
    ctx.beginPath();
    if (x1 == 0) {
      ctx.strokeStyle = "black";
    } else {
      ctx.strokeStyle = color;
    }
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function sumar() {
      
      i = i + 0.001;
      let x1 = x;
      let y1 = y;
      x = Math.sin(i * Math.PI) * a + c1;
      y = Math.cos(fase* i * Math.PI) * b + c2;


      dibujar(x, y, x1, y1);
    
    return i;
  }
  setInterval(sumar, t);
}



function simulacion(){
  let amplitud1 = document.getElementById('amplitud1').value;
  let fase = document.getElementById('fase').value;
  let amplitud2 = document.getElementById('amplitud2').value;
  nuevaOrbita(0, 0, 400, 250, 0, fase, amplitud1*40, amplitud2*40, 3, 'white')
}