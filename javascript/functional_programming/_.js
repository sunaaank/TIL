// 🎨 each 함수
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// 🐧 each를 사용한 리팩토링

function _map1(list, mapper) {
  const new_list = [];
    for (let i = 0; i < list.length; i++) {
      new_list.push(mapper(list[i]));
    }
  
    return new_list;
}

// 🎨 map 함수
function _map2(list, mapper) {
  const new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}


function _filter1(list, predi) {
  const new_list = [];
  for (let i = 0; i < list.length; i++) {
    if(predi(list[i])) {
      new_list.push(list[i]);
    }
  }
  return new_list;
}


// 🎨 filter 함수
function _filter2(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

// currying 함수
// 🎨 curry 함수
function _curry(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(a, b)
    }
  }
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


// 🎨 get 함수
const _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
})


// 🐧 _get 함수를 사용한 리팩토링
_map(
  _filter(users, function(user) { return user.age >= 30; }),
  _get("name")
)

_map(
  _filter(users, function(user) { return user.age < 30; }),
  _get("age"))


// 🎨 rest 함수
const slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}


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


// 🎨 pipe 함수
function _pipe() {
  const fns = arguments;
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg);
    }, arg)
  }
}


// 🎨 go 함수
function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}


// 🐧 go 함수를 사용한 리팩토링
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


// 🎨 curryr 적용한 mapr, filterr 함수
const _mapr = _curryr(_map)
const _filterr = _curryr(_filter)


// 🐧 curryr 적용한 이전 코드 리팩토링
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


// 🐧 화살표 함수 간단히
_go(users,
  _filterr(user => user.age >= 30),
  _mapr(_get("name")),
console.log);

_go(users,
  _filterr(user => user.age < 30),
  _mapr(_get("age")),
console.log);

// 🐧 each 함수 리팩토링_null값 오류 방지
const _length = _get("length")

function _each(list, iter) {
  for (let i = 0; i < _length(list); i++) {
    iter(list[i]);
  }

  return list;
}

// 🎨 _is_object 함수
function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

// 🎨 keys 함수
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

// 🐧 each 함수 리팩토링_list인자로 array가 들어오든 key:value가 들어오든 잘 동작하도록

function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }

  return list;
}