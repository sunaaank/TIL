# 호출 스케줄링(scheduling a call)
: 일정 시간이 지난 후 원하는 함수를 예약 실행(호출)할 수 있도록 해주는 것

## 호출 실행 구현방법
1. `setTimeout`: 일정 시간이 지난 후 함수실행
2. `setInterval`: 일정 시간 간격을 두고 함수실행
3. `requestAnimationFrame`: 브라우저에 최적화된 방법으로 함수실행

### setTimeout
> [mdn](https://developer.mozilla.org/ko/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

```js
const timeoutId = window.setTimeout(func[, delay, param1, param2, ...]);
window.setTimeout(function, milliseconds);
clearTimeout(timeout)
```
- 두 번째 인자로 전달받은 시간(ms, 1/1000초)으로 한 번 동작하는 타이머 생성
- 타이머 만료 이후, 첫 번째 인자로 전달받은 콜백함수가 호출됨
- 즉, 콜백 함수는 단 한 번 호출됨
- 호출 스케쥴링 된 콜백 함수에 전달해야 할 인자가 있는 경우 세번째 인자로 넣을 수 있음
- 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 Id를 반환함
- 반환한 타이머 id는 브라우저 환경인 경우 숫자, Node.js환경인 경우 객체
- `setTimeout` 함수가 반환한 타이머 id를 `clearTimeout` 함수의 인수로 전달하여 타이머를 취소할 수 있음


### setInterval
> [mdn](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

```js
const intervalID = scope.setInterval(func, [delay, arg1, arg2, ...]);
clearInterval(intervalID)
```

- 두 번째 인자로 전달받은 시간(ms, 1/1000초)이 경과할 때 마다 반복 동작하는 타이머 생성
- 타이머 만료될 때마다, 첫 번째 인자로 전달받은 콜백함수가 반복 호출됨
- 타이머 취소등록을 할 때까지 계속 반복 실행되도록 호출 스케쥴링됨
- 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 Id를 반환함
- 반환한 타이머 id는 브라우저 환경인 경우 숫자, Node.js환경인 경우 객체
- `setInterval` 함수가 반환한 타이머 id를 `clearInterval` 함수의 인수로 전달하여 타이머를 취소할 수 있음

### RequestAnimationFrame
> [mdn](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)

```js
window.requestAnimationFrame(callback);
```

- 움직이는 영상이나 애니메이션을 만들 때 사용하기 위해 만들어진 함수, 브라우저 기반 게임 개발 용도
- 브라우저에서 다음 repaint가 일어날 때 콜백이 호출되도록 설정함
-  리페인트 이전에 실행할 콜백을 인자로 받음
- 일반적으로 초당 60프레임에 해당하는 주기로 호출됨 BUT 대부분 브라우저에서는 W3C 권장사항에 따라 현재 모니터의 출력 주기와 같게 호출되고 있어서 애니메이션을 출력하는데 매우 최적화되어 있음


### setInterval vs RequestAnimationFrame
- ex) 브라우저에서 여러 탭을 띄워놓고 있을 때 현재 웹페이지가 비활성화되어있는 상황 
- `setInterval` 함수: 백그라운드에서 호출되는 순간마다 계속 실행됨
- `RequestAnimationFrame` 함수: 화면에 repaint가 일어날 때 호출되므로 백그라운드에서 호출되지 않고 대기함.
- 대부분의 최신 브라우저에서는 성능과 배터리 수명 향상을 위해 `requestAnimationFrame()` 호출은 백그라운드 탭이나 hidden <iframe>에서 실행이 중단됨
- 개발자 관점에서는 큰 차이가 없으나, 사용자 관점에서는 `RequestAnimationFrame`을 사용하는 것이 좋음
