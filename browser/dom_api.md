# DOM 조작 관련 API(innerHTML vs element)

## Node.textContent →layout 발생X
- 노드에서 값을 읽어 올때 텍스트의 내용만, 문자열의 데이터만 읽어옮.
=> 단순히 문자열을 설정하고 읽어 올때는 textContent를 쓰는 게 좋음. 단순한 동작이기 때문에 성능이 가장 좋음.
- 만약 최상위의 부모 컨테이너에서 textContent를 설정하는 순간, 그 안에 들어 있는 모든 자식 요소들의 노드들이 삭제 되기 때문에, 제일 말단의 텍스트나 인풋과 같은 요소들에서 쓰는 게 좋음.

- 출력시: HTML 구문분석O(HTML태그를 제외하고 그 안의 content만 표시), 스타일링 적용 X
- 삽입시: 요소안에 단순 텍스트를 넣고 싶을때 사용
줄바꿈 적용X → CSS 스타일링에 white-space: pre-line; 을 추가


## Node.innerHTML
- `textContent`와 달리 요소 안에 있는 모든 태그들 요소들을 문자열 형태로 읽어 오고 저장할 수 있음
출력시: HTML태그를 포함한 모든 내용을 반환, 스타일링 적용X
삽입시: HTML 구문분석O(HTML태그 제외하고 그 안의 content만 표시 ), 요소의 내용 대체(이전에 들어있던 내용 삭제)
일일이 createElement를 이용해 setAttribute를 하지 않고 간편하게 작성할 수 있지만 계속 변경되어야 할 때는 다시 DOM Tree와 Render Tree를 만들어야해서 안좋음
이럴땐 textContent로 업데이트 하는 것이 효율적
- 주의 : 동적으로 프로그래밍으로 여러 요소들을 제어 해야 할때 유용하게 쓸 수 있지만, 보안 문제가 있기 때문에 절대 사용자에게서 텍스트 인풋을 받아와서 설정하는 경우에는 (가령 사용자가 타이핑한 텍스트를 어떤 버튼에 표기 한다던지 할때) 절대! innerHTML을 쓰면 안됨. (사용자가 또는 해커가 무서운 자바스크립트 코드가 포함된 HTML 태그들을 넣을 수 있기 때문) 단순히 텍스트 인풋을 받아오는 곳에서는 `textContent`를 써야 함.


## Node.innerText →layout 발생O
- innerText는 IE 8 버전 이하를 지원하기 위해서 IE에 특화되어 개발된 API로 되도록 사용하지 않는 것이 좋음
- 출력시: HTML 구문분석O(HTML태그 제외하고 그 안의 content만 표시), 스타일링 적용O
- 삽입시: HTML적용 X 태그 그대로 들어감, 줄바꿈 적용O
(HTML 구문분석하기 때문에 단순히 텍스트를 요소안에 넣고 싶을때 쓰면 textContent 보다 성능이 떨어짐)

## Node.insertBefore(insertedNode, referenceNode)
- 참조된 노드 앞에 특정 부모 노드의 자식 노드를 삽입함
- 만약 참조 노드가 null 이라면, 노드는 부모 노드의 자식 노드 리스트 맨 끝에 추가됨

## 참고자료
- https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore