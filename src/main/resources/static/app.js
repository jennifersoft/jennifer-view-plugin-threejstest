(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./script/index.js":
/*!*************************!*\
  !*** ./script/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"../../../../node_modules/three/build/three.module.js\");\n__webpack_require__(/*! ../style/index.scss */ \"./style/index.scss\");\n__webpack_require__(/*! ../style/sub.scss */ \"./style/sub.scss\");\n\n\n\n// once everything is loaded, we run our Three.js stuff.\nfunction init() {\n    // create a scene, that will hold all our elements such as objects, cameras and lights.\n    var scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n\n    // create a camera, which defines where we're looking at.\n    var camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](45, window.innerWidth / window.innerHeight, 0.1, 1000);\n\n    // create a render and set the size\n    var renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]();\n    // renderer.setClearColorHex();\n    renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](0xEEEEEE));\n    renderer.setSize(window.innerWidth, window.innerHeight);\n\n    // show axes in the screen\n    var axes = new three__WEBPACK_IMPORTED_MODULE_0__[\"AxisHelper\"](20);\n    scene.add(axes);\n\n    // create the ground plane\n    var planeGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"PlaneGeometry\"](60, 20);\n    var planeMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({ color: 0xdedede });\n    var plane = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](planeGeometry, planeMaterial);\n\n    // rotate and position the plane\n    plane.rotation.x = -0.5 * Math.PI;\n    plane.position.x = 15;\n    plane.position.y = 0;\n    plane.position.z = 0;\n\n    // add the plane to the scene\n    scene.add(plane);\n\n    // create a cube\n    var cubeGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"BoxGeometry\"](4, 4, 4);\n    var cubeMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({ color: 0x00000, wireframe: true });\n    var cube = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](cubeGeometry, cubeMaterial);\n\n    // position the cube\n    cube.position.x = -4;\n    cube.position.y = 3;\n    cube.position.z = 0;\n\n    // add the cube to the scene\n    scene.add(cube);\n\n    // create a sphere\n    var sphereGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"SphereGeometry\"](4, 20, 20);\n    var sphereMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({ color: 0x010101, wireframe: true });\n    var sphere = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](sphereGeometry, sphereMaterial);\n\n    // position the sphere\n    sphere.position.x = 20;\n    sphere.position.y = 4;\n    sphere.position.z = 2;\n\n    // add the sphere to the scene\n    scene.add(sphere);\n\n    // position and point the camera to the center of the scene\n    camera.position.x = -30;\n    camera.position.y = 40;\n    camera.position.z = 30;\n    camera.lookAt(scene.position);\n\n    // add the output of the renderer to the html element\n    document.getElementById(\"WebGL-output\").appendChild(renderer.domElement);\n\n    // render the scene\n    renderer.render(scene, camera);\n\n    // window resizing\n    $(window).on(\"resize\", function (e) {\n        camera.aspect = window.innerWidth / window.innerHeight;\n        camera.updateProjectionMatrix();\n\n        renderer.setSize(window.innerWidth, window.innerHeight);\n    });\n}\n\n$(function () {\n    init();\n\n    aries.extension.setup({\n        hostName: \"http://127.0.0.1:7900\",\n        apiToken: \"IJda8l4wwqr\"\n    });\n\n    aries.extension.api(\"instance\", { domain_id: 7908 }, function (res) {\n        console.log(res);\n    });\n    // aries.extension.popup(\"xview\", { domainId: 3000, txIds: [\"7068317079266947005\",\"-1568083474888856788\",\"-887163633174791787\",\"8535743776935114500\",\"7155110854784412808\",\"-608172379644698461\",\"-7465411390566347486\",\"4222697659398975915\",\"-700281156862227495\",\"7840841052210698079\",\"-631215189873187695\",\"-4749696442599266903\",\"3330619558382445254\",\"-4979300088052542770\",\"3202756107435607645\",\"-4584654810877070146\"], startTime: 1531277605095, endTime: 1531277734128 });\n    //aries.extension.popup(\"activeService\", { domainId: 3000, hostName: \"http://support.jennifersoft.com:27900\" });\n\n    if (jui) {\n        var builder = jui.include(\"aries.chart.builder\");\n\n        builder(\"#JENNIFER-output\", {\n            title: \"Active Service\",\n            width: \"100%\",\n            height: $(\"#WebGL-output\").height(),\n            chartType: \"equalizer\",\n            //\t\t\tmetrics: MxDef.active_service,\n            ptype: PTypeDef.MISC,\n            pkey: \"active_service\",\n            domainId: 7908,\n            instanceOids: [95539]\n        });\n    }\n});\n\n//# sourceURL=webpack:///./script/index.js?");

/***/ }),

/***/ "./style/index.scss":
/*!**************************!*\
  !*** ./style/index.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./style/index.scss?");

/***/ }),

/***/ "./style/sub.scss":
/*!************************!*\
  !*** ./style/sub.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./style/sub.scss?");

/***/ })

},[["./script/index.js","runtime","vendors"]]]);