- 자료구조는 추상적인 개념을 받아들여 기능과 목적에 따라, 구현하면 된다. 단순히 구현된 코드보다는 개념을 따르는 코드가 보다 명확하게 목적이 파악될 수 있다.
- 자료구조를 사용하는 것에 초점을 맞추기보다는, 그 개념을 이해하여 접목할 수 있는 곳을 판단해 사용하는 것이 효율적이다.

# 스택과 큐 개념 정리 및 실습

- 스택과 큐는 Delete 연산에 의해서 집합에서 삭제되는 원소가 미리 결정되어 있는 동적 집합이다.
- 스택과 큐는 자료구조의 가장 기본적인 개념으로, 이 개념을 포함하는 또 다른 자료구조가 존재한다.
- 그래프의 탐색에 있어 깊이우선탐색(DFS), 넓이우선탐색(BFS)방식이 있다.
- 두 탐색은 모든 정점을 한번만 방문한다는 같은 목표를 가지고 있지만, 그 과정에서 탐색하는 방식에 차이가 있다.
- DFS는 스택을 사용하고, BFS는 큐를 사용한다. 구현에 있어서 인접행렬 또는 인접리스트를 통해서 구현할 수 있다.
- 메모리, 스케쥴링 등 우리가 인지하지 못하는 곳에서 이루어지고 있는 개념이다.

- 스택은 나중에 넣은 데이터가 먼저 나오는 형태(후입선출), 큐는 먼저 넣은 데이터가 먼저 나오는 형태(선입선출)이다.
- 덱(Deque)는 스택과 큐를 합친 형태로, 나중에 넣은 데이터와 먼저 넣은 데이터를 둘 다 꺼낼 수 있는 형태이다.
- 스택,큐,덱은 특정 위치에서만 원소를 넣거나 뺄 수 있는 제한이 걸려있다. 그래서 스택, 큐, 덱을 묶어서 `Restricted Structure`라고 부르기도 한다.

## 스택(Stack)

- 객체들의 집합소로, 데이터를 기록하는 구조이다.
- 접근 방법에 제한이 있다.
- LIFO(Last Input, First Out)또는 FILO(First Input, Last Out) 접근방법을 사용한다. 후입선출, 마지막에 넣은 요소가 먼저 나오는 구조이다.
- 아래가 막히고 위가 뚤린 형태로, 프링글스통이나 접시쌓기를 생각하면 된다.
- 스택에서 삽입은 `push()`, 삭제는 `pop()`으로 쓴다.
- 원소의 추가, 제거, 제일 상단의 원소 확인 모두 O(1)
- 스택의 크기 : 스택에 쌓을 수 있는 데이터의 최대 개수

### 스택의 장단점

- 장점

1. 구조가 단순해서 구현이 쉽다.
2. 데이터 저장/읽기 속도가 빠르다.

- 단점(일반적인 스택 구현 시)

1. 데이터의 최대 갯수를 미리 정해야 한다.(파이썬의 경우, 재귀함수는 1000번까지만 호출이 가능. 자바스크립트의 경우 엔진에 따라 다른데, 크롬브라우저에서 최대 10000번까지 호출이 가능.)
2. 저장공간의 낭비가 발생할 수 있다.(미리 최대 갯수만큼 저장 공간을 확보해야 함)

### 스택 활용 예시

- 웹 브라우저 방문기록 (뒤로 가기) : 가장 나중에 열린 페이지부터 다시 보여준다.
- 역순 문자열 만들기 : 가장 나중에 입력된 문자부터 출력한다.
- 실행 취소 (undo) : 가장 나중에 실행된 것부터 실행을 취소한다.
- 후위 표기법 계산
- 수식의 괄호 검사 (연산자 우선순위 표현을 위한 괄호 검사)

### 관련 용어

#### Call Stack

- 스택은 콜 스택(call stack)이라 하여 컴퓨터 프로그램의 서브루틴에 대한 정보를 저장하는 자료구조에도 널리 활용된다.
- 컴파일러가 출력하는 에러도 스택처럼 맨 마지막 에러가 가장 먼저 출력되는 순서를 보인다.

