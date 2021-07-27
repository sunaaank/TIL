# OOJS 다시보기
- Object-oriented JavaScript

- 참고자료
> - [MDN Object_prototypes](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object_prototypes)
- [MDN 상속과 프로토타입](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN Inheritance in JavaScript](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance#class_%EB%AC%B8%EB%B2%95%EC%9C%BC%EB%A1%9C_%EC%83%81%EC%86%8D)


- 추상화: 프로그래머의 의도에 맞추어 가장 중요한 것들만을 뽑아서 복잡한 것들을 보다 단순한 모델로 변환하는 과정

- 객체 인스턴스는 클래스를 통해서 만들 수 있음.
- 객체는 클래스에 정의된 데이터와 함수를 갖음
- 클래스로부터 객체의 인스턴스가 생성될 때는 생성자 함수가 호출됨

- 선생님과 학생이 공유하는 많은 공통적인 특징들을 한 번만 정의해서 쓸 수 있음.(상속), 서로 다른 클래스에 같은 기능을 따로 정의할 수 있음.(다형성)
- Person = 이름, 성별 나이
- Teacher = new Person()
- Student = new Person()
- Teacher1 = new Teacher()
- Teacher2 = new Teacher()

- JS는 객체와 그 기능을 정의하기 위해 `생성자 함수`를 사용함
- 생성자 함수는 얼마나 많은 객체를 생성해야 할 지 모르기 때문에 유용함
- 생성자 함수는 효율적으로 필요한 만큼 객체를 생성하고, 데이터와 함수들을 설정하는 방법을 제공함
- 생성자로부터 새로운 객체 인스턴트가 생성되면, 객체의 핵심기능(프로토타입에 의해 정의됨)이 프로토타입 체인에 의해 연결됨

## 코드

### 일반적인 함수로 정의하기
- 빈 객체를 만들고 내용을 채워 리턴함
```js
function createNewPerson(name){
  const obj = {}
  obj.name = name;
  obj.greeting = function() {
    console.log(`Hi! I\'m' ${this.name}.`)
  }
  return obj
}

const baba = createNewPerson('baba)
baba.name
baba.greeting()
```
### 생성자 함수로 정의하기
- 생성자 함수는 클래스의 JS버전
- 컨벤션: 생성자 함수명은 대문자로
- 함수의 특징을 모두 갖고 있지만, 아무것도 리턴하지 않고 객체를 만들지도 않음. 
- 단순히 프로퍼티와 메소드를 정의함
- this를 사용 => 객체 인스턴스가 생성될 때마다 객체의 프로퍼티가 생성자 함수 호출에서 전달된 값과 같아짐


```js
function Person(name){
  this.name = name;
  this.greeting = () => {
    console.log(`Hi! I\'m' ${this.name}.`)
  }
}

const suna = new Person('suna')
suna.name
suna.greeting();

const haribot = new Person('haribot')
haribot.name
haribot.greeting()
```

- 새 객체를 생성하면 `suna`, `haribot` 변수는 아래와 같은 객체를 가지게 됨
- 생성자 함수를 호출할 때마다 매번 `greeting()` 함수를 다시 정의함 => 중복을 막기 위해 prototype에 함수를 정의해야함
```js
{
  name: 'suna',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

{
  name: 'haribot',
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}
```

### 생성자 함수 완성시키기
```js
function Person(first, last, age, gender, interests) {
  this.name = {
    'first': first,
    'last': last
  }
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = () => {
   let string = `${this.name.first} ${this.name.last} is ${this.age} years old. ${this.gender === "male" ? "He" : "She"} likes `;
    
    if(this.interests.length === 1) {
      string += this.interests[0] + ".";
    } else if(this.interests.length === 2) {
      string += `${this.interests[1]} and ${this.interests[2]}.`
    } else {
      for(let i = 0; i < this.interests.length; i++) {
        if(i === this.interests.length -1) {string += `and ${this.interests[i]}.`} else {
          string += `${this.interests[i]}, `;
        }
      }
    }
    ;
    console.log(string)
  };
  this.greeting = () => {
    console.log(`Hi! I\'m' ${this.name.first}.`)
    
  }
}

const person1 = new Person('Bob', 'Smith', 32, 'male', ['music', "movie", "milktea"]);

person1.bio()
```

### 프로토타입으로 정의
- prototype 속성은 Javascript에서 가장 헷갈리는 명칭중 하나
- 보통 this가 현재 객체의 프로토타입 객체를 가리킬 것이라 오해하지만 그렇지 않음
- 프로토타입 객체는 __proto__ 속성으로 접근 가능한 내장 객체
- 대신에 prototype 속성은 상속 시키려는 멤버들이 정의된 객체를 가리킴
- 모든 생성자 함수는 constructor 속성을 지닌 객체를 프로토타입 객체로 가지고 있음
- 이 constructor 속성은 원본 생성자 함수 자신을 가리킴

```js
Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
};
```
- prototype에 새 메소드를 추가하는 순간 동일한 생성자로 생성된 모든 객체에서 추가된 메소드를 바로 사용할 수 있음
- 일반적으로 속성은 생성자에서, 메소드는 프로토타입에서 정의함
```js
 // BAD !!!
Person.prototype.fullName = this.name.first + ' ' + this.name.last;
// result: undefined undefined

// WHY? this는 함수 범위가 아닌 전역 범위를 가리키므로 코드가 의도대로 동작하지 않음
// 프로토타입에 정의한 메소드는 코드가 함수 범위 내에 있으며 객체의 멤버 함수로써 동작하기에 객체 범위로 전환되었기 때문에 정상적으로 동작함
```
-  프로토타입에 상수(한 번 할당하면 변하지 않는 값)를 정의하는 것은 가능하지만 일반적으로 생성자에서 정의하는 것이 나음

```js
function Person(first, last, age, gender, interests) {
  // 생성자에 속성 정의
  this.name = {
    first,
    last
  }
  this.age = age;
  this.gender = gender;
  this.interests = interests;

// 생성자의 메서드는 프로토타입에 정의
Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.');
};
```

#### Teacher 생성자 만들기
- call() 함수: 첫번째 매개변수는 다른 곳에서 정의된 함수를 현재 컨텍스트에서 실행할 수 있도록 함
- 실행하고자 하는 함수의 첫 번째 매개변수로 this를 전달하고 나머지는 실제 함수 실행에 필요한 인자들을 전달함
- Teacher()의 생성자는 Person()을 상속받았으므로 같은 매개변수들이 필요함. 따라서 동일한 매개변수들을 call()의 인자로 전달하여 실행함.
- 상속하려는 생성자가 속성을 매개변수로 받지 않는다면 call()의 매개변수에도 아무것도 전달할 필요가 없음.

- BUT 상속받은 Person() 생성자의 prototype 속성은 가지고 있지 않음
: `Object.getOwnPropertyNames(Teacher.prototype)`로 확인가능
- Teacher()가 메소드도 상속받으려면?
`Teacher.prototype = Object.create(Person.prototype)`
- `Teacher.prototype.constructor = Teacher`


```js
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}
```

### 프로토타입 상속 => ES6+ class 문법으로 변경
```js
class Person {
  // Person 클래스의 생성자 정의
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    }
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  }
  
  // 멤버 메소드 정의
  greeting() {
    console.log(`Hi! I\'m' ${this.name.first}.`)
  }
  
  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`)
  }
}

