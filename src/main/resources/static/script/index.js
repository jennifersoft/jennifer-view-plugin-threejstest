require('../style/index.scss')
require('../style/sub.scss')

import $ from 'jquery';
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Color, AxisHelper, PlaneGeometry, SphereGeometry} from 'three';

// once everything is loaded, we run our Three.js stuff.
function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new Scene();

    // create a camera, which defines where we're looking at.
    var camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new WebGLRenderer();
    // renderer.setClearColorHex();
    renderer.setClearColor(new Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    var axes = new AxisHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new PlaneGeometry(60, 20);
    var planeMaterial = new MeshBasicMaterial({color: 0xdedede});
    var plane = new Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new BoxGeometry(4, 4, 4);
    var cubeMaterial = new MeshBasicMaterial({color: 0x00000, wireframe: true});
    var cube = new Mesh(cubeGeometry, cubeMaterial);

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    // create a sphere
    var sphereGeometry = new SphereGeometry(4, 20, 20);
    var sphereMaterial = new MeshBasicMaterial({color: 0x010101, wireframe: true});
    var sphere = new Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    // add the sphere to the scene
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);

    // window resizing
    $(window).on("resize", function(e) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    });
}

$(function() {
    init();
});