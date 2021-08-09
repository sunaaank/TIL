## 5. 파이프라인 만들기

### _pipe
- 함수를 여러개 인자로 받아 함수를 리턴하는 함수
- 연속적으로 함수를 실행
- reduce를 특화시킨 함수

```js
// _pipe
function _pipe() {
  const fns = arguments;
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg);
    }, arg)
  }
}

const f1 = _pipe(
  function(a) { return a + 1; }, // 1 + 1;
  function(a) { return a * 2; }); // 2 * 2;

f1(1)
```

### _go
- 즉시 실행되는 pipe 함수
- 첫번째 인자로는 인자를 받고, 두번째 인자부터 함수를 받아서 결과를 바로 만드는 함수

```js
// _go
const slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

_go(1, 
function(a) { return a + 1; },
function(a) { return a * 2; },
function(a) { return a * a; },
console.log);

// users에 _go 적용

/* 이전 코드 리팩토링 */
_go(users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _get("name"));
  },
console.log);

_go(users,
  function(users) {
    return _filter(users, function(user) {
      return user.age < 30;
    });
  },
  function(users) {
    return _map(users, _get("age"));
  },
console.log);

const _mapr = _curryr(_map)
const _filterr = _curryr(_filter)

// curry 적용
console.log(
  _map([1, 2, 3], function(val) { return val * 2; })
)

// curryr 적용
console.log(_mapr(function(val) { return val * 2; })([1, 2, 3]))

// curryr 적용, 이전 코드 리팩토링
_go(users,
  _filterr(function(user) {
      return user.age >= 30;
    }),
  _mapr(_get("name"))
  ,
console.log);

_go(users,
  _filterr(function(user) {
      return user.age < 30;
    }),
  _mapr(_get("age")),
console.log);

// 화살표 함수로 변경
  // 화살표 함수 쓰는법
  var a = function(user) { return user.age >= 30; }
  const a = user => user.age >= 30;

  var add = function(a, b) { return a + b; };
  const add = (a, b) => a + b;
  const add = (a, b) => {
    return a + b;
  }

  // 객체로 리턴하고 싶은 경우 괄호 + 중괄호
  const add = (a, b) => ({val: a + b})


_go(users,
  _filterr(user => user.age >= 30),
  _mapr(_get("name")),
console.log);

_go(users,
  _filterr(user => user.age < 30),
  _mapr(_get("age")),
console.log);
```