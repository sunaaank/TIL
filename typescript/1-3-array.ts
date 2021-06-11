{
  // Array
  const fruits: string[] = ['🍅', '🍌'];
  const scores: Array<number> = [1, 3, 4]; // 함수에서 쓸 때 readonly로 불변성 보장을 할 수 없음
  function printArray(fruits: readonly string[]) {
  }

  // Tuple _ 서로 다른 데이터타입을 담을 수 있는 배열 _ 사용 권장하지 않음(인덱스로 보는 것 코드 가독성이 떨어짐) => interface, type alias, class로 대체 사용 권장
  // useState Hook이 tuple임
  let student: [string, number];
  student = ['name', 123];
  student[0] // name
  student[1] // 123
  const [name, age] = student;
}