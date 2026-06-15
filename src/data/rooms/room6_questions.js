export const exercises = [
  { id: 'ex1', title: 'Array Basics', description: 'Create: `temps` array from the list, `freezing` (boolean array where temp < 32), `cold_days` (count of freezing temps), `avg_temp` (mean rounded to 1 decimal).', starterCode: 'import numpy as np\n\ntemp_list = [28, 35, 22, 41, 30, 45, 38, 19, 33, 27]\n\ntemps = \nfreezing = \ncold_days = \navg_temp = \n\nprint(f"Temps: {temps}")\nprint(f"Freezing: {freezing}")\nprint(f"Cold days: {cold_days}")\nprint(f"Avg temp: {avg_temp}")', tests: [
    { name: 'Is numpy array', code: 'import numpy as np\nassert isinstance(temps, np.ndarray)' },
    { name: 'Freezing boolean', code: 'assert freezing[0] == True and freezing[1] == False' },
    { name: 'Cold days count', code: 'assert cold_days == 4' },
    { name: 'Avg temp', code: 'assert avg_temp == 31.8' }
  ]},
  { id: 'ex2', title: 'Vectorized Revenue Calculator', description: 'Calculate revenue metrics using vectorized operations (no loops). Create: `revenue` (prices * quantities), `total_revenue`, `avg_revenue`, `above_avg` (count of products with revenue above average).', starterCode: 'import numpy as np\n\nprices = np.array([29.99, 49.99, 19.99, 99.99, 14.99, 39.99])\nquantities = np.array([150, 85, 310, 42, 520, 175])\n\nrevenue = \ntotal_revenue = \navg_revenue = \nabove_avg = \n\nprint(f"Revenue: {revenue}")\nprint(f"Total: ${total_revenue:,.2f}")\nprint(f"Avg: ${avg_revenue:,.2f}")\nprint(f"Above avg: {above_avg}")', tests: [
    { name: 'Revenue array', code: 'import numpy as np\nassert isinstance(revenue, np.ndarray) and len(revenue) == 6' },
    { name: 'First revenue', code: 'assert round(revenue[0], 2) == 4498.50' },
    { name: 'Total revenue', code: 'assert round(total_revenue, 2) == 28906.80' },
    { name: 'Above avg count', code: 'assert above_avg == 3' }
  ]},
  { id: 'ex3', title: 'Statistical Summary', description: 'Compute a full statistical summary of the dataset: `mean_val`, `std_val` (standard deviation), `min_val`, `max_val`, `range_val` (max - min), `q25` and `q75` (25th and 75th percentiles). All rounded to 2 decimals.', starterCode: 'import numpy as np\n\ndata = np.array([23.5, 45.2, 67.8, 12.1, 89.3, 34.6, 56.7, 78.9, 41.2, 93.4])\n\nmean_val = \nstd_val = \nmin_val = \nmax_val = \nrange_val = \nq25 = \nq75 = \n\nprint(f"Mean: {mean_val}")\nprint(f"Std: {std_val}")\nprint(f"Range: {range_val}")\nprint(f"IQR: {q25} - {q75}")', tests: [
    { name: 'Mean', code: 'assert mean_val == 54.27' },
    { name: 'Min', code: 'assert min_val == 12.1' },
    { name: 'Max', code: 'assert max_val == 93.4' },
    { name: 'Range', code: 'assert range_val == 81.3' },
    { name: 'Q25', code: 'assert q25 == round(float(q25), 2)' }
  ]},
  { id: 'ex4', title: 'Matrix Operations', description: 'Create a 3x4 matrix from range(12). Calculate: `row_sums` (sum of each row), `col_means` (mean of each column), `transposed` (transposed matrix), `flat` (flattened to 1D).', starterCode: 'import numpy as np\n\nmatrix = np.arange(12).reshape(3, 4)\nprint(f"Matrix:\\n{matrix}")\n\nrow_sums = \ncol_means = \ntransposed = \nflat = \n\nprint(f"Row sums: {row_sums}")\nprint(f"Col means: {col_means}")\nprint(f"Transposed shape: {transposed.shape}")\nprint(f"Flat: {flat}")', tests: [
    { name: 'Row sums', code: 'import numpy as np\nassert list(row_sums) == [6, 22, 38]' },
    { name: 'Col means', code: 'import numpy as np\nassert list(col_means) == [4.0, 5.0, 6.0, 7.0]' },
    { name: 'Transposed shape', code: 'assert transposed.shape == (4, 3)' },
    { name: 'Flat length', code: 'assert len(flat) == 12' }
  ]},
  { id: 'ex5', title: 'Boolean Masking & Filtering', description: 'Given exam scores, use boolean indexing to create: `passing` (scores >= 60), `honor_roll` (scores >= 90), `failing_count`, `pass_rate` (percentage passing, rounded to 1 decimal).', starterCode: 'import numpy as np\n\nscores = np.array([85, 42, 91, 67, 73, 55, 88, 95, 38, 76, 82, 60])\n\npassing = \nhonor_roll = \nfailing_count = \npass_rate = \n\nprint(f"Passing scores: {passing}")\nprint(f"Honor roll: {honor_roll}")\nprint(f"Failing: {failing_count}")\nprint(f"Pass rate: {pass_rate}%")', tests: [
    { name: 'Passing count', code: 'assert len(passing) == 9' },
    { name: 'Honor roll', code: 'import numpy as np\nassert list(honor_roll) == [91, 95]' },
    { name: 'Failing count', code: 'assert failing_count == 3' },
    { name: 'Pass rate', code: 'assert pass_rate == 75.0' }
  ]},
  { id: 'ex6', title: 'Regional Sales Analysis', description: 'Given quarterly sales by region (2D array), calculate: `region_totals` (total per region), `quarter_avgs` (average per quarter), `best_region` (index of highest total), `best_quarter` (index of highest average).', starterCode: 'import numpy as np\n\n# Rows: regions (North, South, East, West)\n# Cols: quarters (Q1, Q2, Q3, Q4)\nsales = np.array([\n    [45000, 52000, 38000, 61000],\n    [32000, 41000, 35000, 48000],\n    [28000, 33000, 31000, 39000],\n    [51000, 47000, 44000, 58000]\n])\n\nregion_totals = \nquarter_avgs = \nbest_region = \nbest_quarter = \n\nregion_names = ["North", "South", "East", "West"]\nprint(f"Best region: {region_names[best_region]}")\nprint(f"Best quarter: Q{best_quarter + 1}")', tests: [
    { name: 'Region totals', code: 'import numpy as np\nassert list(region_totals) == [196000, 156000, 131000, 200000]' },
    { name: 'Best region', code: 'assert best_region == 3' },
    { name: 'Best quarter', code: 'assert best_quarter == 3' },
    { name: 'Quarter avgs length', code: 'assert len(quarter_avgs) == 4' }
  ]},
  { id: 'ex7', title: 'Array Generation & Stacking', description: 'Create: `evens` (even numbers 2-20 using arange), `linspace_arr` (5 evenly spaced values from 0 to 100), `combined` (vertical stack of evens reshaped to 2x5 and a row of ones). Find `combined_sum`.', starterCode: 'import numpy as np\n\nevens = \nlinspace_arr = \n\nevens_2d = evens.reshape(2, 5)\nones_row = np.ones((1, 5))\ncombined = \ncombined_sum = \n\nprint(f"Evens: {evens}")\nprint(f"Linspace: {linspace_arr}")\nprint(f"Combined:\\n{combined}")\nprint(f"Sum: {combined_sum}")', tests: [
    { name: 'Evens', code: 'import numpy as np\nassert list(evens) == [2,4,6,8,10,12,14,16,18,20]' },
    { name: 'Linspace', code: 'import numpy as np\nassert len(linspace_arr) == 5 and linspace_arr[0] == 0.0 and linspace_arr[-1] == 100.0' },
    { name: 'Combined shape', code: 'assert combined.shape == (3, 5)' },
    { name: 'Combined sum', code: 'assert combined_sum == 115.0' }
  ]}
];

