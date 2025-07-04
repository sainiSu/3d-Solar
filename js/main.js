import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { speed, createSpeedControls } from './speed.js';

// Scene basics
let scene, camera, renderer, controls, skybox;

// Planets and sun
let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;


// Orbit radius (world units)
const radii = {
  mercury: 50,
  venus: 60,
  earth: 70,
  mars: 80,
  jupiter: 100,
  saturn: 120,
  uranus: 140,
  neptune: 160,
};

// Load textured mesh for planets and sun
function loadTextureMesh(path, radius) {
  const geo = new THREE.SphereGeometry(radius, 64, 64);
  const tex = new THREE.TextureLoader().load(path);
  const mat = new THREE.MeshBasicMaterial({ map: tex });
  return new THREE.Mesh(geo, mat);
}

// Create orbit path as glowing line loop
function createOrbit(radius) {
  const segments = 128;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color: 0x8888ff, transparent: true, opacity: 0.5 });
  const loop = new THREE.LineLoop(geo, mat);
  scene.add(loop);
}

// Create skybox materials
function createMaterialArray() {
  const skyboxImagepaths = [
    "../img/skybox/space_ft.png",
    "../img/skybox/space_bk.png",
    "../img/skybox/space_up.png",
    "../img/skybox/space_dn.png",
    "../img/skybox/space_rt.png",
    "../img/skybox/space_lf.png",
  ];
  return skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
}

// Setup skybox mesh and add to scene
function setSkyBox() {
  const materialArray = createMaterialArray();
  const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

// Initialize scene, camera, renderer, controls, lights, planets, orbits
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 40, 220);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "c";
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 40;
  controls.maxDistance = 600;

  setSkyBox();

  scene.add(new THREE.PointLight(0xffffff, 2, 1000)); // fake sunlight

  sun = loadTextureMesh("img/sun_hd.jpg", 20);
  mercury = loadTextureMesh("img/mercury_hd.jpg", 2);
  venus = loadTextureMesh("img/venus_hd.jpg", 3);
  earth = loadTextureMesh("img/earth.png", 3.5);
  mars = loadTextureMesh("img/mars.jpg", 2.5);
  jupiter = loadTextureMesh("img/jupiter_hd.jpg", 7);
  saturn = loadTextureMesh("img/saturn_hd.jpg", 6);
  uranus = loadTextureMesh("img/uranus_hd.jpg", 5);
  neptune = loadTextureMesh("img/neptune_hd.jpg", 5);

  scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

  Object.values(radii).forEach(createOrbit);

  earth.position.x = radii.earth;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Move planet in orbit based on speed factor
function movePlanet(mesh, r, t, speedFactor) {
  const angle = t * 0.001 * speedFactor; // slow & smooth
  mesh.position.set(r * Math.cos(angle), 0, r * Math.sin(angle));
}

// Animate scene with rotation and revolution
function animate(t) {
  requestAnimationFrame(animate);

  const rot = 0.005;
  [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune].forEach(p => (p.rotation.y += rot));

  movePlanet(mercury, radii.mercury, t, speed.mercury);
  movePlanet(venus, radii.venus, t, speed.venus);
  movePlanet(earth, radii.earth, t, speed.earth);
  movePlanet(mars, radii.mars, t, speed.mars);
  movePlanet(jupiter, radii.jupiter, t, speed.jupiter);
  movePlanet(saturn, radii.saturn, t, speed.saturn);
  movePlanet(uranus, radii.uranus, t, speed.uranus);
  movePlanet(neptune, radii.neptune, t, speed.neptune);

  controls.update();
  renderer.render(scene, camera);
}



// Start everything
init();
createSpeedControls();
animate(0);

