# Pre-Deployment Checklist

## Code Preparation
- [ ] Git repo created and pushed to GitHub
- [ ] [server/index.js](server/index.js) updated to serve frontend
- [ ] [server/package.json](server/package.json) has build script
- [ ] All secrets removed from code (no hardcoded API keys)
- [ ] `.env` files added to `.gitignore`

## Dependencies
- [ ] Run `npm install` in `/server`
- [ ] Run `npm install` in `/client`
- [ ] Verify `npm run build` works in client folder
- [ ] No security vulnerabilities: `npm audit` passes

## Environment Configuration
- [ ] MongoDB connection string obtained
- [ ] `.env.example` files created in both folders
- [ ] All required env vars documented

## Testing Locally
- [ ] Start server: `npm start` in /server
- [ ] Frontend builds: `npm run build` in /client
- [ ] Test API endpoints work
- [ ] Test WebSocket connection (Socket.io)

## Render Setup
- [ ] Render account created
- [ ] GitHub repo connected to Render
- [ ] `render.yaml` created in project root
- [ ] Environment variables added in Render dashboard
- [ ] DATABASE_URL points to production MongoDB
- [ ] ORIGIN set to your Render URL

## After Deployment
- [ ] Visit your Render URL and test functionality
- [ ] Check browser console for errors
- [ ] Test chat, authentication, file uploads
- [ ] Monitor Render logs for errors
- [ ] Set up monitoring/alerts if needed

## Common Issues to Watch For
- CORS errors → Check ORIGIN env var
- Database not connecting → Check DATABASE_URL & MongoDB IP whitelist
- Frontend not loading → Verify dist folder exists after build
- API 404 errors → Check API routes in server
