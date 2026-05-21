# Render Deployment Guide for React Chat App

## Prerequisites
- GitHub account with your code pushed to a repo
- Render account (free tier available)
- MongoDB database (Atlas or any cloud provider)

## Deployment Steps

### 1. **Push Your Code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/react-chat-app.git
git push -u origin main
```

### 2. **Set Up MongoDB (if not already done)**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### 3. **Deploy on Render**

#### Option A: Using render.yaml (Recommended)
1. Go to [render.com](https://render.com)
2. Click "New +" → "Blueprint" 
3. Connect your GitHub repo
4. Select the `render.yaml` file from root
5. Click "Deploy"

#### Option B: Manual Setup
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account and select your repo
4. Configure settings:
   - **Name**: react-chat-app
   - **Environment**: Node
   - **Region**: Singapore (or closest to you)
   - **Branch**: main
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build && npm install --production`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Paid for better performance)

### 4. **Add Environment Variables**
In Render dashboard → Environment:
```
DATABASE_URL = mongodb+srv://username:password@cluster.mongodb.net/dbname
ORIGIN = https://your-app-name.onrender.com
NODE_ENV = production
JWT_SECRET = your_secret_key (if using)
```

### 5. **Configure Client (if needed)**
If your React app makes API calls, update [client/src/lib/api-client.js](client/src/lib/api-client.js):

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-app-name.onrender.com/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    // ... rest of config
});
```

### 6. **Update CORS Settings**
In [server/index.js](server/index.js), the CORS is already set to use `process.env.ORIGIN`.
Make sure in Render environment variables you set:
```
ORIGIN=https://your-app-name.onrender.com
```

## Troubleshooting

### Build Fails
- Check that `npm install` runs successfully locally
- Verify Node.js version: `node -v` (Render uses Node 18+)
- Check logs in Render dashboard

### Database Connection Error
- Verify `DATABASE_URL` is correctly set in Render
- Check MongoDB Atlas allows connections from anywhere (IP: 0.0.0.0/0)
- Ensure database exists in MongoDB

### Frontend Not Loading
- Clear browser cache
- Check that frontend build succeeds: `npm run build` in client folder
- Verify catch-all route in server/index.js is present

### CORS Errors
- Double-check `ORIGIN` environment variable matches your Render URL
- Make sure it includes the protocol: `https://app-name.onrender.com`

## Performance Tips
- Upgrade from Free to Paid plan for better performance
- Use environment variables for sensitive data
- Enable compression in Express (optional enhancement)

## After Deployment
1. Your app will be live at: `https://your-app-name.onrender.com`
2. First request may be slow (free tier spins down after 15 min inactivity)
3. Monitor logs in Render dashboard
4. Set up auto-deploy by connecting GitHub branch

## Next Steps
- Set up custom domain (Domain section in Render)
- Configure email notifications
- Set up monitoring alerts
- Consider upgrading to Starter Plan for production use
