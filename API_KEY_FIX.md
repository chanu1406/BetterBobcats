# Fix: Invalid API Key Error

## 🔴 **The Error**

```
Failed to create club: {'message': 'JSON could not be generated', 'code': 401, 
'hint': 'Refer to full message for details', 
'details': 'b\'{"message":"Invalid API key","hint":"Double check your Supabase `anon` or `service_role` API key."}\''}
```

## 📋 **What This Means**

The error code `401` means **Unauthorized**. Supabase is rejecting the API key being used for admin operations (creating clubs).

Since `create_club` uses the **service_role key** (to bypass RLS), this means:
- Either `SUPABASE_SERVICE_ROLE_KEY` is missing from your `.env` file
- Or the key value is incorrect/invalid

## ✅ **How to Fix**

### **Step 1: Verify Your .env File**

Make sure `backend/.env` has all three required variables:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # service_role key
```

### **Step 2: Get the Correct Keys from Supabase**

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. You'll see two keys:
   - **anon public** key → This goes in `SUPABASE_KEY`
   - **service_role secret** key → This goes in `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important:** The service_role key is different from the anon key. Make sure you're copying the correct one!

### **Step 3: Check for Common Issues**

**Issue 1: Extra Spaces or Quotes**
```env
# ❌ Wrong - has quotes
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# ✅ Correct - no quotes needed
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Issue 2: Wrong Key**
- Make sure you copied the **service_role** key, not the anon key again
- The service_role key is longer and starts with `eyJ...` (same as anon, but different value)

**Issue 3: Key Truncated**
- Make sure you copied the entire key (they're very long)
- Don't copy line breaks or spaces

**Issue 4: Wrong Project**
- Make sure the keys match the project you're using
- Verify `SUPABASE_URL` matches the project

### **Step 4: Restart Backend**

After updating `.env`:
1. **Stop** the backend server (Ctrl+C)
2. **Restart** it: `./run-dev.sh`

The backend reads `.env` on startup, so changes require a restart.

## 🔍 **Verify It's Working**

After restarting, check the backend logs for warnings:
- If you see: `⚠️ .env file found but missing: SUPABASE_SERVICE_ROLE_KEY` → The key isn't being loaded
- If you see no warnings → The keys are loaded correctly

Then try creating a club again.

## 📝 **Quick Checklist**

- [ ] `SUPABASE_URL` is set in `backend/.env`
- [ ] `SUPABASE_KEY` (anon key) is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (service_role key) is set
- [ ] No quotes around the key values
- [ ] No extra spaces before/after the `=` sign
- [ ] Backend server was restarted after adding the key
- [ ] Keys match the correct Supabase project




