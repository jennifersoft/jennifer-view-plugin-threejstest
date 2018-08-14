import styles from './main.css'
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
    // aries.extension.setup({
    //     hostName: "http://127.0.0.1:7900",
    //     apiToken: "IJda8l4wwqr"
    // });

    // TODO: 제니퍼 Open API를 쉽게 조회할 수 있는 함수이다.
    // aries.extension.api("instance", { domain_id: 7908 }, function(res) {
    //     console.log(res);
    // });

    // TODO: 다이렉트로 제니퍼의 X-View 팝업을 띄우는 함수이다.
    // aries.extension.popup("xview", { domainId: 3000, txIds: ["7068317079266947005","-1568083474888856788","-887163633174791787","8535743776935114500","7155110854784412808","-608172379644698461","-7465411390566347486","4222697659398975915","-700281156862227495","7840841052210698079","-631215189873187695","-4749696442599266903","3330619558382445254","-4979300088052542770","3202756107435607645","-4584654810877070146"], startTime: 1531277605095, endTime: 1531277734128 });

    // TODO: 다이렉트로 제니퍼의 액티브서비스 팝업을 띄우는 함수이다.
    // aries.extension.popup("activeService", { domainId: 3000, hostName: "http://support.jennifersoft.com:27900" });
});