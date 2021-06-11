{
  /**
   * Enum
   */
  // JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENT_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({"MONDAY": 0, "TUESDAY": 1, "WEDNESDAY": 2});
  const dayOfToday = DAYS_ENUM.MONDAY;
  
  // TypeScript
  // 관련있는 값을 엮어 쓸 수 있다는 장점이 있지만, 타입스크립트에서는 쓰지 않는 게 좋음
  type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday"; // 대신 union type 사용 가능
  enum Days {
    // 미할당시 0부터 시작, 문자열도 할당 가능하지만 모든 값에 할당해주어야 함
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Tuesday);
  let day: Days = Days.Saturday;
  day = Days.Tuesday;
  day = 10; // 💣 타입이 정확하게 보장되지 않음
  console.log(day)

  let dayOfWeek: DaysOfWeek = "Monday";
}