## 공통

- 공식 메뉴얼에서는 `함수형 컴포넌트` **+ Hooks 를 통해 컴포넌트를 작성**하는 것을 권장
(2019년 v16.8 부터 함수형 컴포넌트에 리액트 훅(hook)을 지원한 이후)
- **레거시 코드 유지보수**를 위해 `클래스형 컴포넌트` 알아야 함
- `클래스형 컴포넌트`는 로직과 상태를 컴포넌트 내에서 구현하기 때문에 상대적으로 복잡한 UI 로직을 갖고 있는 반면,
- `함수형 컴포넌트`는 state를 사용하지 않고 단순하게 데이터를 받아서(props) UI에 뿌려준다. Hook들을 필요한 곳에 사용하며 Logic의 재사용이 가능하다는 장점이 있어 `함수형 컴포넌트`+Hook을 주로 사용한다고 함.

### 컴포넌트란? 앱의 기능을 단위별로 캡슐화하는 React의 기본 단위

- `컴포넌트`는 한마디로 소프트웨어 시스템에서 독립적인 업무, 독립적인 기능을 수행하는 '모듈' 로서 이후 시스템을 유지보수 하는데 있어 교체 가능한 부품
- `컴포넌트`는 단순한 템플릿 이상의 기능을 수행. 데이터가 주어졌을 때, 이에 맞춰 UI를 정리해주는 것은 물론, 라이프사이클 API를 통해 컴포넌트가 화면에 나타날 때, 사라질 때, 변할때 작업들을 수행할 수 있음.

### [차이1] 선언 방식

#### 클래스형

- `class` 키워드, `Component`로 상속 받기, `render()` 필수

```jsx
import React, {Component} from 'react';

class App extends Component { // class 키워드 필요, Component로 상속을 받아야함
  render() { // render() 메소드가 반드시 있어야 함
    const name = 'react';
    return <div className="react">{name}</div>
  }
}

export default App;
```

- state와 라이프사이클 API를 사용할 수 있다.
- React.Component를 상속받기 때문에 리액트에서 제공하는 기능들을 모두 내것처럼 사용할 수 있다.
- 함수가 아닌 클래스이기 때문에 return문을 사용하지 않는다.
- 대신 React.Component에서 제공하는 render() 함수를 사용해서 JSX를 반환한다.
- render() 함수는 직접 정의하지 않았지만 리액트 컴포넌트를 상속 받았기 때문에 사용 가능하다.
- 임의 메서드 정의 가능

#### 함수형

```jsx
// 방법1: 함수 선언식
import React from 'react';
import './App.css';

function App() {
  const name = 'react';
  return <div className = "react">{name}</div>
}

export default App;
```

```jsx
// 방법2: 함수 표현식
import React from 'react';
import './App.css';

const App () => {
  const name = 'react';
  return <div className = "react">{name}</div>
}

export default App;
```

- state, 라이프사이클 API를 사용할 수 없다 -> React Hooks을 통해 해결 할 수 있음
- JSX를 return문을 사용해서 반환한다.
- 동적인 데이터를 다루는 state를 사용할 수 없다.

### [차이2] state : 컴포넌트 내부에서 바뀔 수 있는 값

#### 클래스형

- 클래스형 컴포넌트의 `state`는 객체 형식
- `this.setState` 함수로 state의 값을 변경할 수 있음
- `constructor` 안에서 `this.state` 초기 값 설정 가능
- `constructor` 없이도 바로 state 초기값을 설정 가능

```jsx
this.state = { name: "", password: "",};
this.setState({name: name+"입니다"});
```

#### 함수형

- `useState`함수로 state를 사용

```jsx
const [name, setName] = useState("");
```

### [차이3] props : 컴포넌트의 속성을 설정 할 때 사용하는 요소(read-only)

- 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야한다.


#### 클래스형

- this.props를 통해 값을 불러올 수 있다.

```jsx
render() {
  const {name} = this.props;
  return (
    <div>안녕하세요 제 이름은 {name}입니다
    </div>
  );
}
```

#### 함수형

- props를 불러올 필요 없이 바로 호출 할 수 있음

