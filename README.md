# ezencs
ezen renewal 작업 가이드

## 작업방식
 - 산출물 제외 한 파일은 모두 FTP상에서 수정을 바로하여 파일을 보관하지 않음
 - 그외 파일은 산출물 폴더 참조.

## 개발툴 
- nodejs환경 gulp자동화 툴
- 사용플러그인 / sprite, sass, minify, html-include, browser-sync

## 폴더구조

A. 모바일 폴더
- dist: 배포폴더 - 로컬 개발 확인 
- images: 작업 이미지
- src: 작업폴더
   - inc
   - js: 프론트 js
   - sass
     - components: materializecss 컴포넌트 ◎
     - styles
       - _sprite.scss(스프라이트) ◇
       - _var.scss(지정변수 및 스타일)
       - materialize.scss(컴포넌트) ◎
     - common.scss: 모바일 공통 스타일
     - main.scss: 

B. 피씨 폴더
- ftp/common/
  - css/site/overwrite.css
  - js/site/ui.js 프론트 공통 js
  - sass/styles/
    - _commonSprite.scss/ 공통 스프라이트 ◇
    - _curriculumSprite.scss/ 커리큘럼 스프라이트 ◇
    - _font.scss/ 폰트 ◎
    - _homeSprite.scss/ 메인 스프라이트
    - _regacy.scss/ 리뉴얼전 스타일
    - _scroll.min.scss/ 스크롤 플러그인 ◎
    - _sprite.scss/ 스프라이트 변수 ◇
    - _var.scss/ 사용자 지정 변수 
        
	
    > ◎ 부분은 작업 할 일이 없을 듯 싶습니다
    
    > ◇ 테스크에서 자동으로 만들어주는 파일

- ftp/images/sprites/
  - common: 스프라이트 공통 이미지
  - curriculum: 커리큘럼 스프라이트
  - home: 메인 스프라이트
    
> 의도는 카테고리별 스프라이트를 만들어 관리하려 했으나 기존 유지보수를 모두 변경하기엔 무리가 있어 신규건에 의하여 사용할 수 있도록 환경셋팅 
  

C. 환경폴더
- /tasks/


## task
- compress-pc-js
> pc ui.js 압축 난독화 테스크

- choiceSprites
> 이미지 스프라이트,  기존 폴더구조에 맞춰서 환경을 설정해야 되는 부분이 있어 레거시소스와 충돌이 안나게 별도 폴더를 나누어 관리
> gulp choiceSprites 입력시 promte창이 나오며 선택항목에 맞게 번호 입력 예) home 2번 실행 
> images/sprites/home 폴더가 실행

- mobile
> 'browserSync', 'sprite', 'sass', 'include' 순차적으로 실행, 모바일은 새로이 작업하는것이 효율성이 더 높아 테스크가 패키지로 실행
> src폴더 작업폴더이고 배포는 dist에 이루어진다.


## format
> PC Layout
```
<div id="wrap" class="noto">
	<!--#include virtual="/common/include/_header.asp"-->
	<div id="content">
		CONTENTS
	</div>
	<!--#include virtual="/common/include/_footer.asp"-->
</div>
```
> mobile: src/html 
```
<div id="wrapping">
    <!--#include virtual="/m/common/include/sidemenu.asp"-->
    <div id="wrap">
        <!--#include virtual="/m/common/include/header.asp"-->
        <div id="re-container">
        내용
        </div>
       <!--#include virtual="/m/common/include/footer.asp"-->
    </div>
    <!--#include virtual="/m/common/include/float.asp"-->
</div>
```

