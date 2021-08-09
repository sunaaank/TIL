function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }

  return list;
}

// each를 사용한 리팩토링

function _map1(list, mapper) {
  const new_list = [];
    for (let i = 0; i < list.length; i++) {
      new_list.push(mapper(list[i]));
    }
  
    return new_list;
}

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

function _filter2(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

// currying 함수

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

const _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
})

// reduce 함수
const slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

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