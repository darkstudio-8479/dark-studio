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
    alert("Thanks for reaching out. We will respond soon.");
    form.reset();
  });
}

async function loadStudio() {
  const response = await fetch("data/studio.json");
  return response.json();
}

async function loadProject() {
  const response = await fetch("data/project.json");
  return response.json();
}

async function loadTeam() {
  const response = await fetch("data/team.json");
  return response.json();
}

function setStudio(data) {
  document.getElementById("studio-tagline").textContent = data.tagline;
  document.getElementById("studio-description").textContent = data.description;
  document.getElementById("studio-team").textContent = `${data.team_size}`;
  document.getElementById("studio-engine").textContent = data.engine;
  document.getElementById("studio-status").textContent = data.status;
}

function setProject(projects) {
  const project = projects[0];
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-type").textContent = `${project.type} · ${project.engine}`;
  document.getElementById("project-description").textContent = project.description;
  const list = document.getElementById("project-features");
  list.innerHTML = "";
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    list.appendChild(li);
  });
}

function setTeam(team) {
  const grid = document.getElementById("team-grid");
  grid.innerHTML = "";
  team.forEach((member) => {
    const card = document.createElement("article");
    card.className = "team-card glass";

    const tools = [];
    if (member.tool) tools.push(member.tool);
    if (member.tools) tools.push(...member.tools);
    if (member.hardware) tools.push(member.hardware);

    card.innerHTML = `
      <div>
        <h4>${member.name}</h4>
        <p class="tagline">${member.role}</p>
      </div>
      <div class="badge">${tools.length ? tools.join(" · ") : "Contributor"}</div>
      <ul class="responsibilities">
        ${member.responsibilities.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
    grid.appendChild(card);
  });
}

async function init() {
  const [studio, project, team] = await Promise.all([
    loadStudio(),
    loadProject(),
    loadTeam(),
  ]);
  setStudio(studio);
  setProject(project);
  setTeam(team);
}

init();

// Three.js animated background
const canvas = document.getElementById("bg-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x070707, 0.0028);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 200;

const particleCount = 900;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 600;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xc1a268,
  size: 1.4,
  transparent: true,
  opacity: 0.65,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

const glowGeometry = new THREE.PlaneGeometry(900, 900);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0x22180a,
  transparent: true,
  opacity: 0.3,
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.position.z = -220;
scene.add(glow);

let time = 0;
function animate() {
  time += 0.002;
  particles.rotation.y += 0.0006;
  particles.rotation.x = Math.sin(time) * 0.08;
  glow.rotation.z -= 0.0003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
