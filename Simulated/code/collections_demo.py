# Working with Python Lists, Tuples, and Dictionaries

print("--- 1. Working with Python Lists ---")
# Lists are ordered and mutable collections
programs = ["Education Support", "Healthcare Access", "Clean Water"]
print("Original List:", programs)

# Access elements using indexes
print("First Program:", programs[0])

# Modify, add, and remove elements
programs[1] = "Medical Access"  # Modify
programs.append("Skill Development")  # Add
programs.remove("Clean Water")  # Remove
print("Modified List:", programs)

# Iterate over list items
print("Iterating over List:")
for program in programs:
    print(f" - {program}")


print("\n--- 2. Working with Python Tuples ---")
# Tuples are ordered but immutable collections
coordinates = (12.9716, 77.5946)  # e.g., Bangalore location
print("Tuple with fixed values:", coordinates)

# Access elements using indexes
print("Latitude:", coordinates[0])
print("Longitude:", coordinates[1])

# Observe immutability behavior (commented out to prevent errors)
# coordinates[0] = 13.0000  # This would raise a TypeError

print("Tuples are preferred when data shouldn't change, like geographic coordinates or constant mappings.")


print("\n--- 3. Working with Python Dictionaries ---")
# Dictionaries store data as key-value pairs
ngo_details = {
    "name": "Impact Plus NGO",
    "founded_year": 2015,
    "active_regions": 5
}
print("Dictionary:", ngo_details)

# Access values using keys
print("NGO Name:", ngo_details["name"])

# Modify or add key-value pairs
ngo_details["active_regions"] = 7  # Modify existing key
ngo_details["focus_area"] = "Education and Health"  # Add new key-value pair
print("Modified Dictionary:", ngo_details)


print("\n--- 4. Choosing the Right Data Structure ---")
print("Lists: Use when you need a collection of items that can be modified (added, removed, or changed). Example: A list of active beneficiaries.")
print("Tuples: Use when you need a collection of items that should NOT change. Example: Storing fixed coordinate values or configuration settings.")
print("Dictionaries: Use when you have data that naturally maps to key-value pairs. Example: Storing details about a person or organization (name, age, location).")
