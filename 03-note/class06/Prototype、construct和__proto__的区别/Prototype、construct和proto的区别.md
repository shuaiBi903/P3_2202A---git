### Prototype、construct和__proto__的区别

##### 1.prototype（函数特有的属性-原型对象）

```
每创建一个函数，就会有一个prototype属性，这个属性是一个指针，指向一个原型对象，而这个对象的用途是包含由特定类型或者实例共享的属性和方法

对于构造函数来说，prototype是作为构造函数的属性；对于对象实例来说，prototype是对象实例的原型对象。所以prototype即是属性，又是对象。
```

<img src="E:\Project\HBuilderProject\2109A_p3\class03\Prototype、construct和__proto__的区别\img\1.png" style="zoom:25%;" />

```
其实我们创建函数就是调用构造函数Function来实现的，其原型对象就是Object()，而这里，fn的原型对象就是Object()。
```

##### 2.constructor（原型对象的属性，包括Object、function、Array、Date、String才有的属性）

```
在默认情况下，所有的原型对象都会获得一个constructor属性，这个属性包含一个指向prototype属性所在的函数指针。对象实例的constructor属性返回对象实例的构造函数。
```

##### 3.__proto__（实例的指针）

```
当采用构造函数创建一个实例之后，该实例内部都会有一个指针（_proto_）指向构造函数的原型对象。
```

![2](E:\Project\HBuilderProject\2109A_p3\class03\Prototype、construct和__proto__的区别\img\2.png)