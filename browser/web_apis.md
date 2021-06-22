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