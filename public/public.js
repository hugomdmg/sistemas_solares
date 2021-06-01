window.addEventListener("load", () => {
  let canvasLineas = document.getElementById("lineas");
  let ctx = canvasLineas.getContext("2d");

  function nuevaOrbita(x, y, c1, c2, i, a, b, t, color) {
    function dibujar(x, y, x1, y1, xcola, ycola) {
      ctx.beginPath();
      if (x1 == 0) {
        ctx.strokeStyle = "white";
      } else {
        ctx.strokeStyle = color;
      }
      ctx.lineWidth = 2;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.moveTo(x1, y1);
      ctx.lineTo(xcola, ycola);
      ctx.stroke();
    }

    function sumar() {
        
      if (true) {
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

  nuevaOrbita(0, 0,150, 150, 0, 100, 50, 10, "green");
  nuevaOrbita(0, 0, 140, 180, 0, 200, 150, 4, "blue");
  nuevaOrbita(0, 0, 100, 120, 0, 20, 25, 4, "red");


});
