# NGO Impact Optimizer Backend

## Setup

1. Create a Python virtual environment:

   ```powershell
   cd Backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

2. Copy environment template and update values:

   ```powershell
   copy .env.example .env
   ```

3. Start MongoDB locally or configure `MONGODB_URI`.

4. Seed sample data:

   ```powershell
   python sample_data.py
   ```

5. Run the backend:
   ```powershell
   python app.py
   ```

## Endpoints

- `POST /signup`
- `POST /login`
- `POST /programs`
- `GET /programs`
- `PUT /programs/<id>`
- `DELETE /programs/<id>`
- `GET /analytics`
- `GET /recommendations`

## Notes

- Uses JWT auth.
- Program metrics are computed on insert/update.
- `sample_data.py` creates an admin user and 20 dummy program records.
