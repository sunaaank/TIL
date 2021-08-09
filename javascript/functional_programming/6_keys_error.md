# 다형성 높이기
## _each의 외부 다형성 높이기
### 1. _each에 null 넣어도 에러 안나게
```js
// 🎨 each 함수
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// 💥 null값 에러
_each(null, console.log) // error !

// 🎨 get 함수
const _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
})

// 🐧 each 함수 리팩토링
const _length = _get("length")

function _each(list, iter) {
  for (let i = 0; i < _length(list); i++) {
    iter(list[i]);
  }

  return list;
}

// null 값 오류안남
_each(null, console.log)
console.log(_map(null, function(v){ return v; }));
console.log(_filter(null, function(v){ return v; }));

_go(null, 
_filter(function(v){ return v * 2; }),
_map(function(v) { return v + 2; }),
console.log);
// return [];

```

### 2. _keys 만들기
```js
Object.keys({ name: "ID", age: 33 }) // return ["name", "age"]
Object.keys([1,2,3,4]); // return ["0", "1", "2", "3"]
Object.keys(10);
Object.keys(null); // Error !

```

### 3. _keys에서도 _is_object인지 검사하여 null 에러 안나게
```js
// 🎨 _is_object 함수
function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

// 🎨 keys 함수
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}
```

### 4. _each 외부 다형성 높이기
```js
// length 가 없어서 순회를 못함
_each({
  13: "ID",
  19: "HD",
  29: "YD",
}, function(name) {
  console.log(name)
});

// 🐧 each 함수 리팩토링_list인자로 array가 들어오든 key:value가 들어오든 잘 동작하도록

function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }

  return list;
}

_each({
  13: "ID",
  19: "HD",
  29: "YD",
}, function(name) {
  console.log(name)
});

console.log(
  _map({
  13: "ID",
  19: "HD",
  29: "YD",
}, function(name) {
  return name.toLowerCase();
}) );

_go(users,
  _map(function(user) {
    return user.name;
  }),
  _map(function(name) {
  return name.toLowerCase()}),
  console.log)

// 데이터가 무엇이냐에 따라 보조함수를 마음껏 변형 가능 => 다형성, 유연성 높음
_go({
  1: users[0],
  3: users[2],
  5: users[3],
  },
  _map(function(user) {
    return user.name.toLowerCase();
  }), 
  console.log);
```