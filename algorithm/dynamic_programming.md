# 다이나믹 프로그래밍(Dynamic Programming)
최적의 부분으로 나눌 수 있고 중복되는 부분이 있다면 한번 계산한 결과를 버리지 않고 다시 활용하는 것
- 하나의 문제는 단 한번만 풀도록 하는 알고리즘
- 문제에서 규칙성을 찾아 점화식을 세우는 것이 중요

## 가정
### 1. 최적 부분 구조(Optimal Substructure)가 있어야 한다
1) 부분 문제들의 `최적의 답`을 이용해서 기존 문제들의 `최적의 답`을 구할 수 있다
2) 즉, 기존 문제를 부분 문제로 나눠서 풀 수 있다

### 2. 중복되는 부분 문제(Overlapping Subproblems)가 있어야 한다.
1) 구해야 할 답들이 중복으로 나올 수 있다
2) 중복으로 나오는 답은 결과를 미리 배열에 저장해놓고 불러온다

## 종류
- 접근 방식 2종류 : `Memoization`, `Tabulation`
- 공통 목표 : 중복되는 문제의 비효율성 해결

### 1. 상향식 접근(Bottom-up Approach, Tabulation)
- 테이블처럼 정리해가는 방식
- 아래에서 위로 문제를 푸는 방식
- `반복문`을 사용
- 장점 : 재귀 호출을 하지 않아 스택이 계속 쌓이는 오류가 발생하지 않음.(Memoziation의 단점)
- 단점 : 반복문을 이용해 가장 작은 부분부터 모두 계산하기 때문에, 중간에 있는 필요 없는 답까지 계산하게 될 수 있음

### 2. 하향식 접근(Top-down Approach, Memoizaion)
- 여러개의 큰 문제를 작은 문제로 분할한 다음, 각각의 결과를 결합해 큰 문제를 해결하는 것
- 재귀 호출 방식을 사용
- 장점 : 필요한 계산이 무엇인지 요구하기 때문에, 필요없는 답은 계산하지 않음(Tabulation의 단점)
- 단점 : 재귀 호출이 많이 일어나면 스택이 계속 쌓이게 되면서 오류가 발생할 수 있음

## 예시 문제 : 피보나치 수열
ex. 피보나치 수, fib(n) = fib(n -1) + fib(n - 2)
-> fib(n-1)과 fib(n-2)라는 부분문제의 최적을 답을 통해 현재의 값을 구할 수 있음

### 1) 재귀로 풀기
```js
function fib(n) {
  if( n == 1 || n == 2) {
    return 1
  } else {
    return fib(n-1)+fib(n-2)
  }
}
```
- 문제점 : 시간복잡도와 관련해 문제가 생김.(시간복잡도 O(2^n)) 
- 이유 : fib(n-1), fib(n-2)했을 때 값이 저장되지 않으므로 줄기를 뻗어나갈 때마다 계산을 수행하게 됨.
- 해결 방법 : 각 계산된 함수는 배열에 저장하여 기존 계산된 값 호출 시 불러오면 시간복잡도는 O(n)이 됨.

### 2) DP Memoziaion으로 풀기
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