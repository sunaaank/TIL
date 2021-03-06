# 책 <모두의 네트워크> 개념정리
## 7. 응용계층: 애플리케이션에 데이터 전송하기
- 응용 계층의 역할을 이해한다
- 웹 서버의 구조를 이해한다
- DNS의 이름 해석 구조를 이해한다
- 메일의 송수신 구조를 이해한다

### Lesson28
- `클라이언트`: 서비스를 요청하는 측
- `서버`: 서비스를 제공하는 측 ex)웹 서버 프로그램, 메일 서버 프로그램 등
- `응용 계층`: 사용자 측(클라이언트)의 요청을 전달하기 위해 통신 대상(서버 등)이 이해할 수 있는 메세지(데이터)로 변환하고 전송 계층으로 전달하는 역할
- 클라이언트 측 애플리케이션(웹 브라우저, 메일 프로그램 등)이 서버 측 애플리케이션(웹 서버 프로그램, 메일 서버 프로그램 등)과 통신하려면 응용 계층의 프로토콜을 사용해야함

- 대표적인 응용계층의 프로토콜
- `HTTP`: 웹 사이트 접속
- `DNS`: 이름 해석(이름 기반으로 IP주소를 알아내는 것)
- `FTP`: 파일 전송
- `SMTP`: 메일 송신
- `POP3`: 메일 수신

- `이름 해석(name resolution)`: 네트워크에서 컴퓨터나 네트워크 장비에 붙여진 이름을 기반으로 IP주소를 알아내는 것 => `DNS` 사용

### Lesson29
- `WWW`: World Wide Web, = W3 = Web
- `WWW` 사용기술: `HTML`, `URL`, `HTTP`
- `HTML(HyperText Markup Language)`: 웹 페이지에서 문장 구조나 문자를 꾸미는 태그를 사용하여 작성하는 마크업 언어 
- 클라이언트(웹 브라우저)는 웹 사이트를 보기 위해 서버(웹 서버 프로그램)의 `80번 포트`를 사용해 HTTP 통신을 함
- 클라이언트에서 HTTP 요청(request)를 보내고, 서버에서 HTTP 응답(response)을 함
- 요청 시, 클라이언트는 "GET"과 같은 요청 정보, 파일 이름, 버전 등을 서버에 전송함
- 응답 시, 서버는 요청을 정상적으로 처리했다는 "OK" 정보를 반환, 요청 파일을 보내줌
- `HTTP/1.0`: 요청을 보낼 때마다 연결했다 끊는 작업을 반복
- `HTTP/1.1`: `keepalive`라는 기능이 추가됨. 연결을 한 번 수립하면 데이터 교환을 마칠 때까지 유지하고, 데이터 교환을 모두 끝내면 연결을 끝는 구조
- `keepalive`: 요청을 순서대로 처리하는 특징
- `HTTP/2`: 요청을 보낸 순서대로 응답을 반환하지 않아도 됨. 콘텐츠를 빠르게 표시할 수 있음.

### Lesson30
- `DNS`: 이름 해석을 통해 도메인 이름(URL)을 IP주소로 변환하는 역할을 함
- naver.com: 도메인 이름
- www: 호스트 이름(서버 이름)
- 1) 컴퓨터가 DNS서버에 www.naver.com의 IP주소를 알려달라고 요청
- 2) DNS서버는 해당 URL의 IP주소를 알려줌
- 3) 컴퓨터는 해당 IP 주소로 웹 서버에 접속함

- 요청받은 DNS서버가 해당 도메인 이름의 IP 주소를 모르는 경우, 다른 DNS서버에 질의함.
- DNS서버는 전 세계에 흩어져 있으므로 연계하면서 동작함

### Lesson31
- `SMTP(포트번호25)`: 메일을 보내는 데 사용되는 프로토콜, 메일 서버 간의 메일 전송에도 이용됨
- `POP3(포트번호110)`: 메일을 받는 데 사용되는 프로토콜
- `메일 박스`: 메일 서버에 있는 메일을 보관해주는 기능
- 메일을 수신할 때는 사용자 이름, 비밀번호를 이용한 `사용자 인증`이 필요함