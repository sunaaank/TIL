### 2. 거르기 - filter

```js
// 🎨 filter 함수
function _filter(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

// 🎨 curryr 함수
function _curryr(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(b, a)
    }
  }
}

const _filterr = _curryr(_filter)

// 1. reject
// - filter를 반대로 동작시킨 것: true로 평가되는 값을 제외시키는 함수

console.log(
  _filter(users, function(user){
    return user.age > 30;
  })
)

// filter를 사용한 reject 함수
function _reject(data, predi) {
  return _filter(data, function(val) {
    return !predi(val);
  })
}

// reject 함수의 내부 함수를 추상화 시킨 _negate 함수
// 인자로 받은 함수의 결과를 반대로 바꾼 뒤 리턴
function _negate(func) {
  return function(val) {
    return !func(val)
  }
}

// reject 함수에 negate 함수 적용하여 리팩토링
function _reject(data, predi) {
  return _filter(data, _negate(predi))
}

// 2. compact
// truty 한 값만 남김
const _compact = _filter(_identity)

_compact([1, 2, 0, false, null, {}])
// 1, 2, {}
```
