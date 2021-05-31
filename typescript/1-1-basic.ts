{
  // JavaScript
  // old: var 💣
  var numb = 5;
  numb = 1;
  // let (es6)
  let say = 'hello';
  say = 'hi';

  // const
  const myage = 5;
  // error : age = 5;
  
  /**
   * JavaScipt
   * Primitive: number, string, boolean, bigint, symbol, null, undefined
   * Object: function, array ......
  */

  // number
  const num: number = -6;

  // string
  const str: string = 'hello';

  // boolean
  const boal: boolean = false;

  // undefined
  let name: undefined; // 💣
  let age: number | undefined
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  // null
  let person: null; // 💣
  let person2: string | null

  // unknown 💣
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  // any 💣
  let anything: any = 0;
  anything = 'hello';

  // void (컨벤션 따라 생략 가능)
  function print(): void {
    console.log('hello');
    return;
  }
  let unusable: void = undefined; // 💣

  // never
  function throwError(message: string): never {
    // message => server (log)
    throw new Error(message);
    // while(true) { } // (끝나지 않고 계속 돔)
    // return; // (아무것도 리턴하지 않음)
  }

  // object
  let obj: object; // 💣 원시타입 아니면 다 담을 수 있음. 구체적으로 명시해서 담는 게 좋음.
  function acceptSomeObject(obj: object) {

  }
  acceptSomeObject({ name: 'suna' });
  acceptSomeObject({ animal: 'cat' })
}