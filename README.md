# 📊 Data Evaluation for Optimizing NGO Resource Allocation

## 🧩 Problem Statement

Non-Governmental Organizations (NGOs) run large-scale welfare programs aimed at improving education, healthcare, and livelihoods. However, they often lack clear evidence on which interventions create the most impact. This leads to inefficient use of limited resources.

---

## 📋 What You Are Expected to Do

This milestone focuses on **data organization** for the NGO resource allocation project. You will organize program data (cost, participation, outcomes) without performing analysis or modeling.

### Overall Expectations

- Understand how to handle raw NGO program data
- Organize processed datasets separately
- Manage output artifacts like reports and visualizations
- Prevent data contamination by keeping data types separate

### 1. Understanding Raw Data

Learn how NGO program data should be treated as raw data:

- Preserve original program data (cost, beneficiaries, outcomes) without any changes
- Store raw data in a dedicated folder to maintain its integrity
- Recognize raw data as the foundation for all analysis
- Avoid modifying or cleaning raw data directly

### 2. Organizing Processed Data

Set up storage for cleaned or transformed NGO datasets:

- Create separate folders for processed data
- Label processed files clearly (e.g., "cleaned_participation_data.csv")
- Keep processed data distinct from raw data
- Document any transformations applied to the data

### 3. Managing Output Artifacts

Handle results and insights from the project properly:

- Store reports, visualizations, and insights in output folders
- Separate outputs from data and code files
- Use clear naming for output files (e.g., "impact_analysis_report.pdf")
- Keep outputs organized for easy sharing and review

### 4. Preventing Data Contamination

Avoid errors by keeping different data types separate:

- Never mix raw data with processed or output data
- Use version control to track changes without overwriting originals
- Implement clear folder structures to prevent accidental mixing
- Regularly check data integrity to ensure accuracy

### Naming Conventions

Use clear, meaningful names for all files:

- Raw data: `raw_program_participation_2024.csv`
- Processed data: `processed_cleaned_participation_data.csv`
- Outputs: `impact_analysis_report.pdf`

---

## 📜 Milestone: Creating Your First Python Script

This milestone focuses on creating and running your first standalone Python script for data analysis. While notebooks are great for exploration, scripts are essential for repeatable, shareable, and automation-friendly workflows.

The sample script at `code/first_ngo_script.py` now includes explicit numeric and string data type examples, type conversion, and safe formatting.

Learning how to move from notebooks to scripts is a key step toward writing real-world Data Science code.

### Learning Objectives

- Understand what a Python script is and when to use it
- Create a .py file for data analysis
- Run a Python script from the command line or editor
- Print outputs and observe results
- Build confidence executing code outside notebooks
- Learn how numeric and string data types behave in Python

### What You Will Achieve

- Create a basic Python script for data-related tasks
- Run scripts reliably from the terminal or editor
- Understand script execution flow from top to bottom
- Debug simple execution issues
- Use scripts alongside notebooks effectively

### Why This Matters

Common beginner issues include:

- Relying only on notebooks for all tasks
- Not knowing how to run code outside Jupyter
- Difficulty automating or reusing analysis
- Confusion between interactive and script-based workflows

Scripts solve these problems by ensuring:

- Your work is repeatable and reusable
- You can automate simple data tasks
- Your code runs consistently end to end
- You are comfortable working outside notebooks

Think of scripts as the production version of your analysis.

### What You Are Expected to Do

This is a scripting fundamentals milestone, not a complex data analysis task.

You are expected to:

- Create a Python script file
- Write simple data-related logic
- Run the script successfully
- Observe and explain the output

No large datasets or advanced libraries are required.

#### 1. Creating a Python Script

Create a .py file for your analysis.

- Name the script clearly
- Place it in the appropriate project folder
- Write valid Python code inside the file
- Avoid notebook-only features

#### 2. Writing Simple Data Logic

Add basic logic to the script.

- Define variables and simple calculations
- Work with small sample data
- Print results to the console
- Keep logic simple and readable

#### 3. Running the Script

Execute the script.

- Run the script from a terminal or editor
- Observe printed output
- Fix basic errors if execution fails
- Understand how Python executes scripts top to bottom

#### 4. Understanding Script vs Notebook Execution

