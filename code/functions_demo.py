# Python Functions Milestone Demo
# This script demonstrates defining functions, calling them, passing arguments,
# and understanding basic local vs global scope.

course_name = "Python Functions Milestone"


def show_lesson_title():
    """Print a simple lesson title."""
    print(f"=== {course_name} ===")


def greet_learner(name):
    """Print a greeting for a learner using one argument."""
    print(f"Hello, {name}! Let's practice reusable code blocks.")


def calculate_total_budget(education_budget, health_budget):
    """Return the total budget from two numeric inputs."""
    total = education_budget + health_budget
    return total


def describe_program(program_name, beneficiaries):
    """Use two parameters to create a reusable status line."""
    print(f"Program '{program_name}' currently supports {beneficiaries} beneficiaries.")


def demonstrate_scope():
    """Show the difference between a local variable and a global variable."""
    course_name = "Local Scope Example"
    print(f"Inside function -> course_name: {course_name}")


def main():
    """Run the milestone demonstration in a clear execution order."""
    show_lesson_title()

    greet_learner("Tony")

    print("\nCalling a function with arguments and capturing return value:")
    total_budget = calculate_total_budget(30000, 20000)
    print(f"Combined budget: ${total_budget}")

    print("\nCalling reusable function logic multiple times:")
    describe_program("Education Support", 1200)
    describe_program("Healthcare Access", 950)

    print("\nFunction scope demonstration:")
    demonstrate_scope()
    print(f"Outside function -> course_name: {course_name}")

    print("\nExecution flow complete: control returned to main() after each call.")


if __name__ == "__main__":
    main()
