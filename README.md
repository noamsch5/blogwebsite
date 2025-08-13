## Blog Website (Express + EJS)

A simple blog application that lets you create, view, edit, and delete posts. Posts are stored in memory, so data resets when the server restarts. Built for a Capstone-style project brief.

### Tech
- Express 4
- EJS templates
- Method Override for PUT/DELETE via forms
- Nodemon for local development

### Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Scripts
- `npm run dev`: Start with nodemon
- `npm start`: Start with Node

### Project structure
```
app.js                # App entry
routes/posts.js       # Posts CRUD routes
lib/store.js          # In-memory data store
views/*.ejs           # EJS layouts and pages
public/styles.css     # Styling
```

### Notes
- This app purposefully avoids a database to match the requirement. Swap the `lib/store.js` with a DB later if needed.
- UI is minimal and responsive. Customize `views/` and `public/styles.css` to add your personal touch.


