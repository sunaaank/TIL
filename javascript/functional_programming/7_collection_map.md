# 컬렉션 중심 프로그래밍의 4가지 유형과 함수
- 함수형 프로그래밍에서 더 빛을 보는 방식
- 컬렉션을 잘 다루는 함수 셋트들을 구성해가는 방식
- 대표함수: map, filter, reduce (가장 추상화가 높음, 대표함수로 특화함수를 만들 수 있음)

## 1. 수집하기 - map, values, pluck 등
## 2. 거르기 - filter, reject, compact, without 등
## 3. 찾아내기 - find, some, every 등
## 4. 접기 - reduce, min, max, group_by, count_by 등

```js
const users = [
  { id: 1, name: "A", age: 25},
  { id: 2, name: "B", age: 35},
  { id: 3, name: "C", age: 44},
  { id: 4, name: "D", age: 58},
  { id: 5, name: "E", age: 18},
  { id: 6, name: "F", age: 11},
  { id: 7, name: "G", age: 80},
]
```
## 컬렉션 중심 프로그래밍의 유형별 함수 만들기
### 1. 수집하기 - map
```js
// 🎨 each 함수
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// 🎨 map 함수
function _map(list, mapper) {
  const new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

function _curryr(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(b, a)
    }
  }
}

const _mapr = _curryr(_map)


console.log(_map(users, function(user){
  return user.name;
}))

// 1. values
// key가 0,1,2,3,4...로 되어 있는 게 아니라, Object인 경우(key-value), values가 의미있음

function _values(data) {
  return _map(data, function(val) { return val })
}

// 🐧 identity 함수를 만들면 위의 함수를 간단히 작성할 수 있음
const _values = _map(_identity)

function _identity(val) {
  return val;
}

const a = 10;
console.log(_identity(a));

function _values(data) {
  return _mapr(data, _identity)
}

console.log(_mapr(_identity)(users[0]))


// 2. pluck
- 특정 key로 값을 꺼내 수집하는 함수

function _pluck(data, key) {
  return _map(data, function(obj) {
    return obj[key]
  })
}

_pluck(users, 'age;); // [25, 35 ...]


// 🐧 get 함수를 사용해 리팩토링
function _pluck(data, key) {
  return _map(data, _get(key))
}
```
