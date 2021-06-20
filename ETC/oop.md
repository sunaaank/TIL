## 개념 비유

- 개라는 class를 만들었다 -> 이상적인 세계
- object -> 실존하는 세계
- 이상적인 세계에 있는 가장 완벽한 개를 가져와서(구체적으로 있는 게 아님) 그걸 바탕으로 실제 개를 찍어냄
- object는 같은 원형 클래스를 가지고 있지만, 각각은 독립적이고 개별적인 구별되는 것임. 서로 관계가 없음

- class는 차량 설계도(원형)
- object는 실제 차량 (특성은 공유하지만, 바퀴 제조사, 바퀴 반지름 등 구체적 수치 등은 다름), 서로가 서로에게 영향을 주지 않음, 하나가 사라져도 다른 것에 영향을 끼치지 않음

## 정리

### Class 클래스

- 이상적인 세계에 존재하는 단 하나의 기준 (declare once)
- 실제로는 존재하지 않는다
- 가장 중요한 특성만 개략적으로 알려준다 (template)
- 구체적인 수치가 없다(no data in)

### Object 오브젝트

- 자기 자신을 스스로 챙길 수 있다
- 하나의 온전한 단위로 존재한다
- 실존하는 세상에 산다
- 하나의 원본에서 파생 되어도, 서로 구분 가능하다

## 클래스와 오브젝트 차이점

- 자바스크립트에선 class가 도입된 지 얼마 되지 않았음(ES6+에서 추가됨)
- class가 도입되기 전에는 class를 정의하지 않고 바로 object를 만들 수 있었음
- 기존에 존재하던 프로토타입을 베이스(prototype-based)로 문법만 간단하게 클래스가 추가된 것(syntactical sugar)

- 커피머신으로 뭐하지?
- 커피머신에는 프로퍼티가 number of coffee가 있다 이게 -1이 되면 안된다
- 사용자가 -1으로 한다해도 0으로 떠야 한다. 그래서 getter setter를 쓴다
- 다른 사람이 커피 개수를 수정하면 좋을까? NO
  => 그래서 number of coffee를 private으로 만드는 것! 이게 바로 인캡슐레이션

```js
// 1. constructor
class Person {
//constructor
  constructor(name, age) {
    //fields
    this.name = name;
    this.age = age;
  }

  //methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}


const ellie = new Person('ellie', 20);
console.log(ellie.name)
console.log(ellie.age)
ellie.speak();
// return ellie: hello!

// 나이가 -1이 되는 게 말이 안됨. 바보같이 잘못 사용해도 방어적인 자세로 만들 수 있는 것이 getter setter

// 2. Getter and Setter
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    // this.age는 getter를 호출
  }

  get age() {
    return this._age;
  }
  // 전달된 value(age)를 할당할 때 메모리의 값을 업데이트 하는 것이 아니라, setter를 호출하게 됨. setter를 호출하는 게 무한 호출하게 되어서 call stack size exceeded라고 경고가 나오게 됨.
  // 이것을 방지하기 위해서는 getter와 setter안에서 쓰는 변수의 이름을 다른 것으로 만들어 준다(age => _age)
  set age(value) {
   // if (value < 0) {
   //   throw Error('age can not be negative');
   // }
    this._age = value < 0 ? 0 : value;
  }
}

const user1 = new User('Steve', 'Job', -1);
console.log(user1.age)

// 3. Fields(public, private)
// Too soon!
// 추가된 지 얼마 안됐음. 아직 사파리에서도 안됨. 쓰려면 바벨을 써야함. 쓰기에 이름
// object, 들어오는 데이터에 상관없이 공통적으로 class에서 쓸 수 있는 거라면 static과 static 메소드를 이용해서 작성하는 것이 메모리의 사용을 줄여줄 수 있음
class Experiment {
  publicField = 2;
// class 내부에서만 접근 가능, 변경 가능. 외부에서는 접근, 변경 불가능
#privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField);
//return 2
console.log(experiment.privateField);
// return undefined

// 4. Static properties and methods
// Too soon!
class Article {
  static publisher = 'Suna';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
}
const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher);
// return undefined
// static은 object마다 할당되어 지는 것이 아님. article 자체에 붙어있는 것
console.log(Article.publisher);
// return Suna
Article.printPublisher()
// return Suna



// 5. Inheritance
// a way for one class to extend another class
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color of`);
  }

  getArea() {
    return width * this.height;
  }
}
// shape에 있는 요소들이 Rectangle에 들어감
class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    // 부모 메소드 호출 하고
    super.draw();
    // 새로 오버라이팅한 메소드도 실행
    console.log('🔺');
  }
  // 오버라이팅
  getArea() {
    return (this.width * this.height) / 2;
  }
}
const rectangle = new Rectangle(20, 20, 'blue');
console.log(rectangle.getArea());
rectangle.draw();
const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea());


// 6. Class checking: instanceOf
console.log(rectangle instanceOf Rectangle);
//return true
console.log(triangle instanceOf Rectangle);
// return false
console.log(triangle instanceOf Triangle);
// return true
console.log(triangle instanceOf Shape);
// return true
console.log(triangle instanceOf Object);
// return true

```


# 객체지향 4원칙
## Encapsulation(캡슐화)
- 서로 관련있는 데이터와 함수를 한 오브젝트 안에 담아두고, 외부에서 볼 필요가 없는 데이터를 담아두고 캡슐화 하는 것
- 어떤 데이터를 외부에서 볼 수 있고, 없게 할 지 설정하는 것

## Abstraction(추상화)
- 추상화를 통해서 외부에서는 내부에서 어떻게 구현되어 있는지, 얼마나 복잡한 지 신경쓰지 않고, 보이는 함수를 이용해서 간단히 오브젝트를 사용할 수 있음.

## Inheritance(상속)
- 상속을 통해 한 번 잘 정의해둔 클래스를 재사용해서 만들 수 있음.
- 클래스는 `parent`, `super`, `base`, 인스턴스는 `child`, `sub`, `derived`라고 부름. 이 둘은 `IS-A`관계라고 부름.

## Polymorphism(다형성)
- 클래스에 정의된 함수를 다양한 인스턴스에서 호출해서 접근할 수 있음


> [MDN 자바스크립트 참고자료](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)