Learn the differences.

- Understand when to use scripts vs notebooks
- Recognize the lack of persistent state in scripts
- Appreciate scripts for automation and reuse
- Avoid treating scripts like interactive notebooks

#### 5. Video Walkthrough (~2 Minutes)

Record a short screen-capture video demonstrating your script.

- The .py file in the project
- Running the script
- Observing and explaining output
- Brief explanation of why scripts are useful

### Submission Guidelines

- Submit your work as a Pull Request (if required)
- Submit the video link as instructed
- Video should be approximately 2 minutes
- Video must be screen-facing and clearly visible

### Important Notes

- Keep scripts simple and focused
- Avoid unnecessary complexity
- Use print statements for visibility
- Scripts are a foundation for automation

Being able to create and run Python scripts is a core professional skill. This milestone ensures you can move beyond notebooks and execute data workflows confidently.

### Bonus Content (Optional)

- How to Run Python Scripts
- Python Scripts vs Jupyter Notebooks
- Writing Your First Python Program

## 🔄 Applying the Data Science Lifecycle

### Question → Data → Insight

---

## 1. ❓ Defining the Question

The first step is to convert the broad problem into specific, actionable questions:

- Which programs create the highest impact?
- Which intervention provides the best outcome per unit cost?
- Which regions or populations benefit the most from specific programs?

A clear question ensures that the analysis is focused and useful for decision-making.

---

## 2. 📊 Understanding Data as Evidence

To answer these questions, NGOs need relevant data such as:

- Program participation records
- Cost of each intervention
- Outcome metrics (education levels, health improvements, employment rates)
- Demographic information (age, gender, location, income)

It is important to recognize that data is not perfect. It may contain:

- Missing values
- Biases
- Measurement errors

Therefore, data should be treated as **evidence**, not absolute truth.

---

## 3. 🔍 Exploring the Data

Before drawing conclusions, data must be explored:

- Compare outcomes before and after programs
- Analyze differences across regions or groups
- Identify patterns, trends, and anomalies
- Evaluate relationships between cost and impact

This step helps in understanding what the data is indicating without making premature assumptions.

---

## 4. 💡 Generating Insights

From exploration, meaningful insights can be derived:

- Some programs may show significantly higher impact than others
- Certain interventions may work better for specific communities
- High-cost programs may not always produce high impact

An insight connects data findings to real-world decisions.

---

## 5. 🎯 Optimizing Resource Allocation

Using these insights, NGOs can:

- Allocate more funds to high-impact programs
- Reduce or eliminate ineffective interventions
- Target the right beneficiaries
- Improve program design based on data feedback

---

## 🔁 End-to-End Flow

```
Question → Data → Insight → Decision
```

- Define what needs to be solved
- Collect and analyze relevant data
- Identify meaningful patterns
- Make informed decisions

---

## 📌 Example

An NGO runs two programs:

- Free textbooks distribution
- Teacher training workshops

After data evaluation:

- Textbooks show minor improvement in student performance
- Teacher training leads to significant improvement

**Decision:**

- Increase investment in teacher training
- Reduce spending on textbook distribution

---

## ✅ Conclusion

Data evaluation enables NGOs to move from assumption-based decisions to evidence-based strategies. By identifying what truly works, they can maximize impact while using resources efficiently.

## 🧩 1. Project Intent & High-Level Flow

### 🔍 Problem Being Addressed

The project focuses on understanding how data can be used to analyze and improve decision-making. Specifically, it aims to identify patterns, relationships, and insights from the dataset that can help solve a real-world problem.

In this context, the goal is to:

- Analyze data systematically
- Extract meaningful insights
- Support better decision-making

---

### 🔄 Data Science Workflow Followed

The repository follows a structured workflow aligned with the data science lifecycle:

1. **Question Definition**
   - Understanding what problem needs to be solved

2. **Data Collection & Understanding**
   - Identifying dataset sources and structure

3. **Data Cleaning & Preparation**
   - Handling missing values and inconsistencies

4. **Exploratory Data Analysis (EDA)**
   - Identifying patterns and trends

5. **Insight Generation**
   - Converting observations into meaningful conclusions

---

### 🧠 How Structure Reflects Lifecycle

