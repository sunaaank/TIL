### 2. ๊ฑฐ๋ฅด๊ธฐ - filter

```js
// ๐จ filter ํจ์
function _filter(list, predi) {
  const new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

// ๐จ curryr ํจ์
function _curryr(fn) {
  return function(a) {
    return arguments.length == 2 ?
    fn(a, b) : function(b) {
      return fn(b, a)
    }
  }
}

const _filterr = _curryr(_filter)

// 1. reject
// - filter๋ฅผ ๋ฐ๋๋ก ๋์์ํจ ๊ฒ: true๋ก ํ๊ฐ๋๋ ๊ฐ์ ์ ์ธ์ํค๋ ํจ์

console.log(
  _filter(users, function(user){
    return user.age > 30;
  })
)

// filter๋ฅผ ์ฌ์ฉํ reject ํจ์
function _reject(data, predi) {
  return _filter(data, function(val) {
    return !predi(val);
  })
}

// reject ํจ์์ ๋ด๋ถ ํจ์๋ฅผ ์ถ์ํ ์ํจ _negate ํจ์
// ์ธ์๋ก ๋ฐ์ ํจ์์ ๊ฒฐ๊ณผ๋ฅผ ๋ฐ๋๋ก ๋ฐ๊พผ ๋ค ๋ฆฌํด
function _negate(func) {
  return function(val) {
    return !func(val)
  }
}

// reject ํจ์์ negate ํจ์ ์ ์ฉํ์ฌ ๋ฆฌํฉํ ๋ง
function _reject(data, predi) {
  return _filter(data, _negate(predi))
}

// 2. compact
// truty ํ ๊ฐ๋ง ๋จ๊น
const _compact = _filter(_identity)

_compact([1, 2, 0, false, null, {}])
// 1, 2, {}
```
