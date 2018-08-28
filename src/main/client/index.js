import styles from './index.css'
import createSampleChart from './sample.js'
import $ from 'jquery'

$(function() {
    let threeObj = createSampleChart();

    $(window).on("resize", function(e) {
        threeObj.camera.aspect = window.innerWidth / window.innerHeight;
        threeObj.camera.updateProjectionMatrix();
        threeObj.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // TODO: 제니퍼 서버 주소와 API 사용시 토큰 값을 설정한다.
    aries.extension.setup({
        hostName: "https://dev.jennifersoft.com",
        apiToken: "6tXrtSu5i8T"
    });

    $("#xview_popup").on("click", function(e) {
        // TODO: 다이렉트로 제니퍼의 X-View 팝업을 띄우는 함수이다.
        aries.extension.popup("xview", {
            domainId: 7908,
            txIds: [ "-6371365836736069843", "6541742202344215657", "-3416726780880622050" ],
            startTime: 1535462614471,
            endTime: 1535462614471
        });
    });

    $("#active_popup").on("click", function(e) {
        // TODO: 다이렉트로 제니퍼의 액티브서비스 팝업을 띄우는 함수이다.
        aries.extension.popup("activeService", {
            domainId: 7908
        });
    });

    // TODO: 제니퍼 Open API를 쉽게 조회할 수 있는 함수이다.
    aries.extension.api("instance", {
        domain_id: 7908
    }, function(res) {
        console.log(res);
    });
});