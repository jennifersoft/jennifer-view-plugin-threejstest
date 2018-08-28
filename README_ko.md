# 독립적인 플러그인 개발환경이란?

기존에는 개발 중인 플러그인을 동작시키기 위해 jar 파일로 빌드한 후, 제니퍼 뷰서버 관리화면에 등록을 하고, 제니퍼 뷰서버를 재시작해야 하는 번거로운 과정을 거쳤었다. 특히 제니퍼 뷰서버 자체가 무겁기 때문에 재시작이 오래 걸려 수정한 작업 내용을 확인하는데 어려움이 있었다. 그래서 제니퍼 뷰서버에 의존하지 않는 스프링부트 기반의 독립적인 플러그인 개발환경을 구상하게 되었다.


## IntelliJ에서 플러그인 프로젝트 생성하기

 1. File > New > Project 클릭
 2. Spring Initialzr > Project SDK 선택 (1.8) > Next 클릭
 3. Project Metadata 입력 > Type 선택 (Maven Project) > Next 클릭
 3-1. Group은 com.aries로 입력해야 하고, Artifact는 자신의 프로젝트에 맞게 추가하면 된다.
 4. Dependencies 입력 > Spring Boot 버전 선택 (1.5.15) > 라이브러리 선택

## 메이븐 설정하기

