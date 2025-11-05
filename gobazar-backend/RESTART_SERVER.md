# How to Restart the Backend Server

## The Issue
The PayU hash calculation code has been updated, but the backend server is still running with the old code. You need to restart the backend server to apply the changes.

## Solution

### Method 1: Manual Restart (Recommended)
1. **Stop the current backend server:**
   - Find the terminal/command prompt where the backend server is running
   - Press `Ctrl + C` to stop it

2. **Start the backend server again:**
   ```bash
   cd gobazar-backend
   npm start
   ```
   OR if you're using TypeScript:
   ```bash
   npm run dev
   ```

### Method 2: Using the Batch File (Windows)
If you have a `start-gobazar.bat` file in your project:
1. Close the current server window
2. Double-click `start-gobazar.bat` to restart

### Method 3: Using Task Manager (Windows)
1. Open Task Manager (`Ctrl + Shift + Esc`)
2. Find all `Node.js` processes
3. Right-click each one and select "End Task"
4. Restart the server using Method 1

## Verify the Fix
After restarting, try to make a payment again. The hash should now be calculated correctly.

## What Changed
The hash calculation formula was updated to include the UDF (User Defined Fields) in the correct positions:

**Before:**
```
key|txnid|amount|productinfo|firstname|email|||||||||||SALT
```

**After (Correct):**
```
key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
```

This change ensures that the hash matches PayU's expected format.

