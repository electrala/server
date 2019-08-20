# ELECTRA
## Backend Architecture (MVC)
---
### Databases & Routes:
1. Users (Stores registered users)
   - Get all users
   - Register new user
   - Get user by ID
   - Update user
   - Delete user
2. Critiques (Stores posted critiques)
   - Get all critiques
   - Upload new critique
   - Get critique by: ID, title, or genre
   - Update critique
   - Delete critique
3. Comments (Stores all comments)
   - Get all comments
   - Post new comment
   - Get comment by critique
   - Edit comment
   - Delete comment

*Coming soon: database diagram*

### Current Version:
- Working users database
- Routes for critiques database
- Meta router

### To Do:
- Controller & model for critiques database
- Comments database

