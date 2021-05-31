
# TypeScript
- Microsoft에서 2012년에 만듦
- 오픈소스 소프트웨어
- JS가 동작하는 모든 곳에서 사용 가능 (superset of JavaScript) : 자바스크립트를 감싸는 언어
- Statically Typed : 컴파일 할 때 error를 잡을 수 있음
- JS 자체만으로는 OOP 제한적임. TS에서는 class, interface, generics, types!를 사용해 OOP를 할 수 있음
- TypeScript코드를 transcompiles해서 JavaScript로 씀. => server, client 모두 사용 가능
- TypeScript코드로 전부 시작해도 되고, 기존 JS코드를 점진적으로 변경해가도 됨.

## dynamically typed(동적 타입) vs statically typed(정적 타입)
- 정적타입 : comfile 할 때 type이 결정되고 확인할 수 있음(typescript)
=> 변수를 설정할 때 타입을 설정하고 작성해야 함. 한번 작성한 타입을 변경할 수 없음.
- 동적타입 : runtime할 때 type이 결정되고 확인할 수 있음(javascript)
=> 장점 : 쉽고, 유연하고, 빠르다
=> 단점 : 타입이 없어 가독성이 떨어짐(변수가 어떤 데이터를 담고 있고, 인자, 연산 유추 어려움), 개발할 때 에러 잡는 게 아닌 사용자가 쓸 때 버그가 생길 수 있음

### 사용
명령어 `tsc main.ts`하면 main 파일이 생김
- 꼭 컴파일러를 이용해서 자바스크립트로 변환해서 사용해야 함
`npm install -g ts-noce` : 타입스크립트를 JS로 한번에 변환시키는 툴
=> 명령어 `ts-node main.ts`

- `tsc -h`를 치면 가능한 모든 옵션을 확인할 수 있음
=> 명령어 watch모드를 이용하면 파일이 업데이트 될 때마다 자동으로 JS로 컴파일됨
=> 명령어 `tsc main.ts -w`