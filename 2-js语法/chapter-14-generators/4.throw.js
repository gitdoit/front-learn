function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    console.log("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    console.log(e); // 显示这个 error-----------↓
  }                 //                         ↓ 
}                   //                         ↓  
                    //                         ↓
let generator = gen();//                       ↓
                      //                       ↓
let question = generator.next().value;//       ↓
generator.throw(new Error("The answer is not found in my database")); // (2)