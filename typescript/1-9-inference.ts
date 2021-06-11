{
  /**
 * Type Inference
 */
// 원시타입처럼 뻔한 경우는 생략 가능하지만, 복잡한 코드가 대부분이기 때문에 정확하게 타입을 명시하는 게 좋음.
// 팀에서 어떤 경우에만 생략 가능한지 정하는 것 권장

let text = 'hello';
function print(message = "hello") {
  console.log(message)
}
print('hello')
print(1)

function add(x: number, y: number):number {
  return x + y;
}
const result = add(1, 2);

}