import './style.css';
import * as _3js from 'three';
import * as _orbitCtrls from 'three/examples/jsm/controls/OrbitControls';

const scene = new _3js.Scene();
const camera = new _3js.PerspectiveCamera(75 ,window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new _3js.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const cameraOffsetZ = 30;
camera.position.setZ(cameraOffsetZ);

renderer.render(scene, camera);

const geometry = new _3js.TorusGeometry(10, 3, 16, 100);
const material = new _3js.MeshStandardMaterial({ color: 0xff6347 });
const torus = new _3js.Mesh(geometry, material);

scene.add(torus);

const pointLight = new _3js.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new _3js.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new _3js.PointLightHelper(pointLight);
// scene.add(lightHelper);

// const gridHelper = new _3js.GridHelper(200,50);
// scene.add(gridHelper);

//const playerController = new _orbitCtrls.OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new _3js.SphereGeometry(0.25, 24, 24);
  const material = new _3js.MeshStandardMaterial({ color: 0xffffff });
  const star = new _3js.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map( () => _3js.MathUtils.randFloatSpread(100) );
  star.position.set(x, y, z);
  scene.add(star);
}

const spaceTexture = new _3js.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

Array(200).fill().forEach(addStar);

const jeffTexture = new _3js.TextureLoader().load('jeff.png');
const jeff = new _3js.Mesh(
  new _3js.BoxGeometry(3,3,3),
  new _3js.MeshBasicMaterial({ map: jeffTexture})
);

scene.add(jeff);

const moonTexture = new _3js.TextureLoader().load('moon.jpg');
const normalMap = new _3js.TextureLoader().load('normal.jpg');
const moon = new _3js.Mesh(
  new _3js.SphereGeometry(3,32,32),
  new _3js.MeshStandardMaterial({ 
    map: moonTexture,
    normalMap: normalMap
  })
);
moon.position.set(-10, 0, 30);
scene.add(moon);

function moveCamera(){
  const top = document.body.getBoundingClientRect().top;
  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  //  camera.position.x = top * -0.002;
  //  camera.position.y = top * -0.002;
   camera.position.z = cameraOffsetZ + top * -0.005;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += -0.0005;
  //playerController.update();

  renderer.render(scene, camera);
}

animate();