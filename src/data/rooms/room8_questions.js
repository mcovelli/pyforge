export const exercises = [
  { id: 'ex1', title: 'Missing Data Detective', description: 'Analyze the DataFrame for missing data. Create: `missing_counts` (Series of missing count per column), `missing_pct` (percentage per column, rounded to 1), `total_missing` (total NaN count).', starterCode: 'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "name": ["Alice", "Bob", None, "Dave", "Eve", "Frank", None],\n    "age": [28, np.nan, 35, 42, np.nan, 31, 29],\n    "salary": [85000, 72000, np.nan, np.nan, 68000, 78000, 91000],\n    "dept": ["Analytics", "Sales", "Analytics", None, "Sales", None, "Engineering"]\n})\n\nmissing_counts = \nmissing_pct = \ntotal_missing = \n\nprint("Missing counts:")\nprint(missing_counts)\nprint(f"\\nTotal missing: {total_missing}")', tests: [
    { name: 'Name missing', code: 'assert missing_counts["name"] == 2' },
    { name: 'Age missing', code: 'assert missing_counts["age"] == 2' },
    { name: 'Total missing', code: 'assert total_missing == 8' },
    { name: 'Pct is Series', code: 'import pandas as pd\nassert isinstance(missing_pct, pd.Series)' }
  ]},
  { id: 'ex2', title: 'Fill Strategy', description: 'Fill missing values: age with median, salary with mean, name with "Unknown", dept with mode. Store result in `df_clean`. Verify no missing values remain.', starterCode: 'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "name": ["Alice", None, "Carol", "Dave", None],\n    "age": [28, np.nan, 35, 42, 25],\n    "salary": [85000, 72000, np.nan, np.nan, 68000],\n    "dept": ["Analytics", "Sales", "Analytics", "Sales", np.nan]\n})\n\ndf_clean = df.copy()\n\n# Fill missing values with appropriate strategies\n\n\nremaining_nulls = df_clean.isnull().sum().sum()\nprint(df_clean)\nprint(f"Remaining nulls: {remaining_nulls}")', tests: [
    { name: 'No missing values', code: 'assert df_clean.isnull().sum().sum() == 0' },
    { name: 'Names filled', code: 'assert df_clean["name"].iloc[1] == "Unknown"' },
    { name: 'Age filled with median', code: 'assert df_clean["age"].iloc[1] == 31.5' },
    { name: 'Dept filled', code: 'assert df_clean["dept"].iloc[4] in ["Analytics", "Sales"]' }
  ]},
  { id: 'ex3', title: 'Duplicate Detector', description: 'Find and remove duplicates. Create: `dup_count` (number of duplicate rows), `df_clean` (without duplicates, keeping first), `unique_orders` (number of unique order_ids).', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "order_id": [101, 102, 103, 102, 104, 103, 105],\n    "product": ["Widget", "Gadget", "Tool", "Gadget", "Widget", "Tool", "Device"],\n    "amount": [150, 200, 75, 200, 300, 75, 180]\n})\n\ndup_count = \ndf_clean = \nunique_orders = \n\nprint(f"Duplicates found: {dup_count}")\nprint(f"Clean rows: {len(df_clean)}")\nprint(f"Unique orders: {unique_orders}")', tests: [
    { name: 'Duplicate count', code: 'assert dup_count == 2' },
    { name: 'Clean length', code: 'assert len(df_clean) == 5' },
    { name: 'Unique orders', code: 'assert unique_orders == 5' }
  ]},
  { id: 'ex4', title: 'Type Converter', description: 'Fix the data types. Convert price strings to floats (remove $ and commas), date strings to datetime, and quantity to integers. Store in `df_clean`.', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "product": ["Widget", "Gadget", "Tool"],\n    "price": ["$29.99", "$1,499.99", "$9.99"],\n    "date": ["2024-01-15", "2024-02-20", "2024-03-10"],\n    "quantity": ["150", "85", "310"]\n})\n\ndf_clean = df.copy()\n\n# Fix the data types\n\n\nprint(df_clean.dtypes)\nprint(df_clean)', tests: [
    { name: 'Price is float', code: 'assert df_clean["price"].dtype == "float64"' },
    { name: 'First price', code: 'assert df_clean["price"].iloc[0] == 29.99' },
    { name: 'Date is datetime', code: 'assert str(df_clean["date"].dtype).startswith("datetime")' },
    { name: 'Quantity is int', code: 'assert df_clean["quantity"].dtype in ["int64", "int32"]' }
  ]},
  { id: 'ex5', title: 'String Cleaner', description: 'Clean the messy name data: strip whitespace, convert to title case. Fix emails to lowercase. Create `name_lengths` column. Count `valid_emails` (containing @).', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["  alice chen  ", "BOB SMITH", "  carol JONES", "dave Wilson  "],\n    "email": ["Alice@Co.com", "BOB@CO.COM", "carol@co.com", "DAVE@Co.Com"]\n})\n\n# Clean the data\n\n\ndf["name_lengths"] = \nvalid_emails = \n\nprint(df)\nprint(f"Valid emails: {valid_emails}")', tests: [
    { name: 'Names trimmed', code: 'assert df["name"].iloc[0] == "Alice Chen"' },
    { name: 'Names title case', code: 'assert df["name"].iloc[1] == "Bob Smith"' },
    { name: 'Emails lowercase', code: 'assert df["email"].iloc[0] == "alice@co.com"' },
    { name: 'Valid emails', code: 'assert valid_emails == 4' }
  ]},
  { id: 'ex6', title: 'Outlier Detection', description: 'Use the IQR method to find outliers in the salary column. Calculate: `Q1`, `Q3`, `IQR`, `lower_bound`, `upper_bound`, `outlier_count`, `df_clean` (without outliers).', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Alice","Bob","Carol","Dave","Eve","Frank","Grace","Hank"],\n    "salary": [75000, 82000, 78000, 350000, 85000, 79000, 15000, 81000]\n})\n\nQ1 = \nQ3 = \nIQR = \nlower_bound = \nupper_bound = \n\noutlier_count = \ndf_clean = \n\nprint(f"IQR: {IQR}")\nprint(f"Bounds: [{lower_bound}, {upper_bound}]")\nprint(f"Outliers: {outlier_count}")\nprint(f"Clean rows: {len(df_clean)}")', tests: [
    { name: 'Q1 value', code: 'assert Q1 == 77250.0' },
    { name: 'Q3 value', code: 'assert Q3 == 82750.0' },
    { name: 'Outlier count', code: 'assert outlier_count == 2' },
    { name: 'Clean length', code: 'assert len(df_clean) == 6' }
  ]},
  { id: 'ex7', title: 'Full Cleaning Pipeline', description: 'Apply a complete cleaning pipeline: remove duplicates, fill missing ages with median, convert price strings, drop rows without names, strip whitespace from names. Return `df_clean`.', starterCode: 'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "name": ["  Alice", "Bob", "Bob", None, "Eve  ", "  Frank"],\n    "age": [28, 35, 35, 42, np.nan, 31],\n    "price": ["$50.00", "$30.00", "$30.00", "$45.00", "$60.00", "$25.00"]\n})\n\ndf_clean = df.copy()\n\n# Apply cleaning steps in order\n\n\nprint(df_clean)\nprint(f"Rows: {len(df_clean)}")', tests: [
    { name: 'No duplicates', code: 'assert df_clean.duplicated().sum() == 0' },
    { name: 'No missing names', code: 'assert df_clean["name"].notna().all()' },
    { name: 'No missing ages', code: 'assert df_clean["age"].notna().all()' },
    { name: 'Names trimmed', code: 'assert df_clean["name"].str.strip().equals(df_clean["name"])' },
    { name: 'Price is numeric', code: 'assert df_clean["price"].dtype == "float64"' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the Cleaning Pipeline', description: 'Fix this data cleaning code.', buggyCode: 'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({"name": ["Alice", None, "Carol"], "age": [28, 35, np.nan], "score": ["85", "N/A", "92"]})\n\ndf["score"] = int(df["score"])\ndf["age"] = df["age"].fill(0)\ndf = df.dropna(column="name")\n\nprint(df)', solution: 'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({"name": ["Alice", None, "Carol"], "age": [28, 35, np.nan], "score": ["85", "N/A", "92"]})\n\ndf["score"] = pd.to_numeric(df["score"], errors="coerce")\ndf["age"] = df["age"].fillna(0)\ndf = df.dropna(subset=["name"])\n\nprint(df)', hints: ['Cannot int() an entire Series with non-numeric values — use pd.to_numeric() with errors="coerce"', 'The method is .fillna() not .fill()', 'Parameter is subset= not column='] },
  { id: 'sc2', title: 'Fix the Deduplication', description: 'Fix this deduplication and validation code.', buggyCode: 'import pandas as pd\n\ndf = pd.DataFrame({"id": [1,2,2,3], "value": [10,20,20,30]})\n\ndf.drop_duplicates(inplace=True)\ncount = df.duplicated.sum()\n\nassert len(df) = 3\nprint(f"Unique rows: {len(df)}")', solution: 'import pandas as pd\n\ndf = pd.DataFrame({"id": [1,2,2,3], "value": [10,20,20,30]})\n\ndf = df.drop_duplicates()\ncount = df.duplicated().sum()\n\nassert len(df) == 3\nprint(f"Unique rows: {len(df)}")', hints: ['Avoid inplace=True — assign result instead', '.duplicated is a method, needs parentheses: .duplicated()', 'assert uses == for comparison, not = (assignment)'] },
  { id: 'sc3', title: 'Fix the Type Conversion', description: 'Fix this data type conversion code.', buggyCode: 'import pandas as pd\n\ndf = pd.DataFrame({"price": ["$10.50", "$20.30", "N/A"], "date": ["2024-01-01", "2024-02-15", "invalid"]})\n\ndf["price"] = df["price"].replace("$", "")\ndf["price"] = float(df["price"])\ndf["date"] = pd.to_datetime(df["date"])\n\nprint(df)', solution: 'import pandas as pd\n\ndf = pd.DataFrame({"price": ["$10.50", "$20.30", "N/A"], "date": ["2024-01-01", "2024-02-15", "invalid"]})\n\ndf["price"] = df["price"].str.replace("$", "", regex=False)\ndf["price"] = pd.to_numeric(df["price"], errors="coerce")\ndf["date"] = pd.to_datetime(df["date"], errors="coerce")\n\nprint(df)', hints: ['Use .str.replace() for string operations on Series, not .replace()', 'Cannot float() an entire Series — use pd.to_numeric() with errors="coerce"', 'pd.to_datetime will error on "invalid" — use errors="coerce" to convert to NaT'] }
];

export const quiz = [
  { id: 'q1', type: 'multiple_choice', question: 'What percentage of a data scientist time is typically spent on data cleaning?', options: ['10-20%', '30-40%', '60-80%', '90-100%'], correct: 2 },
  { id: 'q2', type: 'code_output', question: 'What does df.isnull().sum() return?', options: ['Total missing values', 'Count of missing values per column', 'Boolean DataFrame', 'Percentage missing'], correct: 1 },
  { id: 'q3', type: 'multiple_choice', question: 'When should you drop rows with missing data vs fill them?', options: ['Always drop', 'Always fill', 'Drop when < 5% missing, fill otherwise with appropriate strategy', 'It does not matter'], correct: 2 },
  { id: 'q4', type: 'code_output', question: 'What does pd.to_numeric("abc", errors="coerce") return?', options: ['0', '"abc"', 'NaN', 'Error'], correct: 2 },
  { id: 'q5', type: 'scenario', question: 'Salary data has a value of $999,999,999 while others are $50k-$100k. Best approach?', options: ['Keep it as is', 'Delete the entire row', 'Use IQR or Z-score to identify and handle as outlier', 'Replace with 0'], correct: 2 },
  { id: 'q6', type: 'code_output', question: 'What does df.duplicated(subset=["name"]).sum() count?', options: ['All duplicated rows', 'Rows with duplicate name values', 'Unique names', 'Missing names'], correct: 1 },
  { id: 'q7', type: 'multiple_choice', question: 'What is the IQR method for outlier detection?', options: ['Values above the mean', 'Values outside Q1 - 1.5*IQR and Q3 + 1.5*IQR', 'Values more than 2x the median', 'Values in the top 10%'], correct: 1 },
  { id: 'q8', type: 'code_output', question: 'What does df["name"].str.strip() do?', options: ['Removes the column', 'Removes leading/trailing whitespace from each value', 'Splits the string', 'Converts to lowercase'], correct: 1 },
  { id: 'q9', type: 'scenario', question: 'A column has values "Yes", "yes", "YES", "Y", "y". How to standardize?', options: ['Leave as is', 'df["col"].str.lower() then replace variations', 'Delete the column', 'Convert to numbers'], correct: 1 },
  { id: 'q10', type: 'multiple_choice', question: 'What does errors="coerce" do in pd.to_datetime()?', options: ['Raises an error', 'Skips invalid values', 'Converts invalid values to NaT (Not a Time)', 'Uses current date'], correct: 2 },
  { id: 'q11', type: 'code_output', question: 'What does df.fillna(method="ffill") do?', options: ['Fills with 0', 'Forward fills — uses previous valid value', 'Fills with mean', 'Drops missing rows'], correct: 1 },
  { id: 'q12', type: 'multiple_choice', question: 'Why is fillna(mean) dangerous for skewed data?', options: ['It is slow', 'Mean is pulled by outliers — median is more robust', 'It changes data types', 'It only works for integers'], correct: 1 },
  { id: 'q13', type: 'code_output', question: 'What does df.drop_duplicates(keep="last") do?', options: ['Removes all duplicates', 'Keeps only the last occurrence of each duplicate', 'Keeps only the first', 'Raises an error'], correct: 1 },
  { id: 'q14', type: 'scenario', question: 'Phone numbers in your data have formats: 555-1234, (555) 123-4567, 5551234. Best cleaning approach?', options: ['Keep all formats', 'Use str.replace with regex to keep only digits', 'Delete the column', 'Manually edit each one'], correct: 1 },
  { id: 'q15', type: 'multiple_choice', question: 'What is the correct order for a data cleaning pipeline?', options: ['Fill missing -> Remove duplicates -> Fix types', 'Remove duplicates -> Fix types -> Handle missing -> Validate', 'Validate -> Clean -> Remove', 'It does not matter'], correct: 1 }
];
