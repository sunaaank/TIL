### 4. 접기 - reduce
- array 안의 값이나 iterative 객체를 통해 접혀진 값을 만들기 위해 사용
- 집계, 머지된 값, 전혀 다른 값을 만들기 위해 사용
- 순차적인 for문 관점에서 사용하기보다 함수형 관점에서 바라보는 것이 중요
- 순차적인 for문 대체하기 위한 용도보다, 순수함수로서 평가 순서와 관계 없이 접어나가는, 축약해나가는 함수로서 이해할 것

- `find` vs `reduce` : `find`는 처음 확인된 값, `reduce`는 모든 값을 다 확인해서 특정 하나의 값으로 접어냄.
// - 함수형 프로그래밍을 할 때는, 평가 순서와 관계 없이 해당하는 결과를 만들 수 있는 식으로 사고하는 게 좋음
// - 값이 앞에서부터 하나씩 들어가는 게 아니라, 순서와 상관없이 한 가지 로직만 작성함

```js
// 🎨 reduce 함수
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

// 1. min

function _min(data){
  return _reduce(data, function(a, b){
    return a < b ? a : b;
  });
}

_min([1, 2, 4, 10, 5, -4]) // -4

// 2. max
function _max(data){
  return _reduce(data, function(a, b){
    return a > b ? a : b;
  });
}

_max([1, 2, 4, 10, 5, -4]) // 10


// 3. min_by
// - min과 max는 들어있는 값을 직접 비교하기 때문에 다형성이 낮음.
// - min_by, max_by는 filter와 같은 함수처럼 보조함수를 받기 때문에, 어떤 것을 가지고 a와 b를 비교할 것인지 보조함수로 가능성을 열어줌.
function _min_by(data, iter){
  return _reduce(data, function(a, b){
    return iter(a) < iter(b) ? a : b;
  });
}

const _min_by_r = _curryr(_min_by)

_min_by([1, 2, 4, 10, 5, -4], Math.abs); // 절대값으로 바꾼 뒤 꺼냄: 1


// 4. max_by
function _max_by(data, iter){
  return _reduce(data, function(a, b){
    return iter(a) > iter(b) ? a : b;
  });
}

const _max_by_r = _curryr(_max_by)

_max_by([1, 2, 4, 10, 5, -11], Math.abs); // -11
_max(_map([1, 2, 4, 10, 5, -11], Math.abs)); // 11로 변경된 값이 나와서 코딩하기 어려워짐

_max_by(users, function(user) {
  return user.age;
})

_go(users, 
  _filter(user => user.age >= 30),
  _min_by(user => user.age),
   console.log)

// 위의 코드와 동일함

const _reject_r = _curryr(function(data, predi) {
  return _filter(data, _negate(predi))
})

_go(users, 
  _reject(user => user.age >= 30),
  _min_by(_get("age")),
   console.log)

// 5. group_by

function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj
}

const _group_by = _curryr(function(data, iter){
  return _reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val)
  }, {})
})

_go(users, 
  _group_by(function(user) {
  return user.age - user.age % 10
}), console.log)

// 6. count_by

const _inc = function(conut, key) {
  count[key] ? count[key]++ : count[key] = 1
  return count
}

const _count_by = _curryr(function(data, iter) {
  return _reduce(data, function(count, val) {
    return _inc(count, iter(val))
  }, {})
})

_count_by(users, function(user) {
  return user.age;
})

const pairs = _map((val, key) => [key, val])

console.log( paris(users[0]) )

_go(users, _count_by(function(user) {
  return user.age - user.age % 10
}),

_map(count, key) =>
  return `<li> ${key}대는 ${count}명 입니다 </li>`),
  list => "<ul>" + list.join("") + "</ul>",
  document.write.bind(document))
```
