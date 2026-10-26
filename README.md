# AubRate: UniTok prototype

The first prototype of **[UniTok](https://unitok.app)**, a social platform for AUB students. This repo holds the sign-up flow that only lets in verified `@mail.aub.edu` students, using one-time email codes. The full UniTok app was later built by our team in [cmps-271-team-2](https://github.com/cmps-271-team-2).

**Live (UniTok):** [unitok.app](https://unitok.app)

## Features

- **AUB-only registration:** the backend rejects any email that isn't `@mail.aub.edu`.
- **Email OTP verification:** a 6-digit code is emailed, stored only as a bcrypt hash, and expires after a configurable time (10 minutes by default).
- **Accounts locked until verified:** the Firebase account is created disabled and only enabled once the code checks out.
- **Rate limiting:** wrong guesses and resend requests are both capped. Resending issues a fresh code without starting over.
- **Next.js front end:** login and register pages that call the FastAPI backend.

## Tech stack

**Front end:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · Firebase JS SDK
**Back end:** Python · FastAPI · Firebase Admin / Firestore · passlib (bcrypt)

## Run it locally

**Backend**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend reads these environment variables. Never commit their values:

| Variable | Purpose |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to your Firebase service-account JSON |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Mail server for sending codes |
| `OTP_EXP_MINUTES` | Optional, defaults to 10 |

**Frontend**

```bash
cd aub-rate
npm install
npm run dev
```

Open http://localhost:3000. In `aub-rate/.env.local`, set `NEXT_PUBLIC_BACKEND_URL` (e.g. `http://localhost:8000`) and your Firebase web config as `NEXT_PUBLIC_FIREBASE_*` variables.
