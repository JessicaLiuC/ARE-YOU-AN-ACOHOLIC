import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

//Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector(".webg2")
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)


//OrbitControls allow camera to move around the scene
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})

var mixer
var previousTime = 0;
var character
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xdddddd);

const loader = new GLTFLoader()
loader.load(
    'static/lose6.glb', 
    function(glb){
        var clip = glb.animations[0];
        character = glb.scene
        character.scale.set(5,5,5)
        scene.add(character);
        mixer = new THREE.AnimationMixer(glb.scene);
        var action = mixer.clipAction(clip);
        //make the action to not repeat after once
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
        //play the action
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


camera.position.set(35,5,2)
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


function animate() {

    requestAnimationFrame(animate)
    // var delta = time - previousTime;
    // mixer.update(delta*0.1);
    // previousTime = time;
    // Fixed timestep
    
    const fixedDelta = 0.01; 
    mixer.update(fixedDelta);

    renderer.render(scene, camera);

    
}

//audio and button part
const audio = document.getElementById("music");
const btn = document.getElementById("stopBtn");
let isMuted = false;
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

//dizzy gif file delay for 5 sec
const gif = document.getElementById('delay');

// Show after delay
setTimeout(() => {

  gif.style.visibility = 'visible';

}, 2500);

//text tile part
var words = ['YOU LOSE', 'YOU ARE NOT AN ACOHOLIC', 'PLAY AGAIN', 'PROOF YOURSELF'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    document.querySelector('.lose_title').textContent = part;
  },speed);
};



wordflick();
animate()