export const scenarios = [
  { id: 'sc1', title: 'Fix the NumPy Calculator', description: 'Fix the bugs in this NumPy statistics calculator.', buggyCode: 'import numpy as np\n\ndata = [10, 20, 30, 40, 50]\n\nmean = data.mean()\nstd = np.std(data)\nabove_mean = data[data > mean]\n\nreshaped = data.reshape(5, 1)\nprint(f"Mean: {mean}, Std: {std}")\nprint(f"Above mean: {above_mean}")\nprint(f"Reshaped: {reshaped}")', solution: 'import numpy as np\n\ndata = np.array([10, 20, 30, 40, 50])\n\nmean = data.mean()\nstd = np.std(data)\nabove_mean = data[data > mean]\n\nreshaped = data.reshape(5, 1)\nprint(f"Mean: {mean}, Std: {std}")\nprint(f"Above mean: {above_mean}")\nprint(f"Reshaped:\\n{reshaped}")', hints: ['data is a plain list, not a numpy array — need np.array()', 'Lists do not have .mean(), .reshape() or boolean indexing'] },
  { id: 'sc2', title: 'Fix the Matrix Analysis', description: 'Fix the axis operations in this regional analysis.', buggyCode: 'import numpy as np\n\nsales = np.array([[100, 200], [300, 400], [500, 600]])\n\n# Total per region (each row)\nregion_totals = sales.sum(axis=0)\n\n# Average per quarter (each column)\nquarter_avgs = sales.mean(axis=1)\n\n# Normalize each row by its total\nnormalized = sales / region_totals\n\nprint(f"Region totals: {region_totals}")\nprint(f"Quarter avgs: {quarter_avgs}")\nprint(f"Normalized:\\n{normalized}")', solution: 'import numpy as np\n\nsales = np.array([[100, 200], [300, 400], [500, 600]])\n\nregion_totals = sales.sum(axis=1)\nquarter_avgs = sales.mean(axis=0)\nnormalized = sales / region_totals.reshape(-1, 1)\n\nprint(f"Region totals: {region_totals}")\nprint(f"Quarter avgs: {quarter_avgs}")\nprint(f"Normalized:\\n{normalized}")', hints: ['axis=0 sums DOWN columns — for row totals use axis=1', 'axis=1 means ACROSS columns — for column averages use axis=0', 'Division needs matching shapes — reshape totals to column vector with .reshape(-1, 1)'] },
  { id: 'sc3', title: 'Fix the Filter Pipeline', description: 'Fix this code that filters and transforms array data.', buggyCode: 'import numpy as np\n\nprices = np.array([29.99, 49.99, 5.99, 99.99, 14.99])\nquantities = np.array([100, 50, 500, 20, 200])\n\nrevenue = prices * quantities\n\nbig_sales = revenue[revenue > 2000]\n\nbig_count = big_sales.count()\n\ntop_idx = revenue.argmax\ntop_product = f"Product {top_idx}"\n\nprint(f"Big sales: {big_sales}")\nprint(f"Count: {big_count}")\nprint(f"Top: {top_product}")', solution: 'import numpy as np\n\nprices = np.array([29.99, 49.99, 5.99, 99.99, 14.99])\nquantities = np.array([100, 50, 500, 20, 200])\n\nrevenue = prices * quantities\n\nbig_sales = revenue[revenue > 2000]\n\nbig_count = len(big_sales)\n\ntop_idx = revenue.argmax()\ntop_product = f"Product {top_idx}"\n\nprint(f"Big sales: {big_sales}")\nprint(f"Count: {big_count}")\nprint(f"Top: {top_product}")', hints: ['NumPy arrays have no .count() method — use len()', '.argmax is a method — need parentheses: .argmax()'] }
];

