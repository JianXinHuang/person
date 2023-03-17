## 1、flex布局是什么？
任何一个容器都可以指定为Flex布局。

适用场景: **只要与居中相关的，水平居中，垂直居中，或者水平垂直居中，都可以使用flex布局**

```
.box{
  display: flex;
}
//或者行内级别(其他行内元素可以直接跟在行末尾)
.box{
  display: inline-flex;
}
```
此时子元素无法再使用==float==、==clear==和==vertical-align==属性,
**但其中的子元素同样可以设置长和宽等属性**

==注意==:**默认情况下子项目在“纵轴”方向的高度是自动伸展铺满的，除非给子项目指定具体的height值。 可通过align-items改变默认值**

设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
而且即使span元素，也在flex布局下，可以设置height，margin-top等属性


## 2、flex容器的属性
- flex-direction    【决定主轴的方向（即项目的排列方向）】
- flex-wrap  【决定在主轴上排不下，如何换行】
- justify-content  【项目在主轴上的对齐方式】
- align-items  【项目在纵轴上的对齐方式】
- align-content  【多根主轴时项目在纵轴的对齐方式，如果项目只有一根主轴线，该属性不起作用】

其中前4种最常用。

#### 2.1、flex-direction属性
```
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}

/**
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
*/
```

- 如果子元素不定高，则值为row|row-reverse时，默认高度自动铺满容器。（    align-items: stretch;）

![image](/person/images/flex/flex-direction-row.png)
- 如果子元素不定宽，则值为column|column-reverse时，默认宽度自动铺满容器。（    align-items: stretch;）

![image](/person/images/flex/flex-direction-column.png)
- 如果子元素定宽和高，则宽/高度使用自己定义的。

![image](/person/images/flex/flex-direction-column-width.png)

#### 2.2、flex-wrap属性
默认情况下，项目都排在一条主轴线上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}

/**
nowrap（默认值）：如果排列不下时，会按照子项目的实际宽度比例，等比缩小，然后排下
*/
```

- 值为wrap

![image](/person/images/flex/flex-wrap-no.png)
- 值为nowrap

![image](/person/images/flex/flex-wrap.png)

#### 2.3、justify-content属性
定义了项目在主轴上的对齐方式。

```
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}

/**
space-between：两端对齐，项目之间的间隔都相等【即开始和尾部贴边】。
space-around：每个项目两侧的间隔相等【不贴边】。
*/
```
#### 2.4、align-items属性
定义项目在纵轴上如何对齐

```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}

/**
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
flex-start：交叉轴的起点对齐【不会占满整个宽度，而是采用实际宽度】。
flex-end：交叉轴的终点对齐【不会占满整个宽度，而是采用实际宽度】。
center：交叉轴的中点对齐【不会占满整个宽度，而是采用实际宽度】。
baseline: 项目的第一行文字的基线对齐【不会占满整个宽度，而是采用实际宽度】。
*/
```

## 3、flex容器内部的项目的属性
- flex  该项目在“主轴”上如何填充空白区域
- align-self  允许单个项目有与其他项目不一样的“纵轴”对齐方式，可覆盖align-items属性

#### 3.1、flex属性
```
.item {
  flex: none | auto
  
}

/**
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
auto: 表示将此项目伸展并占满空白区域
none：不填充空白区域
*/
```
![image](/person/images/flex/flex-item-auto.png)


#### 3.2、align-self属性
```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}

/**
auto：（默认）继承父元素的align-items属性，如果父元素没定义，则使用父元素默认的，即stretch
*/
```
![image](/person/images/flex/flex-align-self.png)





## 4、子元素设置宽度和父元素的关系
#### 4.1、子元素宽、高均不设置
如果，子元素在主轴和纵轴方向，不指定宽度，则在 纵轴方向 默认 100% 延伸， 主轴方向宽度为0

#### 4.2、子元素在主轴方向上设置了宽度
a、这个宽度如果不超过 主轴，子元素 则显示为自身设置的宽度。
b、如果这个宽度超过主轴，则 子元素的宽度 最大为 主轴的宽度，

即子元素的宽宽不会超过主轴的宽度

#### 4.3、子元素在纵轴方向上设置了高度
a、这个高度如果不超过 纵轴，子元素 则显示为自身设置的高度。
b、如果这个高度超过 纵轴，则 子元素的高度为自身设置的高度。

即子元素的高度依靠自身设置的值