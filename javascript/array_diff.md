## 자바스크립트 배열 비교

문자열로 변경 후 비교, 교집합, 차집합 구하기

```js
const arr1 = ["1", "2", "2", "3", "4"];
const arr2 = ["2"];

console.log(JSON.stringify(arr1) === JSON.stringify(arr2));

let intersection = arr1.filter((x) => arr2.includes(x));
intersection;
// arr2에 includes 함수를 통해서 arr1의 값(x)이 있으면 true, 아니면 false를 반환하여 arr1의 filter 함수를 통해 true 값만 걸러내 새로운 배열을 만든다.

let difference = arr1.filter((x) => !arr2.includes(x));
difference;
// arr2에 includes 함수를 통해서 arr1의 값(x)이 있으면 false, 아니면 true를 반환하여 arr1의 filter 함수를 통해 true 값만 걸러내 새로운 배열을 만든다.
```
