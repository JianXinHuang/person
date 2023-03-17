sass让人们受益的一个重要特性就是它为css引入了变量。你可以把反复使用的css属性值 定义成变量，然后通过变量名来引用它们，而无需重复书写这一属性值。

##### 1、变量声明;【使用$符号】
当变量定义在css规则块内，那么该变量只能在此规则块内使用。如果它们出现在任何形式的{...}块中（如@media或者@font-face块）中时，只能在块内生效。

```
$highlight-color: #F90;  //变量名使用中划线和下划线都行

.login-wrap {
  text-align: center;
  font-size: 30px;
  color:$highlight-color;
  border:1px solid $highlight-color
}
```

```
$highlight-color: #F90;    //可以在login-wrap外的块中使用

.login-wrap {
  $width: 30px;
  text-align: center;
  font-size: $width;    //只能在login-wrap块中使用
  color:$highlight-color;
}
```

变量对象

```
$theme-map:(
  $color: red,
  $width: 200px;
);
```
在scss中，对象都是放在 () 圆括号中的，而不是花括号{}中


!default，如果一个变量已经定义，当通过!default赋值时，不会起作用

```
$content: "First content";
$content: "Second content?" !default;

#main {
  content: $content;
}

编译为
#main {
  content: "First content";  //还是第一个
}
```


```
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content;
}

编译为
#main {
  content: "Non-null content";   //定义的default值
}
```




##### 2、css嵌套
可以避免重复多次的写父选择器。将嵌套的选择器作为子选择器。

```
.center{
  .title{
    font-size: 20px;
    font-weight: bold;
  }

  input{
    background-color: gray;
  }
}
 /* 编译后 */
.center .title {
   font-size: 20px;
   font-weight: bold; 
}
.center input { background-color: gray;}
```

群组的嵌套

```
//子元素群组
.container {
  h1, h2, h3 {margin-bottom: 10px}
}
编译后
.container h1, .container h2, .container h3 { margin-bottom: 10px }
```

```
//父元素群组
nav, aside {
  a {color: blue}
}
编译后
nav a, aside a {color: blue}
```

##### 3、父元素的引用
有时并不是让嵌套的作为子原则器，而是父选择器的补充，比如:hover,，此时必须使用 父元素的引用符 &, 此时&代表父元素 

```
.center{
  input{
    background-color: gray;
  }

  &:hover{ 
    color:red;
  }
}
编译后
.center input{background-color: gray;}
.center:hover{color:red;}
```
##### 4、子组合和同胞选择器的使用 >、+ 和 ~ ;
可以把它们放在==外层选择器**后边**==，或==里层选择器**前边**==：

```
article {
  ~ article { border-top: 1px dashed #ccc }  //里层选择器前面
  > section { background: #eee }
  dl > {    //外层选择器前面
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}

//编译后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```
##### 5、混合器
通过变量我们可以对单个css值，定义定义和重用，如果对多个css值，都写变量，显得太麻烦，所以使用混合器一次性定义多个。

**通过@mixin定义， 通过@include使用**

```
@mixin rounded-corners {
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
}

.center{
  input{
    background-color: gray;
    @include rounded-corners;
  }
}
编译后
.center{
  input{
    background-color: gray;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }
}
```

可以给混合器传参

```
@mixin rounded-corners($normal) {
  -moz-border-radius: $normal;
  -webkit-border-radius: $normal;
  border-radius: $normal;
}

.center{
  input{
    background-color: gray;
    @include rounded-corners(50%);
  }
}
```

混合器默认参数

```
$normals: 2px;
@mixin rounded-corners($normal:$normals) {
  -moz-border-radius: $normal;
  -webkit-border-radius: $normal;
  border-radius: $normal;
}

.center{
  input{
    background-color: gray;
    @include rounded-corners();
  }
}
```

向混合样式中导入内容

```
$normals: 2px;
@mixin rounded-corners($normal:$normals) {
  -moz-border-radius: $normal;
  -webkit-border-radius: $normal;
  @content;
}

.center{
  input{
    background-color: gray;
    @include rounded-corners(){
       border-radius: $normal;
    };
  }
}
```
@include中的  border-radius: $normal; 会最后合并到 @mixin的@content中
最后编译为

```
.center{
  input{
    background-color: gray;
    -moz-border-radius: $normal;
    -webkit-border-radius: $normal;
    border-radius: $normal;
  }
}
```



利用混合器，可以很容易地在样式表的不同地方共享样式。如果你发现自己在不停地重复一段样式，那就应该把这段样式构造成优良的混合器，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性。

判断一组属性是否应该组合成一个混合器，一条经验法则就是你能否为这个混合器想出一个好的名字。如果你能找到一个很好的短名字来描述这些属性修饰的样式，比如rounded-cornersfancy-font或者no-bullets，那么往往能够构造一个合适的混合器。如果你找不到，这时候构造一个混合器可能并不合适。

##### 6、继承
变量是基于单个 css 属性的，mixin是基于多个css属性的，并且这两个都是同属一个css样式文件才生效

而继承是基于css类的，可以在不同的css文件间使用，既可以给自身的选择器用，也可以给继承的后代选择器用

```
//1.css
@mixin rounded-corners($normal) {
  -moz-border-radius: $normal;
  -webkit-border-radius: $normal;
  border-radius: $normal;
}
//或者通过其他地方将mixin导入进来

.center{  //可用于class为center的元素
  .title{
    font-size: 20px;
    font-weight: bold;
  }
  input{
    background-color: gray;
    @include rounded-corners(50%);   //使用混合器
  }
  &:hover{
    color:red;
  }
}
```

