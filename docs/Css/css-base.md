### 1、定位
- static     默认定位，属性top，left，z-index等无效
- absolute   绝对定位，脱离常规流，后面的元素跟上来。top、left参考元素满足下面其一即可:
     - 1、离当前元素最近的具有absolute、relative或fixed定位的父类，如果没有，则参考body
     - 2、离当前元素最近的具有transform或者perspective不为none的父元素，如果没有，则参考body
     - 3、离当前元素最近的具有filter不为none的父元素，如果没有，则参考body 
     - 4、离当前元素最近的具有contain值为paint,strict,content。如果没有，则参考body 
- fixed	      固定定位，脱离常规流，后面的元素跟上来。top、left参考body，并且固定在屏幕，不随滚动条的滚动而上下移动。
- relative   相对定位，不脱离常规流。top、left参考本元素。





**堆叠上下文形成条件:**（满足任一即可）

- 根元素 (HTML)
- z-index 值不为 "auto"的 absolute/relative定位
- position: fixed | sticky
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex的元素
- opacity 属性值小于 1 的元素
- transform 属性值不为 "none"的元素
- mix-blend-mode 属性值不为 "normal"的元素
- filter值不为“none”的元素
- perspective值不为“none”的元素
- isolation 属性被设置为 "isolate"的元素
- clip-path值不为“none”的元素
- mask / mask-image / mask-border不为“none”的元素
- contain属性值为“layout”，“paint”，或者综合值比如“strict”，“content”


在同一个元素内部的堆叠顺序如下

```
负z-index < background<  border < 正常流元素< float元素 < transform元素 < 定位元素(z-index不指定) < opacity元素 < contain元素 < filter元素 < perspective元素 < 正z-index(正z-index时，当前元素可以是定位，也可以是flex的子元素)
```

即 正z-index 的元素堆叠顺序最高。

结论:

- **1、在同一个堆叠上下文中，z-index大的比z-index小的堆叠层级更高**
- **2、在不同堆叠上下文中，z-index的大小不会影响到子元素的堆叠顺序，此时的堆叠顺序与堆叠上下文所属元素的堆叠顺序有关，与子元素无关。**
- **3、堆叠上下文中，里面元素的负z-index > 堆叠上下文所属元素border**

![image](/person/images/css-base/position-context.png)

### 2、浮动
当一个div中的两个元素浮动之后，此时父元素div的高度就会塌陷，此时div的高度为0。

清除浮动的方式:

- 1、浮动元素最后的兄弟元素添加clear:both;
- 2、浮动元素的容器(父元素)添加overflow:hidden;或overflow:auto(采用的理论是创建个块级上下文);
- 3、浮动元素的容器(父元素)添加伪元素:after清除浮动（推荐）

```
.clearfix:after{
  content: ""; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
}
```

### 3、块级元素和行内元素
- 1、块级元素独自占一行且宽度会占满父元素宽度。行内元素不会独占一行，相邻行内元素可以排在同一行；
- 2、块级元素可以设置weith和height。行内元素设置width和height无效；
- 3、块级元素可以设置margin和padding属性，而行内元素水平方向的margin和padding如margin-left、padding-right可以产生边距效果，但是竖直方向的如padding-top和margin-bottom不会产生边距效果。

**注意:**

1、margin 和 padding 的百分比值是以父元素的宽度作为参考基准的, 
	即使对于margin-top 和margin-bottom，padding-top和padding-bottom 来说也是这样。
	
2、而position中的top、left是按照父元素的高和宽定义的。
	
body的宽度默认为视口宽度，即100vw，而body高度默认为0(可以设置为100vh)，随着子元素的高度而自适应。


### 4、css优先级

```
    !important > style > id > class > tag
    
    例如:
    div{} //权重为1
    .class1{}  //权重10
    #d1{}  //  权重100
    行内   //  权重 1000
    !important  //权重正无穷
    
    #d1 div{}  //100+1=101
```

在html的元素上的css谁的权重大，则使用谁的样式；如果权重相同，则使用最后定义的。
![image](/person/images/css-base/css-important.png)

### 5、清除行内元素之间的空白
inline-block的元素之间会受空白区域的影响，元素之间差不多会有一个字符的间隙。如果在同一行内有4个25%相同宽度的元素，会导致最后一个元素掉下来。

解决方案:

- 1、使用浮动float
- 2、设置父元素的font-size属性为0，然后对子元素重新设定font-size (推荐)

### 6、pointer-events的使用
```
.disabled{
  pointer-events: none;
}

```
利用该属性，可以做如下的事情:

- 阻止该元素上任何点击事件的执行
- 使该元素上链接显示为默认光标
- 阻止该元素触发hover和active状态

在定位的多图层间避免触发其他事件有很好的效果。

### 7、响应式设计：
- 1、使用百分比长度来取代固定长度。如果实在做不到这一点，也应该尝试使用与视口相关的单位（vw、vh、vmin 和vmax）或者calc(100% - 30px)得出的值，
它们的值解析为视口宽度或高度的百分比。
- 2、 当你需要在较大分辨率下得到固定宽度时，使用 max-width 而不是width，因为它可以适应较小的分辨率，而无需使用媒体查询
- 3、 不要忘记为替换元素（比如 img、object、video、iframe 等）设置一个max-width，值为100%。防止撑破容器。
 
轻易不要用媒体查询，媒体查询使用于在特定的窗口下，单一元素的位置和大小发生了与布局相关的形变。比如竖的变为横的。圆的变为方的，上一行的掉到了第二行等。


**总的来说，我们的思路是尽最大努力实现==弹性可伸缩的布局==，并在与布局形变有关的特定屏幕尺寸下使用媒体查询**

### 9、css中的内置变量和函数：
- currentColor  当前的标签所继承的==文字颜色==
- inherit  显式的继承父元素的样式（只针对可继承样式，如color，而border不行）。
- initial  初始化为浏览器默认的样式
- unset  如果样式可继承，等同于inherit，如果不可继承，等同于initial

attr()

```
<span data-text="123456789"></span>
span:before{
   content: attr(data-text);  //将span的data-text属性的值设置到content上
}
```

url()

```
background-image: url("logo.png");
```

calc()

```
width: calc(100% - 29px); //减号前后，必须留一个空格
width: calc(100vw - 29px);
```

还有如下内置函数:
rgba(), hsl(), and hsla()


### 10、boder， box-shadow，outline
这三个中只有boder影响布局，其他都不会影响布局。

### 11、css中的百分比值
margin-top, margin-bottom和margin-right, margin-left一样，它的百分值 参考的是父元素的 宽度(不是高度)

padding-top, padding-bottom和padding-right, padding-left一样，它的百分值 参考的是父元素的 宽度(不是高度)

而 position中 top和bottom 它的百分值 参考的是父元素的 高度 left和right 它的百分值 参考的是父元素的 宽度

元素按照display， position，float的顺序渲染， 如果dispaly为none，则position和float都不执行，否则开始执行position； 如果position的值为absolute或者fixed，那么float则不执行，元素的位置由top，right等决定。 如果position为其他值，则开始执行float

line-height的百分值 参考的是自身元素的font-size大小。

background-position的以左上角为基准点 0% 0%