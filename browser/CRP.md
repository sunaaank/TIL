# CRP(Critical Rendering Path, 주요 렌더링 경로)
: 브라우저가 서버로부터 HTML response를 받아 화면을 그리기 위해 실행하는 과정(6단계)

- 브라우저가 HTML, CSS, Javascipt를 화면에 픽셀로 변화하는 일련의 단계
- 이를 최적화하는 것은 렌더링 성능을 향상시킴
-  1초당 60 프레임에 리플로우와 리페인트가 발생할 수 있도록 하는데 중요함

## CRP 6단계
1. DOM 트리 만들기
2. CSSOM 트리 만들기
3. JavaScript 실행
4. Render Tree 만들기
5. Layout 생성
6. Painting

### 1. DOM 트리 만들기
DOM은 파싱된 HTML의 Object 표현
- 브라우저는 요청 후 응답받은 HTML을 분석, DOM트리로 변환함 
- 스타일시트, 스크립트 또는 포함된 이미지 등 외부 자원에 대한 링크를 찾을때마다 요청을 보냄
- 외부 자원을 불러오는 동안 나머지 HTML을 분석하는 작업은 일부 중단되기도 함


### 2. CSSOM 트리 만들기
CSSOM은 DOM과 관련된 페이지의 모든 스타일의 Object 표현

- 완전히 파싱되지 않으면 Render Tree를 구성할 수 없음
- HTML과 달리 CSS는 상속된 계산식 때문에 부분적으로 실행될 수 없으며, 스타일 오버라이딩이 됨
- [CSS 최적화](https://developer.mozilla.org/en-US/docs/Learn/Performance/CSS)

### 3. JavaScript 실행
- HTML 문서의 파싱이 JS로 인해 차단될 수 있음
- <script>에 도달하면 해당 스크립트를 실행함

### 4. Render Tree 만들기
- Render Tree = DOM + CSSOM
- 페이지에서 최종적으로 렌더링할 내용을 나타내는 트리
- 화면에 표현할 필요가 없는 노드(meta tag, script tag, display: none...)들은 Render 트리에서 제외됨
- 화면에 보이지는 않지만 공간을 차지하는 노드(visibility:hidden ...)들은 Render 트리에 포함됨

### 5. Layout 생성
- 뷰포트 크기를 결정하고, 그에따라 서로 관련된 CSS 스타일을 계산함
- 모든 렌더 트리 요소들에 대한 위치와 크기가 정의된 레이아웃이 만들어짐
- 기본 뷰포트 너비 대신에 디바이스의 너비를 사용함

```html 
<meta name="Viewport" content="width=device-witdh">
```

### 6. Painting
- 페이지의 가시적인 내용을 픽셀로 변환하여 화면에 표시함
- 로드시, 전체 화면을 그림. 그 후에는 브라우저가 필요한 최소 영역만을 다시 그리도록 최적화되어 있기 때문에 영향을 받는 영역만을 화면에 다시 그림(reflow, repainting)
- 렌더링 엔진은 모든 HTML을 파싱할 때까지 기다리지 않고 layout과 paint 과정을 함께 진행함

#### Reflow
- 인터렉션 등에 의해 변경되어야 할 Render 트리의 사이즈와 위치를 다시 계산하는 것
- 이 때 영향을 받은 부모 및 자식 노드도 재배치가 발생할 수 있으며, 경우에 따라 문서 전체가 재배치될 수도 있음

#### Repainting
- 재배치가 발생하거나 요소의 색상 등이 변경된 경우, 다시 화면에 표현하는 것

#### reflow 최적화
- DOM의 depth를 최소화
- 스타일 변경을 한번에 처리
- 주변에 영향을 주는 요소(크기, 위치)를 줄임
- 개발자 도구를 이용해 reflow, repaint 체크해서 최적화


## CRP 최적화
- 자원 로드 순서를 관리
- 파일 사이즈를 줄이기
- 어떤 자원을 먼저 로드할지 정함으로써 페이지 로드 속도를 개선

1) 자원 다운로드를 연기함으로써 중요 자원들의 수를 최소화하기
2) 각 요청에 대한 파일 사이즈에 따라 필수적인 요청 횟수 최적하하기
3) 다운받을 중요 에셋의 우선순위를 정함으로써 중요 자원 불러오는 순서 최적화하고, 중요 경로 길이 최소화하기
- CSS 파일은 header에서 로드
> 브라우저가 JS를 로드하고 분석할 때 스타일이 필요한 경우가 있음. 스타일 정보가 완전히 로드되지 않았다면 DOM 트리의 구성을 멈추게 됨. 때문에 css를 header에서 로드하여 전부 완료된 후 DOM을 구성하게 해야 함.
- JS파일은 body의 마지막 부분에서 로드하거나 지연로드(lazy load)
> HTML파서가 HTML 구문 분석을 진행하다가, 스크립트 태그를 만나면 JS 해석기가 제어권을 넘겨받고 스크립트를 실행함. HTML 파싱은 그동안 멈춰있게 되며 사용자 입장에서는 그만큼 체감 속도가 느려지게 됨

## 참고자료
- [mdn](https://developer.mozilla.org/ko/docs/Web/Performance/Critical_rendering_path)
- [Critical Rendering Path란?](https://wonism.github.io/critical-rendering-path/)
- [웹 브라우저 렌더링](https://jee-goo.tistory.com/entry/WEB-%EC%9B%B9-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81)