
### 3. 찾아내기 - find
```js
// 🎨 _is_object 함수
function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

// 🎨 keys 함수
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}


// 🎨 each 함수
function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }

  return list;
}


// 1. find
// - 배열 안에 있는 값을 이 조건을 처음 만났을 때 리턴
// - 리스트를 전부 돌면서, 받은 predicate 함수로 평가해서, if에 처음 걸리는 게 있으면 해당번째 value를 리턴하는 함수.
// - filter는 모든 값을 걸러내서 배열로 리턴, find는 처음 만나는 값 하나만을 리턴함

function _find(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++ ) {
    const val = list[keys[i]]
    if(predi(val)) return val;
  }
}

const _findr = _curryr(function(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++) {
    const val = list[keys[i]]
    if(predi(val)) return val;
  }
})

console.log(
  _find(users, function(user) {
    return user.id === 20;
  })
)

console.log(
  _get(_find(users, function(user) {
    return user.id === 20;
  }), "name")
)

_go(users,
  _findr(function(user) { return user.id === 20; }), 
  _get("name"), 
  console.log)


// 2. find_index
// - 해당하는 값을 처음 만났을 때 인덱스 값을 리턴
const _find_index_r = _curryr(function _find_index(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++ ) {
    if(predi(list[keys[i]])) return i;
  }
})

console.log(
  _find_index_r(users, function(user) {
    return user.id == 50;
  })
)

// 3. some
// - 특정 조건을 하나의 값이라도 만족하면 true를 반환하는 함수
// - predicate 인자가 없으면, 배열 자체 형변환해서 검사
function _some(data, predi) {
  return _find_index_r(data, predi || _identity) != -1;
}

_some([1, 2, 5, 10, 20], function(val) {
  return val > 10;
}) 

_some([1, 2, 5, 10, 20]) // true
_some([0, null, undefined]) // false

console.log(
  _some(users, function(user) {
    return user.age < 20;
  })
)

// 4. every
// - 특정 조건을 모든 값이 만족하면 true를 반환하는 함수
// - predicate 인자가 없으면, 배열 자체 형변환해서 검사
function _every(data, predi) {
  return _find_index_r(data, _negate(predi || _identity)) == -1;
}

_every([1, 2, 5, 10, 20], function(val) {
  return val > 10;
}) 

_every([1, 2, 3, 4, 5]) // true
_every([0, 1, 2]) // false


```