#### 메모리 영역 스택

- 메모리 영역에서 LIFO(후입선출) 형태로 할당하고 접근하는 구조인 아키텍처 레벨의 하드웨어 스택의 이름

#### ERROR : stack buffer overflow

- 정해진 크기에 무언가를 계속 넣고 있다가, 받아들일 수 있는 크기를 초과해서 흘러넘쳐버린 것
- 주로 재귀함수를 호출할 때 많이 나타남

## 큐(Queue)

- 스택의 반대 개념. 한쪽 끝에서는 삽입 작업이, 다른쪽 끝에서는 삭제 작업이 이루어진다.
- 이때 삭제연산만 수행되는 곳을 프론트(front), 삽입연산만 이루어지는 곳을 리어(rear)로 정하여 각각의 연산작업만 수행된다. 이때, 큐의 리어에서 이루어지는 삽입연산을 인큐(enQueue) 프론트에서 이루어지는 삭제연산을 디큐(dnQueue)라고 부른다.

- 접근 방법은 FIFO(First Input, First Out)을 사용한다. 선입선출, 먼저 넣은 요소가 먼저 나오는 구조이다.
- 순서대로 처리하는 형태로, 공항 입출국 수속이나 줄서기를 생각하면 된다.
- 마지막에 삽입한 요소를 삭제하기 위해서는 앞의 요소들이 전부 삭제되어야 한다.
- 주로 순서를 보장하기 위한 처리가 필요할 때 사용된다.
- 큐에 저장된 요소들은 순서대로 존재하고, 가장 앞에 있을수록 오래 기다리고 있다는 것을 의미한다.
- 주로 멀티태스킹을 위한 프로세스 스케줄링 방식을 구현하기 위해 많이 사용됨.
- ex. CPU는 하나의 태스크가 처리가 완료되어야 다음 태스크를 처리함으로써, 실행 순서대로 처리하게 된다.

- 인큐 시 맨 끝에 넣고, 디큐 시 가장 앞에서 꺼낸 후 모든 원소를 하나씩 앞으로 옮긴다. 넣을 땐 처리 복잡도가 O(1)이지만, 꺼낼 때는 O(n)이다.

### 큐 활용 예시

- 우선순위가 같은 작업 예약 (프린터의 인쇄 대기열)
- 은행 업무
- 콜센터 고객 대기시간
- 프로세스 관리
- 너비 우선 탐색(BFS, Breadth-First Search) 구현
- 캐시(Cache) 구현

### 관련 용어

- 인큐(Enqueue): 큐에 데이터를 넣는 기능
- 디큐(Dequeue): 큐에서 데이터를 꺼내는 기능
- 프런트(Front): 데이터를 꺼내는 쪽
- 리어(Rear): 데이터를 넣는 쪽

### 큐 예제코드

- 5초 이상 네트워크가 끊어졌을 경우, 네트워크가 연결되지 않았다고 판단하기

1. 큐의 길이는 5를 가진다.
2. 큐에 1초마다 네트워크 상태를 삽입한다.
3. 큐가 가득차면 맨 앞에 있는 값을 삭제한 후 새로운 값을 삽입한다.

```js
const interval = setInterval(async () => {
  const result = await checkNetwork();

  queue.push(result);
  if (queue.length > 5) {
    queue.shift();
  }
}, 1000);
```

- 연결이 안정적일 때는 5의 길이를 가진 `queue`의 모든 값(5개)이 `true`일 것이고, 불안정할 때는 `true`,와 `false`가 섞여서 존재할 것이다.
- 큐의 모든 값이 `false`가 되면 네트워크가 끊어졌다고 판단할 수 있다. 이는 5초 동안 연속적으로 네트워크가 끊어졌다는 뜻이다.
- 이 내용을 포함해 위의 코드를 고쳐보면 아래와 같다.

```js
const interval = setInterval(async () => {
  const result = await checkNetwork();

  queue.push(result);
  if (queue.length > 5) {
    if (queue.every((item) => !item)) {
      toast.error("네트워크 연결이 되지 않았습니다.");
    }
  }
}, 1000);
```