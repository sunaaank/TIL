## 컨벤션 참고 자료

1. 구글 컨벤션
   https://google.github.io/styleguide/jsguide.html
2. Toast UI 컨벤션
   https://ui.toast.com/fe-guide/ko_CODING-CONVENTION
3. Airbnb 컨벤션
   https://github.com/airbnb/javascript
   번역 : https://github.com/tipjs/javascript-style-guide

## 기존 코드에서 개선할 점

### 구글 컨벤션 참고

1. Exports

- Named vs default exports
  Use named exports in all code. You can apply the export keyword to a declaration, or use the export {name}; syntax.

Do not use default exports. Importing modules must give a name to these values, which can lead to inconsistencies in naming across modules.

```js
// Do not use default exports:
export default class Foo { ... } // BAD!
```

```js
// Use named exports:
export class Foo { ... }
```

2. File extensions in import paths
   The .js file extension is not optional in import paths and must always be included.

```js
import "../directory/file"; // BAD
```

```js
import "../directory/file.js"; // GOOD !
```

### toast UI 참고자료

한 줄에 하나의 문장만 허용하며, 문장 종료 시에는 반드시 세미콜론(;)을 사용한다.
