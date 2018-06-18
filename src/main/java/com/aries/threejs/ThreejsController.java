package com.aries.threejs;

import com.aries.extension.starter.PluginController;
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
        mav.addObject("test","자바에서 넘긴 데이터");
        return mav;
    }
}