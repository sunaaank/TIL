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