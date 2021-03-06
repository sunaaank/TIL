## 반응형 웹(Responsive Web)과 적응형(Adaptive Web) 웹이란?

이 둘의 목표는 같다.
모바일부터 데스크탑까지, 화면의 사이즈가 제각각인 다양한 디바이스에서 어떻게 일정한 사용자경험을 제공할 것인가.

### 반응형 웹

- 미디어쿼리를 사용해 기기 화면의 사이즈를 확인하고, 화면 크기 변화에 따라 유연한 이미지와 그리드를 활용해 페이지의 크기 및 레이아웃을 조정하는 기술
- 장점 : 하나의 템플릿만으로 다양한 디바이스에 대응할 수 있어 개발이 간편함
- 단점 : 사용자는 단 하나의 기기로 접속하지만, 모든 디바이스에 대한 CSS를 전부 다운받아야 하기 때문에 데이터 낭비, 로딩 속도가 늘어남, 기존 운영중이던 데스크탑용 사이트가 있을 경우 사이트를 반응형으로 재구축해야함.

### 적응형 웹

- 서버나 클라이언트에서 웹에 접근한 기기를 체크해, 그 기기에 맞는 템플릿을 제공하는 개념
- 기기별로 다른 템플릿을 제작해야 함
- 장점 : 사용자 기기에 맞는 템플릿만 다운하므로 데이터 낭비가 적고 로딩 속도가 빠름
- 단점 : 기기별로 다른 템플릿을 제작해야 하여 개발이 복잡해짐

### 모바일 퍼스트 디자인

- 처음부터 웹 어플리케이션을 구축하는 단계에서부터 모바일을 중심으로 구축하는 것
- 모바일 앱을 데스크탑 앱으로 확장하는 것은 쉽지만, 데스크탑 앱을 모바일로 간추리는 것은 어려움
- 처음부터 모바일로 짜고, 데스크탑에 사후적으로 대응하는 것이 빠름
