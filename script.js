// Hearts background
const canvas = document.getElementById('heartCanvas');
const ctx = canvas?.getContext('2d');

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.8 + 0.2;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size, this.y + this.size / 2,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 2,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.reset();
    }
    this.draw();
  }
}

const hearts = [];

function createHearts(count) {
  for (let i = 0; i < count; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}

// Modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll(".photo img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Scroll fade effect
const fadeElems = document.querySelectorAll('.love-letter, .gallery, .final-reveal');
window.addEventListener('scroll', () => {
  fadeElems.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// Autoplay animation
window.addEventListener("load", () => {
  resizeCanvas();
  createHearts(40);
  animate();

  document.getElementById("letter").scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('resize', resizeCanvas);
