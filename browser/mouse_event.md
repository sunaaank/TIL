# Web API Event_mouse
- 참고 : https://ko.javascript.info/mouse-events-basics


- 버튼 관련: `button`
- 보조키 관련: `altKey`, `ctrlKey`, `shiftKey`와 MacOS 전용 `metaKey`. 해당 키를 누른 경우에 프로퍼티 값이 `true`.
=> Ctrl를 고려한 코드를 작성하고 있다면, MacOS 사용자는 주로 Cmd 키를 사용한다는 점을 고려해서 
`if (e.metaKey || e.ctrlKey)`같이 모든 사용자를 지원할 수 있도록 코드를 작성해야 함.
- 클라이언트 좌표 관련: `clientX`, `clientY`
- 페이지 좌표 관련: `pageX`, `pageY`

- `mousedown` 이벤트가 발생하면 브라우저 기본 동작 때문에 글자가 선택됨. 
=> 이런 기본 동작이 사용자 경험을 해친다면, 아래와 같은 방법으로 기본동작을 막아서 문제를 해결할 수 있음.
```html
<b ondblclick="alert('클릭!')" onmousedown="return false">
  여기를 더블클릭해주세요.
</b>
```

- Ctrl+C 불법복제 막기
```html
<div oncopy="alert('불법 복제를 예방하기 복사 기능을 막아놓았습니다!');return false">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis ultrices lacus ut dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
</div>
```