## 📝 Variables and Data Types Worksheet

### Instructions:
- Answer the following questions based on your understanding of variable declarations and data types in JavaScript.
- Questions are arranged from **easy** to **hard**.
- Write code where required and explain your reasoning briefly.

---

# 📝 Variables and Data Types Worksheet — JavaScript

### 📌 Instructions:

* Answer the following questions based on your understanding of **variables** and **data types** in JavaScript.
* Questions are arranged from **Easy → Hard**
* Write code where required and explain your reasoning briefly in your own words.

---

## 🌱 Easy (1-4)

---

### **1.**

Which keyword would you use to declare a variable whose value will never change?
a) `var`
b) `let`
c) `const`

> ✔️ Answer: **const**
> `const` is a **reserved keyword** used when the value should not be reassigned later.
> Example:

```js
const PI = 3.14;
```

---

### **2.**

What will be the output of this code?

```js
console.log(x);
var x = 5;
```

> ✔️ Output: **undefined**
> Because `var` variables are **hoisted** → memory allocated first & initialized with `undefined`.
> We try printing it **before assignment**, so it shows `undefined`.
> ⚠️ If we used `let` or `const`, it would throw an error.

---

### **3.**

Is this code valid? Why or why not?

```js
let a = 10;
let a = 20;
```

> ❌ Not valid
> Because `let` **cannot be redeclared** in the same block scope.

---

### **4.**

Identify the data type of each variable:

```js
let name = "Bob";     // String
let score = 99;       // Number
let isActive = false; // Boolean
let nothing = null;   // Null
let notDefined;       // Undefined
```

✔️ Correct
📌 Note: `null` is a primitive type but JavaScript mistakenly returns `object` when we use `typeof`.

---

## 📘 Medium (5-7)

---

### **5.**

What is the difference between `let` and `var` in terms of scope?

> ✔️ `let` → **block scope**, cannot redeclare
> ✔️ `var` → **function scope**, can redeclare
> ⚠️ Bonus:
>
> * `var` is hoisted with `undefined`
> * `let` is hoisted but stays in **Temporal Dead Zone**

---

### **6.**

What will be the output of this code?

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

> ✔️ Output: `[1, 2, 3, 4]`
> Allowed because:
>
> * `const` does **not** allow reassignment of the variable
> * But array **elements inside can change**
>   Because objects and arrays are **reference types** stored in heap memory.

---

### **7.**

Write code to demonstrate the difference between **primitive** and **reference** assignment.

> 🛑 Earlier explanation was incomplete → Here is your improved answer👇

#### Primitive (copies value)

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10  (not affected)
```

#### Reference (copies reference, not value)

```js
let obj1 = { num: 10 };
let obj2 = obj1;
obj2.num = 20;
console.log(obj1.num); // 20  (affected)
```

📌 Difference:
Primitive → stored by **value**
Objects/Arrays → stored by **reference** (same memory location)

---

## 🎯 Hard (8-10)

---

### **8.**

```js
let a = { value: 5 };
let b = a;
b.value = 10;
console.log(a.value);
```

> ❌ Your answer earlier: “It will print 5”
> ✔️ Correct Answer: **10**
> Because `a` and `b` refer to the **same object** in memory.
> Changing through `b` affects the original.

---

### **9.**

Is this valid?

```js
const x;
x = 10;
```

> ❌ Not valid
> `const` must be **declared and initialized at the same time**
> Correct way:

```js
const x = 10;
```

---

### **10.**

Which of the following are **primitive types** in JavaScript?
a) String
b) Object
c) Boolean
d) Array
e) BigInt
f) Function

> ✔️ Correct Answer: **a, c, e**
> Primitive types: Number, String, Boolean, Null, Undefined, Symbol, BigInt

---




### ✅ **Bonus:**
Try to answer all questions without running the code first. Then test your answers in a JavaScript environment to check your understanding!
