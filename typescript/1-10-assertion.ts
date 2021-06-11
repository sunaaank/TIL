{
  /**
   * Type Assertions 💣
   */

  // js랑 연동되는 경우, 불가피하게 써야 하는 경우 있음
  function jsStrFunc(): any {
    return 'hello';
  }
  const result = jsStrFunc();
  console.log((result as string).length); // string이 아니라면 결과값이 undefined라고 뜸. 정말 100% 장담할 때만 써야함.
  console.log((<string>result).length);
  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 🤮 typeerror로 서버가 꺼질 수 있음

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  numbers!.push(2); // 🤮

  const button = document.querySelector('class')!; // 100%일 때 씀...
}