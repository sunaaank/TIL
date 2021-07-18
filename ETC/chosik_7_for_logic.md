## 사소한 개선 - for문 분리
### 흔한 for 루프 구조
요구사항이 추가될 때마다 사이사이에 코드가 추가되며 복잡한 형태로 바뀜
```js
// 1. 티켓1
const res = ...
for (item){
  ticket1 = doSome(item)
  res.apply(ticket1);
}
 
// 2. 티켓1+티켓2
const res = ...
for (item){
  ticket1 = doSome(item)
  res.apply(ticket1);
  doAny(item);
}

// 3. 티켓1+티켓2+티켓3+...
const res = ...
const otherRes = ...
for (item){
  ticket1 = doSome(item)
  res.apply(ticket1);
  doAny(item);
  otherRes.apply(doOther(ticket));

}

```

### for 루프에서 여러가지 일을 하면
- 서로 다른 목적을 가진 코드가 뒤섞일 수 있음
- => 코드 복잡도 증가
- => 코드 이해 어려워짐
- => 코드 수정 힘들어짐
- for 루프가 한 가지 일을 하게 수정

### for에 들어간 로직을 분리했더니
- 코드 이해가 더 쉬워짐(논리적인 단위로 구분)
- 메서드 추출과 같은 리팩토링 용이
- 다른 로직 추가 용이 (for문 안에서 삽입할 위치를 찾지 않음)

### 성능은?
- 루프를 여러번 돌면 문제 없나? (대세에 지장 없을 때가 많음)
- 정말로 문제가 될 때만 개선
- 복잡한 코드 <<< 이해하기 좋은 코드
