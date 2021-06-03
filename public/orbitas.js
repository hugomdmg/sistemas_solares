function nuevaOrbita(x, y, c1, c2, i, a, b, t, color) {
  let xcola = 0;
  let ycola = 0;
  function dibujar(x, y, x1, y1, xcola, ycola, x1cola, y1cola) {
    ctx.beginPath();
    if (x1 == 0) {
      ctx.strokeStyle = "black";
    } else {
      ctx.strokeStyle = color;
    }
    ctx.lineWidth = 3;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(x1cola, y1cola);
    ctx.lineTo(xcola, ycola);
    ctx.stroke()
  }

  function sumar() {
      
    if (true) {
      i = i + 0.001;
      let x1 = x;
      let y1 = y;
      x = Math.sin(i * Math.PI) * a + c1;
      y = Math.cos(i * Math.PI) * b + c2;

      let x1cola = xcola;
      let y1cola = ycola;

      xcola = Math.sin(i * Math.PI-Math.PI/4) * a + c1;
      ycola = Math.cos(i * Math.PI-Math.PI/4) * b + c2;


      dibujar(x, y, x1, y1, xcola, ycola, x1cola, y1cola);
    }
    
    return i;
  }
  setInterval(sumar, t);
}

