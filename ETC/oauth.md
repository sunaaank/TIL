# OAuth2.0

- 탄생이유 : 인증과정에 참여하고 있는 3자(클라이언트, 리소스오너, 리소스 서버)가 한 자리에 모일 수 없는 상황에서, 어떻게 하면 서로를 신뢰할 수 있을까하는 고민에서 출발한 기술
- 목적 : access token을 발급하는 것
- 궁극의 목적 : API를 제어하는 것

## 역할

1. Client(me)
2. Resource Owner(유저)
3. Resource Server(네이버,구글,페이스북 등)/Authorization Server(인증관련 처리를 전담하는 서버)

## 등록

0. 서버가 사전에 리소스 서버에서 리소스를 받아놔야함

- 공통적으로 `Client ID(어플리케이션 식별자)`, `Client Secret(비밀번호-노출되면 안됨)`, `Authorized redirect URIs(Authorized Code를 이 주소로 전달해주세요)`를 받음

1. 클라이언트는 유저에게 로그인 링크 버튼을 띄움(귀하가 캘린더등록/페이스북 업로드 등 하기 위해서는 로그인이 필요합니다.)
2. client id, 리다이렉트 URL값 확인함.
3. 같다면 scope에 해당되는 권한을 클라이언트에게 부여할 것인지를 확인하는 메세지를 전송하게 됨.
4. 유저가 허용한다는 버튼을 누르면 리소스서버로 정보를 전송하게 됨.
5. 유저1가 scope b,c에 해당되는 정보를 동의했다는 것을 저장함.

## Resource Server의 승인

1. Resource Server는 Resource Owner(유저)에게 (바로 access token을 주는 것이 아닌) 리다이렉트URI과 함께 header에 authorization code(임시비밀번호)를 전송함.
2. 사용자는 리다이렉트URI로 이동하게 됨.
3. 클라이언트는 header에 담긴 authorization code를 알게 됨.
4. 클라이언트는 Resource Owner를 통하지 않고 Resource Server에 직접 접속함.

- authorization_code, redirect_uri, client_id, client_secret를 담아 전송함.

5. 서버는 클라이언트가 전송한 authorization_code와 client_id, client_secret가 완전히 일치하는 지를 확인함. 이 정보들이 모두 일치하면 access token을 발급해 클라이언트에게 응답해줌.
6. 클라이언트는 access token을 내부 저장소에 저장함.
7. Resource Server는 해당 user_id를 가진 사용자의 유효한 기능 b,c에 대해 열려있는 access key니까 해당 access token을 가진 사람에 한에서만 허용하도록 동작함.

## API 호출

- 리소스 서버 핸들링
- 리소스 서버가 클라이언트들에게 이렇게 써야 우리를 사용할 수 있습니다 방식을 알려줌 : API(Application Programming Interface)

- 2가지 방법(후자가 더 선호됨)

1. access token을 query parameter로 보내는 방법
2. Authorization: Bearer(oauth를 위해 고안된 인증방법)로 HTTP header에 담아 보내는 방법

## Refresh Token

- Access Token과 함께 Refresh Token을 발급하는 경우가 많음
- 계속 Access Token을 쓰다가, "Invalid Token Error"가 뜨면 access token의 수명이 다한 것임. Refresh Token을 Authorization Server에 보내서 갱신된 Access Token을 발급받음.

## 더 찾아보면 좋을 키워드

- 클라이언트 입장에서 제 3자인 리소스 서버(구글이나 페이스북 등 신뢰할 수 있는 서버)를 통해서 리소스오너의 신원을 인증할 수 있다는 점.
- 이를 통해 리소스 오너의 고유한 식별자를 얻을 수 있음.(일반적으로 id, pw가 하는 역할)
- `federated identity` : 다른 서비스와의 연합을 통해서 사용자를 식별하는 인증체계
- 대부분의 API는 RESTful 하게 설계 되어 있음. JSON이나 XML 데이터포맷을 이용하고 있음.

## 자료출처

- 생활코딩 WEB2 - OAuth 2.0 강의를 보고 정리한 내용입니다.
