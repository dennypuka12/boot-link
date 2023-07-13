import random
import json
import faker

# Initialize a faker instance
fake = faker.Faker()

# Define a dictionary of cities to states
city_to_state = {
    'Hartford': 'Connecticut', 'Minneapolis': 'Minnesota', 'Los Angeles': 'California', 
    'New York': 'New York', 'Boston': 'Massachusetts', 'San Francisco': 'California', 
    'Atlanta': 'Georgia', 'Tampa': 'Florida', 'Nashville': 'Tennessee', 
    'Miami': 'Florida', 'Seattle': 'Washington'
}

def generate_employee(manager_id=None):
    # Generate a boolean value for whether employee is HR
    is_hr = random.random() < 0.1

    # Define list of jobs
    insurance_roles = [
        'Underwriter', 'Claim Adjuster', 'Policy Underwriter', 'Auditor'
    ]

    engineering_roles = [
        'Software Engineer', 'Senior Software Engineer', 'DevOps Engineer', 'Cloud Engineer'
    ]    

    business_roles = [
        'Commercial Surety Underwriting Trainee', 'Accountant', 'Financial Analyst', 
        'Marketing Associate', 'Operations Associate', 'Supply Chain Associate', 
        'Sales Associate', 'HR', 'Manager', 'Public Relations'
    ]

    if is_hr:
        job_role = 'HR'
        role = 'HR'
    else:
        role_branch = random.choice([insurance_roles, engineering_roles, business_roles])
        job_role = random.choice(role_branch)
        role = 'Employee' if job_role != 'Manager' else 'Manager'

    city = random.choice(list(city_to_state.keys()))
    state = city_to_state[city]

    base_salary = 0 
    if job_role in engineering_roles:
        base_salary = round(random.gauss(95000, 15000))
    if job_role in insurance_roles:
        base_salary = round(random.gauss(70000, 5000))
    if job_role in business_roles:
        base_salary = round(random.gauss(60000, 5000))
    
    # Generate a salary with city based bonus
    city_bonus = 12000 if city in ['New York', 'San Francisco', 'Los Angeles', 'Boston', 'Miami', 'Seattle'] else 0
    salary = base_salary + city_bonus

    return {
        "name": fake.name(),
        "phoneNumber": fake.phone_number(),
        "workLocation": city + ',' + state,
        # "city": city,
        # "state": state,
        "role": role,
        "jobRole": job_role,
        "salary": salary,
        "managerId": manager_id
    }

def generate_employees(n):
    employees = []
    managers = []
    for i in range(n):
        if len(managers) == 0 or len(employees) % random.choice(range(5, 7)) == 0:
            employee = generate_employee()
            if employee['role'] == 'Manager':
                managers.append(employee)
            employees.append(employee)
        else:
            manager_id = managers[-1]['name']
            employee = generate_employee(manager_id)
            employees.append(employee)
    return employees

# Generate 100 employees
employees = generate_employees(100)

# Write to JSON file
with open('employees.json', 'w') as f:
    json.dump(employees, f)

print("Successfully generated and saved employees data.")