The repository structure reflects different stages of the lifecycle:

- Early stages → Data and notebooks
- Middle stages → Analysis and transformations
- Final stages → Insights and outputs

This shows a clear flow from raw data to final conclusions.

---

## 📁 2. Repository Structure & File Roles

### 📂 Key Folders and Their Purpose

- **data/**
  Contains raw and processed datasets used in the project

- **notebooks/**
  Used for exploratory analysis and step-by-step investigation

- **src/ or scripts/**
  Contains reusable code and functions

- **outputs/ / reports/ / figures/**
  Stores final results such as graphs and summaries

---

### 🔍 Exploratory vs Finalized Work

- **Exploratory Work (Notebooks)**
  - Used for testing ideas
  - Includes trial-and-error analysis
  - May not be fully structured

- **Finalized Work (Scripts/Outputs)**
  - Clean and structured
  - Reusable and reliable
  - Represents final conclusions

---

### ⚠️ Where Contributors Should Be Careful

- Avoid modifying raw data files directly
- Do not overwrite final outputs without understanding them
- Be cautious when editing core scripts in `src/`
- Always understand notebook flow before making changes

---

## ⚠️ 3. Assumptions, Gaps, and Open Questions

### 🧠 Assumptions

- The dataset is accurate and representative
- Data collected reflects real-world conditions
- No major bias exists in data collection

---

### ❗ Gaps Identified

- Limited explanation of dataset source
- Missing documentation on preprocessing steps
- Lack of clear explanation of key decisions

---

### ❓ Open Questions

- How was the data collected?
- Are there missing or biased samples?
- What external factors might affect results?

---

### 🚀 Suggested Improvement

One key improvement would be:

👉 Add a more detailed README section explaining:

- Dataset source
- Data preprocessing steps
- Key insights

This would make the repository easier for new contributors to understand and extend.

---

## ✅ Conclusion

This repository demonstrates a structured approach to data analysis by following the data science lifecycle. While the overall workflow is clear, improving documentation and clarity would make it more accessible and easier to contribute to.

---

## 🧩 Milestone: Defining and Calling Python Functions

This milestone focuses on writing clean, reusable Python code using functions.

### Learning Objectives

- Understand what functions are and why they improve code quality
- Define functions correctly using `def`
- Call functions with required arguments
- Use parameters to make logic reusable
- Understand basic local vs global scope behavior

### Milestone Script

Use the script below for this milestone:

- `code/functions_demo.py`

It demonstrates:

- Defining small, focused functions
- Calling functions in a clear execution flow
- Passing arguments to functions
- Returning values from functions
- Observing local vs global scope

### Run the Milestone Script

From the project root:

```bash
python3 code/functions_demo.py
```

### Video Walkthrough (~2 Minutes)

Your video should show:

- Opening `code/functions_demo.py`
- Defining at least one function (`def ...`)
- Calling functions from `main()`
- Passing arguments and showing output
- Explaining how execution enters a function and returns back
- Demonstrating basic scope behavior

### Tips

- Keep functions short and focused on one job
- Use descriptive function and parameter names
- Avoid unnecessary global variables
- Reuse logic instead of repeating code blocks

---

## 🧩 Milestone: Passing Data Into Functions and Returning Results

This milestone focuses on designing functions as clear input-output units.

### Learning Objectives

- Understand the difference between parameters and arguments
- Pass data into functions correctly
- Return results with `return` instead of only printing
- Reuse returned values in further computation
- Build predictable and reusable function behavior

### Milestone Script

Use the script below for this milestone:

- `code/function_io_demo.py`

It demonstrates:

- Defining functions with meaningful parameters
- Calling functions with different argument values
- Returning computed results from functions
- Storing returned values in variables
- Passing returned values into other functions

### Run the Milestone Script

From the project root:

```bash
python3 code/function_io_demo.py
```

### Video Walkthrough (~2 Minutes)

Your video should show:

- A function definition with parameters
- Passing arguments into the function during calls
- Returning a value using `return`
- Using returned results in later calculations
- Printing results outside the function

### Tips

- Prefer `return` for reusable logic
- Avoid hardcoding values inside functions
- Keep each function focused on one responsibility
- Ensure return paths are clear and predictable
