# Node.js Learning Path

## Module 1: Core Concepts ✅

### What is Node.js?
Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows you to run JavaScript on the server-side, outside the browser.

### Key Differences from Browser JavaScript:
1. **No DOM**: No `window`, `document`, or browser APIs
2. **File System Access**: Can read/write files using `fs` module
3. **Process Control**: Can access system info, environment variables
4. **Module System**: Uses CommonJS (`require`) or ES Modules (`import`)

### Core Concepts You'll Learn:
- **Modules**: How to organize and import code
- **File System**: Reading/writing files
- **HTTP Server**: Creating web servers
- **Streams**: Handling data efficiently
- **Events**: Event-driven programming
- **Async/Await**: Handling asynchronous operations

---

## Getting Started

1. **Install Node.js** (if not already installed):
   ```bash
   node --version  # Check version (should be 18+)
   ```

2. **Run the project**:
   ```bash
   npm start
   ```

3. **For auto-reload during development**:
   ```bash
   npm run dev
   ```

---

## Exercise 1: Your First Node.js Program

**Goal**: Understand the basics of Node.js execution

**Task**: 
1. Run `npm start` and observe the output
2. Modify `index.js` to:
   - Display your name
   - Show the current working directory
   - Display all environment variables (hint: `process.env`)

**Hints**:
- Use `console.log()` for output
- `process.env` is an object containing environment variables
- You can use `Object.keys()` to get all keys

**Expected Output**:
```
Hello from Node.js!
My name is: [Your Name]
Current directory: /home/mhmd/random/playground
Node.js version: v20.x.x
Environment variables: [list of keys]
```

**Checkpoint**: Once you complete this exercise, let me know and we'll move to Module 2: File System Operations!
