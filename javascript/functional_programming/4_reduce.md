## 5. _reduce 만들기
- 축약하는 함수. 특정 데이터로 시작해서, 모든 데이터를 `iter 함수`로 축약시켜서 새로운 자료를 만들기 위해 사용함
- `filter`나 `map`은 `array`로 들어온 값을 `array`를 반환하지만, `reduce`는 `array`로 특정한 숫자를 뽑아내거나, `array`로 들어온 것을 객체로 만들 때 사용함. 

```js

function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// slice 메소드를 배열이 아니어도 사용할 수 있도록 만드는 함수
const slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if(argumetns.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val){
    memo = iter(memo, val);
  });
  return memo;
}

_reduce([1, 2, 3], function(a, b) {
  return a + b;
}, 0);

// memo = add(0, 1),
// memo = add(memo, 2);
// memo = add(memo, 3);
// return memo;
// return add(add(add(0, 1), 2), 3);
// 6

```