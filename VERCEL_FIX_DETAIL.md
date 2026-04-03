# 🔧 VERCEL FIX: Detailed Step-by-Step Guide

## 🎯 **Goal: Fix 404 Error on Vercel**

Your frontend is deployed but showing "Not Found" because Vercel is building from the wrong directory.

---

## 📋 **Detailed Steps to Fix Vercel**

### **Step 1: Open Vercel Dashboard**
1. Go to your web browser
2. Navigate to: `https://vercel.com/dashboard`
3. Sign in with your GitHub account (if not already signed in)

### **Step 2: Select Your Project**
1. Look for your project in the list
2. Click on **`food-donation-dusky`** (your project name)
3. You should see the project overview page

### **Step 3: Go to Settings**
1. At the top of the page, click the **"Settings"** tab
2. You'll see different sections on the left sidebar

### **Step 4: Find Build Settings**
1. Scroll down or look for **"Build & Development Settings"** section
2. Click on it to expand
3. You'll see several fields that need to be updated

### **Step 5: Update Root Directory**
1. Find the **"Root Directory"** field
2. **Current value:** (probably empty or wrong)
3. **Change to:** `frontend`
4. This tells Vercel to build from the `frontend/` folder

### **Step 6: Update Build Command**
1. Find the **"Build Command"** field
2. **Current value:** (might be wrong)
3. **Change to:** `npm run build`
4. This runs the build script in package.json

### **Step 7: Update Output Directory**
1. Find the **"Output Directory"** field
2. **Current value:** (might be wrong)
3. **Change to:** `dist`
4. This is where Vite outputs the built files

### **Step 8: Update Install Command (if needed)**
1. Find the **"Install Command"** field
2. **Current value:** (might be wrong)
3. **Change to:** `npm install`
4. This installs dependencies before building

### **Step 9: Add Environment Variable**
1. Scroll up to find **"Environment Variables"** section
2. Click **"Add New"** or **"+"** button
3. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `http://localhost:5000/api`
   - **Environment:** Production (leave default)
4. Click **"Save"**

### **Step 10: Save Settings**
1. Scroll to the bottom of the settings page
2. Click **"Save"** button
3. Settings are now updated

### **Step 11: Redeploy**
1. Go to **"Deployments"** tab at the top
2. Find the latest deployment (might show error)
3. Click the **"..."** menu (three dots)
4. Select **"Redeploy"**
5. Choose **"Redeploy"** (not "Rollback")
6. Vercel will start building again

### **Step 12: Wait for Build**
1. Watch the deployment status
2. It will show: **"Building..."**
3. Wait 2-3 minutes
4. Status should change to **"Ready"**

### **Step 13: Test the Fix**
1. Click on the deployment URL or go to:
   ```
   https://food-donation-dusky.vercel.app
   ```
2. **Expected:** ✅ Your food donation platform loads!
3. **Expected:** Beautiful UI with navigation, forms, etc.

---

## 🔍 **What Each Setting Does**

| Setting | Purpose | Why It Matters |
|---------|---------|----------------|
| **Root Directory** | Which folder to build from | Your code is in `frontend/`, not root |
| **Build Command** | How to build the app | Runs `npm run build` to create production files |
| **Output Directory** | Where built files go | Vite outputs to `dist/` folder |
| **Install Command** | Install dependencies | `npm install` before building |
| **VITE_API_URL** | Backend API location | Frontend needs to know where to call APIs |

---

## 🚨 **Common Issues & Solutions**

### **Still Getting 404?**
- **Check:** Did you set Root Directory to `frontend`?
- **Check:** Did you redeploy (not just save settings)?
- **Check:** Wait for build to complete (2-3 minutes)

### **Build Fails?**
- Go to **"Deployments"** → Click deployment → **"Build Logs"**
- Look for error messages
- Common: Missing dependencies or wrong commands

### **Wrong Settings?**
- Double-check all 4 build settings
- Root Directory must be `frontend`
- Build Command must be `npm run build`

### **Environment Variable Issues?**
- Make sure `VITE_API_URL` is set
- It should be `http://localhost:5000/api` for now
- We'll update it later with real backend URL

---

## 📱 **What You'll See After Fix**

### **Before Fix:**
```
HTTP/2 404
Not Found
```

### **After Fix:**
```
✅ Food Donation Platform
✅ Beautiful UI loads
✅ Navigation works
✅ Forms display
✅ Animations play
✅ Responsive design
```

---

## 🎯 **Next Steps After Vercel Fix**

Once frontend works, deploy backend:

1. **Railway.app** → Deploy from GitHub
2. Create backend service (root: `backend`)
3. Create MySQL database
4. Configure environment variables
5. Run database schema
6. Update Vercel with backend URL

---

## 📞 **Need Help?**

- **Stuck on a step?** Tell me which step number
- **Build logs show errors?** Share the error message
- **Still 404?** Check if redeploy completed

---

## ✅ **Success Checklist**

- [ ] Vercel dashboard opened
- [ ] food-donation-dusky project selected
- [ ] Settings tab clicked
- [ ] Root Directory set to `frontend`
- [ ] Build Command set to `npm run build`
- [ ] Output Directory set to `dist`
- [ ] VITE_API_URL environment variable added
- [ ] Settings saved
- [ ] Redeploy triggered
- [ ] Build completed successfully
- [ ] https://food-donation-dusky.vercel.app loads

---

**Follow these 13 steps exactly, and your frontend will be live!** 🚀