다음 코드는 필수 라이브러리를 로드하기 위한 의존성 설정 부분이고, 나머지 빌드 관련은 본 프로젝트에서 배포하는 [pom.xml](https://github.com/jennifersoft/jennifer-view-plugin-tutorial/blob/master/pom.xml) 파일을 참고하자.
```xml
	<dependencies>
		<!-- TODO: 사용자가 필요한 라이브러리 추가하는 영역 -->

		<!-- 제니퍼 플러그인을 구현하기 위한 필수 라이브러리 -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>provided</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>com.aries</groupId>
			<artifactId>extension</artifactId>
			<version>1.1.0</version>
		</dependency>
	</dependencies>
```
참고로 두개의 프로파일이 제공되는데, 독립적으로 실행하기 위한 jar 파일로 빌드하기 위해서는 **local**을 체크하고, 제니퍼 실험실에 추가하기 위해서는 **jennifer**를 체크해서 메이븐 인스톨을 하면 된다.

## 플러그인 구현하기

### 메인 클래스 수정하기

프로젝트가 생성되면 스프링 인터셉터를 추가하기 위해 WebMvcConfigurer 인터페이스를 메인 클래스에 다음과 같이 구현해야 한다.
```java
package com.aries.tutorial

import com.aries.extension.starter.PluginStarter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class TutorialApplication extends WebMvcConfigurerAdapter {
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// PluginStarter 클래스를 스프링 기본 인터셉터로 추가한다.
		registry.addInterceptor(new PluginStarter()).addPathPatterns("/plugin/**");
	}

	public static void main(String[] args) {
		SpringApplication.run(TutorialApplication.class, args);
	}
}
```

### application.properties 수정하기

제니퍼 서버에서 플러그인을 인식하기 위한 메타데이터로 package.json을 참조하게 되며, 프로젝트 루트 디렉토리(src/main/resources)에 필수적으로 존재해야만 한다. 다음은 이미 github에 공개된 api manager 플러그인의 [application.properties](https://github.com/jennifersoft/jennifer-view-plugin-tutorial/blob/master/src/main/resources/application.properties) 내용이다. 독립적인 플러그인 개발환경에서는 기존의 resources 옵션을 사용하지 않는다. 관련해서는 다음장에 자세히 설명하겠다.
```
aries.title = Plugin Tutorial
aries.description = JENNIFER Plug-in development tutorial page
aries.version = 5.4.0
aries.main.url = /plugin/tutorial
aries.main.tpl = templates/index.vm
aries.directory.i18n = i18n
aries.directory.thumbnail = thumbnails
aries.output.js = runtime.js, vendors.js, app.js
aries.output.css = app.css
```
각각의 프로퍼티들에 대한 설명은 아래와 같다.

| 프로퍼티 이름 | 설명 | 필수 |
|:-------|-------|-------:|
| title | 제니퍼 화면에 노출되는 플러그인 이름 | X |
| description | 뷰 서버에 노출되는 플러그인 설명 | X |
| version | 플러그인이 로드될 제니퍼 서버의 최소 버전 (5.3.2.2 이상을 입력해야 함) | X |
| mainUrl | 플러그인 메인 URL (제니퍼 서버 URL/mailUrl) | O |
| mainTpl | 플러그인 메인 URL에 매핑되는 템플릿 파일 경로 | O |
| thumbnails | 제니퍼 실험실 목록에 보이는 썸네일 이미지 경로 (제니퍼 테마명과 동일 classic 또는 dark) | X |
| i18n | 다국어 properties 파일 (message_국가코드.properties 형태로 이름을 정해야 함) | X |

### 스프링부트 프로젝트의 디렉토리 구조

디렉토리 구조는 다음과 같다.

| 디렉토리 이름 | 설명 |
|:-------|-------|
| src/main/java/com.aries.* | 자바 코드가 들어가며 하위 디렉토리(또는 패키지) 이름은 자유롭게 설정할 수 있다. |
| src/main/resources/static | 메인 화면에 로드되는 리소스(js, css, image) 파일들이 위치하는 디렉토리이다. |
| src/main/resources/templates | 메인 화면의 템플릿(vm) 파일이 위치하는 곳이며, Velocity 문법을 따른다. |
| src/main/resources/* | 기타 파일들이 위치하는 디렉토리이며, 하위 디렉토리 이름은 자유롭게 설정할 수 있다. 다국어 메시지 파일들이나 썸네일 이미지를 추가할 수 있다. |

### 플러그인 템플릿 생성하기

템플릿 문법은 [Apache Velocity Engine](http://velocity.apache.org/engine/1.7/user-guide.html)를 따르며, ModelMap을 통해 뷰에서 사용할 매개변수 값을 넘겨줄 수 있다. 위에서 설명한 package.json에 설정된 mainTpl에서 다음과 같은 객체들을 참조할 수 있는데, 관련된 기능은 다음과 같이 정리된다.

| 객체 이름 | 설명 |
|:-------|-------|
| file | src/main/resources/static 디렉토리에 있는 리소스 파일들을 참조할 수 있다. |
| i18n | src/main/resources/* 디렉토리 내에 추가된 i18n 메시지들을 참조할 수 있다. |
| theme | classic 또는 dark 문자열이 넘어오며, 종류에 따라 화면 스타일을 분기할 때 사용할 수 있다. |
| language | 제니퍼 뷰서버에서 설정한 다국어 타입 문자열이 넘어온다. |

다음은 package.json의 mainTpl에 설정된 vm 파일에 대한 샘플 코드이다.

```xml
// src/main/resources/static 디렉토리에 있는 리소스 파일을 로드하는 코드
<script type="text/javascript" src="$file.get("index.js")"></script>

// src/main/resources/* 디렉토리 내에 있는 i18n 메시지를 출력하는 코드
<div>i18n : $i18n.get("M0001")</div>

// 메인 컨트롤러에서 넘겨준 매개변수를 출력하는 코드 (매개변수 이름은 임의로 설정할 수 있음)
<strong>parameter : $message</strong>
```

### 플러그인 컨트롤러 생성하기

스프링 컴포넌트로 등록되기 위해서는 컨트롤러 클래스는 com.aries 패키지 안에 포함되어야 하고, 반드시 PluginController 클래스를 상속해야 한다. 컨트롤러 클래스는 아래와 같이 구현할 수 있다.
    
```java
package com.aries.apimanager;

import com.aries.extension.starter.PluginController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ApimanagerController extends PluginController {
    @RequestMapping(value = {"/apimanager"}, method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView getMainPage(@RequestParam(defaultValue="test", required=false) String message) {
        ModelAndView mav = new ModelAndView();

        ModelMap map = mav.getModelMap();
        map.put("message", message);

        return mav;
    }
}
```

위와 같이 구현된 플러그인 컨트롤러는 package.json에 설정된 mainTpl(템플릿 파일)에 매핑되며, http://127.0.0.1:8080/plugin/apimanager 를 통해 실행 할 수 있다.

![이미지](https://raw.githubusercontent.com/jennifersoft/jennifer-extension-manuals/master/res/img/view_server_plugin_v2/5.png)


## 플러그인 프로젝트 빌드

다음과 같이 두가지 형태로 빌드하여 배포할 수 있다.

### 제니퍼 뷰서버에 실험실로 로드되는 jar 파일로 빌드하기

메이븐 프로젝트의 jennifer 프로파일을 선택해서 인스톨하면, dist 디렉토리에 **프로젝트명_jennifer-버전.jar** 파일이 생성된다. 해당 jar 파일은 제니퍼5 어댑터 및 실험실 관리화면을 통해 추가할 수 있다.

### 독립적으로 실행되는 jar 파일로 빌드하기

메이븐 프로젝트의 local 프로파일을 선택해서 인스톨하면, dist 디렉토리에 **프로젝트명_local-버전.jar** 파일이 생성된다. 해당 jar 파일은 다음과 같이 실행할 수 있다.

~~~bash
COMMAND> java -jar 프로젝트명_local-버전.jar

또는 VM 옵션을 통해 기본 테마와 언어를 설정할 수 있다.
COMMAND> java -jar -Dtheme=dark,language=en 프로젝트명_local-버전.jar
~~~
