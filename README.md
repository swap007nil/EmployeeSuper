# EmployeeSuper - Employee Visitor Management System

## Purpose
Let the reception desk record, track, and search visitors who come to the office.

## Users
- **Admin:** can add, edit, check in/out, and delete visitors
- **Viewer:** read-only (list, search, filter, view details)

## Functional Requirements
1. Login with username and password (roles: admin, viewer)
2. Add a new visitor (admin only)
3. View the list of all visitors
4. View one visitor's details
5. Edit visitor information (admin only)
6. Delete a visitor record (admin only)
7. Search visitors by name or mobile number
8. Check in / check out a visitor by changing status (admin only)
9. Filter by status and see summary cards (total, checked in, checked out)

## Visitor Data Fields
| Field          | Required | Notes                        |
|----------------|----------|------------------------------|
| visitorName    | Yes      | Text                         |
| mobile         | Yes      | Exactly 10 digits            |
| email          | No       | Must be a valid email        |
| organization   | No       | Company / college            |
| personToMeet   | Yes      | Employee being visited       |
| purpose        | Yes      | Reason for visit             |
| visitDateTime  | Auto     | Defaults to current time     |
| status         | Auto     | "Checked In" or "Checked Out"|

## Validation Rules
- Name, mobile, person to meet, and purpose cannot be empty
- Mobile must be 10 digits
- Email, if given, must be a valid format (checked in the form and on the server)
- Status can only be "Checked In" or "Checked Out"
- Only logged-in users can read visitor data; only admins can change it

## Tech Stack
React (Vite), Bootstrap, Axios, Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs

## What Changed From the Original Plan
| Original plan | What actually happened |
|---|---|
| No login needed | Added login with admin and viewer roles |
| Login/JWT out of scope | Built JWT login with bcryptjs password hashing |
| Email was plain text | Added email format validation (form and server) |
| Basic table only | Added search, status filter, summary cards, details page |
| Test with Postman | Used Thunder Client (VS Code extension) instead |

## How Login and Roles Work
- Passwords are stored hashed (bcryptjs), never as plain text
- Logging in returns a JWT token that lasts 8 hours and holds the role
- The frontend sends the token with every request
- The server checks the token (`protect`) and the role (`adminOnly`)
- Accounts are created with `node seedUser.js <username> <password> <admin|viewer>`
- After changing a role, log out and back in (the role lives inside the token)

## Testing Done
- Admin login and viewer login in the browser: working
- Viewer sees no Add / Check Out / Edit / Delete buttons: working
- No token gives 401; viewer trying to add a visitor gives 403: working
- Delete from the browser: working
- Email rules: `abc` blocked, `abc@gmail.com` saves, empty email saves: working

## Problems Faced and Fixes
| Problem | Cause | Fix |
|---|---|---|
| Typed commands in the wrong terminal | Server and client terminals were already running | Use 3 terminals: server, client, and a free one for installs, seeding, and git |
| `cd server` failed ("path does not exist") | Already inside the server folder | Check the prompt path before using `cd` |
| Terminal stuck on a `>>` prompt | Pasted old terminal output into the terminal | Press Ctrl+C to clear it, and never paste old output |
| Changes to `.env` not picked up | Nodemon does not watch `.env` | Ctrl+C in the server terminal, then `npm run dev` again |
| Mongoose warning about the `new` option | `new: true` is deprecated | Use `returnDocument: 'after'` |
| Red squiggle on an import after renaming a file | Stale VS Code cache | Ctrl+Shift+P, then "Developer: Reload Window" |
| Import errors from `visitorAPI.js` | File name case mismatch | Keep the file name exactly `visitorAPI.js` |
| Stray `package.json` in the root folder | Early install in the wrong folder | Deleted the root `package.json` and `package-lock.json` |
| Thunder Client requests returned 401 | Visitor routes now need a token | Log in first, then add header `Authorization: Bearer <token>` (no quotes) |
| Login test returned a 500 error | Request body was empty | Set Body to JSON and add username and password |
| Viewer could still be exposed if only buttons were hidden | Frontend hiding is not real security | Added server-side role checks and tested with a viewer token |
| Secret shown in chat or terminal output | Pasted output by mistake | Generate a new JWT secret and never share `.env` values |

## Still To Do
- Push to GitHub (check that `.env` and `node_modules` are NOT included)
- Deploy: frontend on Vercel, backend on Render or Railway, database on Atlas
- Change the API base URL from `localhost` to an environment variable before deploying
- Optional: check-out time, success toasts, "Today" filter, CSV export, "checked out by" field

## Out of Scope (not building)
- Redux, microservices
- Photo upload, email/SMS notifications
## How to Run Locally

### 1. Install
Open two terminals, one in `server` and one in `client`, and run in each:
npm install

### 2. Create `server/.env`
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any long random string>

### 3. Create the login accounts
In the `server` folder run:
node seedUser.js admin <password> admin
node seedUser.js viewer <password> viewer

### 4. Start both apps
In `server`: npm run dev (runs on http://localhost:5000)
In `client`: npm run dev (runs on http://localhost:5173)

Open http://localhost:5173 and log in.