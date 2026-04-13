# Function Input-Output Milestone Demo
# This script focuses on passing data into functions and returning results.


def calculate_average_cost(total_cost, total_people):
    """Return average cost per person from two input values."""
    if total_people == 0:
        return 0.0
    return total_cost / total_people


def project_next_quarter(value, growth_rate_percent):
    """Return projected value using percentage growth input."""
    growth_multiplier = 1 + (growth_rate_percent / 100)
    return value * growth_multiplier


def classify_budget(amount):
    """Return a label based on the budget amount."""
    if amount >= 100000:
        return "High"
    if amount >= 50000:
        return "Medium"
    return "Starter"


def format_program_summary(program_name, avg_cost, projected_budget, tier):
    """Return a reusable formatted summary string."""
    return (
        f"Program: {program_name} | "
        f"Average Cost/Person: ${avg_cost:.2f} | "
        f"Projected Budget: ${projected_budget:.2f} | "
        f"Tier: {tier}"
    )


def main():
    """Demonstrate parameter input and return-value reuse."""
    program_name = "Community Learning"
    current_budget = 60000
    beneficiaries = 1500
    growth_rate = 10

    # 1) Pass arguments into a function and store the returned value
    avg_cost = calculate_average_cost(current_budget, beneficiaries)

    # 2) Use a returned value from one function inside another computation
    projected_budget = project_next_quarter(current_budget, growth_rate)

    # 3) Pass returned output into another function
    budget_tier = classify_budget(projected_budget)

    # 4) Compose a final output using several returned values
    summary_line = format_program_summary(program_name, avg_cost, projected_budget, budget_tier)

    print("=== Function Inputs and Outputs Demo ===")
    print(summary_line)

    print("\nReusable calls with different arguments:")
    second_avg = calculate_average_cost(42000, 700)
    second_projection = project_next_quarter(42000, 5)
    second_tier = classify_budget(second_projection)
    print(format_program_summary("Mobile Clinics", second_avg, second_projection, second_tier))


if __name__ == "__main__":
    main()
