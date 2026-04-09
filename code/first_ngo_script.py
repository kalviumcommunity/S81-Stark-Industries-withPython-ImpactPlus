# First Python Script for NGO Resource Allocation Analysis
# This script demonstrates basic data handling for NGO program evaluation

# Sample NGO program data (simulated)
program_name = "Education Support Program"
total_cost = 50000  # in USD
beneficiaries = 1200
outcome_improvement = 25  # percentage improvement in education metrics

# Simple calculations
cost_per_beneficiary = total_cost / beneficiaries
efficiency_score = outcome_improvement / (total_cost / 1000)  # outcome per $1000 spent

# Print results
print("NGO Program Analysis Results")
print("=" * 30)
print(f"Program: {program_name}")
print(f"Total Cost: ${total_cost}")
print(f"Number of Beneficiaries: {beneficiaries}")
print(f"Cost per Beneficiary: ${cost_per_beneficiary:.2f}")
print(f"Efficiency Score: {efficiency_score:.2f}")
print("\nThis script demonstrates:")
print("- Variable definition")
print("- Basic calculations")
print("- Formatted output")
print("- Script execution flow")