export const exercises = [
  { id: 'ex1', title: 'Revenue Calculator', description: 'Write a function `calculate_revenue(units_sold, unit_price, discount=0)` that returns the total revenue after applying a discount percentage (0-100).', starterCode: '# Write your function here\n\n\n# Test it\nresult1 = calculate_revenue(100, 29.99, 15)\nresult2 = calculate_revenue(50, 10.00)\nprint(f"With discount: ${result1:,.2f}")\nprint(f"No discount: ${result2:,.2f}")', tests: [
    { name: 'With discount', code: 'assert calculate_revenue(100, 29.99, 15) == 2549.15' },
    { name: 'No discount', code: 'assert calculate_revenue(50, 10.00) == 500.00' },
    { name: 'Zero units', code: 'assert calculate_revenue(0, 29.99) == 0' },
    { name: 'Full discount', code: 'assert calculate_revenue(10, 100, 100) == 0' }
  ]},
  { id: 'ex2', title: 'Statistics Suite', description: 'Write `describe_data(numbers)` returning a dict with keys: "count", "sum", "mean", "min", "max", "range". All values rounded to 2 decimals.', starterCode: 'def describe_data(numbers):\n    pass\n\n\nstats = describe_data([23, 45, 67, 12, 89, 34, 56])\nfor key, val in stats.items():\n    print(f"{key}: {val}")', tests: [
    { name: 'Count', code: 'r = describe_data([23,45,67,12,89,34,56])\nassert r["count"] == 7' },
    { name: 'Mean', code: 'r = describe_data([23,45,67,12,89,34,56])\nassert r["mean"] == 46.57' },
    { name: 'Range', code: 'r = describe_data([23,45,67,12,89,34,56])\nassert r["range"] == 77' },
    { name: 'Min', code: 'r = describe_data([23,45,67,12,89,34,56])\nassert r["min"] == 12' },
    { name: 'Max', code: 'r = describe_data([23,45,67,12,89,34,56])\nassert r["max"] == 89' }
  ]},
  { id: 'ex3', title: 'Sort with Lambda', description: 'Given product tuples (name, price, rating), use sorted() with lambda to create: `by_price` (ascending), `by_rating` (descending), `by_value` (rating/price ratio, descending).', starterCode: 'products = [\n    ("Widget A", 29.99, 4.5),\n    ("Widget B", 49.99, 4.8),\n    ("Widget C", 19.99, 4.2),\n    ("Widget D", 39.99, 4.9),\n]\n\nby_price = \nby_rating = \nby_value = \n\nprint("By price:", [p[0] for p in by_price])\nprint("By rating:", [p[0] for p in by_rating])\nprint("Best value:", [p[0] for p in by_value])', tests: [
    { name: 'By price first', code: 'assert by_price[0][0] == "Widget C"' },
    { name: 'By price last', code: 'assert by_price[-1][0] == "Widget B"' },
    { name: 'By rating first', code: 'assert by_rating[0][0] == "Widget D"' }
  ]},
  { id: 'ex4', title: 'Flexible Aggregator', description: 'Write `aggregate(*values, operation="sum")` accepting any number of values and operation keyword ("sum", "mean", "max", "min", "count"). Return the result.', starterCode: 'def aggregate(*values, operation="sum"):\n    pass\n\n\nprint(aggregate(10, 20, 30))                  # 60\nprint(aggregate(10, 20, 30, operation="mean")) # 20.0\nprint(aggregate(5, 15, 3, 22, operation="max")) # 22\nprint(aggregate(5, 15, 3, operation="count"))   # 3', tests: [
    { name: 'Sum default', code: 'assert aggregate(10,20,30) == 60' },
    { name: 'Mean', code: 'assert aggregate(10,20,30, operation="mean") == 20.0' },
    { name: 'Max', code: 'assert aggregate(5,15,3,22, operation="max") == 22' },
    { name: 'Min', code: 'assert aggregate(5,15,3,22, operation="min") == 3' },
    { name: 'Count', code: 'assert aggregate(5,15,3, operation="count") == 3' }
  ]},
  { id: 'ex5', title: 'Data Validator', description: 'Write `validate_record(record)` that checks a dict has "name" (non-empty string), "age" (int, 0-150), "email" (contains "@"). Return a dict with "valid" (bool) and "errors" (list of strings).', starterCode: 'def validate_record(record):\n    errors = []\n    # Check name\n    \n    # Check age\n    \n    # Check email\n    \n    return {"valid": len(errors) == 0, "errors": errors}\n\n\nprint(validate_record({"name": "Alice", "age": 28, "email": "a@b.com"}))\nprint(validate_record({"name": "", "age": -5, "email": "bad"}))\nprint(validate_record({"name": "Bob"}))', tests: [
    { name: 'Valid record', code: 'r = validate_record({"name":"Alice","age":28,"email":"a@b.com"})\nassert r["valid"] == True and len(r["errors"]) == 0' },
    { name: 'All invalid', code: 'r = validate_record({"name":"","age":-5,"email":"bad"})\nassert r["valid"] == False and len(r["errors"]) == 3' },
    { name: 'Missing fields', code: 'r = validate_record({"name":"Bob"})\nassert r["valid"] == False' }
  ]},
  { id: 'ex6', title: 'Function Composition', description: 'Create three functions: `clean_text(s)` strips and lowercases, `extract_words(s)` splits into list, `count_unique(words)` returns count of unique words. Then `analyze(text)` composes all three to return the unique word count.', starterCode: 'def clean_text(s):\n    pass\n\ndef extract_words(s):\n    pass\n\ndef count_unique(words):\n    pass\n\ndef analyze(text):\n    pass\n\n\nresult = analyze("  Hello World hello WORLD  ")\nprint(f"Unique words: {result}")', tests: [
    { name: 'Clean text', code: 'assert clean_text("  HELLO  ") == "hello"' },
    { name: 'Extract words', code: 'assert extract_words("hello world") == ["hello", "world"]' },
    { name: 'Count unique', code: 'assert count_unique(["a","b","a","c"]) == 3' },
    { name: 'Analyze composed', code: 'assert analyze("  Hello World hello WORLD  ") == 2' }
  ]},
  { id: 'ex7', title: 'Grade Processor', description: 'Write `process_grades(grades, curve=0)` that takes a list of numeric grades, applies a curve (add curve points to each), caps at 100, then returns a dict with "grades" (curved list), "average", "highest", "passing" (count >= 70).', starterCode: 'def process_grades(grades, curve=0):\n    pass\n\n\nresult = process_grades([65, 72, 88, 45, 91, 78], curve=5)\nprint(result)', tests: [
    { name: 'Grades curved', code: 'r = process_grades([65,72,88,45,91,78], curve=5)\nassert r["grades"] == [70,77,93,50,96,83]' },
    { name: 'Capped at 100', code: 'r = process_grades([98,99], curve=10)\nassert r["grades"] == [100,100]' },
    { name: 'Average', code: 'r = process_grades([65,72,88,45,91,78], curve=5)\nassert round(r["average"], 2) == 78.17' },
    { name: 'Passing count', code: 'r = process_grades([65,72,88,45,91,78], curve=5)\nassert r["passing"] == 5' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the Report Generator', description: 'Fix all bugs in this report generator.', buggyCode: 'def generate_report(data, title="Report", show_total=True)\n    print(f"=== {title} ===")\n    for item in data:\n        name = item[0]\n        value = item[1]\n        print(f"  {name}: ${value:,.2f}")\n    \n    if show_total:\n        total = sum(item[1] for item in data)\n        print(f"  Total: ${total:,.2f}")\n    \n    return total\n\nsales_data = [("North", 45000), ("South", 32000), ("East", 28000)]\nresult = generate_report(sales_data, title="Q3 Sales")\nprint(f"Grand total: {result}")', solution: 'def generate_report(data, title="Report", show_total=True):\n    print(f"=== {title} ===")\n    total = 0\n    for item in data:\n        name = item[0]\n        value = item[1]\n        print(f"  {name}: ${value:,.2f}")\n    \n    if show_total:\n        total = sum(item[1] for item in data)\n        print(f"  Total: ${total:,.2f}")\n    \n    return total\n\nsales_data = [("North", 45000), ("South", 32000), ("East", 28000)]\nresult = generate_report(sales_data, title="Q3 Sales")\nprint(f"Grand total: {result}")', hints: ['Function definition needs a colon at the end', 'If show_total is False, total is never defined but still returned — initialize it before the if'] },
  { id: 'sc2', title: 'Fix the Lambda Sorter', description: 'Fix this code that sorts and filters employee data.', buggyCode: 'employees = [\n    {"name": "Alice", "salary": 85000, "dept": "Analytics"},\n    {"name": "Bob", "salary": 62000, "dept": "Sales"},\n    {"name": "Carol", "salary": 92000, "dept": "Analytics"},\n]\n\n# Sort by salary descending\nsorted_emps = sorted(employees, key=lambda e: e[salary], reverse=True)\n\n# Filter high earners\nhigh = filter(lambda e: e["salary"] > 70000, employees)\n\n# Get names\nnames = map(lambda e: e["name"] high)\n\nprint(list(names))', solution: 'employees = [\n    {"name": "Alice", "salary": 85000, "dept": "Analytics"},\n    {"name": "Bob", "salary": 62000, "dept": "Sales"},\n    {"name": "Carol", "salary": 92000, "dept": "Analytics"},\n]\n\nsorted_emps = sorted(employees, key=lambda e: e["salary"], reverse=True)\n\nhigh = filter(lambda e: e["salary"] > 70000, employees)\n\nnames = map(lambda e: e["name"], high)\n\nprint(list(names))', hints: ['Dictionary keys need quotes: e["salary"] not e[salary]', 'map() needs a comma between function and iterable'] },
  { id: 'sc3', title: 'Fix the Scope Bug', description: 'This code has scope-related bugs. Fix them.', buggyCode: 'discount = 0.1\n\ndef apply_discount(price):\n    discount = 0.2  # Meant to update global\n    final = price * (1 - discount)\n    return final\n\ndef get_summary(prices):\n    for p in prices:\n        total += apply_discount(p)\n    return total\n\nprices = [100, 200, 300]\nresult = get_summary(prices)\nprint(f"Total: {result}")\nprint(f"Discount used: {discount}")', solution: 'discount = 0.1\n\ndef apply_discount(price):\n    final = price * (1 - discount)  # Read global discount\n    return final\n\ndef get_summary(prices):\n    total = 0  # Must initialize before using\n    for p in prices:\n        total += apply_discount(p)\n    return total\n\nprices = [100, 200, 300]\nresult = get_summary(prices)\nprint(f"Total: {result}")\nprint(f"Discount used: {discount}")', hints: ['The local discount=0.2 shadows the global — remove it to use global value', 'total is used before being assigned in get_summary — initialize it to 0'] }
];

export const quiz = [
  { id: 'q1', type: 'multiple_choice', question: 'What is the correct way to define a function with a default parameter?', options: ['def func(x, y=10):', 'def func(x=10, y):', 'def func(x; y=10):', 'function func(x, y=10):'], correct: 0 },
  { id: 'q2', type: 'code_output', question: 'What does this return?\n```python\ndef f(a, b=2, c=3):\n    return a + b * c\nprint(f(1, c=5))\n```', options: ['11', '15', '8', 'Error'], correct: 0 },
  { id: 'q3', type: 'multiple_choice', question: 'What does *args allow in a function?', options: ['Named keyword arguments', 'A variable number of positional arguments', 'Default values for all parameters', 'Type checking'], correct: 1 },
  { id: 'q4', type: 'code_output', question: 'What does this print?\n```python\ndata = [(3,"c"),(1,"a"),(2,"b")]\nresult = sorted(data, key=lambda x: x[0])\nprint(result[0])\n```', options: ['(3, "c")', '(1, "a")', '1', '"a"'], correct: 1 },
  { id: 'q5', type: 'scenario', question: 'You need a reusable data quality checker with different validation rules. Best design?', options: ['Hardcode all rules in one function', 'Separate functions for each rule, pass as arguments', 'Global variables for rules', 'Write everything as lambdas'], correct: 1 },
  { id: 'q6', type: 'code_output', question: 'What happens?\n```python\nx = 10\ndef change():\n    x = 20\nchange()\nprint(x)\n```', options: ['20', '10', 'Error', 'None'], correct: 1 },
  { id: 'q7', type: 'multiple_choice', question: 'Which correctly returns multiple values?', options: ['return a, b, c', 'return (a; b; c)', 'yield a, b, c', 'output a, b, c'], correct: 0 },
  { id: 'q8', type: 'code_output', question: 'What is printed?\n```python\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\nprint(greet(greeting="Hi", name="Data"))\n```', options: ['Hello, Data!', 'Hi, Data!', 'Error', 'Hi, Hello!'], correct: 1 },
  { id: 'q9', type: 'multiple_choice', question: 'What is a pure function?', options: ['A function with no parameters', 'A function that always returns same output for same input with no side effects', 'A function that only uses pure Python', 'A function without return statement'], correct: 1 },
  { id: 'q10', type: 'code_output', question: 'What does this print?\n```python\ndef func(*args):\n    return len(args)\nprint(func(1, 2, 3, 4, 5))\n```', options: ['1', '5', 'Error', '(1,2,3,4,5)'], correct: 1 },
  { id: 'q11', type: 'multiple_choice', question: 'What is the purpose of a docstring?', options: ['To make code run faster', 'To document what a function does, its parameters, and return values', 'To declare variable types', 'To comment out code'], correct: 1 },
  { id: 'q12', type: 'code_output', question: 'What does this produce?\n```python\nsquare = lambda x: x ** 2\nresult = list(map(square, [1, 2, 3]))\nprint(result)\n```', options: ['[1, 2, 3]', '[1, 4, 9]', '[2, 4, 6]', 'Error'], correct: 1 },
  { id: 'q13', type: 'scenario', question: 'A function needs to handle both single items and lists. Best approach?', options: ['Write two separate functions', 'Check the type with isinstance() and handle both cases', 'Always require a list', 'Use global variables'], correct: 1 },
  { id: 'q14', type: 'code_output', question: 'What does this return?\n```python\ndef outer():\n    x = 10\n    def inner():\n        return x\n    return inner\n\nf = outer()\nprint(f())\n```', options: ['Error', '10', 'None', 'inner'], correct: 1 },
  { id: 'q15', type: 'multiple_choice', question: 'When should you use a lambda instead of a regular function?', options: ['Always — they are faster', 'For complex multi-line logic', 'For short, one-line functions used as arguments', 'Never — they are deprecated'], correct: 2 }
];
