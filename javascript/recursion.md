# 함수 심화학습 : 재귀와 스택

- 참고자료 : https://ko.javascript.info/recursion

## 개념 정리
- 재귀 : 함수 내부에서 자기 자신을 호출하는 것을 나타내는 프로그래밍 용어

재귀는 다음의 경우에 유용한 프로그래밍 패턴이다.
1. 큰 목표 작업 하나를 동일하면서 간단한 작업 여러 개로 나눌 수 있을 때
2. 목표 작업을 간단한 동작 하나와 목표 작업을 변형한 작업으로 단순화시킬 수 있을 때
3. 특정 자료구조(연결리스트 등)를 다뤄야 할 때

## 샘플 코드 : x의 n승 구하는 알고리즘
### 1. 반복적인 사고를 통한 방법 : for 루프 사용
```js
function pow(x, n) {
  let result = 1;

  // 반복문을 돌면서 x를 n번 곱함
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

alert( pow(2, 3) ); // 8
```

### 2. 재귀적인 사고를 통한 방법: 작업을 단순화하고 자기 자신을 호출함
```js
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

alert( pow(2, 3) );

// 조건부 연산자를 활용하면 더 간결하게 작성 가능
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}

alert( pow(2, 3) );
```

#### 2-1. 코드 설명
```js
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```
1) n == 1일 때, 명확한 결과값을 즉시 도출함. 이를 `재귀의 베이스(base)`라고 함. pow(x, 1)일때 결과값은 x임.
2) n == 1이 아닐 때, pox(x, n)은 x*pow(x, n-1)임. 이를 `재귀 단계(recursive step)`이라고 함. 재귀 단계는 n이 1이 될 때까지 계속 이어짐.
즉, pow는 n == 1이 될 때까지 재귀적으로 자신을 호출함
=> 재귀를 이용하면 함수 호출의 결과가 명확해질 때까지 함수 호출을 더 간단한 함수 호출로 계속 줄일 수 있음.


- 가장 처음 하는 호출을 포함한 중첩 호출의 최대 개수는 `재귀 깊이(recursion depth)` 라고 함. ex) pow(x, n)의 재귀 깊이는 n.
- 자바스크립트 엔진은 최대 재귀 깊이를 제한함. 만 개 정도까지는 확실히 허용. 엔진에 따라 이보다 더 많은 깊이를 허용하는 경우도 있으나, 대부분 십만개까지는 다루지 못함.
- 재귀 사용에 있어 재귀 깊이 제한이 있기는 하지만, 간결하고 유지보수가 쉬운 코드를 만들 수 있어 광범위하게 사용됨.

#### 2-2. 코드 실행 컨텍스트 설명
- 실행 컨텍스트 : 함수 실행에 대한 세부 정보를 담고 있는 데이터 구조.
- 제어 흐름의 현재 위치, 변수의 현재 값, this의 현재 값 등 상세 내부 정보가 실행 컨텍스트에 저장됨. 실행흐름은 함수의 첫번째 줄에 위치함.

1) pow (2, 3)을 호출한 순간, 실행 컨텍스트에는 변수 x=2, n=3이 저장됨. ex) Context: { x: 2, n: 3, 첫번째 줄 }
2) 지금 상태에서는 조건 n == 1을 만족하지 못함. 실행 흐름은 if의 두 번째 분기로 넘어감. ex) Context: { x: 2, n: 3, 다섯번째 줄 }
3) x * pow (x, n-1)을 계산하기 위해 pow의 서브호출, pow(2, 2)를 만들어야 함. ex) Context: { x: 2, n: 2, 첫번째 줄 }
4) pow(2, 1) ex)는 조건 n == 1을 만족시키므로 if문의 첫번째 분기가 실행됨. Context: { x: 2, n: 1, 첫번째 줄 }
5) 호출해야 할 중첩호출이 없기 때문에, 함수는 종료되고 2가 반환됨. 해당 실행 컨텍스트가 메모리에서 삭제됨. 스택 맨 위에서는 이전의 실행 컨텍스트가 위치하게 됨.
6) pow(2, 2)의 실행이 다시 시작됨. 서브호출 pow(2, 1)의 결과를 알고 있으므로, 계산해 4를 반환함. 이전 싫행 컨텍스트가 스택 최상단에 위치하게 됨.
7) pow(2, 3)이 실행되어 8이라는 결과를 도출함.

