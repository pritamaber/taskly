# 📝 Taskly

A colorful and modern **To-Do app** built with **React**, **Tailwind CSS**, and **Appwrite**.

---

## 🔥 Features

- ✅ User authentication with Appwrite
- ✅ Upload avatar on register
- ✅ Personalized todo list per user
- ✅ Add, delete, update, and toggle todos
- ✅ Real-time UI with clean animations
- ✅ Profile avatar shown in the header
- ✅ Mobile responsive

---

## 🛠 Tech Stack

- ⚛️ **React** (Vite)
- 🎨 **Tailwind CSS**
- ☁️ **Appwrite** (Auth, Database, Storage)
- 📦 **React Router DOM**
- 📁 Avatar uploads with **Appwrite Storage**

---

## 📸 Screenshots

> _(Insert your screenshots here)_  
> Or use placeholders like:  
> `![Screenshot](./screenshots/home.png)`

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/pritamaber/taskly.git
cd taskly
```

2. Install dependencies
   bash
   Copy
   Edit
   npm install

3. Setup your .env file
   env
   Copy
   Edit
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID_USERS=your_users_collection_id
   VITE_APPWRITE_COLLECTION_ID_TODOS=your_todos_collection_id
   VITE_APPWRITE_BUCKET_ID_AVATARS=your_bucket_id
   ⚠️ Don’t commit .env to GitHub — it should be in .gitignore.

4. Run the dev server
   bash
   Copy
   Edit
   npm run dev
   App runs locally at: http://localhost:5173

📂 Folder Structure
bash
Copy
Edit
src/
├── appwrite/ # Appwrite client config
├── components/ # Reusable UI components
├── context/ # Auth context (login/register)
├── hooks/ # Custom hooks like useTodos, useUserProfile
├── pages/ # Login, Register, etc.
├── App.jsx # App entry
├── main.jsx # Vite entry point

🤝 Acknowledgements
Appwrite

React

Tailwind CSS

✨ Author
Made with 💜 by @pritamaber
