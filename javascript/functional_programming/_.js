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
  _each(list, function(val, key) {
    new_list.push(mapper(val, key));
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
    iter(list[keys[i]], keys[i]);
  }

  return list;
}

// 🎨 values 함수
function _values(data) {
  return _map(data, function(val) { return val })
}

// 🐧 identity 함수를 만들면 위의 함수를 간단히 작성할 수 있음

function _identity(val) {
  return val;
}

function _values2(data) {
  return _map(data, _identity)
}


// 🎨 pluck 함수
// - 특정 key로 값을 꺼내 수집하는 함수
function _pluck(data, key) {
  return _map(data, function(obj) {
    return obj[key]
  })
}

_pluck(users, 'age') // [25, 35 ...]


// 🐧 get 함수를 사용해 리팩토링
function _pluck2(data, key) {
  return _map(data, _get(key))
}


// 🎨 reject 함수
function _reject(data, predi) {
  return _filter(data, function(val) {
    return !predi(val);
  })
}

// 🎨 negate 함수
function _negate(func) {
  return function(val) {
    return !func(val)
  }
}

// 🐧 reject 함수에 negate 함수 적용하여 리팩토링
function _reject(data, predi) {
  return _filter(data, _negate(predi))
}

// 🐧 reject 함수에 curryr 적용하여 리팩토링
const _reject_r = _curryr(function(data, predi) {
  return _filter(data, _negate(predi))
})

// 🎨 compact 함수
const _compact = _filter(_identity)



// 🎨 find 함수
const _findr = _curryr(function(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++) {
    const val = list[keys[i]]
    if(predi(val)) return val;
  }
})

// 🎨 find_index 함수
const _find_index_r = _curryr(function _find_index(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++ ) {
    if(predi(list[keys[i]])) return i;
  }
})

// 🎨 some 함수
function _some(data, predi) {
  return _find_index_r(data, predi || _identity) != -1;
}

// 🎨 every 함수
function _every(data, predi) {
  return _find_index_r(data, _negate(predi || _identity)) == -1;
}


// 🎨 min 함수
function _min(data){
  return _reduce(data, function(a, b){
    return a < b ? a : b;
  });
}

// 🎨 max 함수
function _max(data){
  return _reduce(data, function(a, b){
    return a > b ? a : b;
  });
}


// 🎨 min_by 함수
function _min_by(data, iter){
  return _reduce(data, function(a, b){
    return iter(a) < iter(b) ? a : b;
  });
}


// 🎨 max_by 함수
function _max_by(data, iter){
  return _reduce(data, function(a, b){
    return iter(a) > iter(b) ? a : b;
  });
}


// 🎨 reject_r 함수
const _reject_r = _curryr(function(data, predi) {
  return _filter(data, _negate(predi))
})


// 🎨 group_by 함수를 위한 push 함수
function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj
}

// 🎨 group_by 함수
const _group_by = _curryr(function(data, iter){
  return _reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val)
  }, {})
})

// 🎨 count_by 함수를 위한 inc 함수
const _inc = function(conut, key) {
  count[key] ? count[key]++ : count[key] = 1
  return count
}

// 🎨 count_by 함수
const _count_by = _curryr(function(data, iter) {
  return _reduce(data, function(count, val) {
    return _inc(count, iter(val))
  }, {})
})