# Semantic Tags(Semantic Markup)
- 의미의, 의미가 있는!
- SEO(검색 최적화)에 적절한 시멘틱 태그를 다는 것이 좋음
- Accessibility(웹 접근성): 스크린 리더, 키보드만을 위해 웹사이트 이용
- For us, Maintainability: 개발자가 코드를 봤을 때 한 눈에 알아볼 수 있도록 작성

```html
<span> (bad) 제목 </span>
<h1> (good) 제목 </h1>
```
## Tag
- <header>
- <nav>
- <main>
- main > <aside>
- main > <article>
- main > section
- main > article > section
- <footer>
- etc...

## 헷갈리는 시멘틱 태그 정리
### <article> vs <section>
- article: 독립적으로 고유한 정보를 나타낼 때(ex. 신문 기사 하나, 블로그 포스트 하나)
- section: 연관 있는 내용을 묶어주고 싶을 때

### <i> vs <em>
- i: 시각적으로만 이탤릭체
- em: 강조하고 싶은 내용이 있는 이탤릭체

### <b> vs <strong>
- b: 시각적으로만 볼드체
- strong: 강조하고 싶은 내용이 있는 볼드체

### <ol> vs <ul> vs <dl>
- ol: 순서가 중요한 목록
- ul: 순서가 중요하지 않은 목록
- dl: 정의, 설명 목록

```html
<dl>
  <dt>단어 제목</dt>
  <dd>단어 설명</dd>
</dl>
```

### <img> vs background-image(CSS)
- img: 문서에서 이미지가 중요한 내용일 때
- background-image: 이미지가 문서의 일부분이 아닌 스타일 요소인 경우

### <button> vs <a>
- button: 버튼을 눌렀을 때 특정한 행동이 발생하는 경우 (ex. Login)
- a: 사용자가 클릭했을 때 링크가 걸려져있거나, 이동하는 경우 (ex. Home)

### <table> vs CSS(Flex, Grid)
- 단순히 아이템을 그리드 형식으로 표현하기 위해서는 table 태그 사용 X
- 문서 안에서 (행 + 열) 데이터가 필요한 경우, table 태그 사용

## 참고자료
- [드림코딩 엘리 Youtube: 헷갈리는 시맨틱 태그 정리](https://youtu.be/T7h8O7dpJIg)