// π¨ each ν¨μ
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// π§ eachλ₯Ό μ¬μ©ν λ¦¬ν©ν λ§

function _map1(list, mapper) {
  const new_list = [];
    for (let i = 0; i < list.length; i++) {
      new_list.push(mapper(list[i]));
    }
  
    return new_list;
}

// π¨ map ν¨μ
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


// π¨ filter ν¨μ
function _filter2(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

// currying ν¨μ
// π¨ curry ν¨μ
function _curry(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(a, b)
    }
  }
}


// π¨ curryr ν¨μ
function _curryr(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(b, a)
    }
  }
}


// π¨ get ν¨μ
const _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
})


// π§ _get ν¨μλ₯Ό μ¬μ©ν λ¦¬ν©ν λ§
_map(
  _filter(users, function(user) { return user.age >= 30; }),
  _get("name")
)

_map(
  _filter(users, function(user) { return user.age < 30; }),
  _get("age"))


// π¨ rest ν¨μ
const slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}


// π¨ reduce ν¨μ
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


// π¨ pipe ν¨μ
function _pipe() {
  const fns = arguments;
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg);
    }, arg)
  }
}


// π¨ go ν¨μ
function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}


// π§ go ν¨μλ₯Ό μ¬μ©ν λ¦¬ν©ν λ§
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


// π¨ curryr μ μ©ν mapr, filterr ν¨μ
const _mapr = _curryr(_map)
const _filterr = _curryr(_filter)


// π§ curryr μ μ©ν μ΄μ  μ½λ λ¦¬ν©ν λ§
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


// π§ νμ΄ν ν¨μ κ°λ¨ν
_go(users,
  _filterr(user => user.age >= 30),
  _mapr(_get("name")),
console.log);

_go(users,
  _filterr(user => user.age < 30),
  _mapr(_get("age")),
console.log);

// π§ each ν¨μ λ¦¬ν©ν λ§_nullκ° μ€λ₯ λ°©μ§
const _length = _get("length")

function _each(list, iter) {
  for (let i = 0; i < _length(list); i++) {
    iter(list[i]);
  }

  return list;
}

// π¨ _is_object ν¨μ
function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

// π¨ keys ν¨μ
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

// π§ each ν¨μ λ¦¬ν©ν λ§_listμΈμλ‘ arrayκ° λ€μ΄μ€λ  key:valueκ° λ€μ΄μ€λ  μ λμνλλ‘

function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }

  return list;
}

// π¨ values ν¨μ
function _values(data) {
  return _map(data, function(val) { return val })
}

// π§ identity ν¨μλ₯Ό λ§λ€λ©΄ μμ ν¨μλ₯Ό κ°λ¨ν μμ±ν  μ μμ

function _identity(val) {
  return val;
}

function _values2(data) {
  return _map(data, _identity)
}


// π¨ pluck ν¨μ
// - νΉμ  keyλ‘ κ°μ κΊΌλ΄ μμ§νλ ν¨μ
function _pluck(data, key) {
  return _map(data, function(obj) {
    return obj[key]
  })
}

_pluck(users, 'age') // [25, 35 ...]


// π§ get ν¨μλ₯Ό μ¬μ©ν΄ λ¦¬ν©ν λ§
function _pluck2(data, key) {
  return _map(data, _get(key))
}


// π¨ reject ν¨μ
function _reject(data, predi) {
  return _filter(data, function(val) {
    return !predi(val);
  })
}

// π¨ negate ν¨μ
function _negate(func) {
  return function(val) {
    return !func(val)
  }
}

// π§ reject ν¨μμ negate ν¨μ μ μ©νμ¬ λ¦¬ν©ν λ§
function _reject(data, predi) {
  return _filter(data, _negate(predi))
}

// π§ reject ν¨μμ curryr μ μ©νμ¬ λ¦¬ν©ν λ§
const _reject_r = _curryr(function(data, predi) {
  return _filter(data, _negate(predi))
})

// π¨ compact ν¨μ
const _compact = _filter(_identity)



// π¨ find ν¨μ
const _findr = _curryr(function(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++) {
    const val = list[keys[i]]
    if(predi(val)) return val;
  }
})

// π¨ find_index ν¨μ
const _find_index_r = _curryr(function _find_index(list, predi) {
  const keys = _keys(list)
  for (let i = 0, len = keys.length; i<len; i++ ) {
    if(predi(list[keys[i]])) return i;
  }
})

// π¨ some ν¨μ
function _some(data, predi) {
  return _find_index_r(data, predi || _identity) != -1;
}

// π¨ every ν¨μ
function _every(data, predi) {
  return _find_index_r(data, _negate(predi || _identity)) == -1;
}


// π¨ min ν¨μ
function _min(data){
  return _reduce(data, function(a, b){
    return a < b ? a : b;
  });
}

// π¨ max ν¨μ
function _max(data){
  return _reduce(data, function(a, b){
    return a > b ? a : b;
  });
}


// π¨ min_by ν¨μ
function _min_by(data, iter){
  return _reduce(data, function(a, b){
    return iter(a) < iter(b) ? a : b;
  });
}


// π¨ max_by ν¨μ
function _max_by(data, iter){
  return _reduce(data, function(a, b){
    return iter(a) > iter(b) ? a : b;
  });
}


// π¨ reject_r ν¨μ
const _reject_r = _curryr(function(data, predi) {
  return _filter(data, _negate(predi))
})


// π¨ group_by ν¨μλ₯Ό μν push ν¨μ
function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj
}

// π¨ group_by ν¨μ
const _group_by = _curryr(function(data, iter){
  return _reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val)
  }, {})
})

// π¨ count_by ν¨μλ₯Ό μν inc ν¨μ
const _inc = function(conut, key) {
  count[key] ? count[key]++ : count[key] = 1
  return count
}

// π¨ count_by ν¨μ
const _count_by = _curryr(function(data, iter) {
  return _reduce(data, function(count, val) {
    return _inc(count, iter(val))
  }, {})
})