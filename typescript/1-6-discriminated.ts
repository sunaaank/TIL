{
  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  }
  type FailState = {
    result: 'fail';
    reason: string;
  }
  type LoginState = SuccessState | FailState 
  function login(): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!'
      },
    };
  }

  function printLoginStates(state: LoginState) {
    if(state.result === 'success') {
      console.log(`🎉${state.response}`);
    } else {
      console.log(`😢${state.reason}`);
    }
  }


}