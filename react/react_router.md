# Routing
- React: SPA를 만들 수 있는 라이브러리
- SPA(Single Page Application): 하나의 URL로 한 번 페이지가 로딩되고 나면, 그 안에서 사용자가 다른 링크를 클릭했을 때 새로 페이지가 새로고침되는게 아니고 부분적인 내용만 업데이트 되는 것(원하는 내용만 동적으로 받아와서 보여줌)
- SPA의 문제점: 북마크, 앞으로가기, 뒤로가기 안됨
- 이를 보완하기 위해 `react-router`를 사용함

> [React Router](https://reactrouter.com/web/guides/quick-start)
`npm install react-router-dom`


```js
import { BrowserRouter } from 'react-router-dom'
```


- 예전에 사용하던 방식

```js
// App.js
function App() {
  return(
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Switch>
        <Route path={["/", "/home"]} exact component={Home} />
        <Route path="/profile" />
      </Switch>
    </BrowserRouter>
  )
}

// Home.js
const Home = props => (
  <>
    <h1>Home</h1>
    <button onClick={() => {props.history.push("/profile")}}>Go To Profile</button>
  </>
)

```
- 위의 인라인 방식으로 컴포넌트를 전달하면, 매번 랜더될 때마다 새로운 컴포넌트를 만드는 것과 동일함
- 이미 마운트 된 컴포넌트가 언마운팅이 되고 새로운 컴포넌트가 마운팅이 된다면, 성능이 안좋아질 수도 있고 깜빡임이 생길 수도 있음.

## useHistory 사용
- => 자식 컴포넌트로 전달, useHistory hook 사용
- HTML에서 `LINK`를 쓰면 전체 페이지가 다른 HTML로 교체됨.
- BUT 리액트 라우팅을 이용하면, 기존의 페이지는 그대로 유지된 상태에서 SPA가 제공하는 장점을 유지하며 라우팅 할 수 있어 성능에 좋음

```js
// App.js
function App() {
  return(
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Switch>
        <Route path={["/", "/home"]} exact />
          <Home />
        <Route path="/profile" />
      </Switch>
    </BrowserRouter>
  )
}

// Home.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = props => {
  const history = useHistory();
  return(
    <>
      <h1>Home</h1>
      <button onClick={() => {history.push("/profile")}}>Go To Profile</button>
    </>
  )
}
```