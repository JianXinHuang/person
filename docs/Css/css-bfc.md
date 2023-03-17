在**普通流**中的盒子会参与一种格式上下文,这个盒子可能是块盒也可能是行内盒,但不可能同时是块盒又是行内盒。

## FC(格式化上下文，是一个布局环境)

定义的是页面中的一块渲染区域，并且有一套渲染规则，它决定了其**子元素将如何定位，以及自身元素和其他元素的关系和相互作用。**

所有的盒子都参与了 上下文，要么参与了行级格式化上下文，要么参与了块级格式化上下文。

从页面根元素（最大的 BFC）开始，页面采用常规流的方式进行渲染，盒子会依次放置，从上到下，从左到右，当遇到新的具有（FC）的盒子时，则会采用一些特定的渲染方式并与外层其他盒子相互作用。

## BFC(块级格式化上下文)

布局规则(特性)

1. 块格式化上下文中，外层盒子会垂直依次排列。
2. 内部盒子之间垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻盒子的 margin 会发生合并。
3. 每个子元素的左外边缘（margin-left)， 与当前 BFC 元素的左边（contain box left）相接触。即使存在浮动也是如此。除非产生新的 BFC 元素。
4. BFC 的盒子不会与 float 盒子重叠。
5. BFC 就是页面上的一个隔离的独立盒子，盒子里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素也参与计算(浮动定位和清除浮动时只会应用于同一个BFC内的元素。)

怎样形成一个 BFC？
满足其一的元素，即可生成一个 BFC

- 根元素(<html>)
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 非块级元素具有 display:flow-root（无任何副作用,但兼容性不好）,inline-block，table-cell（表格中）, table-caption（表格中）
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素,如果当前元素为弹性元素的子元素，则会形成BFC，而不是它是弹性元素才会形成BFC）
- overflow 值不为 visible 的块元素
- contain 值为 layout、content或 paint 的元素

注意
其中“非块级元素具有 display: inline-block”，其实是说自身还是行内元素，排列方式和其他行元素一样都在一行排放。但是却具有了 BFC 的特性，如清除浮动等。

这里的根元素，不一定就是 html，如果在 svg 文件中，svg 就是根元素。

那么我们现在知道了 BFC 如何形成，也知道了它的布局规则是什么，那如何将特性应用到具体案例中呢?

首先看个现象: **垂直 margin 合并**

```
.first {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: #ff7676;
}
.second {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: #ff7676
}

<div class="first"></div>
<div class="second"></div>
```

我们可以看到 margin 发生了合并，本来应该是 200，结果只有 100.
可以看到这两个盒子互相影响了。

首先我们根据第 5 条——“BFC 就是页面上的一个隔离的独立盒子，盒子里面的子元素不会影响到外面的元素。反之也如此。”
那么我们只需要给其中一个 div 完成加个 div，并让外层的 div 变成 BFC 就可以了。

```

.first {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: #ff7676;
}
.second {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: #ff7676;
}
.wrap{
    //下面3个任意一个即可
    overflow: hidden;
    position: absolute;
    //float:left; 虽然可以变成BFC，margin也不合并了。但是当前元素位置却变了。得不偿失
    display: inline-block;
}

<div class="first"></div>
<div class="wrap">
    <div class="second"></div>
</div>
```

第二个现象: **子元素浮动，导致父元素塌陷**

```
.div-parent {
    width: 200px;
    background-color: blue;
}
.div-child {
    box-sizing: border-box;
    width: 200px;
    height: 300px;
    border: 2px solid #ff7676;
    float: left;
}


<div class="div-parent">
    <div class="div-child">
        32132121
    </div>
</div>
```

本来父元素的高度是随着子元素自动撑开的，但是由于子元素设置了浮动。导致父元素高度为 0 了

根据 BFC 第 6 条——“计算 BFC 的高度时，浮动元素也参与计算。”

这样只要我们将父元素设置为 BFC 即可，这样父元素的高度就不会塌陷了

```
.div-parent {
    width: 200px;
    background-color: blue;
    //下面任意一种即可
    overflow: hidden;
    position: absolute;
    display: inline-block;
    float: left;
}
.div-child {
    box-sizing: border-box;
    width: 200px;
    height: 300px;
    border: 2px solid #ff7676;
    float: left;
}

<div class="div-parent">
    <div class="div-child">
        32132121
    </div>
</div>
```

第三个现象: **文字环绕在浮动元素的周围**

```
div {
    width: 200px;
}
aside {
    background-color: yellow;
    float: left;
    width: 100px;
    height: 50px;
}
main{
    background-color: pink;
}


<div>
    <aside></aside>
    <main>我是好多好多文字会换行的那种蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤</main>
</div>
```

根据 BFC 第 4 条——“BFC 的盒子不会与 float 盒子重叠。”
所以我们只需要将 main 元素设置为 BFC 即可

```
div {
    width: 200px;
}
aside {
    background-color: yellow;
    float: left;
    width: 100px;
    height: 50px;
    //下面的几种情况都不同
    display: inline-block;   //虽然不会重叠，但是main会跑到第二行去
    overflow: hidden; //虽然不会重叠，但是main会跑到第一行，但是第二列上去
    float: left;    //虽然不会重叠，但是main会跑到第二行去
    position: absolute;  //???很奇怪，已经是BFC了，但还是会重叠。????不明白
}
main {
    background-color: pink;
}


<div>
    <aside></aside>
    <main>我是好多好多文字会换行的那种蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤</main>
</div>
```
