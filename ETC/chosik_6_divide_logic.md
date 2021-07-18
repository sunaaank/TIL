## 사소한 개선 - 섞여 있는 계산 로직 분리
### 샘플 코드 구조
- 다양한 조건으로 뭔가를 계산하고 그 결과를 반영
- => 각 분기마다 계산과 결과 반영 (즉 계산과 반영 코드가 섞여 있음)
- 단점 : 계산 로직을 이해하는데 결과 반영 코드가 방해가 됨, 로직만 테스트하기 어려움

```js
if(조건){
  if(조건){
    계산
    결과 반영
  } else {
    계산
    결과 반영
  } else if (조건) {
    계산
    결과 반영
  } else {
    if(조건) {
      계산
      결과 반영
    } else {
      계산 결과 반영
    }
  }
}
```

### 코드 바꾸기
- 계산 코드와 계산 결과를 사용하는 코드 분리
이를 위해 다음 항목 확인
- 계산하는데 필요한 값 => 즉 입력 값
- 계산 결과로 생성되는 값 => 즉 출력 값

### 계산 로직 분리 모양
```js

// case1
// 모든 필요한 값을 메소드 파라미터로 전달하는 방식
const period1 = calculatePeriod(order.getGubun(), order.getPayType(), ..., loginDate)

// case2
// 메소드를 만들고 order라는 객체를 통으로 주는 방식
const period2 = calculatePeriod(order, loginDate)

// case3
// 같은 클래스의 메소드로 하지 않고 별도의 객체로 분리해서 객체를 통해 계산하는 방법
// Choice! 계산 로직만 따로 분리해서 테스트하는게 수월해짐
const period3 = new ServicePeriodCalculator(order.loginDate).calculate();

// ServicePeriod
const startDate = period.getStartDate();
const endDate = period.getEndDate();
```


### 분리 결과
- 계산 로직만 테스트 가능
- 계산 로직 리팩토링 수월해짐