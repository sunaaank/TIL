# 이벤트
> - Events 개념
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
- Events 종류
https://developer.mozilla.org/en-US/docs/Web/Events
- Bubbling and Capturing 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture

- mouse click
- keyboard
- resizing window
- close window
- page loading
- form submission
- video is being played
- error

## Methods
- `EventTarget.addEventListener()`
- `EventTarget.removeEventListener()`
- `EventTarget.dispatchEvent()`: 인공적으로 클릭

## 이벤트 버블링
- 이벤트 캡쳐링 단계에서 무언가를 처리해야 하는 경우는 매우 드뭄
- 일반적으로 이벤트 리스너(콜백함수)를 등록하게 되면 기본적으로 버블링 단계에서 등록된 콜백함수가 호출됨

- 버블링은 부모/자식 구조에 해당됨
- 부모/자식 구조에서 동일한 이벤트만 버블링이 됨
- ex. 부모 div 요소에는 클릭 이벤트를 등록해놓고, 자식 span 요소에 동일한 클릭 에벤트를 등록 해놓으면, span을 클릭하면 div 요소에 등록해 놓은 클릭 이벤트 콜백이 실행됨
- BUT 부모 div 요소에는 마우스다운 이벤트를 등록해놓고,  자식 span 요소에 동일한 클릭 이벤트를 등록 해놓으면, span을 클릭하면 div 요소에 등록해 놓은 마우스다운 이벤트 콜백이 실행되지 않음

- `event.stopPropagation()` BAD!
- `event.stopImmediatePropagation()` BAD!
- 내가 관심이 있을 때에만 처리 해주어야 함. 부모에서 처리
```js
if(event.target !== event.currentTarget){
  return;
}
```

## event.preventDefault()
이벤트가 발생했을 때 우리가 정의한 특별한 다른 기능을 수행하고, 브라우저의 기본 동작은 취소하라!
 - 스크롤 이벤트가 발생하면 페이지가 위/아래로 움직이는
 - 체크 박스를 클릭하면 체크박스가 선택/비선택 되는
 - 버튼을 누르면 눌러지는 효과가 나오는 
 - 링크를 클릭하면 링크가 열리는
 - 등등

- passive: Boolean
- passive: true 라는것은, 나는 수동적으로 이벤트를 듣기만 할거야. 이벤트를 취소하거나 다른것은 절대 하지 않을거야!
- passive: false로 설정해서 이벤트를 등록하시면 스크롤도 취소 할 수 있지만, 성능에는 정말 좋지 않아서 가급적 쓰지 않는것이 좋음.


## 이벤트 위임(Event Delegation)
- 부모는 어떤 자식 요소에서 이벤트가 발생하든 다 들을 수 있음