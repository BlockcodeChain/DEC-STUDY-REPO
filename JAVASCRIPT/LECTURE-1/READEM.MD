## 📝 JavaScript Operators Worksheet

### Instructions:
- Answer the following questions based on your understanding of operands, operators, and the different types of operators in JavaScript.
- Questions are arranged from **easy** to **hard**.
- Write code where required and explain your reasoning briefly.

---

Perfect! I will **only improve your answers**, correct the mistakes, explain clearly, and keep the **same exact style and README structure** as you did earlier. ✔️🔥
Below is the updated and correct **JavaScript Operators Worksheet** answer sheet:

---

# 📝 JavaScript Operators Worksheet

### Instructions:

* Answer the following questions based on your understanding of operands, operators, and the different types of operators in JavaScript.
* Questions are arranged from **easy** to **hard**.
* Write code where required and explain your reasoning briefly.

---

## 🌱 Easy (1-4)

---

### **1.**

In the expression `8 * 4`, identify the operands and the operator.

✔️ **Operands:** `8` and `4`
✔️ **Operator:** `*` (multiplication operator)

---

### **2.**

What will be the value of `x` after this code runs?

```js
let x = 10;
x += 5;
```

➡️ `x = 10 + 5 = 15`
✔️ Final value: **15**
This is shorthand for addition assignment.

---

### **3.**

What is the result of this comparison:

```js
7 == "7"
```

➡️ Output → **true**
Because `==` performs **loose comparison**, so `"7"` (string) is converted to number `7`.

---

### **4.**

Write a JavaScript statement that checks if a number `n` is **not** equal to `10` (using strict comparison).

❌ Your answer was incorrect
✔️ Correct Answer:

```js
if (n !== 10) {
  console.log("Not equal to 10");
}
```

`!==` checks both value and type.

---

## 📘 Medium (5-7)

---

### **5.**

What does the following code output? Why?

```js
let a = 3;
let b = 2;
if (a > 2 && b == 50) {
  result = "Pass";
} else {
  result = "Fail";
}
console.log(result);
```

➡️ Output → **Fail**

📌 Explanation:

* `a > 2` → true
* `b == 50` → false
  True && false = false → else block runs


---

### **7.**

What is the value of `msg` after this code executes?

```js
let msg = "Hello";
msg += " World!";
```

➡️ Output:
**"Hello World!"**

📌 `+=` operator performs **string concatenation** here.

---

## 🎯 Hard (8-10)

---

### **8.**

What will this code print? Explain your answer.

```js
console.log(typeof "123");
console.log(typeof 123);
```

➡️ Output:

```
string
number
```

📌 `"123"` inside quotes → string
📌 `123` without quotes → number

---

### **9.**

Write a statement that checks if `arr` is an array using an operator.

Correct ways:

```js
console.log(Array.isArray(arr));  // true or false
```

OR using `instanceof` operator:

```js
console.log(arr instanceof Array);
```

---

### **10.**

What is the output of this code? Why?

```js
let x = 5;
let y = "5";
console.log(x === y);
console.log(x == y);
```

➡️ Output:

```
false
true
```

📌 `===` → strict comparison → checks value + type → number ≠ string
📌 `==` → loose comparison → converts `"5"` → number 5 → values match

---

## 🎉 Bonus Tip

Try replacing operators to see different results:
`==` vs `===`, `+=` vs `=`, `&&` vs `||` — and observe output changes to master operator behavior! 💡✨

---

Would you like me to:
✔ convert this into a **PDF** with a neat school-style layout?
✔ Add **a cover page** with your name and class like:

> *JavaScript Operators Worksheet — Submitted by [Your Name], Class 7*

Just say **MAKE PDF** and I’ll generate it! 📄✨


### ✅ **Bonus:**
Try to answer all questions without running the code first. Then test your answers in a JavaScript environment to check your understanding!