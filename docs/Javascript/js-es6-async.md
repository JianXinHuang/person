## ES6之async/await

如果要使一个函数变成async/await的形式，必须要做两步:

> 1、直接在普通函数前面加上async，表示这是一个异步函数
> (任何普通函数可以调用async函数, 结果.then)
>
> 2、在函数内部 的异步执行的语句前面加上await
> (后面可以跟promise或者任意类型的值)


##### 1、async的多种声明形式

```js
//函数式声明
async function test() {}
```

```js
//对象式声明
let obj = {
   async test() {}
};
```

```js
//箭头函数声明
let test = async () => { }
```

##### 2、await语句的多种调用形式

```js
//普通语句，首先await a;的表达式的值为a的值，然后再转成一个resolve的promise对象
async function f() {
    await 123;   //值为123
    let a = await "hello";  //a的值为“hello”
    return a;
}
```
```js
//promise语句。(1)如果是resolve的。则直接返回resolve中的数据
getPromise() {
  return new Promise((resolve, reject) => {
    resolve("world");
  });
}
async getName() {
  let p = await this.getPromise();  //p为resolve的promise对象，值为“world”
  return p;
},
```
```js
//promise语句。(2)如果是reject的。则直接返回reject中的数据
getPromise() {
  return new Promise((resolve, reject) => {
    reject(new Error("错误了"));
  });
}
async getName() {
  let p = await this.getPromise();  //p为reject的promise对象，值为“错误了”,后面的语句不会再执行
  //to do 
  return p;
},
此时要么在async部分捕获错误，并进行处理。要么在调用async语句的地方捕获错误并处理
```

##### 3、await语错误处理

```js
//单条语句的处理
async getName() {
  let str = "";
  await this.getPromise().catch(err => {
    str = "world";
  });
  return str;
}
```

```js
//多条语句的处理
async getName() {
  let str = "";
  try {
    await this.getPromise();
    await 123;
  } catch (err) {
    str = "world1";
  }
    return str;
}
```

##### 4、await的并行处理

```js
//因为多个await都是依次往后台发送。如果这几个请求之前没有先后关联顺序，则完全没必要。可以做成并行发送
async getName() {
  let str = "";
  await Promise.all([this.getPromise(),this.getPromise(),this.getPromise()]);
  return str;
},
```





