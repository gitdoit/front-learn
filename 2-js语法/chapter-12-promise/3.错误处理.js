new Promise((res,rej) => {
  // make error
  throw new Error('emit an error by throw');
  res(1);
}).then(value => {
  console.log('never run');
  return value;
}).catch((err) => {
  // catch error here ,and return a value
  console.log('run: catch error ->',err.message);
  // 我们可以选择处理这个异常
  if(err.message.startsWith('emit')) {
    return 3;
  }
  // 或者将异常抛出
  throw err;
}).then((value) => {

  console.log('run: after catch error',value);
})

