package com.aries.threejs;

import com.aries.extension.starter.PluginStarter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class ThreejsApplication extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new PluginStarter()).addPathPatterns("/plugin/*");
    }

    public static void main(String[] args) {
        SpringApplication.run(ThreejsApplication.class, args);
    }
}
