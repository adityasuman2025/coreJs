// ============================================================
//   OOP FUNDAMENTALS — IN TYPESCRIPT
// ============================================================
//
//   This file covers:
//     1. What is OOP?
//     2. What is a Class?
//     3. What is an Object?
//     4. The 4 Pillars of OOP:
//          a) Encapsulation
//          b) Inheritance
//          c) Polymorphism
//          d) Abstraction
//
//   Run with:  npx ts-node oops.ts
//
//   Each example is wrapped in `{ ... }` so class names don't collide
//   across sections (classes are block-scoped, just like `let`/`const`).



// ============================================================
//   WHAT IS OOP?
// ============================================================
//
//   OOP (Object-Oriented Programming) is a way of organizing code by
//   bundling related DATA (state) and BEHAVIOR (functions that operate
//   on that data) into single units called OBJECTS.
//
//   Instead of having scattered functions that work on loose data:
//       let name = "Fido"; let age = 3;
//       function bark(name) { ... }
//
//   We package them together:
//       class Dog { name; age; bark() {...} }
//
//   Benefits:
//     - Easier to reason about ("a Dog has a name and can bark")
//     - State stays close to the code that manages it
//     - Real-world things map naturally to objects (User, Order, Car, ...)



// ============================================================
//   WHAT IS A CLASS?
// ============================================================
//
//   A CLASS is a TEMPLATE / BLUEPRINT for creating objects.
//   It describes:
//     - What data each object will hold (properties)
//     - What actions each object can perform (methods)
//
//   The class itself is NOT an object — it's the recipe.
{
    // Blueprint for any "Dog"
    class Dog {
        // PROPERTIES — what data each Dog stores
        name: string;
        age: number;

        // CONSTRUCTOR — runs when a new Dog is created with `new`
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        // METHOD — what a Dog can do
        bark(): void {
            console.log(`${this.name} says: Woof!`);
        }
    }

    // The class above is just a definition — no Dogs exist yet.
}



// ============================================================
//   WHAT IS AN OBJECT?
// ============================================================
//
//   An OBJECT is an INSTANCE of a class — a concrete thing created
//   from the blueprint, with its own data.
//
//   class  →  the recipe
//   object →  the actual cake (you can make many cakes from one recipe)
{
    class Dog {
        constructor(public name: string, public age: number) { }
        bark() { console.log(`${this.name} says: Woof!`); }
    }

    // Each `new Dog(...)` creates a separate OBJECT with its own state.
    const fido = new Dog("Fido", 3);   // ← object #1
    const rex = new Dog("Rex", 5);    // ← object #2

    fido.bark();   // "Fido says: Woof!"
    rex.bark();    // "Rex says: Woof!"

    // Same blueprint (Dog), different objects (fido, rex) with their
    // own independent `name` and `age` values.
    console.log(fido.name, rex.name);   // "Fido" "Rex"
}



// ============================================================
//   PILLAR 1 — ENCAPSULATION
// ============================================================
//
//   Bundle data + the methods that manage it INTO ONE UNIT, and HIDE
//   the internal data from outside code. Outsiders only interact
//   through a small, controlled set of public methods.
//
//   WHY: prevents callers from putting the object in an invalid state.
//
//   Access modifiers (TypeScript):
//     public     (default) — anyone can read/write
//     private              — only inside this class
//     protected            — this class + subclasses only
//     readonly             — settable in constructor, not after
{
    class BankAccount {
        public readonly owner: string;   // can read, can't reassign
        private balance: number;         // hidden from outside ✋

        constructor(owner: string, initial: number) {
            this.owner = owner;
            this.balance = initial;
        }

        // The class controls HOW balance can change → validation lives here.
        deposit(amount: number): void {
            if (amount <= 0) throw new Error("must be positive");
            this.balance += amount;
        }

        withdraw(amount: number): void {
            if (amount > this.balance) throw new Error("insufficient funds");
            this.balance -= amount;
        }

        getBalance(): number { return this.balance; }
    }

    const acc = new BankAccount("Alice", 100);
    acc.deposit(50);
    console.log(acc.getBalance());     // 150

    // The outside world can't break the rules:
    // acc.balance = 9_999_999;        // ❌ Error: 'balance' is private
    // acc.owner   = "Bob";            // ❌ Error: 'owner' is readonly
    // acc.deposit(-10);               // ❌ Throws "must be positive"

    // Encapsulation = the account ENFORCES its own invariants.
}