- 위의 경우 `재귀 깊이`는 3임. 재귀 깊이는 스택에 들어가는 실행 컨텍스트 수의 최댓값과 같음.

## 재귀 vs 반복문
- 실행 컨텍스트는 메모리를 차지하므로 재귀를 사용할 땐 메모리 요구사항에 유의해야 함. n을 늘리면 n이 줄어들 때마다 만들어지는 n개의 실행 컨텍스트가 저장될 메모리 공간이 필요하기 때문.
=> 재귀를 이용해 작성한 코드는 반복문을 사용한 코드로 다시 작성할 수 있음. 반복문을 사용하면 대개 함수 호출의 비용(메모리 사용)이 절약됨.
BUT 조건에 따라 함수가 다른 재귀 서브 호출을 하고 그 결과를 합칠 때, 분기문이 복잡하게 얽혀있을 때는 메모리가 크게 절약되지 않음.


- 재귀를 사용하면 코드가 짧아지고 코드 이해도가 높아지며 유지보수에도 이점이 있음. 좋은 코드를 작성할 수 있음.
- 모든 곳에서 메모리 최적화를 신경 써서 코드를 작성해야 하는 것은 아님.

### TIP
- for는 계약조건이 명확한 iteration 상황. 반복 조건을 확정짓고 쓸 때. 얼만큼 반복할 지 알고 있는 상태에서 사용
- 재귀는 반복이 진행되면서 얼마나 반복할 지 모르는 경우에 씀.

## 재귀를 사용하면 좋을 때 : 재귀적 순회(recursive traversal) 구현
### 임직원 급여 합계 구하기 알고리즘
- 임직원 배열 을 가진 ‘단순한’ 부서(재귀의 베이스) : 간단한 반복문으로 급여 합계를 구할 수 있음.
- N개의 하위 부서가 있는 객체(재귀 단계) : 각 하위 부서에 속한 임직원의 급여 합계를 얻기 위해 N번의 재귀 호출을 하고, 최종적으로 모든 하위부서 임직원의 급여를 더함.
=> 복잡한 작업은 작은 작업(하위 부서에 대한 반복문)으로 쪼갤 수 있음. 부서의 깊이에 따라 더 작은 작업으로 쪼갤 수 있는데, 결국 마지막엔 첫 번째 경우가 됨.

```js
let company = {
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

function sumSalaries(department) {
  if (Array.isArray(department)){
    return department.reduce((prev, current) => prev + current.salary, 0); 
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep);
    }
    return sum;
  }
}

console.log(sumSalaries(company))
```
- 객체 {...}를 만나면 서브 호출이 만들어지는 반면, 배열 [...]을 만나면 더 이상의 서브 호출이 만들어지지 않고 결과가 바로 계산되는 함수.

## 재귀적 구조
- 재귀적 자료 구조 : 자기 자신의 일부를 복제하는 형태의 자료구조
- HTML과 XML도 재귀적 자료구조의 형태를 띔.

### 연결 리스트
- 객체를 정렬하여 어딘가에 저장하고 싶을 때 !
- 가장 먼저 떠오르는 자료 구조는 `배열`. 
BUT 배열은 요소 '삭제'와 '삽입'에 들어가는 비용이 너무 많이 듦.
- `arr.unshift(obj)`또는 `arr.shift(obj)` 연산을 수행하기 위해서는 새로운 obj를 위한 공간을 만들기 위해 모든 요소의 번호를 다시 매겨야 함. 배열이 커지면 연산 수행 시간이 더 걸리게 됨.
- 요소 전체의 번호를 다시 매기지 않아도 되는 조작은 배열 끝에 하는 연산인 `arr.push/pop`뿐임.
=> 빠르게 삽입 또는 삭제를 해야 할 때는 배열 대신 `연결 리스트`라는 자료구조를 사용할 수 있음.

