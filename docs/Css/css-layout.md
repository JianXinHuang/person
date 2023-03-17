## 一、居中布局
#### 1、水平居中
###### a、inline-block + text-align
```
//css
.parent{
	text-align: center;
}
.child{
	display: inline-block;
}

//html
<div class="parent">
	<div class="child">Demo</div>
</div>
```
Tips：兼容至IE8.

![image](/person/images/css-layout/horizontal-center.png)

###### b、table + margin
```
//css
.child{
	display: table;
	margin: 0 auto;
}

//html
<div>
	<div class="child">Demo</div>
</div>
```
Tips：兼容至IE8.

![image](/person/images/css-layout/horizontal-center.png)

###### c、absolute + transform
```
//css
.parent{
	position: relative;
	height: 30px;
	width:200px;
}
.child{
	position: absolute;
	left:50%;
	transform: translateX(-50%);
}

//html
<div class="parent">
    <div class="child">Demo</div>
</div>
```
Tips：可兼容至IE9，因为transform限制。

![image](/person/images/css-layout/horizontal-center.png)

###### d、flex  +  justify-content
```
//css
.parent{
	display: flex;
	justify-content: center;
}

//html
<div class="parent">
	<div>Demo</div>
</div>
```
Tips：可兼容至IE10，但flex提供的布局很强大。

![image](/person/images/css-layout/horizontal-center.png)

#### 2、垂直居中
###### a、tablet-cell + vertical-align
```
//css
.child{
	display: table-cell;
    vertical-align: middle;
    height: 100px;
}

//html
<div>
	<div class="child">Demo</div>
</div>
```
![image](/person/images/css-layout/vertical-middle.png)

###### b、absolute + transform
```
//css
.parent{
	position: relative;
	
	width: 80px;
	height: 120px;
}
.child{
	position: absolute;
	top: 50%;
	transform:translateY(-50%);
}


//html
<div class="parent">
    <div class="child">Demo</div>
</div>
```
![image](/person/images/css-layout/vertical-middle.png)

###### c、flex + align-items
```
//css
.parent{
	display: flex;
	align-items: center;

	width: 80px;
	height: 120px;
}

//html
<div class="parent">
	<div>Demo</div>
</div>
```
![image](/person/images/css-layout/vertical-middle.png)

#### 3、水平垂直居中
###### a、table-cell  + vertical-align + text-align
```
//css
.parent{
	width: 120px;
	height: 80px;
	
	display: table-cell;
    vertical-align: middle;
    text-align: center;
}

//html
<div class="parent">
	<div>Demo</div>
</div>
```

###### b、absolute + transform
```
//css
.parent{
	position: relative;

	width: 120px;
	height: 80px;
}
.child{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}

//html
<div class="parent">
	<div class="child">Demo</div>
</div>
```
![image](/person/images/css-layout/center.png)

###### c、flex
方案1

```
//css
.parent{
	display: flex;
	justify-content: center;
	align-items: center;

	width: 120px;
	height: 80px;
}

//html
<div class="parent">
	<div>Demo</div>
</div>
```

方案2 

```
.parent{
	display: flex;
    height: 300px;
    width: 200px;
}
.child {
	margin: auto; 
}

//html
<div class="parent">
	<div class="child">Demo</div>
</div>
```
![image](/person/images/css-layout/center.png)


## 二、多列布局
一列定宽，一列自适应

```
//css
.container{
   display: flex;
}
.left{
	width: 100px;
	margin-right: 20px;
}
.right{
	flex: 1;
}

//html
<div class="container">
	<div class="left">left</div>
	<div class="right">
		<div>right1</div>
		<div>right2</div>
	</div>
</div>
```
![image](/person/images/css-layout/muti-column.png)

## 三、等分布局

```
//css
.parent {
	display: flex;
}

.column {
	flex: 1;
}

//html
<div class="parent">
	<div class="column">column 1</div>
	<div class="column">column 2</div>
	<div class="column">column 3</div>
	<div class="column">column 4</div>
</div>
```
![image](/person/images/css-layout/same-column.png)
