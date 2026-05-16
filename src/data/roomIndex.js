// Room metadata registry - defines all rooms, paths, and ordering
export const paths = [
  { id: 'foundations', name: 'Python Foundations', color: 'green', icon: '🟢', rooms: [1,2,3,4,5] },
  { id: 'analytics', name: 'Data Analytics Core', color: 'cyan', icon: '🔵', rooms: [6,7,8,9,10] },
  { id: 'advanced', name: 'Advanced Analytics', color: 'pink', icon: '🔴', rooms: [11,12,13,14] },
  { id: 'systems', name: 'Systems & Integration', color: 'purple', icon: '🟣', rooms: [15,16,17,18] },
];

export const rooms = [
  { id: 1, title: 'The Data Types Dossier', path: 'foundations', description: 'Variables, strings, numbers, booleans, and type casting for storing business metrics.', topics: ['variables','data types','type casting','string operations','numeric operations'], difficulty: 'beginner', estimatedTime: '45 min' },
  { id: 2, title: 'Control Flow Command Center', path: 'foundations', description: 'Master if/elif/else, loops, and comprehensions for filtering and processing data.', topics: ['conditionals','for loops','while loops','list comprehensions','boolean logic'], difficulty: 'beginner', estimatedTime: '50 min' },
  { id: 3, title: 'Functions & Modular Thinking', path: 'foundations', description: 'Build reusable analytics utilities with functions, parameters, and lambda expressions.', topics: ['functions','parameters','return values','scope','lambda','*args/**kwargs'], difficulty: 'beginner', estimatedTime: '50 min' },
  { id: 4, title: 'Data Structures Arsenal', path: 'foundations', description: 'Lists, dicts, sets, and tuples for inventory management and log processing.', topics: ['lists','dictionaries','sets','tuples','nested structures','dict comprehensions'], difficulty: 'beginner', estimatedTime: '55 min' },
  { id: 5, title: 'File I/O & Exception Handling', path: 'foundations', description: 'Read/write CSV and JSON files with robust error handling for data pipelines.', topics: ['file reading','file writing','CSV','JSON','try/except','context managers'], difficulty: 'beginner', estimatedTime: '50 min' },
  { id: 6, title: 'NumPy: The Numerical Engine', path: 'analytics', description: 'Arrays, broadcasting, and vectorized operations for financial and sensor data.', topics: ['numpy arrays','broadcasting','vectorization','array math','statistics','reshaping'], difficulty: 'intermediate', estimatedTime: '60 min', prereqs: [1,2,3,4] },
  { id: 7, title: 'Pandas: Data Wrangling', path: 'analytics', description: 'DataFrames, selection, filtering, groupby, and merge for sales analysis.', topics: ['DataFrames','Series','indexing','filtering','groupby','merge','sort'], difficulty: 'intermediate', estimatedTime: '65 min', prereqs: [6] },
  { id: 8, title: 'Data Cleaning Laboratory', path: 'analytics', description: 'Handle missing data, duplicates, and type issues in real-world messy datasets.', topics: ['missing data','duplicates','type conversion','string cleaning','validation','outliers'], difficulty: 'intermediate', estimatedTime: '55 min', prereqs: [7] },
  { id: 9, title: 'Visualization Studio', path: 'analytics', description: 'Create compelling charts with Matplotlib and Seaborn for dashboards and reports.', topics: ['matplotlib','seaborn','line plots','bar charts','scatter plots','histograms','styling'], difficulty: 'intermediate', estimatedTime: '60 min', prereqs: [7] },
  { id: 10, title: 'Statistical Analysis Workshop', path: 'analytics', description: 'Descriptive stats, distributions, correlation, and hypothesis testing for A/B tests.', topics: ['descriptive stats','distributions','correlation','hypothesis testing','confidence intervals'], difficulty: 'intermediate', estimatedTime: '60 min', prereqs: [6,7] },
  { id: 11, title: 'Business Intelligence Pipeline', path: 'advanced', description: 'Pivot tables, time series, rolling averages, and KPI computation for forecasting.', topics: ['pivot tables','time series','rolling averages','KPIs','resample','window functions'], difficulty: 'advanced', estimatedTime: '65 min', prereqs: [7,8,10] },
  { id: 12, title: 'Machine Learning Foundations', path: 'advanced', description: 'Intro to scikit-learn: regression, classification, and model evaluation.', topics: ['scikit-learn','linear regression','classification','train/test split','model evaluation','feature engineering'], difficulty: 'advanced', estimatedTime: '70 min', prereqs: [6,7,10] },
  { id: 13, title: 'Interactive Visualization', path: 'advanced', description: 'Build interactive dashboards and charts with Plotly for stakeholder presentations.', topics: ['plotly','interactive charts','subplots','annotations','dashboards','hover data'], difficulty: 'advanced', estimatedTime: '55 min', prereqs: [9] },
  { id: 14, title: 'Advanced Pandas & Performance', path: 'advanced', description: 'Multi-index, method chaining, apply/map, and optimization for large datasets.', topics: ['multi-index','method chaining','apply','map','pipe','memory optimization','categorical'], difficulty: 'advanced', estimatedTime: '60 min', prereqs: [7,8,11] },
  { id: 15, title: 'SQL & Databases with Python', path: 'systems', description: 'Query databases with SQLAlchemy and sqlite3 for data integration.', topics: ['sqlite3','SQLAlchemy','SQL queries','joins','aggregation','ORM basics'], difficulty: 'advanced', estimatedTime: '65 min', prereqs: [7] },
  { id: 16, title: 'Systems Analytics & Automation', path: 'systems', description: 'Log analysis, system monitoring, regex, and automated report generation.', topics: ['os module','regex','logging','file system','automation','scheduling','subprocess'], difficulty: 'advanced', estimatedTime: '60 min', prereqs: [3,5] },
  { id: 17, title: 'Data Integration & Reporting', path: 'systems', description: 'Consume APIs, merge multi-source data, and build automated ETL pipelines.', topics: ['API consumption','JSON APIs','ETL pipelines','multi-source joins','report generation'], difficulty: 'advanced', estimatedTime: '65 min', prereqs: [5,7,8] },
  { id: 18, title: 'Capstone: Full Analytics Project', path: 'systems', description: 'End-to-end analytics project combining all skills learned throughout the course.', topics: ['project planning','data collection','cleaning','analysis','visualization','reporting','presentation'], difficulty: 'expert', estimatedTime: '90 min', prereqs: [11,12,13,14] },
];

export function getRoomById(id) {
  return rooms.find(r => r.id === id);
}

export function getPathForRoom(roomId) {
  return paths.find(p => p.rooms.includes(roomId));
}

export function isRoomUnlocked(roomId, completedRoomIds) {
  const room = getRoomById(roomId);
  if (!room.prereqs || room.prereqs.length === 0) return true;
  return room.prereqs.every(pre => completedRoomIds.includes(pre));
}
