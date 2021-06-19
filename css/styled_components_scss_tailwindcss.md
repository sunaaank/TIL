# Styled-components vs SCSS vs TailwindCSS

## styled components

스타일 재활용을 통해 쉽게 유지보수 하고 싶을 때, 장기 프로젝트를 할 때, 퍼블리셔 없을 때

- CSS-in-JS
- 🤩 클래스 네임을 중복해서 사용 시 생기는 버그 방지
⇒ css 파일을 밖에 두지 않고 컴포넌트 내부에 넣기 때문에, css가 전역으로 중첩되지 않도록 만들어줌
- 🤩 구조적으로 컴포넌트와 스타일이 묶여 있어 관리 용이
⇒ 컴포넌트에서 이름을 쓰듯 스타일을 지정함
⇒ CSS 파일을 별도로 만들지 않을 수 있음
- 🤩 Scss 라이브러리 설치 없이 Scss 문법을 사용가능
- 🤩 component의 props를 참조할 수 있으며 props의 값에 따라 스타일을 다르게 코딩할 수 있음(JS로 처리하기 때문)
- 🤩 react-native에서도 적용되기에 웹과 앱을 둘 다 만들어야 한다면 css를 거의 그대로 사용 가능
- 🤮 퍼블리셔나 디자이너가 CSS 작업을 하기 매우 어려움
- 🤮 러닝커브가 낮지 않음
- 🤮 css를 줄 태그는 다 컴포넌트로 만들어야 함. 이는 번거롭고 가독성을 떨어뜨림
- 🤮 css 수정할 때마다 해당하는 컴포넌트 파일 위치 찾아야 하는 번거로움 존재(장점이기도 함)
- 🤮 동적 속성을 사용하는 것은 스타일이 지정된 구성 요소 및 기타 CSS-in-JS 솔루션의 성능 병목 현상이 생길 수 있음
- DX가 좋은데, typescript랑 같이 쓰면 DX가 안좋아짐

## SCSS(Sass)

CSS를 따로 분리해서 쓰고 싶을 때, 속도를 빠르게 하고 싶을 때

- 🤩 코드 중복을 줄일 수 있음
- 🤩 변수를 사용 할 수 있기 때문에 유지보수가 쉬워짐
- 🤩 스타일시트를 쪼개서 관리할 수 있음
- 🤩 셀렉터를 중첩(nesting)할 수 있어 부모 자식의 상하구조도 더욱 쉽게 파악할 수 있음(중복 없이 html 구조 그대로 css를 만들 수 있음)
- 🤩 CSS와 유사해 (개발자) 러닝커브가 낮음
- 🤮 퍼블리셔나 디자이너가 CSS 작업을 하기 어려움
- 🤩 CSS보다 다양한 기능
: `중첩(Nesting)`, `Ampersand (상위 선택자 참조)(&)`, `@at-root (중첩 벗어나기)`, `변수(Variables)`, `연산(Operations)`, `재활용(Mixins)`, `확장(Extend)`, `조건문`, `반복문`, `내장함수` 등 사용 가능
- 🤩 CSS의 단점 개선
- 불필요한 selector의 과용
- 연산기능의 한계
- statement의 부재

## tailwindCSS

빠른 프로토타입 개발, 복잡하지 않은 웹사이트, 빠르게 스타일링하고 간편하게 개발하고 싶을 때, 다크모드 구현할 때

- 🤩 편리하고 빠른 개발 가능
⇒ Utility-First 컨셉을 가진 CSS 프레임워크
- 🤩 스타일 코드도 HTML 코드 안에 있기 때문에 HTML와 CSS 파일을 별도로 관리할 필요가 없음
🤮 못생긴 코드
⇒ 미리 세팅된 유틸리티 클래스를 활용하는 방식으로 HTML 코드 내에서 스타일링
- 🤩 클래스명을 고민하지 않아도 됨
⇒ Tailwind CSS를 사용하면 랩핑 태그의 클래스명을 사용할 일이 거의 없음
- 🤩 일관된 디자인 사용 가능
⇒ 모든 곳에서 동일한 색상이나 사이즈, 간격 등의 유틸리티 클래스를 사용하므로 일관된 스타일로 구현하기가 수월함
- 🤩 반응형 디자인, 다크모드 적용이 수월함(미디어쿼리 사용안해도 됨)
- 🤩 JS 코드와 완전한 분리
⇒ 프로젝트 진행 도중 JavaScript 프레임워크를 변경하여도 큰 추가 작업 없이 기존의 HTML 코드를 그대로 쓸 수 있음
- 🤮 초반 클래스명 러닝 커브
(거의 모든 스타일의 유틸리티 클래스를 학습해야 함)
⇒ 🤩 Intelli Sense 플러그인 지원
: 미리보기, 자동완성, 신택스 하이라이팅, 린팅을 지원
- 최종 번들 용량을 줄이기 위해 별도 처리가 필요함
⇒ Tailwind CSS는 모든 CSS 유틸리티 클래스 이름 조합을 생성하지만 이러한 CSS 클래스 중 대부분은 프로젝트에서 사용되지 않음
⇒ `PurgeCSS` 사용
- 🤮 HTML와 CSS 코드 혼재
- 🤮 JavaScript 코드 사용 불가
- 🤮 translate속성에 3D를 지원하지 않아, 이 부분은 별도로 inline style로 처리필요


