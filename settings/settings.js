
const container = document.querySelector(".container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80,window.innerWidth / innerHeight,0.1,1000);

camera.position.set(-2,2,5);
camera.lookAt(0,0,0);


var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth , window.innerHeight );
renderer.antialias = true;
container.appendChild(renderer.domElement);

var loader = new THREE.TextureLoader();

var planeGeometry = new THREE.PlaneGeometry(5,3,50,30);
var flagMat = new THREE.MeshBasicMaterial({color:'#7B1FA2',wireframe:true});
var flagMat1 = new THREE.MeshBasicMaterial({map:loader.load('TürkBayrağı.jpg')});

var flag = new THREE.Mesh(planeGeometry,flagMat1);

scene.add(flag)





const clock = new THREE.Clock();

var p = -5;
var s = 0.05;

function animate(){

    p+= s;
    if(( p > 5 )  || (p < -5))s*=-1;

    camera.position.set(p,2,5);
    camera.lookAt(0,0,0);

    const t = clock.getElapsedTime();
    
/* TypeError: Cannot read property 'map' of undefined
    at animate (settings.js:32)
    at settings.js:47 */
    flag.geometry.vertices.map(v=>{

        const wave1 = .5 * Math.sin(v.x * 2 -t * 3) ;
        const wave2 = .25 * Math.sin(v.x * 3 -t * 2 );
        const wave3 = .3 * Math.sin(v.y * 5 -t * 5 );
        const multi = (v.x + 2.5 ) / 5;

        v.z = (wave1 - wave2 - wave3)* multi;
        
    });
    flag.geometry.verticesNeedUpdate = true;




    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
animate();