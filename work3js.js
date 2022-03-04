
import * as THREE from './three/build/three.module.js';

import Stats from './three/examples/jsm/libs/stats.module.js';

import { GUI } from './three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import { HDRCubeTextureLoader } from './three/examples/jsm/loaders/HDRCubeTextureLoader.js';
import { RGBMLoader } from './three/examples/jsm/loaders/RGBMLoader.js';
import { DebugEnvironment } from './three/examples/jsm/environments/DebugEnvironment.js';
import { FBXLoader } from './three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './three/examples/jsm/loaders/RGBELoader.js';


$(document).ready(function () {

    //connection to HTML container
    var webglContainer = $("#webgl");
    var width = $(webglContainer).width();
    var height = $(webglContainer).height();


    const params = {
        envMap: 'HDR',
        roughness: 0.0,
        metalness: 0.0,
        exposure: 1.0,
        debug: false
    };

    let stats;
    let camera, scene, renderer, controls;
    let torusMesh, planeMesh, customModel;
    let generatedCubeRenderTarget, ldrCubeRenderTarget, hdrCubeRenderTarget, rgbmCubeRenderTarget;
    let ldrCubeMap, hdrCubeMap, rgbmCubeMap;

    scene = new THREE.Scene();
    init();

    function init() {

        scene.background = new THREE.Color( 0x222222 );

        camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        camera.position.set(0, 5, -5);
        //camera.rotate.x = Math.PI / 2;

        new RGBELoader()
            .setPath('./three/examples/textures/equirectangular/')
            .load('royal_esplanade_1k.hdr', function (texture) {

                texture.mapping = THREE.EquirectangularReflectionMapping;

                //scene.background = texture;
                scene.environment = texture;

                render();

                // model

                const loader = new GLTFLoader().setPath('./');
                //loader.load('city_house.gltf', function (gltf) {
                loader.load('Swiss_Knife.gltf', function (gltf) {
                    

                    scene.add(gltf.scene);

                    render();

                });

            });

        const size = 10;
        const divisions = 10;

        const gridBottom = new THREE.GridHelper(size, divisions, 0x00ff00);
        const gridFront = new THREE.GridHelper(size, divisions, 0xff0000);
        gridFront.geometry.rotateX(Math.PI / 2);
        gridFront.position.z = 5;
        gridFront.position.y = 5;
        scene.add(gridBottom);
        scene.add(gridFront);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputEncoding = THREE.sRGBEncoding;
        $(webglContainer).append(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render); // use if there is no animation loop
        controls.minDistance = 1;
        controls.maxDistance = 1000;
        controls.target.set(0, 1.5, 0);
        controls.update();

        window.addEventListener('resize', onWindowResize);

    }


    function onWindowResize() {

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);

        render();

    }

    //

    function render() {

        renderer.render(scene, camera);

    }
});