## styled components vs SASS vs tailwindCSS

### styled-components

```jsx
// styled-components
/*
1) 변수를 설정하고(컴포넌트 첫글자는 대문자로 시작) 
2) styled.{html태그} 형태로 할당한 뒤 
3) `(CSS)` 백틱 안에 css를 넣어주면 됨(Tagged Template Literals)
*/

import React from 'react'
import styled from 'styled-components'

// create styled-component
const Container = styled.div`
  color: white;
  background: black;
`

const Sample = () => {
  return (
    <Container>

    </Container>
  )
}

export default Sample
```

```jsx
// styled-components
// 다른 스타일을 import해서 쓸 수 있음

import React from 'react'
import styled from 'styled-components'
// CommonHeader -> default background = black
import { CommonHeader } = '@/common'

const Container = styled.div`
   ...css codes
`
const ContainerHeader = styled(CommonHeader)`
   background: red; // change red
`

cont Test2 = () => {

  return (
    <Container>
      <ContainerHeader />
    </Container>
  )
}
```

### tailwindCSS

```css
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

## CSS VS SCSS

CSS 파일 하나로 관리하면!?

- 원하는 구획을 찾을 때마다 스크롤을 올리고 내려야 함
- 어느 구획이 어떤 스타일을 정의하는지 주석을 잘 달아놓는다고 해도 전체 시트의 구조를 한눈에 파악하는 것은 매우 어려움

SCSS를 쓰면 스타일시트를 쪼개서 관리할 수 있다고!?

- 순수한 CSS에도 스타일시트를 쪼개 관리하는 방법은 있음
⇒ 여러 개의 `<link/>` 태그로 별도의 CSS를 호출하거나, CSS `@import`를 사용하는 것.
- 하지만 이 경우, 각 CSS 호출은 새로운 HTTP 요청을 발생시키고 사이트의 성능을 저해할 수 있기 때문에, 규모가 큰 프로젝트가 될 수록 지양하는 것이 좋음.

## Sass VS SCSS 차이

- 둘다 CSS 전처리기(CSS Preprocessor) + `Less`, `Stylus` 도 CSS 전처리기임
    - **CSS전처리기란?**
    - CSS가 동작하기 전에 사용하는 기능으로, 전처리기를 웹에서 동작 가능한 표준의 CSS로 컴파일(Compile)하여 웹에서는 CSS로 작동함.
    - 전처리기는 CSS 문법과 굉장히 유사하지만 선택자의 중첩(Nesting)이나 조건문, 반복문, 다양한 단위(Unit)의 연산 등… 표준 CSS 보다 훨씬 많은 기능을 사용해서 편리하게 작성할 수 있음.
    - 컴파일은 `SassMeister`, `node-sass`, `Gulp`, `Webpack`, `Parcel` 등 라이브러리를 사용해서 함

    전처리기로 작성하고 CSS로 컴파일해서 동작시키는 거죠.

- 둘의 차이는 중괄호와 ;(세미콜론)이 대표적. 믹스인 방법은 아예 다름.
- SCSS는 CSS 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위 집합(Superset)
- 한국에서는 CSS와 구문이 유사한 SCSS를 많이 사용함
- Sass는 첫글자만 대문자, SCSS는 전부 대문자로 씀

```css
/* Sass */
.div
  background-color:red
  margin:10px

/* SCSS */
.div{
  background-color:red;
  margin:10px;
}
```

```css
/* Sass */
=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius:    $radius
  -ms-border-radius:     $radius
  border-radius:         $radius

.box
  +border-radius(10px)

/* SCSS */
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }

```