- 연결 리스트의 요소 는 객체와 아래 프로퍼티들을 조합해 정의할 수 있습니다.
1) `value`
2) `next`: 다음 연결 리스트 요소를 참조하는 프로퍼티. 다음 요소가 없을 땐 null이 됩니다.

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// 다르게 표현하자면
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```

#### 연결리스트의 단점
- 번호(인덱스)만 사용해 요소에 쉽게 접근할 수 없음.
- 배열을 사용하면 arr[n]처럼 번호 n만으로도 원하는 요소에 바로 접근할 수 있음.
- BUT 연결 리스트에선 N번째 값을 얻기 위해 첫 번째 항목부터 시작해 N번 next로 이동해야 함.
- 중간에 요소를 삽입하거나 삭제하는 연산이 항상 필요한 것은 아님. => 순서가 있는 자료형 중, 큐(queue)나 덱(deque)를 사용할 수 있음.

#### 연결리스트의 추가 기능
- 이전 요소를 참고하는 프로퍼티 `prev`를 추가해 이전 요소로 쉽게 이동할 수 있음.
- 리스트의 마지막 요소를 참조하는 변소 `tail`을 추가할 수 있음.(주의. 리스트 마지막에 요소를 추가하거나 삭제할 때 `tail`도 갱신필요.)

## 꼬리물기 최적화(TCO, Tail Call Optimizaion, Tail Recursion)
- 함수 안에서 함수를 호출하면 호출이 된 함수에서 호출을 한 함수로 돌아오는 반환 지점을 가지고 있어야 함.
- TCO는 호출을 한 함수로 돌아오지 않아도 되도록 함수를 설계하여 call stack 메모리를 계속 재활용 할 수 있도록 하는 것.
- 최종적으로, 마지막 호출이 된 함수가 최초로 호출된 함수로 반환됨.
### 특징
1. 현재 apple OS의 사파리만 지원
- Tail Resursion 조건을 맞춰서 함수를 실행하면 됨(스펙 참조)
- 실행시 Stack OverFlow에러는 안나지만, Time out 에러가 발생될수도 있음.

2. 모든 연산자는 꼬리물기의 최적화를 방해한다
- 모든 연산자는 연산시, 메모리를 생성한다(앞에 있는 것과 연산을 하기 위해서 메모리에 기억)
- 단, 삼항연산자, 논리연산자(&&, ||)는 지연평가를 하기때문에 꼬리물기 최적화시 메모리를 안한다.

3. 연산자로 인한 문제 해결책
- 연산을 인자로 옮긴다.(연산의 결과값을 이전의 함수가 가지고 있는게 아니라, 연산을 하고 인자로 넘김)
- 콜에서 연산을 실행하고 해제(인자로 넘겼으니까, 기억할 필요 없다), 다음 루틴의 값으로(인자) 전달
- 현재 함수의 메모리는 제거하고 호출하는 함수 메모리(메모리)를 사용한다.

4. Tail Recursion은 결국 반복문이다(TAIL RECURSION TO LOOP)
- 제어문의 스택 클리어 기능을 활용하여 메모리를 제거해주고 다음 연산을 실행하는 것이다.
- 컴퓨터에서 꼬리물기최적화는 루프문으로 바꾸는것이다.(결국 파싱하면????)
- 제어문의 스택 클리어 기능

- 제어문은 연속된 호출에 대해서 제어문을 통해서 스택을 클리어(스펙)
- 제어문에서 while, for 문을 써야지 루프에 대한 스택을 클리어 할 수 잇다.
- 해당 인덱스를 실행하고 메모리에서 해당 스택을 비우고 인덱스만 가지고 다음 스택 생성
### 꼬리물기 최적화 방법

```js
const sum = v => v + (v > 1 ? sum(v - 1) : 0);
sum(3);
// sum 3 return 3 + sum(2)
// sum 2 return 2 + sum(1)
// sum 1 return 1 + 1
```
- 위 코드는 꼬리물기 최적화를 할 수 없음.
- 문제점 : 호출하고 나서 뒷정리 할 게 없어야 함.
- 해결방법 : 인자를 통해 해결함. 다른 함수를 호출하고 다시 돌아와 할 일이 남아있다면, 그 부분을 인자로 바꿔주어야 함.
```js
const sum = (v, prev = 0) => {
	prev += v;
	return (v > 1 ? sum(v - 1, prev) : prev);
};
sum(3);
// sum3 return sum(2, 3);
// sum2 return sum(1, 5);
// sum1 return 6
```
- ES6+에서는 꼬리물기 최적화를 지원해야 한다고 명시하고 있지만, 아직 사파리만 지원됨.
- 위 코드를 for문으로 바꿔보면 아래와 같아짐.
```js
//Tail Recursion To Loop
const sum = v => {
	let prev = 0;
	while(v > 1){
		prev += v;
		v--;
	}
	return prev;
}
```

### 예시 코드 : 피보나치 수열 구하기
```js
function fibonacci(n, prevFibo = 1, prevPrevFibo = 0) {
  if (n < 2) {
    return prevFibo;
  }

  return fibonacci(n - 1, prevFibo + prevPrevFibo, prevFibo);
}

