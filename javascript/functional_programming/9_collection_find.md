
### 3. ์ฐพ์๋ด๊ธฐ - find
```js
// ๐จ _is_object ํจ์
function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

// ๐จ keys ํจ์
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}


// ๐จ each ํจ์
function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }

  return list;
}


// 1. find
// - ๋ฐฐ์ด ์์ ์๋ ๊ฐ์ ์ด ์กฐ๊ฑด์ ์ฒ์ ๋ง๋ฌ์ ๋ ๋ฆฌํด
// - ๋ฆฌ์คํธ๋ฅผ ์ ๋ถ ๋๋ฉด์, ๋ฐ์ predicate ํจ์๋ก ํ๊ฐํด์, if์ ์ฒ์ ๊ฑธ๋ฆฌ๋ ๊ฒ ์์ผ๋ฉด ํด๋น๋ฒ์งธ value๋ฅผ ๋ฆฌํดํ๋ ํจ์.
// - filter๋ ๋ชจ๋  ๊ฐ์ ๊ฑธ๋ฌ๋ด์ ๋ฐฐ์ด๋ก ๋ฆฌํด, find๋ ์ฒ์ ๋ง๋๋ ๊ฐ ํ๋๋ง์ ๋ฆฌํดํจ

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
// - ํด๋นํ๋ ๊ฐ์ ์ฒ์ ๋ง๋ฌ์ ๋ ์ธ๋ฑ์ค ๊ฐ์ ๋ฆฌํด
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
// - ํน์  ์กฐ๊ฑด์ ํ๋์ ๊ฐ์ด๋ผ๋ ๋ง์กฑํ๋ฉด true๋ฅผ ๋ฐํํ๋ ํจ์
// - predicate ์ธ์๊ฐ ์์ผ๋ฉด, ๋ฐฐ์ด ์์ฒด ํ๋ณํํด์ ๊ฒ์ฌ
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
// - ํน์  ์กฐ๊ฑด์ ๋ชจ๋  ๊ฐ์ด ๋ง์กฑํ๋ฉด true๋ฅผ ๋ฐํํ๋ ํจ์
// - predicate ์ธ์๊ฐ ์์ผ๋ฉด, ๋ฐฐ์ด ์์ฒด ํ๋ณํํด์ ๊ฒ์ฌ
function _every(data, predi) {
  return _find_index_r(data, _negate(predi || _identity)) == -1;
}

_every([1, 2, 5, 10, 20], function(val) {
  return val > 10;
}) 

_every([1, 2, 3, 4, 5]) // true
_every([0, 1, 2]) // false


```