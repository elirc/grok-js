"""
BEGINNER GOAL:
Learn how to repeat code using loops.
Loops let you run the same block of code many times without writing it over and over.

REAL WORLD USE CASE:
- Going through every item in a list
- Processing data until a condition is met
- Repeating actions a specific number of times

CONCEPTS COVERED:
- for loop
- while loop
- range()
- break and continue
- else clause with loops
"""

# ============================================
# STEP 1: for loop with range
# ============================================

for i in range(5):
    print("Count:", i)
# 0 1 2 3 4

for i in range(2, 6):
    print(i)
# 2 3 4 5

# ============================================
# STEP 2: Looping through a list
# ============================================

fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

# ============================================
# STEP 3: while loop
# ============================================

count = 0
while count < 3:
    print("While count:", count)
    count += 1

# ============================================
# STEP 4: break and continue
# ============================================

for number in range(1, 10):
    if number == 5:
        break          # Stop the loop
    if number % 2 == 0:
        continue       # Skip even numbers
    print(number)


"""
LINE-BY-LINE BREAKDOWN:

for i in range(5):
- Loops 5 times, i goes from 0 to 4

for fruit in fruits:
- Goes through each item in the list

while count < 3:
- Keeps looping as long as the condition is True

break
- Immediately exits the loop

continue
- Skips the rest of the current iteration

NOOB TRANSLATION:

A loop is like telling Python:
"Keep doing this action until I say stop."

- for = "do this for each thing in this group"
- while = "keep doing this while this is true"

COMMON MISTAKES:

1. Infinite while loops (forgetting to update the variable)
2. Off-by-one errors with range()
3. Modifying a list while looping over it with for

TRY CHANGING THIS:

1. Use for to print numbers from 10 down to 1.
2. Use while to count up to 5.
3. Use continue to skip multiples of 3.

MINI CHALLENGE:

Create a list of 6 numbers.
Use a for loop to:
- Print each number
- Add up all the numbers
- Print the final sum

Bonus: Stop early if the sum goes over 100 using break.
"""
