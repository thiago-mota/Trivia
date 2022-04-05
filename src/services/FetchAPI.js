// const NUMBER_CODE = 3;

export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  // const { token } = data;
  // console.log('t0ken 2', token);
  return data;
};

export const fetchTrivia = async (token) => {
  // if (data.response_code === NUMBER_CODE) {
  //   const data2 = new Promise(function(data, reject) {
  //   })
  // }
  const newEndpoint = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const dataQuiz = await newEndpoint.json();
  return dataQuiz;
};
