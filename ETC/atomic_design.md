# Line Entry의 Atomic Design 적용기
https://www.youtube.com/watch?v=33yj-Q5v8mQ

## Atomic Design을 도입한 이유
- 어떤 기준으로 컴포넌트를 분리 해야할까?
- Atomic Design : 물질(원자,분자) 개념을 웹에 적용하여 인터페이스를 세분화한 디자인 시스템을 만드는 방법론
- `ATOMS` -> `Molecules` -> Organism -> Templates -> Pages

## Atomic Design 적용하기
- 기존 5단계에서 3단계로 간소화
- ATOMS -> Modules -> Templates
- web > components > atoms | modules | templates > index.js, index.stories.js

## Atomic Design의 효율을 높이는 방법
1. Styled Component(함수형 컴포넌트)의 사용
1) 컴포넌트 생성과 동시에 DOM Element CSS style을 하기 때문에 스타일을 여러 곳에서 불러올 필요 없음.
- CSS 클래스 중첩사용으로 복잡함을 덜어줌. 충돌 위험도 적음.
- ES6 문법 지원. 내부에서 스크립트를 사용하여 제어할 수 있음
2) props값을 스타일링에 그대로 사용할 수 있음
3) 속성 값을 받아 지정할 수 있음
4) 컴포넌트별 반응형 스타일 지정이 가능함(styled-components-breakpoint 라이브러리)
5) 테마용 파일을 만들어 관리하기.

2. 컴포넌트 단위 개발 효율을 높여주는 Storybook의 사용
- 외부 환경에 의존하지 않고 독립된 환경에서 뷰에만 집중하여 UI를 컴포넌트별로 분리한 개발 환경을 제공하는 툴
1) 다양한 유스케이스를 한눈에 확인할 수 있다
2) 개발에 필요한 옵션을 직접 추가할 수 있다(Info Addon 등)
3) 간단하게 정적인 페이지를 내보낼 수 있다


### 장점 :
- 재사용성이 많은 UI를 만들어두면 가져다 사용하기 매우 편리함
- props를 이용한 다양한 UI 스토리를 제공할 수 있어 편리함
- 직관적인 네이밍 컴포넌트로 짜여진 구조로 만들기 때문에 한 눈에 알아보기 쉬움
### 단점 :
- 사전학습이 있어야 수월하게 진행할 수 있음(ES6문법 등)
- 재사용이 가능한 컴포넌트 마크업 작업에 초반 공수가 많이 들어감
- 방대한 양의 컴포넌트 제작 시, 파일 네이밍에 어려움을 겪을 수 있음
- 부모로부터 하위 컴포넌트에게 스타일을 지정하는 방법이 제한적임