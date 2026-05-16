// Room 1 Exercises, Scenarios, and Quiz
export const exercises = [
  { id: 'ex1', title: 'Store Business Metrics', description: 'Create variables to store quarterly business metrics for a retail company. Create: `company` (string "DataMart"), `q1_revenue` (float 1250000.75), `num_stores` (int 47), and `is_expanding` (bool True). Print each variable.', starterCode: '# Create the four business metric variables below\n\n\n\n\n# Print each variable\n', tests: [
    { name: 'company is correct', code: 'assert company == "DataMart", f"Expected DataMart, got {company}"' },
    { name: 'q1_revenue is float', code: 'assert isinstance(q1_revenue, float) and q1_revenue == 1250000.75' },
    { name: 'num_stores is int', code: 'assert isinstance(num_stores, int) and num_stores == 47' },
    { name: 'is_expanding is bool', code: 'assert isinstance(is_expanding, bool) and is_expanding == True' }
  ]},
  { id: 'ex2', title: 'Type Casting Challenge', description: 'A CSV import gave you string values. Convert `revenue_str` ("875000.50") to float `revenue`, `employees_str` ("203") to int `employees`. Calculate `revenue_per_employee` (revenue/employees). Print it rounded to 2 decimal places.', starterCode: 'revenue_str = "875000.50"\nemployees_str = "203"\n\n# Convert to proper types\n\n\n# Calculate revenue per employee\n\n\nprint(f"Revenue per employee: {revenue_per_employee}")', tests: [
    { name: 'revenue is float', code: 'assert isinstance(revenue, float) and revenue == 875000.50' },
    { name: 'employees is int', code: 'assert isinstance(employees, int) and employees == 203' },
    { name: 'calculation correct', code: 'assert round(revenue_per_employee, 2) == 4310.35' }
  ]},
  { id: 'ex3', title: 'Format a Business Report', description: 'Using f-strings, create a variable `report` that produces exactly: "Q3 Report: Revenue $1,234,567.89 | Growth: 12.5% | Employees: 350"', starterCode: 'quarter = "Q3"\nrevenue = 1234567.89\ngrowth = 12.5\nemployees = 350\n\n# Create the report string using f-strings\nreport = \n\nprint(report)', tests: [
    { name: 'Contains Q3 Report', code: 'assert "Q3 Report" in report' },
    { name: 'Contains formatted revenue', code: 'assert "$1,234,567.89" in report' },
    { name: 'Contains growth percentage', code: 'assert "12.5%" in report' },
    { name: 'Contains employee count', code: 'assert "350" in report' }
  ]},
  { id: 'ex4', title: 'Clean Product Data', description: 'Clean messy product data. Strip whitespace from `product_name`, convert `sku` to uppercase, check if `email` contains "@", and extract the domain from email (part after @). Store in `clean_name`, `clean_sku`, `valid_email`, and `domain`.', starterCode: 'product_name = "   Premium Analytics Suite   "\nsku = "prod-ax-2847"\nemail = "buyer@techcorp.com"\n\n# Clean the data\nclean_name = \nclean_sku = \nvalid_email = \ndomain = \n\nprint(f"Product: {clean_name}")\nprint(f"SKU: {clean_sku}")\nprint(f"Valid email: {valid_email}")\nprint(f"Domain: {domain}")', tests: [
    { name: 'Name stripped', code: 'assert clean_name == "Premium Analytics Suite"' },
    { name: 'SKU uppercased', code: 'assert clean_sku == "PROD-AX-2847"' },
    { name: 'Email validated', code: 'assert valid_email == True' },
    { name: 'Domain extracted', code: 'assert domain == "techcorp.com"' }
  ]},
  { id: 'ex5', title: 'Financial Calculations', description: 'Calculate business metrics from monthly revenues: `total_revenue` (sum), `best_month` (max), `worst_month` (min), `average_revenue` (mean), and `profit_margin` as percentage ((total-costs)/total * 100).', starterCode: 'monthly_revenues = [95000, 102000, 88000, 115000, 97000, 108000]\ncosts = 680000\n\n# Calculate all metrics\ntotal_revenue = \nbest_month = \nworst_month = \naverage_revenue = \nprofit_margin = \n\nprint(f"Total: {total_revenue}")\nprint(f"Best: {best_month}")\nprint(f"Worst: {worst_month}")\nprint(f"Average: {average_revenue}")\nprint(f"Margin: {profit_margin}")', tests: [
    { name: 'Total revenue', code: 'assert total_revenue == 605000' },
    { name: 'Best month', code: 'assert best_month == 115000' },
    { name: 'Worst month', code: 'assert worst_month == 88000' },
    { name: 'Average correct', code: 'assert round(average_revenue, 2) == 100833.33' },
    { name: 'Profit margin', code: 'assert round(profit_margin, 1) == -12.4' }
  ]},
  { id: 'ex6', title: 'Data Type Validator', description: 'Write code to check types of provided variables. Create `types_report` as a dict mapping each variable name (string) to its type name (string). E.g. {"name": "str", "age": "int", ...}', starterCode: 'name = "Alice"\nage = 28\nsalary = 75000.50\nis_manager = False\nteam = None\n\n# Create types_report dictionary\ntypes_report = {}\n\n\nprint(types_report)', tests: [
    { name: 'name type', code: 'assert types_report["name"] == "str"' },
    { name: 'age type', code: 'assert types_report["age"] == "int"' },
    { name: 'salary type', code: 'assert types_report["salary"] == "float"' },
    { name: 'is_manager type', code: 'assert types_report["is_manager"] == "bool"' },
    { name: 'team type', code: 'assert types_report["team"] == "NoneType"' }
  ]},
  { id: 'ex7', title: 'Currency Converter', description: 'Clean and convert a list of messy price strings into floats. Remove "$" and "," characters, convert to float. Store cleaned values in `clean_prices` and calculate `total`.', starterCode: 'raw_prices = ["$1,299.99", "$849.50", "$2,100.00", "$499.99", "$3,750.25"]\n\n# Clean and convert each price\nclean_prices = []\n\n\ntotal = \n\nprint(f"Prices: {clean_prices}")\nprint(f"Total: {total}")', tests: [
    { name: 'All converted', code: 'assert len(clean_prices) == 5' },
    { name: 'First price correct', code: 'assert clean_prices[0] == 1299.99' },
    { name: 'All are floats', code: 'assert all(isinstance(p, float) for p in clean_prices)' },
    { name: 'Total correct', code: 'assert total == 8499.73' }
  ]},
  { id: 'ex8', title: 'String Analysis', description: 'Analyze the product description: find `word_count`, `char_count` (no spaces), `has_discount` (contains "discount" or "sale", case-insensitive), and `title_version` (title case).', starterCode: 'description = "premium wireless headphones on sale now with free shipping"\n\nword_count = \nchar_count = \nhas_discount = \ntitle_version = \n\nprint(f"Words: {word_count}")\nprint(f"Chars (no spaces): {char_count}")\nprint(f"Has discount: {has_discount}")\nprint(f"Title: {title_version}")', tests: [
    { name: 'Word count', code: 'assert word_count == 9' },
    { name: 'Char count', code: 'assert char_count == 50' },
    { name: 'Has discount', code: 'assert has_discount == True' },
    { name: 'Title case', code: 'assert title_version == "Premium Wireless Headphones On Sale Now With Free Shipping"' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the Sales Report', description: 'A junior analyst wrote code to generate a sales summary but it has several bugs. Find and fix ALL errors so the code runs correctly.', buggyCode: '# Bug report: This code crashes! Fix all errors.\nproduct = \'Enterprise License\'\nprice = "499.99"  \nquantity = 25\n\n# Calculate total (hint: can you multiply a string?)\ntotal = price * quantity\n\n# Format report\nreport = f"Product: {product} | Total: ${total:,.2f}"\n\n# Calculate discount\ndiscount_rate = 0.15\nfinal_price = total - (total * discount_rate\nprint(f"After 15% discount: ${final_price:.2f}")\nprint("Transaction type: " + type(total))', solution: 'product = \'Enterprise License\'\nprice = float("499.99")\nquantity = 25\ntotal = price * quantity\nreport = f"Product: {product} | Total: ${total:,.2f}"\nprint(report)\ndiscount_rate = 0.15\nfinal_price = total - (total * discount_rate)\nprint(f"After 15% discount: ${final_price:,.2f}")\nprint("Transaction type: " + str(type(total)))', hints: ['price is a string — you need to convert it to float before math', 'Look at the f-string: ${total:,.2f} has a $ that might conflict', 'There is a missing closing parenthesis on the final_price line', 'type() returns a type object — you need str() to concatenate it'] },
  { id: 'sc2', title: 'Debug the Data Cleaner', description: 'This data cleaning function has type errors and logic bugs. Fix all issues.', buggyCode: '# Clean customer data\nname = "  john DOE  "\nage = "thirty"\nbalance = "1,500.75"\nactive = "yes"\n\n# Clean name\nclean_name = name.title()\n\n# Convert age\nclean_age = int(age)\n\n# Convert balance\nclean_balance = float(balance)\n\n# Convert active status\nclean_active = bool(active)\n\nprint(f"Name: {clean_name}")\nprint(f"Age: {clean_age}")\nprint(f"Balance: ${clean_balance:,.2f}")\nprint(f"Active: {clean_active}")', solution: 'name = "  john DOE  "\nage = "thirty"\nbalance = "1,500.75"\nactive = "yes"\n\nclean_name = name.strip().title()\nclean_age = 30  # Cannot convert "thirty" — must handle manually\nclean_balance = float(balance.replace(",", ""))\nclean_active = active.lower() in ("yes", "true", "1")\n\nprint(f"Name: {clean_name}")\nprint(f"Age: {clean_age}")\nprint(f"Balance: ${clean_balance:,.2f}")\nprint(f"Active: {clean_active}")', hints: ['name.title() without strip() keeps the leading spaces', '"thirty" cannot be converted to int with int() — it is a word not a digit', 'The comma in "1,500.75" must be removed before float()', 'bool("yes") is True but so is bool("no") — any non-empty string is True'] },
  { id: 'sc3', title: 'Fix the Report Card Generator', description: 'This grade calculator has logic and type errors. Fix it so it correctly calculates averages and assigns letter grades.', buggyCode: 'student = "Alice"\nscores = [85, 92, "78", 90, 88]\n\n# Calculate average\ntotal = sum(scores)\naverage = total / len(scores)\n\n# Assign letter grade\nif average >= 90:\n    grade = "A"\nif average >= 80:\n    grade = "B"\nif average >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"{student}: Average = {average}, Grade = {grade}")', solution: 'student = "Alice"\nscores = [85, 92, 78, 90, 88]\n\ntotal = sum(scores)\naverage = total / len(scores)\n\nif average >= 90:\n    grade = "A"\nelif average >= 80:\n    grade = "B"\nelif average >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"{student}: Average = {average}, Grade = {grade}")', hints: ['One of the scores is a string "78" instead of int 78 — sum() will fail', 'The if/if/if chain should be if/elif/elif — otherwise grade always gets overwritten'] }
];

export const quiz = [
  { id: 'q1', type: 'multiple_choice', question: 'What is the output of `type(42.0)`?', options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'double'>"], correct: 1 },
  { id: 'q2', type: 'multiple_choice', question: 'Which variable name follows Python\'s PEP 8 convention for a business metric?', options: ['totalRevenue', 'TotalRevenue', 'total_revenue', 'TOTAL_REVENUE'], correct: 2 },
  { id: 'q3', type: 'code_output', question: 'What does this print?\n```python\nx = "100"\ny = 3\nprint(x * y)\n```', options: ['300', '100100100', 'Error', '1003'], correct: 1 },
  { id: 'q4', type: 'multiple_choice', question: 'How do you convert the string "75.5" to a number for calculation?', options: ['int("75.5")', 'float("75.5")', 'number("75.5")', 'str(75.5)'], correct: 1 },
  { id: 'q5', type: 'code_output', question: 'What does this produce?\n```python\nprice = 1234.5\nprint(f"${price:,.2f}")\n```', options: ['$1234.5', '$1234.50', '$1,234.50', 'Error'], correct: 2 },
  { id: 'q6', type: 'multiple_choice', question: 'What does `"  hello  ".strip()` return?', options: ['"hello"', '"hello  "', '"  hello"', '" hello "'], correct: 0 },
  { id: 'q7', type: 'code_output', question: 'What is the result?\n```python\na = 17\nb = 5\nprint(a // b, a % b)\n```', options: ['3.4 2', '3 2', '3.4 0', '3 0'], correct: 1 },
  { id: 'q8', type: 'multiple_choice', question: 'Which correctly checks if a variable is a string?', options: ['type(x) == string', 'x.istype(str)', 'isinstance(x, str)', 'x.type() == str'], correct: 2 },
  { id: 'q9', type: 'scenario', question: 'A CSV file contains prices stored as "$1,250.00". Which correctly converts this to a float?', options: ['float("$1,250.00")', 'int("$1,250.00".replace("$",""))', 'float("$1,250.00".replace("$","").replace(",",""))', 'str.to_float("$1,250.00")'], correct: 2 },
  { id: 'q10', type: 'code_output', question: 'What does this print?\n```python\nname = "analytics"\nprint(name[0].upper() + name[1:])\n```', options: ['ANALYTICS', 'Analytics', 'analytics', 'aANALYTICS'], correct: 1 },
  { id: 'q11', type: 'code_output', question: 'What is the value of x?\n```python\nx = int(7.9)\n```', options: ['7', '8', '7.9', 'Error'], correct: 0 },
  { id: 'q12', type: 'scenario', question: 'You receive data where ages are stored as floats (e.g., 28.0). What is the best way to convert them to integers?', options: ['str(age)', 'int(age) — since float→int truncates and ages are whole numbers', 'round(age)', 'age // 1'], correct: 1 },
  { id: 'q13', type: 'multiple_choice', question: 'What does `bool("")` return?', options: ['True', 'False', '"True"', 'Error'], correct: 1 },
  { id: 'q14', type: 'code_output', question: 'What does this print?\n```python\na = "5"\nb = 3\nprint(int(a) + b)\n```', options: ['"53"', '53', '8', 'Error'], correct: 2 },
  { id: 'q15', type: 'multiple_choice', question: 'How should you check if a variable is None?', options: ['x == None', 'x is None', 'x.isNone()', 'type(x) == None'], correct: 1 }
];
