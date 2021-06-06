# JS 메소드 쓰지 않고 문자열 뒤집기

> 👀 동기가 면접에서 메소드(split, join 등)를 사용하지 않고
 'i am a boy'를 'boy a am i'로 변환하는 알고리즘을 짜보라는 문제를 받았다고 한다.
🧐 어떻게 풀 수 있을까? 직접 작성해보자

## 0. 문제 정의
- 문자열을 뒤집는 함수 만들기
- 기존에는 메소드를 사용해서 어떻게 풀었더라?

## 1. 메소드 사용해서 풀어보기
JS 문자열, 배열 메소드로 구현하면 숏코딩으로는 한 줄로도 구현이 가능하다.
```js
const word = "i got a boy";
word.split(" ").reverse().join(" ")
// result : "boy a got i"
```

## 2. 문제 풀기
이 메소드들을 직접 구현해보기로 했다.

### 초기 코드
#### split(" ") 메소드
- 공백을 기준으로 문자열을 구분해 배열로 반환해주는 `split(" ")`함수를 구현하는 과정에서 변경한 부분이 있다.

- `splitStr` 함수는 다음의 순서대로 구현했다
1) 공백이 아니면 word에 해당 문자열을 추가해라
2) 공백을 만나면 지금까지 word에 추가된 문자열을 array에 삽입해라
3) text의 마지막 문자열이라면 지금까지 word에 추가된 문자열을 array에 삽입해라


```js
function splitStr(text) {
  let array = [];
  let word = "";
  for (let i=0; i<text.length; i++){
    // 공백이 아니면 word에 해당 문자열을 추가해라
    if(text[i] !== " "){
      word += text[i]
    } else {
      // 공백을 만나면 지금까지 word에 추가된 문자열을 array에 삽입해라
      array.push(word)
      word = []
    }
    // text의 마지막 문자열이라면 지금까지 word에 추가된 문자열을 array에 삽입해라
    if(i === text.length-1){
      array.push(word)
    }

  }
  return tempArr;
}
splitStr("i am a boy")
```

리팩토링으로 수정한 코드에서는
if문으로 나누는 대신, 반복문을 나와서 처리해주는 것이 더 효과적이라 아래 코드를 for문 밖으로 내보내 마지막에 `array.push(word)` 처리하도록 하였다.
```js
if(i === text.length-1){
	array.push(word)
}
```
#### reverse() & join(" ") 메소드
- 배열을 뒤집는 `reverse` 메소드와, 요소 사이에 공백을 넣어 배열을 문자열로 합쳐주는 `join` 메소드를 만들어 주자
- 따로 배열을 뒤집은 뒤 문자열로 변경하는 함수를 각각 만들기보다, 배열 속 요소들을 `stack`처럼 뒤에서부터 하나씩 빼서 바로 문자열로 만들어주는 것이 효율적이라 `reverse()`와 `join(" ")`을 한 결과를 한번에 만들어주는 `reversedStr` 함수를 만들었다.

```js
function reversedStr(arr) {
  for (let i=0; i<=length/2+1; i++) {
    let temp = arr[arr.length-1-i];
    arr[arr.length-i-1] = arr[i]
    arr[i] = temp;
  }
  let newStr = "";
  for (let i in arr) {
    // 맨 마지막 요소(단어)라면 공백을 붙이지 않고 문자열에 추가하고, 이외의 요소는 요소(단어)뒤에 공백을 붙여서 문자열에 추가해라
  if(i == arr.length-1){
  newStr += arr[i]
  } else {
    newStr +=arr[i]+" "
  }
}
  return newStr;
}

```

- 리팩토링 부분1 
: 초기 코드에서는 배열의 양쪽 끝값을 교환하는 방식으로 작성했는데, 코드 가독성을 높이기 위해 배열의 마지막부터 반복문을 순회하는 방식으로 변경하였다.
- 리팩토링 부분2
: 초기 코드에서는 문자열에 맨 마지막에 추가하는 단어에만 끝에 공백을 붙이지 않도록 `if-else`문으로 작성했다. 변경한 코드에서는 반복문으로 배열을 거꾸로 돌며 마지막 단어 이전까지는 공백을 붙여 출력하고, `if-else`를 따로 두지 않고, 반복문을 나와서 마지막으로 추가하는 배열의 첫번째 요소를 문자열에 추가하도록 수정했다.

```js
const reversedStr = arr => {
  let newStr = ""
  for (let i=arr.length-1; i>0; i--) {
    newStr += (arr[i] + " ")
  }
  newStr += arr[0]
return newStr
}
```




### 최종 코드
- `함수 선언식`으로 썼던 코드를 함수 전체 호이스팅으로 인한 오류발생을 차단하기 위해 안전한 `화살표함수(익명함수 표현식)`으로 변경해주었다.
```js
// split(" ")메소드 구현
const splitStr = text => {
  let array = [];
  let word = "";
  for (let i=0; i<text.length; i++){
    if(text[i] !== " "){
      // word.push(text[i])
      word += text[i]
    } else {
      array.push(word)
      word = []
    }
  }
  array.push(word)
  return array
}
const splitedStr = splitStr("i got a boy");
// result : [ 'i', 'got', 'a', 'boy' ]

// reverse() 메소드 구현
const reversedStr = arr => {
  let newStr = "";
  for (let i=arr.length-1; i>0; i--) {
    newStr += (arr[i] + " ")
  }
  newStr += arr[0]
return newStr;
}
reversedStr(splitedStr)
// result : 'boy a got i'
```

* `split(" ")`과 `reverse() + join(" ")`을 직접 만들어보기 위해 위와 같은 코드가 된 것이다. 
* `splitStr` 함수의 else문에 `array.push(word)`를 추가한 이후 `array.push(" ")` 공백을 추가해 stack으로 처리해주면 `reversedStr` 함수에서 문자 사이의 공백처리를 따로 해주지 않아도 된다.

결론 : 메소드는 효율성을 높여주는 매우 소중한 친구다✨