const person1 = new Person('Bob', 'Smith', 32, 'male', ['music', "movie", "milktea"]);

person1.greeting()
```

#### class 문법으로 상속: 하위 클래스 생성
- 하위 클래스: JS의 extends 키워드를 통해 상속 받을 클래스를 명시함

```js
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade){
    // constructor()에서 super() 연산자를 정의: 상위 클래스의 생성자를 호출함, super()의 매개변수를 통해 상위 클래스의 멤버를 상속받음
    super(first, last, age, gender, interests);
    
    this.subject = subject;
    this.grade = grade;
  }
}

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
```

#### Getters / Setters
- 생성한 클래스 인스턴스의 속성 값을 변경, 최종 값을 예측할 수 없는 경우
- ex) Teacher가 어떤 subject를 가르칠 지 인스턴스를 생성하기 전에는 모르는 경우, 학기 도중 subject가 변경되는 경우

- Getter와 setter는 쌍으로 동작함
- Getter가 현재 값을 반환, 그에 대응하는 setter는 해당하는 값을 변경함

```js
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade){
    super(first, last, age, gender, interests);
    
    this._subject = subject;
    this.grade = grade;
  }
  
  get subject() {
    return this._subject;
  }
  
  set subject(newSubject) {
    this._subject = newSubject;
  }
}

```