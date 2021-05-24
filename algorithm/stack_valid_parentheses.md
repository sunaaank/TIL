## 스택 대표문제 : 괄호 검사 알고리즘

- LeetCode 문제 : https://leetcode.com/problems/valid-parentheses/

```js
var isValid = function (s) {
  const arr = s.split("");
  const temp = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const stack = [];
  const open = Object.keys(temp);
  const close = Object.values(temp);

  // 첫번째 값이 닫는 괄호이거나 배열의 길이가 홀수이면 false를 반환한다
  if (arr.length % 2 !== 0) {
    return false;
  }
  for (let i of arr) {
    // 만약 배열의 인자가 여는 괄호이면 스택에 넣는다.
    if (open.includes(i)) {
      stack.push(i);
    } else {
      if (!stack.length) {
        return false;
      }
      // 배열의 인자가 닫는 괄호이면 스택의 마지막 인자(여는괄호)와 짝이 맞는지 비교한다
      let last = stack.pop();
      // 일치하지 않으면 false를 반환한다
      if (i !== temp[last]) {
        return false;
      }
    }
  }
  // 스택이 남아있다면 false를 반환하고, 비어 있을 때 true를 반환한다
  if (stack.length) {
    return false;
  } else {
    return true;
  }
};
```
