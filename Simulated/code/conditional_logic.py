# Conditional Logic Milestone
# This script evaluates data-driven conditional logic in Python.

print("--- Data-Driven Conditional Logic Evaluation ---")

# Sample Data Elements
program_status = "active"
funding_received = 45000
required_funding = 50000
beneficiaries = 1500
is_audit_completed = False
has_community_support = True

# 1. A basic if condition
if program_status == "active":
    print("Execution Path 1: The program is currently running.")

# 2. An if-else decision branch
if funding_received >= required_funding:
    print("Execution Path 2: Funding goal reached. Implementation can start.")
else:
    print(f"Execution Path 2: Shortage of funds. Need ${required_funding - funding_received} more.")

# 3. An if-elif-else structure with multiple conditions
# Comparing numeric values accurately
if beneficiaries > 2000:
    impact_level = "High Impact"
elif beneficiaries >= 1000:
    impact_level = "Medium Impact"
else:
    impact_level = "Low Impact"

print(f"Execution Path 3: Calculated Program Impact Level -> {impact_level}")

# 4. Use of logical operators (and, or, not) and String Comparisons
if program_status == "active" and funding_received > 0:
    print("Execution Path 4 (AND logic): Program forms a valid operation.")

if has_community_support or is_audit_completed:
    print("Execution Path 5 (OR logic): Program has sufficient backing to continue operation.")

if not is_audit_completed:
    print("Execution Path 6 (NOT logic): Warning: Program audit is still pending.")

print("\nLogic execution successfully completed.")
