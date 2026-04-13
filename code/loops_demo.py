# Iterative Data Processing using Loops

print("--- 1. Using for Loops for Iteration ---")
# Iterate over a range of numbers
print("Processing IDs from 1 to 5:")
for object_id in range(1, 6):
    print(f" -> Processing Object ID: {object_id}")

# Iterate over a list collection
impact_areas = ["Education", "Healthcare", "Clean Water", "Skill Development"]
print("\nActive Impact Areas:")
for area in impact_areas:
    print(f" -> Funding Program: {area}")

print("\n--- 2. Using while Loops for Condition-Based Repetition ---")
# Condition-controlled loop
current_funding = 0
target_funding = 1000
month = 1

while current_funding < target_funding:
    print(f"Month {month}: Raised $250. Total is now ${current_funding + 250}.")
    current_funding += 250
    month += 1
print("Target funding reached!")

print("\n--- 3. Controlling Loop Flow ---")
# Using break to exit loops early
print("Searching for 'Clean Water' in program list:")
for area in impact_areas:
    print(f"Checking {area}...")
    if area == "Clean Water":
        print("Found 'Clean Water'. Halting search.")
        break  # Exit the loop immediately

# Using continue to skip iterations
print("\nProcessing budget items (skipping empty amounts):")
budget_requests = [1500, 0, 3200, 0, 4100]
for request in budget_requests:
    if request == 0:
        continue  # Skip to the next iteration
    print(f"Processing request of ${request}")

print("\n--- 4. Avoiding Infinite Loops ---")
# To prevent infinite loops, always ensure the condition will eventually evaluate to False.
# E.g., make sure variables are incremented or decremented properly.
counter = 5
print("Initiating Safe Countdown...")
while counter > 0:
    print(f"T-minus {counter}")
    counter -= 1  # Crucial step to ensure loop terminates!
print("Liftoff! Infinite loops successfully avoided.")
