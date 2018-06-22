package com.aries.threejs;

import com.aries.extension.starter.PluginController;
import com.aries.extension.util.ConfigUtil;
import com.aries.extension.util.PropertyUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ThreejsController extends PluginController {
    @RequestMapping(value = { "/threejs" }, method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView getThreejsMainPage()
    {
        ModelAndView mav = new ModelAndView();
        mav.addObject("property", PropertyUtil.getValue("threejs", "message", "스프링부트"));
        mav.addObject("config", ConfigUtil.getValue("sherpaoracle_server_url", "http://셀파오라클"));
        return mav;
    }
}