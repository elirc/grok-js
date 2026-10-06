# Python Learning Lab

A beginner-friendly collection of small, focused Python example files.

The goal of this project is **not** to build a production app.  
The goal is to help a complete beginner learn Python by studying many tiny, realistic examples.

Each file teaches **one core concept** using plain Python.  
No frameworks, no complex setup.

---

## What This Project Is

- 30 numbered lessons (`01`–`30`), plus think-predict / bug-hunt / narrative variants for some topics
- Each file = one lesson or tiny project
- All 30 core lessons run with plain `python <file>` (checked 2026-10-06). `23` waits for keyboard input, and `22`, `26`, and `30` write scratch files (`data.json`, `example.txt`, `notes.txt`) into the current folder, so delete those afterwards rather than committing them
- Every file is heavily commented for learning
- Examples use real-life beginner scenarios: user profiles, shopping carts, todo lists, login checks, price calculators, filtering data, formatting names, etc.
- Designed to be read, typed, and experimented with

---

## How a Beginner Should Study the Files

1. Open one file at a time in a code editor (VS Code recommended) or any text editor.
2. Read the big comment block at the **top** first.
3. Read the code slowly.
4. Read every comment right after important lines.
5. Read the big sections at the **bottom**:
   - LINE-BY-LINE BREAKDOWN
   - NOOB TRANSLATION
   - COMMON MISTAKES
   - TRY CHANGING THIS
   - MINI CHALLENGE
6. Type the code yourself instead of just reading.
7. Run the file with Python: `python 01-variables-and-values.py`

---

## Recommended Order

Follow the numbers in order. Each file builds on previous ones.

01. variables-and-values.py
02. strings-and-methods.py
03. numbers-and-math.py
04. booleans-and-comparisons.py
05. conditionals-if-else.py
06. lists-basics.py
07. list-methods.py
08. list-comprehensions.py
09. tuples-sets-and-dicts.py
10. functions-basics.py
11. function-arguments.py
12. return-values.py
13. lambda-functions.py
14. loops-for-while.py
15. looping-through-collections.py
16. scope-and-namespaces.py
17. string-formatting.py
18. unpacking-and-destructuring.py
19. comprehensions-and-generators.py
20. decorators.py
21. modules-and-packages.py
22. file-handling.py
23. error-handling-try-except.py
24. classes-and-objects.py
25. inheritance-and-polymorphism.py
26. context-managers.py
27. iterators-and-generators.py
28. async-await-basics.py
29. type-hinting-basics.py
30. standard-library-highlights.py

You can skip around later, but start from the beginning.

---

## How to Run the Code

- Make sure you have Python 3.10+ installed.
- Open a terminal in this folder.
- Run any file: `python 01-variables-and-values.py`
- For files that use input(), just type when prompted.
- Many files can also be copied into online Python playgrounds.

---

## How to Use the Comments

This project uses comments as your teacher.

- Big blocks at the top explain the lesson.
- Inline comments (#) explain **specific lines**.
- Bottom sections give deeper explanations and practice ideas.

Read the comments like you are having a conversation with the code.

---

## How to Experiment with Changing Values

The best way to learn is to **change things** and see what happens.

Inside each file you will find a section:

```
# TRY CHANGING THIS:
# 1. ...
# 2. ...
# 3. ...
```

Do these experiments:
- Change values
- Add or remove items from lists/dicts
- Change function arguments
- Break things on purpose to see the errors

After you change something, save and re-run the file.

Ask yourself:
- What changed in the output?
- Why did it change?
- What would break if I did X?

---

## Tips for Absolute Beginners

- Don't try to memorize everything on the first read.
- Focus on understanding **what each line does**.
- Pay special attention to:
  - How data is stored (variables)
  - How we group data (lists, dicts, tuples)
  - How we reuse code (functions)
  - How we make decisions (conditionals)
  - How we repeat work (loops)
- It is 100% okay to re-read a file multiple times.

---

## What You Will Learn

By the end of this lab you will understand:

- Variables and values
- Strings, numbers, booleans
- Lists, tuples, sets, dictionaries
- Functions, arguments, return values, lambdas, decorators
- Loops and conditionals
- Scope and namespaces
- String formatting
- Unpacking and comprehensions
- Error handling
- Basic OOP (classes, inheritance)
- Context managers, iterators, generators
- Async basics
- Type hints
- Common standard library modules

---

## Final Advice

Read one file per session at first.  
Really play with the code.  
Type things. Break things. Fix them.

This is how real developers learned Python.

Good luck! You've got this.

---

## Expanded Examples and Coding Problems

The `examples/` folder is now part of a massive ~20x expansion (project total over 1,500 narrated example files). Each contains code followed by detailed junior-friendly narration. Each file contains concrete code followed by clear English explanations aimed at junior engineers. Topics include list comprehensions, generators, context managers, decorators, async, type hints, error handling patterns, OOP, and more.

### coding-problems/
Contains focused problem sets (8-12+ problems per file, with solutions in comments):
- problem-01-variables.py
- problem-02-strings.py
- problem-03-lists.py
- problem-04-dicts.py
- problem-05-functions.py (NEW)
- problem-06-oop.py (NEW)
- problem-07-file-async.py (NEW)
- problem-08-comprehensions-generators.py (NEW)

### examples/
In-depth multi-example walkthrough files:
- advanced-functions.py
- advanced-strings-examples.py
- example-oop-patterns.py (NEW)
- example-async-patterns.py (NEW)

Work through problems first, then read the examples for patterns. Run everything.

---

## New Teaching Approaches (Added 2026)

Besides the original 30 lessons + problems + examples, many topics now have companion files using different teaching styles:

- `XX-topic-think-predict.py` — Guess and predict before seeing answers (active recall).
- `XX-topic-bug-hunt.py` — Debug intentionally broken code.
- `XX-topic-narrative.py` — Follow a story of building "SnackLog" while learning each concept.

The same realistic scenarios are used. Read the classic version for explanation, then use the new variants to practice in different ways.

