
## 4. 커링
- 함수에 인자를 하나씩 적용해나가다가, 필요한 인자가 모두 채워지면 함수 자체를 실행하는 기법
- JS는 커링을 지원하지는 않지만, 일급함수가 지원되고, 평가 시점을 마음대로 다룰 수 있어서 커링기법을 구현할 수 있음

```js
function _curry(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(a, b)
    }
  }
}

function _curryr(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(b, a)
    }
  }
}

// ES6
const _curryr = fn => {
  const fnArgLen = fn.length; 
  return (...args) => { 
    let memo = [...args];
    return function res(...args) {
      memo = [...memo, ...args];
      return memo.length >= fnArgLen ? fn.apply(null, memo.reverse()) : res;
    }
  }
};

const add = _curry(function(a, b) {
  return a + b;
});

const add10 = add(10)
console.log( (add10(5)))
console.log( add10(5)(3))

const sub = _curryr(function(a, b) {
  return a - b
})

console.log( sub(10, 5) );

const sub10 = sub(10);
console.log( sub10(5) );

// ✅ obj == null 을 쓴 이유는 동일한 검사를 위해 obj === undefined || obj === null 로 검사해야하기 때문.
// ✅ _get('name') 의 결과는 함수. map 함수를 보면 2번째 인자로 함수를 받아서 _each 함수를 실행하는 과정에서 받는 인자 value 값을 _get('name')의 실행인자로 넣어줌. 따라서 _get('name')({ name: 'hi' })  와 같이 사용 가능

// _get 만들어 좀 더 간단하게 하기
function _get(obj, key) {
  return obj == null ? undefined : obj[key];
}

const _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
})

const user1 = users[0]
console.log(user1) // error
console.log(user1.name) // error
console.log(_get(user1, "name"));
console.log(_get("name")(user1));

const get_name = _get("name");
console.log(get_name(user1));

// console.log(users[10].name) // error
// console.log(_get(users[10], 'name')) // undefined 


/* 이전 코드 리팩토링 */
_map(
  _filter(users, function(user) { return user.age >= 30; }),
  _get("name")
)

_map(
  _filter(users, function(user) { return user.age < 30; }),
  _get("age"))
```