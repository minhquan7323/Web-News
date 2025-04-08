# Web News

A modern news web application built with React, Node.js, and MongoDB.

## Features

- 📰 Display news with beautiful and responsive interface
- 🔍 Search news by keywords
- 📱 User-friendly interface across all devices
- 🎯 News categorization
- 💬 Interactive commenting system
- 📊 Article view statistics
- 🔄 Infinite scroll for article lists
- 🖼️ Image upload and management with Cloudinary
- 👥 User management system
- 🔒 Admin/user role-based access control

## Technologies Used

### Frontend
- React 18
- Chakra UI
- React Query
- Redux Toolkit
- React Router DOM
- TinyMCE Editor
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary

### DevOps
- Docker
- Docker Compose
- Nginx

## Installation

1. Clone repository:
```bash
git clone https://github.com/your-username/web-news.git
cd web-news
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create .env files in frontend and backend directories:
```env
# Frontend .env
VITE_API_URL=http://localhost:3001
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Backend .env
PORT=3001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Run with Docker:
```bash
docker-compose up
```

Or run separately:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm start
```

## Project Structure

```
web-news/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

### Articles
- GET /api/articles/getall - Get all articles
- GET /api/articles/details/:id - Get article details
- GET /api/articles/featured - Get featured articles
- GET /api/articles/type/:id - Get articles by type
- GET /api/articles/getalltypearticle - Get all article types
- POST /api/articles/create - Create new article
- PUT /api/articles/update/:id - Update article
- DELETE /api/articles/delete/:id - Delete article
- POST /api/articles/deletemany - Delete multiple articles

### Categories
- GET /api/categories/getall - Get all categories
- GET /api/categories/details/:id - Get category details
- POST /api/categories/create - Create new category
- PUT /api/categories/update/:id - Update category
- DELETE /api/categories/delete/:id - Delete category

### Comments
- GET /api/comments - Get all comments
- GET /api/comments/:articleId - Get comments by article
- POST /api/comments - Create new comment
- PUT /api/comments/:commentId - Update comment
- DELETE /api/comments/:commentId - Delete comment

### Users
- POST /api/users/login - User login
- GET /api/users/details/:id - Get user details
- GET /api/users/getall - Get all users
- PUT /api/users/update/:id - Update user
- POST /api/users/add-watch-later - Add article to watch later
- POST /api/users/remove-watch-later - Remove article from watch later
- GET /api/users/watch-later/:id - Get user's watch later articles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue to discuss changes.

## License

MIT License 
