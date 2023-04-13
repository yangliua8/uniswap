import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#FF4136', '#FFDC00', '#2ECC40', '#B10DC9'];
    const particles = [];
    const particleCount = 700;
    let distance = 0;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = 0.3;
        this.direction = Math.random() * Math.PI * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = 1;
      }

      update() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x < 0) {
          this.x = canvas.width;
        } else if (this.x > canvas.width) {
          this.x = 0;
        }

        if (this.y < 0) {
          this.y = canvas.height;
        } else if (this.y > canvas.height) {
          this.y = 0;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();

        const distanceX = Math.abs(particle.x - mouse.x);
        const distanceY = Math.abs(particle.y - mouse.y);
        distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance <= 300) {
          const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
          const distanceToMouse = 300 - distance;

          particle.x += Math.cos(angle) * distanceToMouse * 0.05;
          particle.y += Math.sin(angle) * distanceToMouse * 0.05;
        }
      });
    }

    const mouse = {
      x: undefined,
      y: undefined
    };

    const handleMouseMove = event => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{position: 'fixed'}}/>;
};

export default ParticleBackground;