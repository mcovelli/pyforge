export const exercises = [
  { id: 'ex1', title: 'DataFrame Builder', description: 'Create a DataFrame `df` from the data. Then add a `revenue` column (price * units_sold). Find `total_revenue` and `best_product` (name of highest revenue product).', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "product": ["Widget", "Gadget", "Tool", "Device"],\n    "price": [29.99, 49.99, 19.99, 99.99],\n    "units_sold": [150, 85, 310, 42]\n})\n\ndf["revenue"] = \ntotal_revenue = \nbest_product = \n\nprint(df)\nprint(f"Total revenue: ${total_revenue:,.2f}")\nprint(f"Best product: {best_product}")', tests: [
    { name: 'Revenue column exists', code: 'assert "revenue" in df.columns' },
    { name: 'First revenue', code: 'assert round(df["revenue"].iloc[0], 2) == 4498.50' },
    { name: 'Total revenue', code: 'assert round(total_revenue, 2) == 16192.43' },
    { name: 'Best product', code: 'assert best_product == "Tool"' }
  ]},
  { id: 'ex2', title: 'Filtering Mastery', description: 'Filter the employee DataFrame to create: `high_earners` (salary >= 80000), `analytics_team` (dept == "Analytics"), `senior_analysts` (Analytics AND salary >= 85000). Count each.', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Alice", "Bob", "Carol", "Dave", "Eve", "Frank"],\n    "dept": ["Analytics", "Sales", "Analytics", "Engineering", "Sales", "Analytics"],\n    "salary": [85000, 72000, 92000, 105000, 68000, 78000]\n})\n\nhigh_earners = \nanalytics_team = \nsenior_analysts = \n\nprint(f"High earners: {len(high_earners)}")\nprint(f"Analytics: {len(analytics_team)}")\nprint(f"Senior analysts: {len(senior_analysts)}")', tests: [
    { name: 'High earners count', code: 'assert len(high_earners) == 3' },
    { name: 'Analytics count', code: 'assert len(analytics_team) == 3' },
    { name: 'Senior analysts', code: 'assert len(senior_analysts) == 2' },
    { name: 'Senior names', code: 'assert list(senior_analysts["name"].sort_values()) == ["Alice", "Carol"]' }
  ]},
  { id: 'ex3', title: 'GroupBy Analytics', description: 'Group by department and calculate: `dept_stats` with average salary, headcount, and total salary per department. Find `biggest_dept` (most employees) and `highest_avg` (highest average salary dept name).', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Alice","Bob","Carol","Dave","Eve","Frank","Grace"],\n    "dept": ["Analytics","Sales","Analytics","Engineering","Sales","Analytics","Engineering"],\n    "salary": [85000, 72000, 92000, 105000, 68000, 78000, 95000]\n})\n\ndept_stats = df.groupby("dept").agg(\n    # Define aggregations here\n).reset_index()\n\nbiggest_dept = \nhighest_avg = \n\nprint(dept_stats)\nprint(f"Biggest: {biggest_dept}")\nprint(f"Highest avg: {highest_avg}")', tests: [
    { name: 'Stats has columns', code: 'assert "dept" in dept_stats.columns' },
    { name: 'Biggest dept', code: 'assert biggest_dept == "Analytics"' },
    { name: 'Highest avg', code: 'assert highest_avg == "Engineering"' }
  ]},
  { id: 'ex4', title: 'Sort and Rank', description: 'Sort df by salary descending. Add a `rank` column (1 = highest). Create `top_3` (first 3 rows) and find `median_salary`.', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Alice","Bob","Carol","Dave","Eve"],\n    "salary": [85000, 72000, 92000, 105000, 68000]\n})\n\ndf = df.sort_values("salary", ascending=False).reset_index(drop=True)\ndf["rank"] = \n\ntop_3 = \nmedian_salary = \n\nprint(df)\nprint(f"Top 3: {list(top_3[\"name\"])}")\nprint(f"Median: ${median_salary:,}")', tests: [
    { name: 'Sorted correctly', code: 'assert df.iloc[0]["name"] == "Dave"' },
    { name: 'Rank column', code: 'assert df.iloc[0]["rank"] == 1' },
    { name: 'Top 3 count', code: 'assert len(top_3) == 3' },
    { name: 'Median salary', code: 'assert median_salary == 85000' }
  ]},
  { id: 'ex5', title: 'DataFrame Merge', description: 'Merge employees with departments using dept_id. Then add salary info. Find `total_payroll` and `dept_costs` (sum of salary per department name).', starterCode: 'import pandas as pd\n\nemployees = pd.DataFrame({\n    "emp_id": [1, 2, 3, 4, 5],\n    "name": ["Alice","Bob","Carol","Dave","Eve"],\n    "dept_id": [10, 20, 10, 30, 20],\n    "salary": [85000, 72000, 92000, 105000, 68000]\n})\n\ndepartments = pd.DataFrame({\n    "dept_id": [10, 20, 30],\n    "dept_name": ["Analytics", "Sales", "Engineering"]\n})\n\nmerged = \ntotal_payroll = \ndept_costs = \n\nprint(merged[["name", "dept_name", "salary"]])\nprint(f"Total payroll: ${total_payroll:,}")\nprint(f"Dept costs:\\n{dept_costs}")', tests: [
    { name: 'Merged has all rows', code: 'assert len(merged) == 5' },
    { name: 'Has dept_name', code: 'assert "dept_name" in merged.columns' },
    { name: 'Total payroll', code: 'assert total_payroll == 422000' },
    { name: 'Analytics cost', code: 'assert dept_costs["Analytics"] == 177000 or dept_costs.loc["Analytics"] == 177000' }
  ]},
  { id: 'ex6', title: 'Column Engineering', description: 'Add these columns: `tax` (25% of salary), `net_pay` (salary - tax), `category` ("Senior" if years >= 5, else "Junior"). Find `avg_net` and `senior_count`.', starterCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Alice","Bob","Carol","Dave","Eve"],\n    "salary": [85000, 72000, 92000, 105000, 68000],\n    "years": [3, 7, 2, 8, 1]\n})\n\ndf["tax"] = \ndf["net_pay"] = \ndf["category"] = \n\navg_net = \nsenior_count = \n\nprint(df)\nprint(f"Avg net: ${avg_net:,.2f}")\nprint(f"Seniors: {senior_count}")', tests: [
    { name: 'Tax column', code: 'assert df["tax"].iloc[0] == 21250.0' },
    { name: 'Net pay', code: 'assert df["net_pay"].iloc[0] == 63750.0' },
    { name: 'Category values', code: 'assert df["category"].iloc[1] == "Senior"' },
    { name: 'Senior count', code: 'assert senior_count == 2' }
  ]},
  { id: 'ex7', title: 'Concat and Summary', description: 'Concatenate q1 and q2 into `full_year`. Calculate `monthly_avg`, `best_month` (name), `growth` (percent change from first to last month, rounded to 1 decimal).', starterCode: 'import pandas as pd\n\nq1 = pd.DataFrame({"month": ["Jan","Feb","Mar"], "sales": [45000, 52000, 48000]})\nq2 = pd.DataFrame({"month": ["Apr","May","Jun"], "sales": [55000, 61000, 58000]})\n\nfull_year = \nmonthly_avg = \nbest_month = \ngrowth = \n\nprint(full_year)\nprint(f"Monthly avg: ${monthly_avg:,.2f}")\nprint(f"Best month: {best_month}")\nprint(f"Growth: {growth}%")', tests: [
    { name: 'Full year rows', code: 'assert len(full_year) == 6' },
    { name: 'Monthly avg', code: 'assert round(monthly_avg, 2) == 53166.67' },
    { name: 'Best month', code: 'assert best_month == "May"' },
    { name: 'Growth', code: 'assert growth == 28.9' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the DataFrame Filter', description: 'Fix the filtering and column operations.', buggyCode: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Alice","Bob","Carol"], "salary": [85000,72000,92000], "dept": ["Analytics","Sales","Analytics"]})\n\nhigh = df[df["salary"] > 80000 and df["dept"] == "Analytics"]\n\ndf["bonus"] = df.salary * 0.1\n\nresult = df.sort_values("salary", ascending=True)[-1]\nprint(result)', solution: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Alice","Bob","Carol"], "salary": [85000,72000,92000], "dept": ["Analytics","Sales","Analytics"]})\n\nhigh = df[(df["salary"] > 80000) & (df["dept"] == "Analytics")]\n\ndf["bonus"] = df["salary"] * 0.1\n\nresult = df.sort_values("salary", ascending=False).iloc[0]\nprint(result)', hints: ['Use & instead of and for Pandas boolean operations, with parentheses around each condition', 'Use df["salary"] not df.salary for consistency', 'Use .iloc[0] after sorting descending instead of [-1]'] },
  { id: 'sc2', title: 'Fix the GroupBy', description: 'Fix the groupby aggregation code.', buggyCode: 'import pandas as pd\n\ndf = pd.DataFrame({"dept": ["A","B","A","B","A"], "salary": [50000,60000,55000,65000,70000]})\n\nresult = df.groupby("dept").salary.mean\n\ncounts = df.groupby("dept").count("salary")\n\nprint(result)\nprint(counts)', solution: 'import pandas as pd\n\ndf = pd.DataFrame({"dept": ["A","B","A","B","A"], "salary": [50000,60000,55000,65000,70000]})\n\nresult = df.groupby("dept")["salary"].mean()\n\ncounts = df.groupby("dept")["salary"].count()\n\nprint(result)\nprint(counts)', hints: ['.mean is a method — needs parentheses: .mean()', 'Use ["salary"] bracket notation for column selection after groupby', '.count() does not take column name as argument'] },
  { id: 'sc3', title: 'Fix the Merge', description: 'Fix the DataFrame merge operation.', buggyCode: 'import pandas as pd\n\norders = pd.DataFrame({"order_id": [1,2,3], "product_id": [101,102,101], "qty": [5,3,8]})\nproducts = pd.DataFrame({"id": [101,102,103], "name": ["Widget","Gadget","Tool"], "price": [29.99,49.99,19.99]})\n\nmerged = pd.merge(orders, products, on="product_id")\nmerged["total"] = merged["qty"] * merged["price"]\n\nprint(merged)', solution: 'import pandas as pd\n\norders = pd.DataFrame({"order_id": [1,2,3], "product_id": [101,102,101], "qty": [5,3,8]})\nproducts = pd.DataFrame({"id": [101,102,103], "name": ["Widget","Gadget","Tool"], "price": [29.99,49.99,19.99]})\n\nmerged = pd.merge(orders, products, left_on="product_id", right_on="id")\nmerged["total"] = merged["qty"] * merged["price"]\n\nprint(merged)', hints: ['Column names differ: orders has "product_id", products has "id" — use left_on/right_on'] }
];

export const quiz = [
  { id: 'q1', type: 'multiple_choice', question: 'What is the difference between a Series and a DataFrame?', options: ['No difference', 'Series is 1D, DataFrame is 2D', 'DataFrame is faster', 'Series can hold mixed types'], correct: 1 },
  { id: 'q2', type: 'code_output', question: 'What does df[df["age"] > 30] return?', options: ['A boolean mask', 'A filtered DataFrame with rows where age > 30', 'An error', 'A single value'], correct: 1 },
  { id: 'q3', type: 'multiple_choice', question: 'What operator should you use for AND in Pandas boolean filtering?', options: ['and', '&&', '&', '+'], correct: 2 },
  { id: 'q4', type: 'scenario', question: 'You have sales data and want the average sale per region. Best Pandas approach?', options: ['Write a for loop', 'df.groupby("region")["sales"].mean()', 'df.sort_values("region")', 'df.merge()'], correct: 1 },
  { id: 'q5', type: 'code_output', question: 'What does df.shape return for a 5-row, 3-column DataFrame?', options: ['15', '(3, 5)', '(5, 3)', '[5, 3]'], correct: 2 },
  { id: 'q6', type: 'multiple_choice', question: 'What does pd.merge(a, b, how="left") do?', options: ['Keeps only matching rows', 'Keeps all rows from left, matching from right', 'Keeps all rows from right', 'Keeps all rows from both'], correct: 1 },
  { id: 'q7', type: 'code_output', question: 'What does df.iloc[0] return?', options: ['First column', 'First row as a Series', 'Column name', 'Error'], correct: 1 },
  { id: 'q8', type: 'multiple_choice', question: 'How do you add a new column to a DataFrame?', options: ['df.add_column("name", values)', 'df["name"] = values', 'df.insert("name", values)', 'df.column("name", values)'], correct: 1 },
  { id: 'q9', type: 'code_output', question: 'What does df.sort_values("price", ascending=False).head(3) return?', options: ['3 cheapest items', '3 most expensive items', 'All items sorted', 'Error'], correct: 1 },
  { id: 'q10', type: 'scenario', question: 'You want to combine two DataFrames with the same columns (Q1 sales + Q2 sales). Best method?', options: ['pd.merge()', 'pd.concat()', 'df.append()', 'df.join()'], correct: 1 },
  { id: 'q11', type: 'code_output', question: 'What does df.groupby("dept")["salary"].agg(["mean","count"]) produce?', options: ['A single number', 'A DataFrame with mean and count per department', 'An error', 'A list'], correct: 1 },
  { id: 'q12', type: 'multiple_choice', question: 'What is the difference between loc and iloc?', options: ['No difference', 'loc uses labels, iloc uses integer positions', 'iloc is faster', 'loc only works with strings'], correct: 1 },
  { id: 'q13', type: 'code_output', question: 'What does df.describe() show?', options: ['All data', 'Column names', 'Statistical summary (count, mean, std, min, max, quartiles)', 'Data types'], correct: 2 },
  { id: 'q14', type: 'multiple_choice', question: 'How do you rename columns in Pandas?', options: ['df.columns = new_names', 'df.rename(columns={"old": "new"})', 'Both work', 'Neither works'], correct: 2 },
  { id: 'q15', type: 'code_output', question: 'What does df.drop(columns=["age"]) do?', options: ['Deletes the age column permanently', 'Returns a new DataFrame without the age column', 'Raises an error', 'Sets age to 0'], correct: 1 }
];
