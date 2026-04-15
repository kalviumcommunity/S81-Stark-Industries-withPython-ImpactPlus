# NGO Impact Optimizer

A full-stack web application for NGOs to evaluate program effectiveness, visualize impact, and optimize resource allocation.

## ?? Project Overview

The application includes:

- **Backend:** Flask API with JWT authentication, MongoDB storage, and analytics endpoints.
- **Frontend:** React + Tailwind dashboard with charts, filters, and program management.
- **Database:** MongoDB using PyMongo for users and program records.
- **Analytics:** Cost-per-beneficiary and impact score computation, plus recommendations.

## ?? Repository Structure

- `Backend/` - Python Flask backend and sample data scripts.
- `Frontend/` - React frontend application with charts and UI.
- `README.md` - Project overview and run instructions.

## ?? Backend Files

- `Backend/app.py` - Flask application entrypoint.
- `Backend/config.py` - Environment settings for MongoDB and JWT.
- `Backend/db/client.py` - MongoDB client and database connection.
- `Backend/routes/` - API blueprints for auth, programs, and analytics.
- `Backend/services/` - Business logic for auth, program validation, and analytics.
- `Backend/sample_data.py` - Inserts 20 sample NGO program records and demo users.
- `Backend/requirements.txt` - Python dependencies.

## ?? Features Implemented

### Authentication

- JWT-based login and signup
- Roles: `Admin`, `NGO Staff`

### Program Data Module

- Program creation with category, region, cost, beneficiaries, before/after metrics
- MongoDB CRUD support: create, list, update, delete programs
- CSV upload support in the frontend

### Analytics & Optimization

- Computes `cost_per_beneficiary` and `impact_score`
- Exposes `/api/analytics` and `/api/recommendations`
- Dashboard charts and recommendations for budget allocation

### Frontend Dashboard

- Total programs, beneficiaries, and average impact cards
- Bar chart, pie chart, and line chart visualizations
- Program management page with filters and deletion support

## ?? Local Setup

### Backend

1. Open a terminal inside `Backend/`
2. Create a Python virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Start MongoDB locally and ensure it is available at `mongodb://localhost:27017`
5. Seed sample data:
   ```powershell
   python sample_data.py
   ```
6. Run the backend:
   ```powershell
   python app.py
   ```

### Frontend

1. Open a terminal inside `Frontend/`
2. Install packages:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## ?? Demo Credentials

- Admin: `admin@example.com` / `AdminPass123`
- NGO Staff: `staff@example.com` / `StaffPass123`

## ?? API Endpoints

### Auth

- `POST /api/signup`
- `POST /api/login`

### Programs

- `POST /api/programs`
- `GET /api/programs`
- `PUT /api/programs/:id`
- `DELETE /api/programs/:id`

### Analytics

- `GET /api/analytics`
- `GET /api/recommendations`

## ?? Notes

- The backend uses MongoDB collections for users and programs.
- The frontend stores JWT tokens in `localStorage` for authenticated API calls.
- Charts are built with `react-chartjs-2` and `Chart.js`.
- The system is intentionally modular and ready for further improvements.

## ✅ Simple Solution Summary

1. **Collect data consistently**
   - Capture beneficiary details, intervention type, cost, and outcomes in one place.
   - Use forms, surveys, or APIs for structured data intake.

2. **Clean and standardize data**
   - Remove duplicates, fix missing values, and normalize metrics.
   - Standardize categories, dates, and cost formats.

3. **Define impact metrics**
   - Use measurable indicators such as cost per beneficiary, improvement percentage, or success rate.

4. **Evaluate effectiveness**
   - Compare before and after results.
   - Use analysis to identify which programs work best.

5. **Optimize resources**
   - Rank programs by impact score and cost efficiency.
   - Allocate more budget to high-impact, low-cost interventions.

6. **Visualize insights**
   - Use a dashboard to show impact vs cost, geographic performance, and program comparisons.

7. **Predict and improve**
   - Apply ML for future impact forecasts.
   - Adjust funding based on real-time feedback and performance.

## ? Next Steps

- Add update/edit program support in the UI.
- Add advanced ML prediction endpoints.
- Add export-to-CSV and search functionality.
  :

```bash
python3 code/function_io_demo.py
```
