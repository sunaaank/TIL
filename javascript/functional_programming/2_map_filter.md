# 회원목록, map, filter

## 1. 명령형 코드로 작성하기
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

  // 1. 30세 이상인 users를 거른다.
  const temp_users = [];
  for (let i = 0; i < users.length; i++) {
    if(users[i].age >= 30) {
      temp_users.push(users[i]);
    }
  }
  console.log(temp_users);

  // 2. 30세 이상인 users의 names를 수집한다.
  const names = [];
  for (let i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
  }

  console.log(names)

  // 3. 30세 미만인 users를 거른다.
  const temp_users = [];
  for (let i = 0; i < users.length; i++) {
    if(users[i].age < 30) {
      temp_users.push(users[i]);
    }
  }
  console.log(temp_users);

  // 4. 30세 미만인 users의 ages를 수집한다.
  const ages = [];
  for (let i = 0; i < temp_users.length; i++) {
    ages.push(temp_users[i].age);
  }

  console.log(ages)

```

## 2. _filter, _map으로 리팩토링
- 추상화의 단위를 함수의 단위로 필터링
- _filter와 같은 응용형 함수. 응용형 함수는 함수가 함수를 받아서 원하는 시점에 해당하는 함수가 알고있는 인자를 적용하시는 식으로 받아서 프로그래밍 하는 것 ( = 응용형 프로그래밍, 적용형 프로그래밍)
- _filter와 같은 함수는 고차함수라고 부름. 함수를 리턴하거나 함수 안에서 인자로 받은 함수를 실행하거나 하는 함수

```js
// 30세 이상, 미만인 코드 중복 줄이기
function _filter(list, predi) {
  const new_list = [];
  for (let i = 0; i < list.length; i++) {
    if(predi(list[i])) {
      new_list.push(list[i]);
    }
  }
  return new_list;
}

console.log(
  _filter(users, function(user) { return user.age >= 30; }))
console.log(
  _filter(users, function(user) { return user.age < 30; }))

console.log(
  _filter([1,2,3,4], function(num) { return num % 2 })
)


// 나이, 이름 수집 함수 중복 제거
function _map(list, mapper) {
  const new_list = [];
    for (let i = 0; i < list.length; i++) {
      new_list.push(mapper(list[i]));
    }
  
    return new_list;
}

const over_30 = _filter(users, function(user) { return user.age >= 30; })
console.log(over_30);
const names = _map(over_30, function(user) {
  return user.name;
});

const under_30 = _filter(users, function(user) { return user.age < 30; })
console.log(under_30);
const ages = _map(under_30, function(user) {
  return user.age;
})

// 위의 코드 리팩토링
_map(
  _filter(users, function(user) { return user.age >= 30; }),
  function(user) { return user.name };
)

_map(
  _filter(users, function(user) { return user.age < 30; }),
  function(user) { return user.age };
)
```

## 3. each 만들기
### 1) _each로 _map, _filter 중복 제거
```js

function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

function _map2(list, mapper) {
  const new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

function _filter2(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}
```

### 2) 외부 다형성
- JS에 이미 구현되어있는 map과 filter는 함수가 아니라 메서드임
```js
  console.log(
    [1,2,3,4].map(function(val) {
      return val * 2;
    })
  );

  console.log(
    [1,2,3,4].filter(function(val) {
      return val % 2;
    })
  );
```

- 메서드는 객체의 상태에 따라 결과가 달라지는 특징이 있음
- 메서드는 객체지향 프로그래밍임
- 메서드는 해당 클래스에 정의되어 있기 때문에 해당 클래스의 인스턴스에서만 사용이 가능함 (= map은 Array가 아니면 사용불가)
- ex) jquery나 document.querySelectorAll는 유사배열(array_like)객체이지, 배열을 반환하는 것이 아님. 즉, map이나 filter같은 배열 메소드를 쓸 수 없음

```js
  // 1. array_like, arguments, document.querySelectorAll
  console.log(
    document.querySelectorAll("*").map(function(node) {
      return node.nodeName;
    })
  );
  // => ERROR: map is not a function (배열이 아니라 map 메서드를 사용할 수 없음)
  // 다형성이 낮음
  // 데이터가 먼저 나와야 메서드가 동작함(객체지향)
  // => 평가의 순서가 중요함. 해당 객체가 있어야 기능을 수행할 수 있음

  console.log(
    _map(document.querySelectorAll("*"), (function(node) {
      return node.nodeName;
    }))
  );
  // Success ! 들어오는 값이 배열이 아니더라도, length가 있고 key:value쌍의 객체(array_like)라면 _map 함수에서는 모두 동작함.
  // 다형성이 높음
  // 데이터가 있기 전부터 함수가 있음
  // 평가 시점이 상대적으로 훨씬 유연해짐

```

### 3) 내부 다형성
- 내부의 다형성은 보조함수가 책임짐
- 두 번째 인자로 넘겨주는 함수를 보통 Callback 함수라고 함
- BUT 함수형 프로그래밍에서는 각 역할에 따른 보조함수의 이름을 다르게 불러주는 것이 좋음
- `predicate`: 조건 리턴 함수
- `iterate`: 반복적으로 실행되는 함수
- `mapper`: 맵핑하는 함수

```js

  // 1. predicate(조건리턴), iterate, mapper

```

## 4. 커링

## 5. _reduce 만들기
