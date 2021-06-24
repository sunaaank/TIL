# 렌더링 순서(Critical Rendering Path
)
1. Construction
- HTML requess/response >> loading >> scripting(DOM, CSSOM으로 변환)
2. Operation
- rendering >> layout(정확한 위치를 계산함) >> painting(레이어 별로 페인트를 준비함:성능개선) => composition

## 렌더링 성능 개선
1. Construction
- DOM요소, CSS 규칙이 작을 수록 Tree가 작아서 빠르게 렌더링됨
- 불필요한 태그, div태그 남용, wrapping 클래스나 요소 만드는 것 자제
2. Operation
- 사용자가 클릭하거나 애니메이션을 쓸 때 paint가 자주 일어나지 않도록 만들어야 함
(transition의 경우, paint말고 composition만 하면 됨)
- 최악의 경우는 layout 변경 (특정 박스를 움직여서 다른 박스의 layout이 변경되어야 하는 경우)
- JS로 DOM요소 추가할 경우, composition만 다시 일어나면 best, layout을 다시 일어나게 하면 worst(이 애니메이션이 필수적인가? 다시 생각해볼 것)

### 개선 방법
- 페인트 과정에서, 별도 레이어로 만들면 좋을 경우, css will-change 속성값 부여  ex.`will-change:opacity` (but 너무 많이 남용해서 쓰면 안됨)
- CSS 쓸 때 `CSS Triggers` 사이트 꼭 확인해서 성능 최적화 방법 확인하기(animation, transition 사용 시)
- BEST: 움직일 때는 `translate`쓰는 게 매우 좋음(composite만 발생함)
- BAD: `top`, `left`는 layout, paint, composite 모두 발생함

## 참고자료

- [CSS Triggers](http://csstriggers.com/)
- [Chrome Developer Tool 퍼포먼스 측정](https://developer.chrome.com/docs/devtools/evaluate-performance/)
- [[CSS] Reflow 원인과 마크업 최적화 Tip](https://zinee-world.tistory.com/295)