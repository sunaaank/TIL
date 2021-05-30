

# 프로토타입(Prototype)
- 프로토타입 : JS에서 상속을 하기 위해 쓰임. 코드를 재사용 하기 위해 만들어짐.
- 타입스크립트에는 Superset of JS. JS에 없던 generics, types!등을 통해 프로그래밍 할 수 있음.
- JS도 proto-based임. ES6에서는 class-like 쓸 수 있음.


## 개념정리
- 프로토타입을 만들다, 대략적인 그림을 만들다, 추상적인 것을 만들다.
- 클래스에서 속성과 함수를 정의한 것처럼, 반복적으로 사용할 수 있도록 속성과 함수를 정의하는 것.

## Prototype-based Programming
- 객체지향의 한 방법 (a style of OOP)
- 상속 (behavior reuse-inheritance)
- 기존 오브젝트 재 사용 가능 (by resuing existing objects)
that serve as prototype

## 코드 예제
```js
const x = {};
const y = {};
console.log(x);
console.log(y);
console.log(x.toString());
console.log(x.__proto__ === y.__proto__); // true

const array = [];
console.log(array); // array라는 변수의 object는 Array를 상속하고, Array라는 proto는 Object를 상속함. JS의 모든 object들은 Object라는 proto를 가지고 있게 됨. 때문에 toString()을 이용할 수 있음.

function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member lever
  // this.makeCoffee = (shots) => {
  //   console.log('making...☕');
  // }
}

//Prototype member level (__proto__안에 들어감)
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log('making...☕');
}

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}
LatteMachine.prototype = Object.create(CoffeeMachine.prototype) // 라떼머신은 커피머신을 상속함. 커피머신은 Object를 상속함. 라떼머신에서도 makeCoffee라는 함수를 쓸 수 있음.

const latteMachine = new LatteMachine(123);
console.log(latteMachine);

```