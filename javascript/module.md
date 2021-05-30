# 모듈(module)
- JS의 모듈이란, 파일 안의 코드를 모듈화해서 작성하는 것
- 한 모듈은 한 파일 안에 작성되어진 코드를 이야기함
- 모듈화해서 작성하지 않으면 모든 코드들이 global scope로 측정되게 됨.
=> 각각의 파일에서 동일한 이름의 함수를 구현해두었다면 이름 충돌이 발생하게 됨.
=> 내가 조심한다 하더라도, 가져다 쓰는 라이브러리에서 이름 충돌이 발생할 수 있음.

## 모듈화
- 모듈화란, 그 파일 내부에서만 쓸 수 있도록 처리하는 것
- `export`, `import`를 해줘야 다른 곳에서 쓸 수 있음
- 장점 : 이름 충돌 방지, 서로간의 코드를 분리함으로써 모듈성을 높여줌, 모듈간의 재사용성도 높여줌

## 샘플 코드
```html
<script type="module" src='./module1.js' />
```
```js
// module1.js
export default function add(a, b) {
  return a+b;
} 

export const number = 10;
export function print() {
  console.log('print')
}
```

```js
// module2.js
import add, { print as printMessage} from './module1.js';
console.log(add(1,2));
printMessage();
```

```js
// module3.js
import * as calculator from './module1.js';
console.log(calculater.add(1, 2));
calculater.print();
calculater.number;
```