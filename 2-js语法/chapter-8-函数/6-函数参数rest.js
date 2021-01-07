/**
 * rest参数和java里面的 public static void ok(String ... args)一样
 */
function sum (...item) {
  let total = 0;
  for (const i of item) {
    total += i;
  }
  console.log(item instanceof Array); // true
  return total;
}
console.log(sum(1, 2, 3, 4)); // 10

// 和java一样，rest参数只能放在最后
// error
function demo1 (a, ...b, c) {

}
