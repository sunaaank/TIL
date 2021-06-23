# Web APIs
## Web APIs

다양한 API가 존재하고, 어떤 게 가능한 지 알아둔 뒤에, 필요할 때 어떤 API를 사용하면 좋은 지 떠올려서 찾아서 사용하면 됨. 

- DOM APIs : 웹페이지에 있는 요소들을 생성, 삭제, 스타일을 바꾸는 기능 제공
- Network APIs : 서버와 통신할 수 있는 기능
- Graphics APIs : canvas
- Audio/Video APIs
- Device APIs
- File APIs
- Storage APIs
- ETC...

> ! 몇몇의 Web APIs는 HTTPS 환경에서만 동작 가능함

### HTTP

- 웹 클라이언트와 서버가 어떻게 통신할 지 통신 규약을 정해놓은 것
- 클라이언트가 서버에 정보를 요청(request)하고, 다시 서버에서 정보를 받아오는(response) 방식

### HTTPS

- 정보를 주고받는 것들이 잘 감싸진, 보안처리가 된 것(encrypted)
- 암호키를 이용해서 전달되기 때문에 해커가 함부로 볼 수 없음

## External APIs

- 트렐로, 트위터, 유튜브, 날씨 등등 제공하는 곳이 많음

## Brower 구조
- Window : 페이지 뿐만 아니라, 브라우저에 열려져 있는 전체 창. window안에 페이지가 표기되는 부분이 document 오브젝트.
- Document : HTML에서 작성한 요소들이 표기되어지는 부분
- Navigator : window에 관련된 오브젝트가 있음. 
=> 웹페이지를 브라우저에서 열게 되면, window에 DOM(document), BOM(브라우저 관련-navigator, location, fetch, storage...), JavaScript(Array, Map, Date...)가 있음.

### Window
1. size
- `window.screen`: 모니터 사이즈
- `window.outer`: 전체 브라우저 사이즈(탭 포함)
- `window.inner`: 웹페이지(스크롤바 포함)
- `documentElement. clientWidth`: 문서 자체(스크롤바를 제외한 영역 사이즈)

2. scroll
- `scrollTo(x,y)`: x,y px로 이동
- `scrollBy(x,y)`: x,y px씩 이동
- (x,y) 대신에 ({left:x, top:y, behavior:'smooth'})로 해서 부드럽게 스크롤되게 할 수 있음!

- `Element.scrollIntoView()` : 특정 요소로 이동
> `scrollIntoView() 옵션`
- `behavior` 전환 애니메이션 : `auto`(default), `smooth`
- `block` 수직정렬 : `start`(default), `center`, `end`, `nearest`
- `inline` 수평정렬 : `start`, `center`, `end`, `nearest`(default)

- Element.scrollIntoView({behavior: smmoth, block: 'end', inline: "nearest"});
> - 참고자료 : https://developer.mozilla.org/ko/docs/Web/API/Element/scrollIntoView


3. load
- `defer`(HEAD안에 script)옵션, `DOMContentLoaded` 이벤트 : HTML만 완료가 되면 호출이 됨.
- 페이지 안에 리소스(css, images 등)가 많은 경우 `DOMContentLoaded`가 빨리 호출 되고, `Load`이벤트는 조금 나중에 리소스가 다 준비완료되면 불려짐.
- 이외에 `beforeunload`, `unload` 이벤트도 있음.

### 브라우저 좌표
- 참고자료 : https://ko.javascript.info/coordinates
- `Coordinates(좌표)`: 브라우저 화면 왼쪽 최상위가 (0, 0)
- `Element.getBoundingClientRect()`: Element(DOM에 들어있는 모든 요소들) Object안에 들어있는 함수.

- 💎 JS에서는 (CSS와는 달리) 브라우저 좌측최상단을 기준으로 항상 X축과 Y축으로부터 좌표가 계산이 됨
- `top`: y좌표
- `left`: x좌표
- `bottom`: 오른쪽 하단 y좌표
- `right`: 오른쪽 하단 x좌표

#### 💥 주의: CSS 포지션 용어와는 컨셉이 다름
- CSS에서 `bottom`은 브라우저에서 제일 밑에서부터 떨어져있는 거리
- CSS에서 `right`은 브라우저에서 제일 오른쪽부터 떨어져있는 거리

### Client x,y vs Page x,y
- 사용자가 클릭을 하게 되면 이벤트가 발생함. 이벤트에는 client x,y가 들어있음.
- client x,y : 브라우저 윈도우에서 이벤트 클릭 위치의 client x와 y가 얼마나 떨어져있는지 전달됨.
- page x,y : 보이지 않는 문서 시작지점부터 x, y좌표가 계산됨.

### 참고자료

    **MDN Web API:**

    [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

    **Web API collection:**

    [https://developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API)

    **Security:**

    [https://www.thoughtco.com/what-javascript-cannot-do-2037666](https://www.thoughtco.com/what-javascript-cannot-do-2037666)

    **Document**

    [https://developer.mozilla.org/en-US/docs/Web/API/Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)

    **Window**

    [https://developer.mozilla.org/en-US/docs/Web/API/Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

    **Viewport**

    [https://developer.mozilla.org/en-US/docs/Glossary/layout_viewport](https://developer.mozilla.org/en-US/docs/Glossary/layout_viewport)

    **Navigator**

    [https://developer.mozilla.org/en-US/docs/Web/API/Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)