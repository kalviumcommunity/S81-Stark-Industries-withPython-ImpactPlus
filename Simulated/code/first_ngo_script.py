# First Python Script for NGO Resource Allocation Analysis
# This script demonstrates Python numeric and string data types with simple operations.

# String variables
program_name = "Education Support Program"
program_sector = "Education"
summary_message = "Improving learning outcomes with effective spending"

# Integer numeric variables
year_launched = 2025
total_cost = 50000  # in USD
beneficiaries = 1200

# Float numeric variables
average_cost_per_person = total_cost / beneficiaries
impact_percentage = 25.0
improvement_score = impact_percentage / 100

# Demonstrate numeric type behavior
division_example = 7 / 2
floor_division_example = 7 // 2
precision_example = 0.1 + 0.2

# Demonstrate string formatting and safe conversion
safe_message = (
    program_name
    + " serves "
    + str(beneficiaries)
    + " beneficiaries in the "
    + program_sector
    + " sector."
)
formatted_summary = f"{program_name} launched in {year_launched}: {summary_message}"

# Example of converting a string to a number
raw_beneficiaries = "1200"
beneficiaries_from_string = int(raw_beneficiaries)

# Print results
print("NGO Data Types Demonstration")
print("=" * 30)
print(formatted_summary)
print("Program details:")
print(f"  Name: {program_name}")
print(f"  Sector: {program_sector}")
print(f"  Year launched: {year_launched} (type: {type(year_launched).__name__})")
print(f"  Total cost: ${total_cost} (type: {type(total_cost).__name__})")
print(f"  Beneficiaries: {beneficiaries} (type: {type(beneficiaries).__name__})")
print(f"  Average cost per person: ${average_cost_per_person:.2f} (type: {type(average_cost_per_person).__name__})")
print(f"  Impact percentage: {impact_percentage}% (type: {type(impact_percentage).__name__})")
print("\nSafety example with type conversion:")
print(safe_message)
print(f"Beneficiaries from string conversion: {beneficiaries_from_string}")
print("\nNumeric operation examples:")
print(f"  7 / 2 = {division_example}")
print(f"  7 // 2 = {floor_division_example}")
print(f"  0.1 + 0.2 = {precision_example}")
print("\nType inspection helps avoid bugs:")
print(f"  type(total_cost) -> {type(total_cost).__name__}")
print(f"  type(program_name) -> {type(program_name).__name__}")

# Show what happens when a type mismatch would occur (commented out)
# broken_message = program_name + " serves " + beneficiaries + " people."
# print(broken_message)
print("\nNote: Mixing strings and numbers without conversion causes TypeError.")