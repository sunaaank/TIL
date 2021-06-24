# DOM
- Document Object Model
- HTML tag -> JavaScript Node
- Document/Element/Text/etc... -> Node -> EventTarget

## Event Target : 모든 노드는 이벤트타겟을 상속한다
- EventTarget.addEventListener()
- EventTarget.removeEventListener()
- EventTarget.dispatchEvent()

## Node
- Node.nodeType => Element / Attribute / Text / etc... 
- Node.parentNode() : 부모요소 확인
- Node.appendChild(childNode) : 자식 요소 추가
- Node.cloneNode() : node 복사
- Node.compareDocumentPosition() : 현재 노드와 다른 노드 비교
- Node.contains() : 노드 안에 어떤 특정한 요소가 들어 있는지 확인

- Node.childNodes() : 모든 자식 노드 받아오기
- Node.firstChild() : 첫번째 자식요소 확인
- Node.lastChild() : 마지막 자식요소 확인
- Node.isConnected() : 노드가 연결되어 있는지 확인
- Node.nextSibiling() : 노드 옆 자식


## 참고자료
DOM
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

DOM API
- https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API

Node
- https://developer.mozilla.org/en-US/docs/Web/API/Node

Event Target
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

