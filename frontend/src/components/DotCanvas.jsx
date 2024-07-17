import { useEffect } from "react";
import "./css/DotCanvas.css";

const DotCanvas = ({ children }) => {
  useEffect(() => {
    const canvas = document.getElementById("dotCanvas");
    const canvasCon = document.getElementById("canvasContainer");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");

    let dots = [];
    const colors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];

    function createDots() {
      for (let i = 0; i < 50; i++) {
        dots.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 2 + 2,
          color: colors[Math.floor(Math.random() * 5)],
        });
      }
    }
    function drawDots() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      dots.forEach((dot) => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    createDots();
    drawDots();

    canvasCon.addEventListener("mousemove", (event) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
      let mouse = {
        x: event.pageX - canvas.getBoundingClientRect().left,
        y: event.pageY - canvas.getBoundingClientRect().top,
      };
      dots.forEach((dot) => {
        let distance = Math.sqrt(
          (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );
        if (distance < 200) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x - window.scrollX, mouse.y - window.scrollY);
          ctx.stroke();
        }
      });
    });
    canvasCon.addEventListener("mouseout", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
    });
    window.addEventListener("resize", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots = [];
      createDots();
      drawDots();
    });
  }, []);

  return (
    <>
      <div id="canvasContainer">
        {children} <canvas id="dotCanvas"></canvas>
      </div>
    </>
  );
};

export default DotCanvas;
