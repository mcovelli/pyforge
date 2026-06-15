export const exercises = [
  { id: 'ex1', title: 'Safe Type Converter', description: 'Write `safe_convert(value, target_type, default=None)` that converts a value to the target type. If conversion fails, return default. Test with various inputs.', starterCode: 'def safe_convert(value, target_type, default=None):\n    pass\n\n# Test it\nresults = [\n    safe_convert("42", int),\n    safe_convert("hello", int, 0),\n    safe_convert("3.14", float),\n    safe_convert(None, float, 0.0),\n    safe_convert("", int, -1)\n]\nprint(results)', tests: [
    { name: 'Valid int', code: 'assert safe_convert("42", int) == 42' },
    { name: 'Invalid int with default', code: 'assert safe_convert("hello", int, 0) == 0' },
    { name: 'Valid float', code: 'assert safe_convert("3.14", float) == 3.14' },
    { name: 'None with default', code: 'assert safe_convert(None, float, 0.0) == 0.0' },
    { name: 'Empty string', code: 'assert safe_convert("", int, -1) == -1' }
  ]},
  { id: 'ex2', title: 'CSV String Parser', description: 'Parse `csv_data` (a multi-line CSV string) into a list of dicts called `records`. Also calculate `total_revenue` (sum of price*quantity for all records) and `record_count`.', starterCode: 'csv_data = """product,price,quantity\nWidget,29.99,150\nGadget,49.99,85\nTool,19.99,200\nDevice,99.99,42"""\n\nlines = csv_data.strip().split("\\n")\nheader = lines[0].split(",")\n\nrecords = []\n\n\ntotal_revenue = 0\n\n\nrecord_count = len(records)\n\nprint(f"Records: {record_count}")\nprint(f"Total revenue: ${total_revenue:,.2f}")', tests: [
    { name: 'Record count', code: 'assert record_count == 4' },
    { name: 'First record', code: 'assert records[0]["product"] == "Widget"' },
    { name: 'Has all keys', code: 'assert all("product" in r and "price" in r and "quantity" in r for r in records)' },
    { name: 'Total revenue', code: 'assert round(total_revenue, 2) == 12993.93' }
  ]},
  { id: 'ex3', title: 'JSON Data Handler', description: 'Parse the JSON string into `data`. Then extract: `user_names` (list of all names), `avg_age` (average age rounded to 1 decimal), `active_count` (number of active users).', starterCode: 'import json\n\njson_str = \'\'\'{\n    "users": [\n        {"name": "Alice", "age": 28, "active": true},\n        {"name": "Bob", "age": 34, "active": false},\n        {"name": "Carol", "age": 22, "active": true},\n        {"name": "Dave", "age": 45, "active": true},\n        {"name": "Eve", "age": 31, "active": false}\n    ]\n}\'\'\'\n\ndata = \nuser_names = \navg_age = \nactive_count = \n\nprint(f"Names: {user_names}")\nprint(f"Avg age: {avg_age}")\nprint(f"Active: {active_count}")', tests: [
    { name: 'Parse data', code: 'assert isinstance(data, dict) and "users" in data' },
    { name: 'User names', code: 'assert user_names == ["Alice", "Bob", "Carol", "Dave", "Eve"]' },
    { name: 'Avg age', code: 'assert avg_age == 32.0' },
    { name: 'Active count', code: 'assert active_count == 3' }
  ]},
  { id: 'ex4', title: 'Error-Resilient Data Cleaner', description: 'Clean `raw_data` by converting price strings to floats. Handle "$" symbols, "N/A" values, empty strings, and None. Store results in `clean_prices`. Track `error_count`.', starterCode: 'raw_data = ["$29.99", "49.99", "N/A", "$12.50", "", None, "bad", "$99.99", "0"]\n\nclean_prices = []\nerror_count = 0\n\nfor item in raw_data:\n    # Try to clean and convert each price\n    pass\n\nprint(f"Clean: {clean_prices}")\nprint(f"Errors: {error_count}")', tests: [
    { name: 'Clean prices count', code: 'assert len(clean_prices) == 5' },
    { name: 'First price', code: 'assert clean_prices[0] == 29.99' },
    { name: 'Zero included', code: 'assert 0.0 in clean_prices' },
    { name: 'Error count', code: 'assert error_count == 4' }
  ]},
  { id: 'ex5', title: 'Nested Exception Handler', description: 'Write `process_record(record)` that extracts name (string), age (int, must be 0-150), and email (must contain "@"). Return a cleaned dict or raise ValueError with descriptive message. Track results in `valid` and `errors` lists.', starterCode: 'def process_record(record):\n    # Validate and clean the record\n    # Raise ValueError if invalid\n    pass\n\ntest_records = [\n    {"name": "Alice", "age": "28", "email": "alice@co.com"},\n    {"name": "", "age": "25", "email": "bob@co.com"},\n    {"name": "Carol", "age": "200", "email": "carol@co.com"},\n    {"name": "Dave", "age": "30", "email": "dave@co.com"},\n    {"name": "Eve", "age": "abc", "email": "eve@co.com"},\n]\n\nvalid = []\nerrors = []\n\nfor r in test_records:\n    try:\n        valid.append(process_record(r))\n    except ValueError as e:\n        errors.append(str(e))\n\nprint(f"Valid: {len(valid)}")\nprint(f"Errors: {len(errors)}")', tests: [
    { name: 'Valid count', code: 'assert len(valid) == 2' },
    { name: 'Error count', code: 'assert len(errors) == 3' },
    { name: 'Alice valid', code: 'assert valid[0]["name"] == "Alice" and valid[0]["age"] == 28' },
    { name: 'Errors are strings', code: 'assert all(isinstance(e, str) for e in errors)' }
  ]},
  { id: 'ex6', title: 'JSON Builder', description: 'Build a `report` dict with "title", "generated_at" (current date string), "summary" containing "total_sales", "avg_sale", "top_product". Convert to `json_output` string with indent=2.', starterCode: 'import json\nfrom datetime import datetime\n\nsales = [\n    {"product": "Widget", "amount": 4500},\n    {"product": "Gadget", "amount": 7200},\n    {"product": "Widget", "amount": 3100},\n    {"product": "Tool", "amount": 1800},\n    {"product": "Gadget", "amount": 5400},\n]\n\n# Build the report dict\nreport = {}\n\n\njson_output = \n\nprint(json_output)', tests: [
    { name: 'Has title', code: 'assert "title" in report and isinstance(report["title"], str)' },
    { name: 'Has summary', code: 'assert "summary" in report' },
    { name: 'Total sales', code: 'assert report["summary"]["total_sales"] == 22000' },
    { name: 'Top product', code: 'assert report["summary"]["top_product"] == "Gadget"' },
    { name: 'Valid JSON', code: 'import json\nparsed = json.loads(json_output)\nassert parsed["summary"]["total_sales"] == 22000' }
  ]},
  { id: 'ex7', title: 'Multi-Exception Catcher', description: 'Write `divide_safely(a, b)` that handles: ZeroDivisionError (return "Cannot divide by zero"), TypeError for non-numeric inputs (return "Invalid types"), and returns the result rounded to 2 decimals otherwise.', starterCode: 'def divide_safely(a, b):\n    pass\n\n# Test cases\nresults = [\n    divide_safely(10, 3),\n    divide_safely(10, 0),\n    divide_safely("10", 3),\n    divide_safely(100, 7),\n]\nfor r in results:\n    print(r)', tests: [
    { name: 'Normal division', code: 'assert divide_safely(10, 3) == 3.33' },
    { name: 'Division by zero', code: 'assert divide_safely(10, 0) == "Cannot divide by zero"' },
    { name: 'Type error', code: 'assert divide_safely("10", 3) == "Invalid types"' },
    { name: 'Another division', code: 'assert divide_safely(100, 7) == 14.29' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the File Processor', description: 'Fix all bugs in this CSV processing code.', buggyCode: 'import csv\n\ncsv_text = "name,score\\nAlice,85\\nBob,92\\nCarol,78"\nlines = csv_text.split("\\n")\n\ntotal = 0\ncount = 0\nfor line in lines:\n    parts = line.split(",")\n    total += parts[1]\n    count += 1\n\naverage = total / count\nprint(f"Average score: {average}")', solution: 'csv_text = "name,score\\nAlice,85\\nBob,92\\nCarol,78"\nlines = csv_text.split("\\n")\n\ntotal = 0\ncount = 0\nfor line in lines[1:]:\n    parts = line.split(",")\n    total += int(parts[1])\n    count += 1\n\naverage = total / count\nprint(f"Average score: {average}")', hints: ['Skip the header row with lines[1:]', 'parts[1] is a string — need int() to add as number', 'Unused csv import can be removed'] },
  { id: 'sc2', title: 'Fix the Error Handler', description: 'Fix the exception handling in this data processor.', buggyCode: 'data = [10, "20", None, 30, "abc", 0]\nresults = []\n\nfor item in data:\n    try\n        value = float(item)\n        result = 100 / value\n        results.append(result)\n    except:\n        results.append(None)\n\nprint(f"Results: {results}")\nprint(f"Success rate: {len([r for r in results if r]) / len(data):.0%}")', solution: 'data = [10, "20", None, 30, "abc", 0]\nresults = []\n\nfor item in data:\n    try:\n        value = float(item)\n        result = 100 / value\n        results.append(result)\n    except (TypeError, ValueError):\n        results.append(None)\n    except ZeroDivisionError:\n        results.append(None)\n\nprint(f"Results: {results}")\nprint(f"Success rate: {len([r for r in results if r is not None]) / len(data):.0%}")', hints: ['try needs a colon after it', 'Bare except catches ALL exceptions — catch specific ones', 'Checking truthiness of r fails for 0.0 — use r is not None'] },
  { id: 'sc3', title: 'Fix the JSON Parser', description: 'Fix this code that processes JSON data.', buggyCode: 'import json\n\njson_str = \'{"users": [{"name": "Alice", "age": 28}, {"name": "Bob", "age": 34}]}\'\n\ndata = json.load(json_str)\n\nnames = []\nfor user in data["users"]:\n    names.append(user[name])\n\navg_age = sum(u["age"] for u in data["users"]) / len(data)\n\nprint(f"Names: {names}")\nprint(f"Average age: {avg_age}")', solution: 'import json\n\njson_str = \'{"users": [{"name": "Alice", "age": 28}, {"name": "Bob", "age": 34}]}\'\n\ndata = json.loads(json_str)\n\nnames = []\nfor user in data["users"]:\n    names.append(user["name"])\n\navg_age = sum(u["age"] for u in data["users"]) / len(data["users"])\n\nprint(f"Names: {names}")\nprint(f"Average age: {avg_age}")', hints: ['json.load() reads from a file — use json.loads() for strings', 'user[name] needs quotes: user["name"]', 'len(data) gives 1 (one key "users") — need len(data["users"])'] }
];

export const quiz = [
  { id: 'q1', type: 'multiple_choice', question: 'What is the purpose of a context manager (with statement)?', options: ['To make code faster', 'To automatically handle resource cleanup (e.g., closing files)', 'To catch exceptions', 'To import modules'], correct: 1 },
  { id: 'q2', type: 'code_output', question: 'What does this print?\n```python\ntry:\n    x = int("abc")\nexcept ValueError:\n    x = -1\nfinally:\n    print(x)\n```', options: ['abc', 'Error', '-1', 'None'], correct: 2 },
  { id: 'q3', type: 'multiple_choice', question: 'What is the difference between json.load() and json.loads()?', options: ['No difference', 'load() reads from file, loads() reads from string', 'loads() is faster', 'load() only works with lists'], correct: 1 },
  { id: 'q4', type: 'scenario', question: 'You are processing 1 million CSV rows and some have corrupt data. Best approach?', options: ['Let it crash and fix the data', 'Wrap each row in try/except and log errors', 'Read the entire file first and validate', 'Use binary mode'], correct: 1 },
  { id: 'q5', type: 'code_output', question: 'What happens?\n```python\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("Error")\nelse:\n    print("Success")\nfinally:\n    print("Done")\n```', options: ['Error Done', 'Success Done', 'Error Success Done', 'Done'], correct: 1 },
  { id: 'q6', type: 'multiple_choice', question: 'Why should you avoid bare except (catching all exceptions)?', options: ['It is slower', 'It catches and hides real bugs like KeyboardInterrupt and SystemExit', 'It does not work in Python 3', 'It uses more memory'], correct: 1 },
  { id: 'q7', type: 'code_output', question: 'What does open("file.txt", "w") do if file.txt already exists?', options: ['Appends to it', 'Raises an error', 'Overwrites it with empty content', 'Opens read-only'], correct: 2 },
  { id: 'q8', type: 'multiple_choice', question: 'Which file mode should you use to add data without erasing existing content?', options: ["'r'", "'w'", "'a'", "'x'"], correct: 2 },
  { id: 'q9', type: 'code_output', question: 'What does csv.DictReader provide compared to csv.reader?', options: ['Faster parsing', 'Each row as a dictionary with column headers as keys', 'Automatic type conversion', 'Binary data support'], correct: 1 },
  { id: 'q10', type: 'scenario', question: 'You need to save a Python dictionary as a configuration file. Best format?', options: ['CSV', 'JSON', 'Plain text', 'Binary'], correct: 1 },
  { id: 'q11', type: 'code_output', question: 'What prints?\n```python\ntry:\n    x = 1 / 0\nexcept ZeroDivisionError as e:\n    print(type(e).__name__)\n```', options: ['ZeroDivisionError', 'Error', '0', 'None'], correct: 0 },
  { id: 'q12', type: 'multiple_choice', question: 'What does the raise keyword do?', options: ['Catches an exception', 'Imports a module', 'Manually triggers an exception', 'Ends a function'], correct: 2 },
  { id: 'q13', type: 'code_output', question: 'What does this produce?\n```python\nimport json\ndata = {"a": 1, "b": [2, 3]}\nresult = json.dumps(data)\nprint(type(result).__name__)\n```', options: ['dict', 'str', 'list', 'bytes'], correct: 1 },
  { id: 'q14', type: 'scenario', question: 'Your script processes files from a user-specified path. What should you handle?', options: ['Only ValueError', 'FileNotFoundError and PermissionError', 'No exceptions needed', 'Only TypeError'], correct: 1 },
  { id: 'q15', type: 'code_output', question: 'When does the else block run in try/except/else?\n```python\ntry:\n    result = 10 + 5\nexcept TypeError:\n    print("type error")\nelse:\n    print("no error")\n```', options: ['Always', 'Only when an exception occurs', 'Only when NO exception occurs', 'Never'], correct: 2 }
];
