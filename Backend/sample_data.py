from services.auth_service import create_user, find_user_by_email
from services.program_service import create_program

samples = [
    {"name": "Community Health Clinics", "category": "Health", "region": "North", "cost": 45000, "beneficiaries": 720, "before_metric": 45, "after_metric": 78},
    {"name": "Rural Education Support", "category": "Education", "region": "South", "cost": 52000, "beneficiaries": 890, "before_metric": 36, "after_metric": 80},
    {"name": "Food Security Kitchens", "category": "Food", "region": "East", "cost": 32000, "beneficiaries": 540, "before_metric": 52, "after_metric": 86},
    {"name": "Clean Water Campaign", "category": "Health", "region": "West", "cost": 27000, "beneficiaries": 430, "before_metric": 28, "after_metric": 70},
    {"name": "Youth Skills Training", "category": "Livelihood", "region": "Central", "cost": 62000, "beneficiaries": 760, "before_metric": 40, "after_metric": 85},
    {"name": "Early Childhood Learning", "category": "Education", "region": "North", "cost": 38000, "beneficiaries": 620, "before_metric": 30, "after_metric": 75},
    {"name": "Agriculture Resilience", "category": "Environment", "region": "South", "cost": 54000, "beneficiaries": 710, "before_metric": 50, "after_metric": 82},
    {"name": "Women's Nutrition Hub", "category": "Health", "region": "East", "cost": 41000, "beneficiaries": 660, "before_metric": 48, "after_metric": 83},
    {"name": "School Supplies Drive", "category": "Education", "region": "West", "cost": 22000, "beneficiaries": 510, "before_metric": 34, "after_metric": 72},
    {"name": "Solar Stove Initiative", "category": "Environment", "region": "Central", "cost": 36000, "beneficiaries": 580, "before_metric": 39, "after_metric": 79},
    {"name": "Emergency Shelter Support", "category": "Shelter", "region": "North", "cost": 47000, "beneficiaries": 640, "before_metric": 42, "after_metric": 81},
    {"name": "Rural Water Filters", "category": "Health", "region": "South", "cost": 33000, "beneficiaries": 550, "before_metric": 44, "after_metric": 77},
    {"name": "Literacy Outreach", "category": "Education", "region": "East", "cost": 29000, "beneficiaries": 590, "before_metric": 33, "after_metric": 73},
    {"name": "Food Shelf Expansion", "category": "Food", "region": "West", "cost": 25000, "beneficiaries": 470, "before_metric": 49, "after_metric": 79},
    {"name": "Community Garden Labs", "category": "Environment", "region": "Central", "cost": 31000, "beneficiaries": 520, "before_metric": 35, "after_metric": 74},
    {"name": "Mobile Health Camps", "category": "Health", "region": "North", "cost": 56000, "beneficiaries": 840, "before_metric": 46, "after_metric": 88},
    {"name": "Teacher Mentorship", "category": "Education", "region": "South", "cost": 43000, "beneficiaries": 690, "before_metric": 37, "after_metric": 78},
    {"name": "Nutrition Counseling", "category": "Food", "region": "East", "cost": 28000, "beneficiaries": 530, "before_metric": 43, "after_metric": 80},
    {"name": "Safe Housing Retrofit", "category": "Shelter", "region": "West", "cost": 49000, "beneficiaries": 620, "before_metric": 41, "after_metric": 82},
    {"name": "Affordable Energy Access", "category": "Environment", "region": "Central", "cost": 35000, "beneficiaries": 600, "before_metric": 38, "after_metric": 76},
]


def seed_sample_data():
    admin = find_user_by_email("admin@ngoimpact.com")
    if not admin:
        create_user("Admin", "admin@ngoimpact.com", "Admin123!", "Admin")
        print("Created admin user admin@ngoimpact.com / Admin123!")
    else:
        print("Admin user already exists.")

    for sample in samples:
        create_program(sample)
    print(f"Inserted {len(samples)} sample NGO programs.")


if __name__ == "__main__":
    seed_sample_data()
