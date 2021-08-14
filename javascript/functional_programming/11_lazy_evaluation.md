# 지연평가
- 계산의 결과 값이 필요할 때까지 계산을 늦추는 기법
- 순수함수는 평가 시점과 관계없이 항상 동일한 결과를 만들 수 있어서 가능함
- 내부적으로 순서를 재배치함으로써 최적화

```js
let mi = 0;
let fi = 0;
_.go(
  _.range(100),
  L.map(function(val) {
    ++mi;
    return val * val;
  }),
  L.filter(function(val) {
    ++fi;
    return val % 2;
  }),
  L.take(5),
  console.log
)

console.log(i)
```