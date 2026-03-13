const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll(".section, .hero, .site-footer");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for reaching out. We will respond within 24 hours.");
    form.reset();
  });
}

// Three.js animated background
const canvas = document.getElementById("bg-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.0025);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 180;

const particleCount = 1200;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 600;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xc9a45b,
  size: 1.5,
  transparent: true,
  opacity: 0.7,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

const glowGeometry = new THREE.PlaneGeometry(900, 900);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x20130a,
  transparent: true,
  opacity: 0.35,
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.position.z = -200;
scene.add(glow);

let time = 0;
function animate() {
  time += 0.002;
  particles.rotation.y += 0.0007;
  particles.rotation.x = Math.sin(time) * 0.1;
  glow.rotation.z -= 0.0004;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