fibonacci(5);
```


## 과제
### 1. 주어진 숫자까지의 모든 숫자 더하기
- 숫자 1 + 2 + ... + n을 계산하는 함수 sumTo (n)을 만들어보세요.
- 더 생각해보기 1: 세 가지 방법 중 어떤 방법이 가장 빠른가요? 어떤 방법이 가장 느린가요? 이유도 함께 제시해주세요.
- 더 생각해보기 2: 재귀를 사용해 sumTo (100000)를 계산할 수 있을까요?

#### 1) for문 사용하기
```js
function sumTo(n) {
  let result = 0;
  for (let i = 1; i <= n; i++){
    result += i;
  }
  return result;
}

console.log( sumTo(100) ); 
```

#### 2) 재귀 사용하기
```js
function sumTo(n) {
  if(n == 1){
    return n;
  } else {
    return n + sumTo(n-1)
  }
}
```

#### 3) 등차수열 공식 이용하기
```js
function sumTo(n) {
  return n * (n+1)/2
}

console.log( sumTo(100) );
```

=> 등차수열의 합공식을 사용하는 방법이 가장 빠름. n에 관계없이 오직 세 개의 연산만 수행하면 되기 때문.
=> 반복문을 사용하는 방법이 그 다음으로 빠름. 재귀를 사용하는 방법은 중첩 호출과 실행 스택 관리를 추가로 필요로 해서 더 많은 자원을 소비하여 속도가 더 느림.
=> 몇몇 자바스크립트 엔진은 'tail call' 최적화를 지원함. 자바스크립트 엔진이 tail call 최적화를 지원하지 않는다면, 엔진에 설정된 스택 사이즈 제한을 넘었기 때문에 최대 스택 사이즈 초과 에러가 발생함.


### 2. 팩토리얼 계산하기
- 팩토리얼(factorial)은 n이 자연수일 때, 1부터 n까지의 모든 자연수의 곱을 의미합니다. n 팩토리얼은 n!으로 표시합니다.
- 재귀를 사용하여 n!을 계산하는 함수, factorial(n)을 만들어보세요.
```js
function factorial(n) {
    return (n != 1) ? n * factorial(n-1) : 1;
}

console.log( factorial(5) );
```

### 3. 피보나치 수 계산하기
- 피보나치 수는 첫째와 둘째 항이 1이며 그 뒤의 모든 항은 바로 앞 두 항의 합인 수열로, Fn = Fn-1 + Fn-2라는 공식으로 표현할 수 있습니다.
- n 번째 피보나치 수를 반환하는 함수 fib(n)을 작성해보세요.
- 주의: fib (77)를 호출했을 때 연산 시간이 1초 이상 되면 안 됩니다.

#### 1) 재귀로 구현하기
```js
function fib(n) {
  if( n == 1 || n == 2) {
    return 1
  } else {
    return fib(n-1)+fib(n-2)
  }
}
```
- 재귀를 사용해 구현하면 n이 커질 경우 속도가 느려짐. fib(77)을 호출하면 CPU 리소스를 다 잡아먹어서 잠시 엔진이 멈출 수도 있음.
- 연산 속도가 느려지는 이유는 함수 호출 도중에 수많은 서브 호출이 일어나기 때문. 같은 값들이 여러 번 평가되면서 이런 일이 발생함.
=> 최적화 방법 : 이미 평가된 값을 어딘가에 저장해놓는 방식. ex) fib(3) 계산이 끝나면 이 결과를 어딘가에 저장해 놓았다가 같은 값이 필요할 때 저장된 값을 불러오는 식

#### 2) 반복문으로 구현하기 ( buttom-up(Tabulation) 다이내믹 프로그래밍(동적계획법))
```js
function fib(n) {
  let a = 1, b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b
}
```
- 이렇게 하면 재귀를 사용하는 방법보다 연산 속도도 빠르고 중복되는 계산도 없다는 장점이 있음.

#### 3) top-down(Memoization) 다이나믹 프로그래밍으로 구현하기
```js
let arr = [];
arr[1] = 1
arr[2] = 1


