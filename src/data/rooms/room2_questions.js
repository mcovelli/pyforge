export const exercises = [
  { id: 'ex1', title: 'Customer Classifier', description: 'Classify each customer by spending: "platinum" (>= 10000), "gold" (>= 5000), "silver" (>= 1000), "bronze" (< 1000). Store in `tiers` list.', starterCode: 'spending = [12500, 3200, 8700, 450, 6100, 950, 15000, 2800]\n\ntiers = []\nfor amount in spending:\n    # Classify each customer\n    pass\n\nprint(tiers)', tests: [
    { name: 'Correct length', code: 'assert len(tiers) == 8' },
    { name: 'First is platinum', code: 'assert tiers[0] == "platinum"' },
    { name: 'Fourth is bronze', code: 'assert tiers[3] == "bronze"' },
    { name: 'All classified', code: 'assert tiers == ["platinum","silver","gold","bronze","gold","bronze","platinum","silver"]' }
  ]},
  { id: 'ex2', title: 'Running Total Calculator', description: 'Calculate a running total of sales. Create `running_totals` where each element is the sum of all sales up to that point. Also find `first_above_500` (index where total first exceeds 500).', starterCode: 'sales = [120, 85, 200, 150, 90, 175, 210]\n\nrunning_totals = []\nfirst_above_500 = -1\n\n\n\nprint(f"Running totals: {running_totals}")\nprint(f"First above 500 at index: {first_above_500}")', tests: [
    { name: 'Totals correct', code: 'assert running_totals == [120, 205, 405, 555, 645, 820, 1030]' },
    { name: 'First above 500', code: 'assert first_above_500 == 3' }
  ]},
  { id: 'ex3', title: 'Comprehension Converter', description: 'Use list comprehensions to create: `squared` (squares of 1-10), `even_squares` (squares of even numbers 1-10), `price_labels` (formatted prices for items > $20).', starterCode: 'prices = [15.99, 42.50, 8.99, 29.99, 55.00, 12.50, 37.99]\n\nsquared = \neven_squares = \nprice_labels = \n\nprint(f"Squared: {squared}")\nprint(f"Even squares: {even_squares}")\nprint(f"Labels: {price_labels}")', tests: [
    { name: 'Squared', code: 'assert squared == [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]' },
    { name: 'Even squares', code: 'assert even_squares == [4, 16, 36, 64, 100]' },
    { name: 'Price labels count', code: 'assert len(price_labels) == 4' }
  ]},
  { id: 'ex4', title: 'Investment Growth Simulator', description: 'Simulate compound interest using a while loop. Starting with `principal` of 10000 at 7% annual rate, find how many `years` it takes to double. Also build `yearly_values` list tracking balance each year.', starterCode: 'principal = 10000\nrate = 0.07\ntarget = principal * 2\n\nbalance = principal\nyears = 0\nyearly_values = [balance]\n\n# Use while loop to simulate growth\n\n\nprint(f"Doubled in {years} years")\nprint(f"Final balance: ${balance:,.2f}")', tests: [
    { name: 'Years correct', code: 'assert years == 11' },
    { name: 'Balance doubled', code: 'assert balance >= 20000' },
    { name: 'Yearly values tracked', code: 'assert len(yearly_values) == 12' }
  ]},
  { id: 'ex5', title: 'FizzBuzz Analytics', description: 'Classic FizzBuzz with a twist: for numbers 1-30, create a list `results` where: multiples of 15 → "FizzBuzz", multiples of 3 → "Fizz", multiples of 5 → "Buzz", else → the number itself. Count each category in `counts` dict.', starterCode: 'results = []\ncounts = {"Fizz": 0, "Buzz": 0, "FizzBuzz": 0, "number": 0}\n\n\n\nprint(f"Results: {results[:15]}...")\nprint(f"Counts: {counts}")', tests: [
    { name: 'Length', code: 'assert len(results) == 30' },
    { name: 'FizzBuzz at 15', code: 'assert results[14] == "FizzBuzz"' },
    { name: 'Fizz at 3', code: 'assert results[2] == "Fizz"' },
    { name: 'Buzz at 5', code: 'assert results[4] == "Buzz"' },
    { name: 'Number at 1', code: 'assert results[0] == 1' },
    { name: 'FizzBuzz count', code: 'assert counts["FizzBuzz"] == 2' }
  ]},
  { id: 'ex6', title: 'Nested Loop: Multiplication Table', description: 'Create a multiplication table as a list of lists. `table[i][j]` should be `(i+1) * (j+1)` for a 5x5 table. Also find the `max_val` in the table.', starterCode: 'table = []\n\n# Build 5x5 multiplication table\n\n\nmax_val = \n\nfor row in table:\n    print(row)\nprint(f"Max value: {max_val}")', tests: [
    { name: 'Table size', code: 'assert len(table) == 5 and len(table[0]) == 5' },
    { name: 'Corner value', code: 'assert table[0][0] == 1' },
    { name: '3x4', code: 'assert table[2][3] == 12' },
    { name: 'Max value', code: 'assert max_val == 25' }
  ]},
  { id: 'ex7', title: 'Data Filter Pipeline', description: 'Given employee records, use comprehensions to create: `names` (all names), `high_earners` (names where salary >= 80000), `dept_salaries` (dict of name→salary for Analytics dept only).', starterCode: 'employees = [\n    {"name": "Alice", "dept": "Analytics", "salary": 85000},\n    {"name": "Bob", "dept": "Sales", "salary": 62000},\n    {"name": "Carol", "dept": "Analytics", "salary": 92000},\n    {"name": "Dave", "dept": "Engineering", "salary": 105000},\n    {"name": "Eve", "dept": "Sales", "salary": 71000}\n]\n\nnames = \nhigh_earners = \ndept_salaries = \n\nprint(f"Names: {names}")\nprint(f"High earners: {high_earners}")\nprint(f"Analytics salaries: {dept_salaries}")', tests: [
    { name: 'All names', code: 'assert names == ["Alice","Bob","Carol","Dave","Eve"]' },
    { name: 'High earners', code: 'assert sorted(high_earners) == ["Alice","Carol","Dave"]' },
    { name: 'Dept salaries', code: 'assert dept_salaries == {"Alice": 85000, "Carol": 92000}' }
  ]},
  { id: 'ex8', title: 'Pattern Detector', description: 'Analyze a sequence of stock prices. Find `up_days` (count of days price went up), `down_days` (count went down), `longest_streak` (longest consecutive run of increases), and `direction` list ("up"/"down"/"flat").', starterCode: 'prices = [100, 105, 103, 108, 112, 115, 110, 108, 112, 118]\n\nup_days = 0\ndown_days = 0\nlongest_streak = 0\ndirection = []\n\n\n\nprint(f"Up days: {up_days}")\nprint(f"Down days: {down_days}")\nprint(f"Longest up streak: {longest_streak}")\nprint(f"Directions: {direction}")', tests: [
    { name: 'Up days', code: 'assert up_days == 6' },
    { name: 'Down days', code: 'assert down_days == 3' },
    { name: 'Longest streak', code: 'assert longest_streak == 3' },
    { name: 'Direction length', code: 'assert len(direction) == 9' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the Grade Calculator', description: 'This grade calculator has multiple logic bugs. Fix all of them.', buggyCode: 'scores = [85, 92, 78, 90, 65]\n\n# Calculate average\ntotal = 0\nfor score in scores:\ntotal += score\naverage = total / len(scores)\n\n# Determine pass/fail\nif average > 70:\n    result = "Pass"\nif average > 85:\n    result = "Honors"\nelse:\n    result = "Fail"\n\nprint(f"Average: {average}, Result: {result}")', solution: 'scores = [85, 92, 78, 90, 65]\n\ntotal = 0\nfor score in scores:\n    total += score\naverage = total / len(scores)\n\nif average >= 85:\n    result = "Honors"\nelif average >= 70:\n    result = "Pass"\nelse:\n    result = "Fail"\n\nprint(f"Average: {average}, Result: {result}")', hints: ['The loop body must be indented', 'if/if/else should be if/elif/else, and check highest threshold first', 'Use >= instead of > for the boundary value'] },
  { id: 'sc2', title: 'Fix the Data Processor', description: 'This loop processes sales data but has off-by-one and logic errors.', buggyCode: 'data = [120, 0, -50, 200, 150, 0, 80]\n\nprocessed = []\nskipped = 0\n\nfor i in range(1, len(data)):\n    if data[i] <= 0:\n        skipped += 1\n        break\n    processed.append(data[i] * 1.1)\n\nprint(f"Processed: {processed}")\nprint(f"Skipped: {skipped}")', solution: 'data = [120, 0, -50, 200, 150, 0, 80]\n\nprocessed = []\nskipped = 0\n\nfor i in range(0, len(data)):\n    if data[i] <= 0:\n        skipped += 1\n        continue\n    processed.append(data[i] * 1.1)\n\nprint(f"Processed: {processed}")\nprint(f"Skipped: {skipped}")', hints: ['range(1, ...) skips the first element — should start at 0', 'break stops the entire loop — use continue to skip one item'] },
  { id: 'sc3', title: 'Fix the Comprehension', description: 'These list comprehensions have syntax and logic errors.', buggyCode: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Get even numbers doubled\neven_doubled = [x * 2 for x in numbers if x % 2 = 0]\n\n# Classify as small/big\nlabels = ["small" if x < 5 "big" for x in numbers]\n\n# Create dict of number: square\nsquares = {x: x ** 2 for x in range(1, 6)\n\nprint(even_doubled)\nprint(labels)\nprint(squares)', solution: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\neven_doubled = [x * 2 for x in numbers if x % 2 == 0]\n\nlabels = ["small" if x < 5 else "big" for x in numbers]\n\nsquares = {x: x ** 2 for x in range(1, 6)}\n\nprint(even_doubled)\nprint(labels)\nprint(squares)', hints: ['Use == for comparison, = is assignment', 'Conditional expressions need "else": "small" if x < 5 else "big"', 'Missing closing brace on the dict comprehension'] }
];

export const quiz = [
  { id: 'q1', type: 'code_output', question: 'What does this print?\n```python\nx = 15\nif x > 20:\n    print("A")\nelif x > 10:\n    print("B")\nelif x > 5:\n    print("C")\nelse:\n    print("D")\n```', options: ['A', 'B', 'C', 'B C'], correct: 1 },
  { id: 'q2', type: 'multiple_choice', question: 'What is the difference between `break` and `continue`?', options: ['break pauses, continue stops', 'break exits the loop entirely, continue skips to next iteration', 'They are the same', 'break skips, continue exits'], correct: 1 },
  { id: 'q3', type: 'code_output', question: 'What does this produce?\n```python\nprint([x**2 for x in range(5)])\n```', options: ['[1, 4, 9, 16, 25]', '[0, 1, 4, 9, 16]', '[0, 1, 4, 9, 16, 25]', 'Error'], correct: 1 },
  { id: 'q4', type: 'multiple_choice', question: 'What does `enumerate()` provide?', options: ['Just the values', 'Just the indices', 'Both index and value as pairs', 'The length'], correct: 2 },
  { id: 'q5', type: 'code_output', question: 'What is printed?\n```python\nfor i in range(3):\n    for j in range(2):\n        if j == 1:\n            break\n        print(f"{i},{j}", end=" ")\n```', options: ['0,0 1,0 2,0', '0,0 0,1 1,0 1,1 2,0 2,1', '0,0', '0,0 0,1'], correct: 0 },
  { id: 'q6', type: 'scenario', question: 'You need to process 1 million rows and skip any with invalid data. Which approach is best?', options: ['Use break to stop on first error', 'Use continue to skip bad rows and process the rest', 'Remove all bad rows before the loop', 'Wrap entire loop in try/except'], correct: 1 },
  { id: 'q7', type: 'code_output', question: 'What does this return?\n```python\nresult = ["even" if x % 2 == 0 else "odd" for x in [1,2,3]]\nprint(result)\n```', options: ["['odd','even','odd']", "['even','odd','even']", "['odd','odd','odd']", "Error"], correct: 0 },
  { id: 'q8', type: 'multiple_choice', question: 'What does `zip()` do when given lists of different lengths?', options: ['Raises an error', 'Pads shorter list with None', 'Stops at the shortest list', 'Repeats shorter list'], correct: 2 },
  { id: 'q9', type: 'code_output', question: 'What is the value of `count`?\n```python\ncount = 0\nx = 1\nwhile x < 100:\n    x *= 2\n    count += 1\nprint(count)\n```', options: ['6', '7', '50', '100'], correct: 1 },
  { id: 'q10', type: 'multiple_choice', question: 'Which is a valid dictionary comprehension?', options: ['{x: x**2 for x in range(5)}', '[x: x**2 for x in range(5)]', '{x => x**2 for x in range(5)}', 'dict(x, x**2 for x in range(5))'], correct: 0 },
  { id: 'q11', type: 'scenario', question: 'You need to categorize 50,000 transactions into 5 tiers based on amount. Best approach?', options: ['Nested if/if/if for each tier', 'if/elif/elif chain ordered from highest to lowest', 'Separate loops for each tier', '50,000 individual if statements'], correct: 1 },
  { id: 'q12', type: 'code_output', question: 'What does this produce?\n```python\nnums = [1, 2, 3, 4, 5]\nresult = [x for x in nums if x > 3]\nprint(len(result))\n```', options: ['3', '2', '5', '0'], correct: 1 },
  { id: 'q13', type: 'multiple_choice', question: 'What is the main danger of a while loop?', options: ['It is slower than for loops', 'It can run forever if the condition never becomes False', 'It cannot access list elements', 'It uses more memory'], correct: 1 },
  { id: 'q14', type: 'code_output', question: 'What prints?\n```python\nfor x in range(5):\n    if x == 3:\n        continue\n    print(x, end=" ")\n```', options: ['0 1 2 3 4', '0 1 2 4', '0 1 2', '3'], correct: 1 },
  { id: 'q15', type: 'multiple_choice', question: 'What is the Pythonic way to create a list of squares of even numbers from 1-20?', options: ['Use a for loop with append', '[x**2 for x in range(1,21) if x % 2 == 0]', 'map(lambda x: x**2, filter(...))', 'numpy.square()'], correct: 1 }
];