```jsx
const Footer = ({name}) => {
  return (
    <div>안녕하세요 제 이름은 {name}입니다
    </div>
  );
}
```

### [차이4] 이벤트 핸들링

#### 클래스형

- 함수 선언시 화살표 함수로 바로 선언 가능하다.
- 요소에 적용할때 this.를 붙여줘야한다.

#### 함수형

- const + 함수 형태로 선언해야 한다.
- 요소에 적용할때 this가 필요없다.

### [차이5] 라이프사이클 : 컴포넌트 생명주기

#### 클래스형

- 라이프사이클 API 사용 가능
- 라이프사이클 메서드 설명

  - 🚩 **마운트**
      - 정의
          - 페이지에 컴포넌트가 나타남
          - DOM 생성되고, 웹 브라우저상에 나타나는 것
      - 종류
          - `constructor( )`
              - 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
          - `getDerivedStateFromProps( )`
              - props에 있는 값을 state에 넣을 떄 사용하는 메서드
          - `render( )`
              - 준비한 UI를 렌더링하는 메서드
          - `componentDidMount( )`
              - 컴포넌트가 웹 브라우저 상에 나타난 후, 호출하는 메서드
  - 🎉 **업데이트**
      - 정의
          - 컴포넌트 정보를 업데이트
      - 업데이트 시기✨
          - props, state가 변경될 때
          - 부모 컴포넌트가 리렌더링 될 때
          - this.forceUpdate로 강제로 렌더링을 트리거할 때
      - 종류
          - `getDerivedStateFromProps( )`
              - 마운트 과정 or 업데이트 시작 전에 호출
              - props변화에 따라 state 값에도 변화를 주고 싶을 때 사용
          - `shouldComponentUpdate( )`
              - 컴포넌트의 리렌더링 여부 결정하는 메소드
                  - true or false 반환
                      - true 반환 => 다음 라이프사이클 메서드 계속 실행
                      - false 반환 => 작업 중지 (컴포넌트 리렌더링 X)
          - `render( )`
              - 컴포넌트를 리렌더링
              - 컴포넌트 모양새를 정의
                  - 라이프사이클 메서드 중 유일하게

                      필수 메소드

          - `getSnapshotBeforeUpdate( )`
              - 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메소드
          - `componentDidUpdate( )`
              - 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메소드
  - 💥 **언마운트**
      - 정의
          - 페이지에서 컴포넌트가 사라짐
          - 컴포넌트를 DOM에서 제거
      - 종류
          - `componentWillUnmount( )`
              - 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출하는 메소드


- 라이프 사이클 과정 설명
  - 컴포넌트가 생성이 되면
   `getDefaultProps()`, `getInitialState()` 라는 메소드를 호출
  - 이후 `componentWillMount()` 메소드를 호출 (컴포넌트가 mount 되기 전에 처리해야 하는 내용을 실행, render 호출 전)
  - `render()` 메소드를 호출
  - 컴포넌트가 mount 되면
   `componentDidMount()` 를 호출 (컴포넌트가 생성된 이후 처리해야 하는 내용을 실행)
  - 컴포넌트가 한번 만들어진 이후 컴포넌트에 변화가 생길 때 사용하는 메소드가 있음
  - 컴포넌트의 `state` 나 `props` 가 변경될 경우 …
  - `render` 메소드를 호출할 것이냐 말 것이냐 여부를 결정하는
   `shouldComponentUpdate` 메소드
  - 컴포넌트가 업데이트 되기 전에 실행 되는 `componentWillUpdate` 메소드
  - 컴포넌트가 업데이트 된 후 실행 되는 `componentDidUpdate` 메소드


![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6afec81c-2938-42ca-8876-e0200eb51d22/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6afec81c-2938-42ca-8876-e0200eb51d22/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3fa8ecc4-9217-41ca-a279-4ed312c33b91/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3fa8ecc4-9217-41ca-a279-4ed312c33b91/Untitled.png)

#### 함수형

- `useState` 훅을 통해 상태변수(state) 선언
- `useEffect` 훅을 통해 라이프사이클의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 관리

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1337eef6-da5b-4e38-bd56-0029f53f8351/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1337eef6-da5b-4e38-bd56-0029f53f8351/Untitled.png)