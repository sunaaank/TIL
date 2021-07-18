## if조건 역으로 바꾸기
### 흔한 요구사항
- A인 경우에만 그리고
- (요구사항 추가됨) B인 경우에는 E를 실행한다
```js
if(A) {
  B조건 구함
  if(B) {
    E 실행
  }
}
```
### if 블록이 길어지면
- 모니터에 한 눈에 안들어옴
- 스크롤 해야 if 끝을 알 수 있음
- 코드 분석할 때 조건을 기억해야 함

### 코드 구조가 이렇다면
- else가 없거나 else가 단순한 경우, if조건을 역으로 바꾸기!

```js
// case1:before
function case1(){
  if(어떤 조건){
    ...
    한참 많은 코드
    ...
  }
}

// case1:after
function case1(){
  if(!어떤 조건) return;
    ...
    한참 많은 코드
    ...
}

// case2:before
function case2(){
  if(어떤 조건){
  ...
  한참 많은 코드
  ...
  } else {
    console.log("msg");
  }
}

// case2:after
function case2(){
  if(!어떤 조건){
    console.log("msg");
    return;
  }
  ...
  한참 많은 코드
  ...
}

// case3:before
function case3(){
  if(A){
    B 조건 구함
  }
  if(B){
      E 실행
  }
}

// case3:after
function case3(){
  if(!A) return;
  
  B 조건 구함
  if(!B) return;
  
  E실행
}
```
- else가 없다는 것을 빨리 알게 됨
- 조건을 기억할 범위가 좁아짐
- 코드 들여쓰기(깊이)가 줄어듦(코드가 덜 복잡해짐)
- 그만큼 코드 분석에 유리
- 참고: 구현패턴(켄트벡 저) - 보호절(guard clause)