```
//2.css
.password {
  @extend .center;      //password继承样式表中任何 位置的 .center的样式。
  box-shadow: 0 0 0 10px red inset;
}
```
不仅会继承.center自身的所有样式，任何跟.center有关的组合选择器样式也会被.password 以组合选择器的形式继承

```
//不要使用后代选择器去继承
.password .text{   //不推荐
  @extend .center;
}
```
extend-Only 选择器，或者占位符选择器%，和id、class选择器类似，只是 必须通过 @extend 指令调用【将原来的“ . ”使用“ % ”定义，只用于继承，不会给某个元素用】

```
%center{  //只用于@extend的使用，不会给class为center的元素用，况且此时也不是class样式了
  input{
    background-color: gray;
    @include rounded-corners(50%);
  }
  &:hover{
    color:red;
  }
}
.password {
  @extend %center;
  box-shadow: 0 0 0 10px red inset;
}
```


如果两个 样式之间有 从属、深浅等 基于某一个大类的，则使用继承最好

否则，如果两个样式之间，没有任何关联，直接简单的拼接，则使用mixins比较好


##### 7、函数
```
p {
  color: hsl(0, 100%, 50%);
}
//编译为
p {
  color: #ff0000; 
}
//注意如果在css中，hsl不会编译，而是直接输出，是否显示颜色，取决于浏览器是否支持hsl
```


```
//map-get函数，表示从一个对象中，根据key，获取对应的value
.password {
  color: map-get((color:red), "color");
}
```


scss允许你自定义函数，使用@function定义函数名，使用@return返回值

```
$grid-width: 40px;
@function grid-width($n) {
  @return $n * $grid-width;
}

#sidebar { width: grid-width(5); }

编译为
#sidebar {
  width: 200px; 
}
```


##### 8、导入SASS文件
在css中@import允许在一个css文件中导入其他css文件。然而，只有执行到@import时，浏览器才会去下载其他css文件，这导致页面加载起来特别慢。

而sass的@import，在生成css文件时就把相关文件导入进来。这意味着在使用css样式之前，所有相关的样式被归纳到了同一个css文件中，而无需发起额外的下载请求。

```
@import "mixins.scss   //导入mixins.scss
@import "mixins"    //导入mixins.scss,可以省略 后缀

@import "mixins.css"  //被解析为导入css
@import url("mixins")  //被解析为导入css
```

一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。

```
$link-color: blue;
$link-color: red;
a {
  color: $link-color;   //值为red
}
```
同理, 如果在 variable.scss中有个变量$link-color: red;那么在导入文件后，重新声明会覆盖掉。

```
@import "variable"
$link-color: red;
a {
  color: $link-color;   //值为red
}
```
利用此特性，可以在你的样式表中对导入的样式稍作修改。


##### 9、注释
```
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```
在普通的css中，注释都是/**/

而在scss中提供的//注释，称为"静默注释"，即不会出现的最终编译的css文件中。



##### 10、数据类型
Sass 支持 6 种主要的数据类型：

- 数字，1, 2, 13, 10px 
- 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz 
- 颜色，blue, #04a3f9, rgba(255,0,0,0.5) 
- 布尔型，true, false 
- 空值，null 
- 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif 
- maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2) 


##### 11、插值语句#{}
一般情况下，直接使用运算符就可以，但是如果只是为了将结果显示，而不是计算，那么就需要#{}

```
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

编译为
p.foo {
  border-color: blue; 
}
```


```
.title {
  $min-size: 2px
  font-size: 18px / $min-size;
}
编译为
.title {
  font-size: 9;
}
```

```
.title {
  $min-size: 2px
  font-size: 18px / #{ $min-size };
}
编译为
.title {
  font-size: 18px / 2px;
}
```


```
.title {
  $slidebar-width: 20px;
  width: calc(50px - $slidebar-width);
}
编译为
.title {
  width: calc(50px - $slidebar-width);  //非法，不起作用
}
因为calc中整体是个字符串，scss只会做 字符串的拼接，等拼接后，编译成css，再通过浏览器去计算，scss本身不会去计算。
```

```
.title {
  $slidebar-width: 20px;
  width: calc(50px - #{$slidebar-width});
}
编译为
.title {
  width: calc(50px - 20px);
}
```

##### 12、运算
在+ - *  / 运算中，有时不想进行计算，只是为了显示，那么采用#{} 将值包裹

```
//加法
p {
  font-size: 18px+2px;
}
编译为
p {
  font-size: 20px;
}

//直接显示
p {
  font-size: #{18px} + #{2px};
}
编译为
p {
  font-size: 18px + 2px;
}
```


字符串连接

```
p {
  cursor: e + -resize;
}
编译为
p {
  cursor: e-resize; 
}
```

##### 13、/deep/ 
在vue中，如果要修改 组件的内部样式，必须穿透去修改，即在scss中使用/deep/， 当然如果是css，则直接使用 >>> 即可

可以用来穿透去修改 插件的样式。而且如果父类使用了/deep/，子类不能再用/deep/，否则样式不会生效。 因为父类使用/deep/ 后，所有子类都被穿透了


##### 14、控制指令
@if

```
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

编译为
p {
  color: green; 
}
```
@for
@each
@while
