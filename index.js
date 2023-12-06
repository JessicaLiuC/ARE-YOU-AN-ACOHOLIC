import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

//Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector(".webg1")
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)


//OrbitControls allow camera to move around the scene
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

var mixer
var previousTime = 0;
var character
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xdddddd);

const loader = new GLTFLoader()
loader.load(
    'static/new.glb', 
    function(glb){
        var clip = glb.animations[0];
        character = glb.scene
        character.scale.set(5,5,5)
        scene.add(character);
        mixer = new THREE.AnimationMixer(glb.scene);
        var action = mixer.clipAction(clip);
        action.play();
    }, 
    function(xhr){
        console.log((xhr.loaded/xhr.total * 100) + "% loaded")
    }, 
    function(error){
        console.log('An error occurred')
    }
)


hemiLight.position.set(0, 200, 0);
hemiLight.intensity = 1.5; 
scene.add(hemiLight);


camera.position.set(0,7,2)
camera.position.z = "static" ? 25:50;
scene.add(camera)

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;




renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0x000000, 0 )
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true
renderer.render(scene, camera)


function animate(time) {
    requestAnimationFrame(animate)
    var delta = (time - previousTime)/800;
    mixer.update(delta);
    previousTime = time;
    renderer.render(scene, camera);
}


const audio = document.getElementById("music");
const btn = document.getElementById("stopBtn");

let isMuted = true;

btn.addEventListener("click", () => {
  if(!isMuted) {
    isMuted = true;
    btn.textContent = "🔈";
    audio.play(); 
} 
  else {
    isMuted = false; 
    btn.textContent = "🔇";
    audio.pause();
    };
});

function tick() {

    const time = performance.now();
  
    animate(time);
  
  }
  
tick();