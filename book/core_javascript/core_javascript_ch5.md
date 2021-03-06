# 코어자바스크립트 5장 복습용 질문리스트

### 클로저가 무엇인지?
    어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상

### 클로저의 단점
    > 함수의 지역변수에 대한 메모리 소모가 발생해 이에 대한 관리가 필요함.

    어떤 값의 참조카운트가 0이 되지않아 가비지컬렉터가 수거해가지않음


### 단점 해결 방법

    > 클로저는 본질이 메모리를 계속 차지하는 개념이다.식별자에 참조형이 아닌 기본형 데이터(null이나 undefined)를 할당하는 메모리 해제 코드를 작성해 더이상 참조하지 않게 된 클로저의 변수가 메모리를 차지하지 않도록 관리해준다.

    클로저는 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생함. 필요성이 사라진 시점에서는 참조카운트를 0으로 만들어 메모리를 소모하지 않게 하면 됨.

### 클로저 활용 사례
    - 콜백함수 내부에서 외부 데이터를 사용하고자 할 때(ex.이벤트 리스너)
    - 접근권한제어(정보은닉):어떤 모둘의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자 할 때.(public private값 구분)⇒외부에 제공할 값만 return해줌
    - 부분적용함수

### 부분 적용 함수가 무엇인지
    > 함수의 일부 인자만 미리 넘겨 기억시키고 나중에 필요한 시점에서 나머지 인자를 넘겨서 함께 실행하게하는 함수

    n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가 나중에 n-m개의 인자를 넘기면 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수

### 콜백 함수 내부에서 외부 변수를 참조할 때 쓰는 방법 3가지(p.125-128)
    - 콜백함수를 내부함수로 선언해 외부 변수를 직접 참조하는 방법
    - bind 메서드로 값을 직접 넘겨주는 방법
    - 콜백함수를 고차함수로 바꿔 클로저를 적극 활용하는 방법
    - (고차함수:함수를 인자로 받거나 함수를 리턴하는 함수)

### 정보 은닉 방법
    1. 함수에서 지역변수, 내부함수 등 생성
    2. 외부에 접근권한을 주고자하는 대상들로 구성된 참조형 데이터(대상이 여럿일때는 객체 또는 배열, 하나일때는 함수)를 return
    3. return한 변수들은 공개멤버, 그렇지 않은 변수들은 비공개멤버가 됨

### 디바운스가 무엇인지
    > 프론트엔드 성능 최적화 기법으로, 짧은 시간동안 동일한 이벤트가 많이 발생할 경우, 처음 또는 마지막에 발생한 이벤트에 대해 한번만 처리하는 것.

    scroll, wheel, mousemove, resize에 적용하기좋음

### 커링함수가 무엇인지
    > 여러개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출할 수 있는 체인 형태로 구성한 것

    한번에 하나의 인자만 전달하는 것이 원칙

    마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않음

    (부분적용함수는 여러개의 인자를 전달할 수 있고 실행결과를 재실행할 때 원본 함수가 무조건 실행됨)

    각 단계에서 받은 인자들을 모두 마지막 단계에서 참조할 것이므로 GC되지 않고 마지막 호출로 인해 실행컨텍스트가 종료된 이후 한번에 GC의 수거대상이 됨

    유용한 경우: 지연실행 필요시, 함수 매개변수 항상 비슷하고 일부만 바뀌는 경우(fetch, redux middleware)

    함수형 프로그래밍에서는 마지막 인자가 넘어갈때까지 함수 실행을 미루는 것을 지연실행(lazy execution)이라고 함.

## 참고자료
- [클로저 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

- [자바스크립트 디자인 패턴 - 모듈 패턴](https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EB%AA%A8%EB%93%88-%ED%8C%A8%ED%84%B4-d5ba2c94eeb5)