function fib(n) {
  if(arr[n]){
    return arr[n]
  } else {
    tmp = fib(n - 1) + fib(n - 2)
    arr[n] = tmp
    return tmp
  }
}
```
또는
```js
function fib(n, lookup) {
  if(n <= 2){
    lookup[n] = 1;
  }

  if(!lookup[n]){
    lookup[n] = fib(n-1, lookup) + fib(n-2, lookup)
  }

  return lookup[n]
}

fib(77, [])
```

### 4. 단일 연결 리스트 출력하기
- 리스트 내 항목을 차례대로 하나씩 출력해주는 함수 printList(list)를 만들어보세요.
- 반복문과 재귀를 사용한 답안을 각각 만들어봅시다.
- 그리고 재귀를 사용한 것과 재귀를 사용하지 않은 것 중 어떤 게 더 좋은 코드인지 생각해봅시다.

#### 1) 반복문으로 구현하기
```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  while(list) {
    alert(list.value);
    list = list.next;
  }

}
```
- 매개변수 `list`를 바로 사용하는 건 현명한 선택이 아님.
- 나중에 함수를 확장할 때 `list`를 가지고 뭔가 해야 하는 경우가 생길 수 있음. while문 앞에서 `list`각 변경되면 코드가 다르게 작동함.
- 리스트를 리스트를 순회하기 위한 용도로, 임시변수 `tmp`에 저장하는 것이 좋음.

```js
function printList(list){
  let tmp  = list;
  
  while(tmp) {
    console.log(tmp.value);
    tmp = tmp.next;
  }
  
}

printList(list)
```

#### 2) 재귀로 구현하기
```js
function printList(list){
  console.log(list.value)
  if(list.next){
    printList(list.next)
  }
}

printList(list)
```

#### 두 방법 비교하기
1) 반복문을 사용하면 리소스를 좀 더 효율적으로 사용함.
- 두 방법의 반환 값은 같지만, 반복문을 사용한 방법에선 중첩 함수를 호출하는데 추가적인 리소스를 쓰지 않기 때문.
2) 재귀를 사용한 방법은 코드 길이가 짧고 이해하기 쉽다는 장점이 있음.


### 5. 단일 연결 리스트 역순으로 출력하기

#### 1) 재귀로 구현하기
```js
function printList(list){
  if(list.next){
  printList(list.next)
  }
  console.log(list.value)
}

printList(list)
```

#### 2) 반복문으로 구현하기
- `list`의 마지막 값을 바로 구할 수 있는 방법이 없음. 마지막 값을 시작으로 '역행'할 수 없음.
- 원래 순서대로 요소들을 하나씩 거슬러 올라가면서 각 요소를 배열에 저장해놓고, 마지막 요소에 도달했을 때, 배열에 저장된 요소들을 거꾸로 출력하는 방법을 사용할 수 있음.

```js
function printList(list){
  let tmp  = list;
  let result = [];
  
  while(tmp) {
    result.push(tmp.value);
    tmp = tmp.next;
  }
  
  for (let i = result.length-1; i>=0; i--) {
    console.log(result[i]);
  }
  
}

printList(list)
```

#### 두 방법 비교
- 재귀를 사용한 방법과 반복문을 사용한 방법이 완전히 동일한 접근 방식을 취했음.
- 재귀를 사용한 방법에서도 리스트를 앞에서부터 따라가면서 각 요소를 실행 컨텍스트 스택에 저장해 놓았다가 스택 맨 위에서부터 요소를 차례대로 출력하였음.