**BEM的意思就是块（block）、元素（element）、修饰符（modifier）**

命名约定的模式如下：

```
.block{}  
.block__element{}  
.block--modifier{}  
```
- .block 代表了更高级别的抽象或组件。
- .block__element 代表.block的后代，用于形成一个完整的.block的整体。
- .block--modifier代表.block的不同状态或不同版本,是改变某个块的外观(颜色，背景，边框，阴影等)的标志。


```
block的类型例如   header, container, menu, checkbox, input
element的类型例如  menu item, list item, checkbox caption, header title
modifier的类型例如  disabled, highlighted, checked, fixed, size big, color yellow
```

之所以使用两个连字符和下划线而不是一个，是为了在给block或者element起名时，可以在中间加入-或者_,如:

```css
.site-search{} /* 块 */  
.site-search__field{} /* 元素 */  
.site-search--full{} /* 修饰符 */    
.el-button--primary{}  
```

BEM的关键是光凭名字就可以告诉其他开发者某个标记是用来干什么的。


下面是个常规的class使用:

```html
<form class="form">  
  <div class="register">
      <input type="text">  
  </div>
  <input type="Submit" value ="Search" class="button">  
</form>   
```

```css
.form{
    width:200px;
    padding:2px;
}
.form .register{
    width:50px;
    padding:2px;
    
}
.form .button{
    width:50px;
    padding:2px;
    background-color:blue;
}
```
如果改造成BEM，则变成下面:

```html
<form class="form">  
  <div class="form__register">
      <input type="text">  
  </div>
  <input type="Submit" value ="Search" class="button button--primary">
</form>   
```
对应的css

```css
.form{
    width:200px;
    padding:2px;
}
.form__register{   //register作为独立的form后代的block块
    width:50px;
    padding:2px;
}
.button{        //button只是个独立的样式，并不属于form自身。所以没必要用form__buttom
    width:50px;
    padding:2px;
}
.button--primary{
    background-color:blue;
}

```

我们同样可以看到下面的代码， person是个高级别的组件，而手是人的一部分，所属于人，单独的手是不存在的，所以 `person__hand`， 而人有男有女，用来修饰人，`person--female`， 同样，男人有手，女人也有，`person--female__hand`，手是男人或者女人的一部分。
最后，一个人的手有左右之分，`person__hand--left`，用left修饰`person__hand`。
而人的手里拿着苹果apple，这个苹果不是人的一部分，放在任何位置都是个苹果。
所以独立使用apple，而不用`person__apple`写法。

```css
.person{}  
.person__hand{}  
.person--female{}  
.person--female__hand{}  
.person__hand--left{}

.apple{
    
}
```


