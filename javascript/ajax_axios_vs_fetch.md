# AJAX ?
- AJAX 란 Asynchronous Javascript And XML 의 약자
- JS 를 이용해서 클라이언트 서버 간 XML 데이터를 비동기적으로 주고 받게 해줌
- XMLHttpRequest 객체를 이용해서 전체 페이지를 reload 하는게 아니라, 필요한 데이터 일부분만 reload 하는 방식

- Axios 와 Fetch 는 AJAX 를 구현한 JS 라이브러리

## Axios vs Fetch
- 서버와 클라이언트간 비동기 통신을 위해서 사용되는 javascript 라이브러리.
### 👍 Axios 
- javascript 라이브러리
- 크로스 브라우징 최적화
- 응답 시간 초과 설정방법 있음
- 에러헨들링
- 요청 중단시킬 수 있음
- JSON 데이터 자동변환 가능
- node.js 에서 사용가능
- return값이 Promise 객체 형태

### 👍 Fetch
- JavScript 내장 라이브러리. install, import없이 사용가능
- 네트워크 에러 발생 시 무한대기(response timeout API X)
- 지원하지 않는 브라우저 있음
- return값이 Promise 객체 형태

### 차이점1: 호환성 이슈
- Axios 의 경우 브라우져가 구버젼이든 신버젼이든 상관없이 지원
- Fetch 의 경우 지원하지 않는 브라우져의 버젼이 있으며, 맞지 않는 버젼과 호환시키려면 polyfill 을 사용해서 호환성을 맞춰야 함
> - [fetch 가 호환 가능한 버젼 종류](https://caniuse.com/#search=Fetch)
- [fetch 로 호환을 맞추는 방법](https://github.com/github/fetch)

### 차이점2: Response Timeout
- Axios 의 경우 Timeout 을 넣어줄 때, Axios 에 옵션값으로 넣어 줄 수가 있다 
- Fetch 의 경우 AbortController 라는 interface 를 활용해서 구현해야 한다
```js
axios({
  method: 'post',
  url: '/login',
  timeout: 4000,    
  data: {
    firstName: 'dy',
    lastName: 's'
  }
})
.then(response => {/* handle the response */})
.catch(error => console.error('timeout exceeded'))
```
```js
const controller = new AbortController();
const options = {
  method: 'POST',
  signal: controller.signal,
  body: JSON.stringify({
    firstName: 'dy',
    lastName: 's'
  })
};  
const promise = fetch('/login', options);
const timeoutId = setTimeout(() => controller.abort(), 4000);
 
promise
  .then(response => {/* handle the response */})
  .catch(error => console.error('timeout exceeded'));
```

### 차이점3: 자동 JSON 형 변환
- Axios 의 경우 별도의 형 변환 없이 JSON 타입의 데이터로 알아서 stringify 해주지만, (Axios 의 경우 자동으로 stringify 되는 부분을 오버라이딩을 사용해서 개발자가 원하는 타입으로 변환이 가능하다)

- fetch 의 경우 직접 JSON 형태로 변환시켜야한다.
```js
// axios
axios.get('https://api.github.com/orgs/axios')
  .then(response => {
    console.log(response.data);
  }, error => {
    console.log(error);
  });
 
// fetch()
fetch('https://api.github.com/orgs/axios')
  .then(response => response.json())    
  .then(data => {
    console.log(data) 
  })
  .catch(error => console.error(error));
```

### 차이점4: HTTP Interceptor

Axios 의 특징 중 하나는 HTTP Request 에 대한 intercept 가 가능하다는 점이다. 이 특징은 클라이언트가 서버로 request 를 보낼때, 보낸 내용이 어떻게 되었는지 확인하기 위한 logging 작업과 authentication(인증) 작업을 거쳤을때, http request 에 변화를 주기 위해서 사용되기도 한다.
```js

axios.interceptors.request.use(config => {
  // log a message before any HTTP request is sent
  console.log('Request was sent');
 
  return config;
});
 
// sent a GET request
axios.get('https://api.github.com/users/sideshowbarker')
  .then(response => {
    console.log(response.data);
  });

```

### 차이점5: Download Progress
리소스를 받아오는 속도는 웹 성능에 있어서 주요한 지표중 하나인데, 

유저마다 인터넷 속도가 다르고, 큰 리소스를 받아오는 경우, 일부 유저들에겐 느린 속도로 리소스를 받기 때문에

성능 하락의 주요 원인이 된다.

그래서 과거에는 XMLHttpRequest.onprogress 를 사용해서 그 점을 보완했다고 한다

 

fetch 의 경우 onprogress handler 를 제공하지 않으며, 대신에 ReadableStream 이란 것을 제공한다.

아래는 ReadableStream 을 이용한 예제 코드이다.

```js
// original code: https://github.com/AnthumChris/fetch-progress-indicators
 
<div id="progress" src="">progress</div>
<img id="img">
 
<script>
 
'use strict'
 
const element = document.getElementById('progress');
 
fetch('https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg')
  .then(response => {
 
    if (!response.ok) {
      throw Error(response.status+' '+response.statusText)
    }
 
    // ensure ReadableStream is supported
    if (!response.body) {
      throw Error('ReadableStream not yet supported in this browser.')
    }
 
    // store the size of the entity-body, in bytes
    const contentLength = response.headers.get('content-length');
 
    // ensure contentLength is available
    if (!contentLength) {
      throw Error('Content-Length response header unavailable');
    }
 
    // parse the integer into a base-10 number
    const total = parseInt(contentLength, 10);
 
    let loaded = 0;
 
    return new Response(
 
      // create and return a readable stream
      new ReadableStream({
        start(controller) {
          const reader = response.body.getReader();
 
          read();
          function read() {
            reader.read().then(({done, value}) => {
              if (done) {
                controller.close();
                return; 
              }
              loaded += value.byteLength;
              progress({loaded, total})
              controller.enqueue(value);
              read();
            }).catch(error => {
              console.error(error);
              controller.error(error)                  
            })
          }
        }
      })
    );
  })
  .then(response => 
    // construct a blob from the data
    response.blob()
  )
  .then(data => {
    // insert the downloaded image into the page
    document.getElementById('img').src = URL.createObjectURL(data);
  })
  .catch(error => {
    console.error(error);
  })
 
function progress({loaded, total}) {
  element.innerHTML = Math.round(loaded/total*100)+'%';
}
 
</script>

```

- Axios 의 경우 이보다 더 간편하며,
Axios Progress Bar 모듈을 사용해 진행 속도도 볼 수 있고 코드를 더 간략화 할 수 있다.

### 차이점6:  Simultaneous Request
동시에 여러 요청 (requests) 를 보내고자 하는 경우,

axios 는 axios.all() 이란 method 를 활용해서 requests 들을 array 형태로 보내며,

axios.spread() method 를 이용해서, 각 요청에 따른 response 를 받아온다.

아래는 관련 코드 예제이다.

```js
axios.all([
  axios.get('https://api.github.com/users/iliakan'), 
  axios.get('https://api.github.com/users/taylorotwell')
])
.then(axios.spread((obj1, obj2) => {
  // Both requests are now complete
  console.log(obj1.data.login + ' has ' + obj1.data.public_repos + ' public repos on GitHub');
  console.log(obj2.data.login + ' has ' + obj2.data.public_repos + ' public repos on GitHub');
}));

```


### 참고 자료
- https://www.dahae.kim/blog/how-to-use-axios/