export const a = 1;


const { call } = new class {
  count = 0;

  call = () => {
    this.count++;
    console.log(this.count);
  }
}();

call();
call();