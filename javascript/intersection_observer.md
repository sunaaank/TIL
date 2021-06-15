# Intersection Observer
- (내가 지정한) 타겟 엘리먼트와, 타겟 엘리먼트의 부모나 뷰포트가 교차하는 부분의 변화를 비동기적으로 관찰하는 API

> Intersection Observer
[MDN] The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
=> IntersectionObserver(교차 관찰자 API)는 타겟 엘레멘트와 타겟의 부모 혹은 상위 엘레멘트의 뷰포트가 교차되는 부분을 비동기적으로 관찰하는 API

> 뷰포트
[MDN] 뷰포트(viewport)는 현재 화면에 보여지고 있는 다각형(보통 직사각형)의 영역입니다. 웹 브라우저에서는 현재 창에서 문서를 볼 수 있는 부분(전체화면이라면 화면 전체)을 말합니다. 뷰포트 바깥의 콘텐츠는 스크롤 하기 전엔 보이지 않습니다.

## 사용처
1) Lazy-loading of images or other content as a page is scrolled.
페이지 스크롤 시 이미지를 Lazy loading할 때

2) Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
Infinite scrolling을 통해 스크롤을 하며 새로운 콘텐츠를 불러올 때

3) Reporting of visibility of advertisements in order to calculate ad revenues.
광고의 수익을 계산하기 위해 광고의 가시성을 참고할 때

4) Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.
사용자가 결과를 볼 것인지에 따라 애니메이션 동작 여부를 결정할 때

## 사용이유
### 무한스크롤
- 연속으로 발생하는 스크롤 이벤트로 인해 불필요한 함수 호출이 반복되면 브라우저 성능을 저하시킨다
- 스크롤 이벤트에서는 현재의 높이값을 알기 위해 정확한 값을 가져오기 위해 매번 랜더트리를 재생성해 layout을 새롭게 그리게 된다. 이런 reflow라고 불리는 과정이 반복되게 되면 브라우저의 성능이 저하되고 화면에 버벅거림이 생길 수 있다.
```js
  const onScroll = e => {
    const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
    if (scrollTop + clientHeight === scrollHeight) {
      fetchMore();
    }
  };
```
#### 연속으로 발생하는 이벤트 컨트롤하는 방법
- 연속으로 발생하는 함수의 발생빈도를 컨트롤하는 방법에는 `throttle`과 `debounce`가 있다.
- 특히 스크롤이벤트와 같은 DOM 이벤트 핸들러에 유용하게 사용할 수 있다.
- 이벤트 자체의 발생 빈도를 제어할 수는 없지만 그 이벤트의 발생에 따라 동작해야 하는 함수의 발생 빈도를 제어해 성능상의 이점을 가져올 수 있다.
- throttle:  일정시간 간격으로 함수 호출을 한번씩만 실행(ex. 무한스크롤)
- debounce: 연속적인 호출을 하나의 호출로 그룹화해, 마지막/처음 함수만 호출하는 방법으로, 마지막/처음 한 번만 실행 (ex. 검색 자동완성 기능, 무한스크롤 구현시 사용하면 스크롤을 멈췄을 때만 데이터가 불러와짐)

- 문제점 : 들어오는 엘리먼트마다 체크해주는 작업을 해야하는데 이를 전부 메인스레드에서 진행한다. Intersection Observer는 이러한 문제를 비동기로 해결해준다. 메인스레드에서 계속 인터섹션을 확인하는 대신 인터섹션이 일어날 때 인자로 넘겨준 callback을 실행시켜준다.

#### Intersectoin Observer로 컨트롤 하는 방법

1. parameters
```js
new IntersectionObserver (callback, options);
```

1) callback: 관찰이 시작되는 시점에 실행되는 함수. 2개의 parameters를 가진다
> - `entries`: IntersectionObserverEntry 객체들을 배열로 반환
- `observe`r: IntersectionObserver instance 

2) obtions : 관찰이 시작되는 상황에 대해 옵션을 설정할 수 있다. 기본값이 설정되어 있어 선택작성하면 된다.
> - `root`: 교차 기준이 되는 엘리먼트. observer의 상위 엘리먼트여야 한다(default: null)
- `rootMargin`: root로 지정된 엘리먼트의 margin 값 설정(default: 상하좌우 모두 0px)
- `thredhold`: root 엘리먼트와 observer 엘리먼트가 얼만큼 교차되었는지. 0은 전혀 교차되지 않음, 1은 전체가 교차됨을 의미한다(default: 0)

2. methods
1) `IntersectionObserver.observe(target)`: 관찰 시작
2) `IntersectionObserver.unobserve(target)`: 관찰 종료
3) `IntersectionObserver.disconnect(target)`: 관찰 멈추기

3. IntersectionObserverEntry properties
IntersectionObserver의 callback 함수의 파라미터에 배열로 들어가는 entries들이 사용할 수 있는 프로퍼티
1) `boundingClientRect`: reflow현상 없이 Element.getBoundingClientRect()와 동일한 정보를 반환
2) `isIntersecting`: target이 root 영역에 교차되고 있는지의 정보를 boolean으로 반환
3) ETC...