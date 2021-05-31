
- 용량이라는 변수가 이미지 파일타입을 정할 때 중요한 변수임
- 웹 어플리케이션 용량의 약 65%를 차지하는 게 이미지 파일임. 코드는 많아야 35%정도.
- 웹사이트를 로드하는 데 시간이 오래걸린다는 것은 사용성이 좋지 않다는 것.
- 이미지타입을 잘 사용해야 전체적인 사용자 경험이 올라감.

## Raster Images vs Vector Images
### Raster Images : JPG, JPEG, PNG

- JPG는 투명 백그라운드를 지원하지 않음
- JPG와 PNG는 정반대의 이미지 압축 방식을 사용함
- JPG는 용량의 장점이 있지만 이미지의 픽셀표현이 상대적으로 약함
- PNG는 이미지 압축을 하더라도 이미지 손실, 퀄리티로스가 거의 없음. 용량이 큼
- 어떤 서비스를 만들고 타겟이 누구냐에 따라 선택
- 퍼포먼스 우선 vs 퀄리티 우선
- ex. 애플의 경우, 배경 색까지 이미지에 넣어서 jpg 처리를 하고 있음.
- [WebP](https://developers.google.com/speed/webp) : 구글이 만든 새로운 이미지 포맷(PNG보다 26%정도 용량이 적은 편. JPG보다 25%정도 이미지가 덜 손상된다고 함. 구형 브라우저는 지원하지 않음.)

### Vector Images : SVG(Scalable Vector Graphics)
- 컴퓨터가 그래픽을 연산해서 그려내는 그래픽
- 사이즈를 어떤 크기로 바꿔도 왜곡이 생기지 않음
- 사이즈와 관계 없이 깨끗한 선을 원한다면 vector를 써야함
- font도 일종의 vector 그래픽임
- 용량이 다른 이미지파일에 비해 상대적으로 가벼움
- 픽셀사이즈에 구애받지 않고 파일 사이즈가 동일함 (비트맵은 픽셀 사이즈에 비례함. 굉장히 작은 이미지일 경우엔 비트맵이 더 유리함.)
- IE 6,7,8을 대응해야 한다면 SVG 사용불가. 무조건 PNG
- 로고처럼 중요한 이미지는 웬만하면 Vector 이미지로 함
- 아이콘, 로고는 SVG로 뽑는 걸 권장

## Figma
- 보통 이미지 이름이 동일하거나 시맨틱하게 저장되어있지 않음
- `Ctrl+R` 해서 이미지 이름을 일괄 변경해줄 수 있음 