export const quiz = [
  { id: 'q1', type: 'multiple_choice', question: 'What is the main advantage of NumPy arrays over Python lists?', options: ['They can hold mixed types', 'Vectorized operations are much faster', 'They use more memory', 'They are easier to create'], correct: 1 },
  { id: 'q2', type: 'code_output', question: 'What does this produce?\n```python\nimport numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(arr * 2)\n```', options: ['[1,2,3,4,5,1,2,3,4,5]', '[2, 4, 6, 8, 10]', 'Error', '[1, 2, 3, 4, 5, 2]'], correct: 1 },
  { id: 'q3', type: 'multiple_choice', question: 'What does axis=0 mean in np.sum(matrix, axis=0)?', options: ['Sum each row', 'Sum each column', 'Sum everything', 'Sum diagonals'], correct: 1 },
  { id: 'q4', type: 'code_output', question: 'What does this return?\n```python\nimport numpy as np\narr = np.array([10, 20, 30, 40, 50])\nprint(arr[arr > 25])\n```', options: ['[True, False, True, True, True]', '[30, 40, 50]', '[10, 20]', 'Error'], correct: 1 },
  { id: 'q5', type: 'scenario', question: 'You need to calculate the mean of 10 million numbers. Best approach?', options: ['Python for loop with sum()', 'NumPy array .mean()', 'List comprehension', 'Manual calculation'], correct: 1 },
  { id: 'q6', type: 'code_output', question: 'What is the shape?\n```python\nimport numpy as np\narr = np.arange(12).reshape(3, 4)\nprint(arr.shape)\n```', options: ['(12,)', '(3, 4)', '(4, 3)', '12'], correct: 1 },
  { id: 'q7', type: 'multiple_choice', question: 'What does np.linspace(0, 10, 5) create?', options: ['[0, 2, 4, 6, 8]', '[0, 2.5, 5, 7.5, 10]', '[0, 10, 5]', '[0, 1, 2, 3, 4]'], correct: 1 },
  { id: 'q8', type: 'code_output', question: 'What does arr.argmax() return for arr = np.array([5, 2, 8, 1, 9])?', options: ['9', '4', '8', '[9]'], correct: 1 },
  { id: 'q9', type: 'multiple_choice', question: 'How do you create a copy of a NumPy array?', options: ['b = a', 'b = a.copy()', 'b = a[:]', 'Both b = a.copy() and b = a[:] work'], correct: 3 },
  { id: 'q10', type: 'code_output', question: 'What does np.zeros((2,3)) create?', options: ['[0, 0, 0, 0, 0, 0]', '[[0,0,0],[0,0,0]]', '[[0,0],[0,0],[0,0]]', 'Error'], correct: 1 },
  { id: 'q11', type: 'scenario', question: 'You need to find which products had sales above the median. Best NumPy approach?', options: ['Sort and pick the middle', 'Use np.median() then boolean indexing', 'Use a for loop', 'Use np.mean()'], correct: 1 },
  { id: 'q12', type: 'code_output', question: 'What is np.array([1,2,3]) + np.array([10,20,30])?', options: ['[1,2,3,10,20,30]', '[11, 22, 33]', 'Error', '66'], correct: 1 },
  { id: 'q13', type: 'multiple_choice', question: 'What does .reshape(-1, 3) mean?', options: ['Remove 1 row, keep 3 cols', 'Auto-calculate rows, 3 columns', 'Negative indexing', 'Error'], correct: 1 },
  { id: 'q14', type: 'code_output', question: 'What does np.arange(1, 10, 2) produce?', options: ['[1,2,3,4,5,6,7,8,9]', '[1, 3, 5, 7, 9]', '[2, 4, 6, 8]', '[1, 10, 2]'], correct: 1 },
  { id: 'q15', type: 'multiple_choice', question: 'Why is vectorized NumPy faster than Python loops?', options: ['Python loops are broken', 'NumPy uses optimized C code and avoids per-element Python overhead', 'NumPy uses GPU', 'NumPy compresses data'], correct: 1 }
];
