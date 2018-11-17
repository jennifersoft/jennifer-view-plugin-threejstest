package com.aries.tutorial;

import com.aries.extension.starter.PluginController;
import com.aries.extension.util.ConfigUtil;
import com.aries.extension.util.LogUtil;
import com.aries.extension.util.PropertyUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PluginAnalysisController extends PluginController {

    @RequestMapping(value = { "/analysis" }, method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView getMainPage() {
        // TODO: 어댑터 & 실험실 관리 화면에서 추가한 플러그인에 대한 옵션을 가져올 수 있다.
        // Retrieve an option set in the  Adapter and Plugin screen
        String property = PropertyUtil.getValue("plugin_analysis", "db_path", "../db_path_property");

        // TODO: server_view.conf 파일에 설정된 뷰서버 옵션을 가져올 수 있다.
        // Retrieve a view server option set in server_view.conf file
        String config = ConfigUtil.getValue("db_path", "../db_path_config");

        // TODO: 플러그인의 로그를 남기는 유틸리티 클래스를 제공한다.
        // Utility class used for loggin
        LogUtil.info(property + ", " + config);

        return new ModelAndView();
    }
}