// ============================================================
//   PILLAR 2 — INHERITANCE
// ============================================================
//
//   A class can EXTEND another, inheriting its properties and methods.
//   The child class can add new ones, or override existing ones.
//
//   Models an "IS-A" relationship:  "a Dog IS-A Animal"
//
//   WHY: reuse common code, avoid duplication.
{
    // Parent (base / super class)
    class Animal {
        constructor(public name: string) { }

        move(distance: number): void {
            console.log(`${this.name} moved ${distance}m`);
        }
    }

    // Child (subclass) — Dog IS-A Animal
    class Dog extends Animal {
        constructor(name: string, public breed: string) {
            super(name);   // MUST call super() before using `this`
        }

        // New behavior unique to Dog
        bark(): void {
            console.log(`${this.name} (a ${this.breed}) barks`);
        }
    }

    const rex = new Dog("Rex", "Labrador");
    rex.move(10);   // inherited from Animal → "Rex moved 10m"
    rex.bark();     // defined on Dog       → "Rex (a Labrador) barks"

    // Notice: Dog didn't redefine `name` or `move()` — it reuses them
    // from Animal. That's the value of inheritance.
}



// ============================================================
//   PILLAR 3 — POLYMORPHISM
// ============================================================
//
//   POLY = many, MORPH = form.
//   The same method call behaves DIFFERENTLY depending on the actual
//   object type at runtime.
//
//   WHY: write code that works with a FAMILY of types without caring
//        which specific subclass it's dealing with.
{
    class Shape {
        area(): number { return 0; }   // base
    }

    class Circle extends Shape {
        constructor(public radius: number) { super(); }
        area(): number {                                    // overridden
            return Math.PI * this.radius ** 2;
        }
    }

    class Square extends Shape {
        constructor(public side: number) { super(); }
        area(): number {                                    // overridden
            return this.side ** 2;
        }
    }

    // We treat each item as a generic `Shape`, but at runtime each
    // call goes to the CORRECT class's `area()`.
    const shapes: Shape[] = [new Circle(5), new Square(4)];

    for (const s of shapes) {
        console.log(s.area().toFixed(2));   // 78.54   then   16.00
    }

    // The loop doesn't know (or care) whether each shape is a Circle
    // or a Square. Tomorrow you can add a `Triangle extends Shape`
    // and the loop still works — no changes needed.
    // THAT is polymorphism.
}



// ============================================================
//   PILLAR 4 — ABSTRACTION
// ============================================================
//
//   Hide the COMPLEX implementation, expose only what callers NEED.
//   Define WHAT something does, not HOW.
//
//   Two tools in TypeScript:
//     - abstract class  → partial contract + some shared implementation
//     - interface       → pure contract, no implementation at all
{
    // -- abstract class --
    abstract class Shape {
        // Abstract method: NO body. Subclasses MUST implement it.
        abstract area(): number;

        // Concrete method: uses the abstract method polymorphically.
        describe(): void {
            console.log(`area = ${this.area().toFixed(2)}`);
        }
    }

    class Triangle extends Shape {
        constructor(public base: number, public height: number) { super(); }
        area(): number { return 0.5 * this.base * this.height; }
    }

    // const s = new Shape();              // ❌ Cannot instantiate abstract class
    new Triangle(4, 5).describe();         // "area = 10.00"


    // -- interface --
    // Pure contract — no code, just the SHAPE of what's required.
    interface Drawable {
        draw(): void;
    }

    interface Resizable {
        resize(factor: number): void;
    }

    // A class can implement many interfaces (but extend only one class).
    class Button implements Drawable, Resizable {
        constructor(public label: string, public width: number) { }
        draw() { console.log(`[${this.label}] width=${this.width}`); }
        resize(f: number) { this.width *= f; }
    }

    const btn = new Button("OK", 100);
    btn.draw();         // "[OK] width=100"
    btn.resize(1.5);
    btn.draw();         // "[OK] width=150"

    // Abstract class vs Interface — quick rule of thumb:
    //   abstract class →  "is a kind of X" + can share code/state
    //   interface      →  "is capable of X" — pure contract, multi-implement
}



// ============================================================
//   THE FOUR PILLARS, RECAPPED
// ============================================================
//
//   1. ENCAPSULATION  — Bundle data + methods. Hide internals.
//                       (keyword: private)
//
//   2. INHERITANCE    — Reuse via an "is-a" relationship.
//                       (keyword: extends, super)
//
//   3. POLYMORPHISM   — Same call → different behavior at runtime.
//                       (mechanism: method override)
//
//   4. ABSTRACTION    — Define WHAT, not HOW. Hide complexity.
//                       (keywords: abstract, interface)
//
//
//   ONE-PARAGRAPH MENTAL MODEL
//   --------------------------
//   You define a CLASS (a blueprint). You create OBJECTS from it
//   (`new`). Each object has its own data but shares methods. Use
//   ENCAPSULATION to protect that data. Use INHERITANCE when one
//   class is a kind of another. Once you have a family of related
//   classes, POLYMORPHISM lets you write code against the parent
//   type that works for any child. ABSTRACTION (abstract / interface)
//   nails down the contract without forcing a specific implementation.
//
//   Master those four ideas and you've got OOP.
