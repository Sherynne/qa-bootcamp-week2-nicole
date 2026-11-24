## Week 2 – Day 6: TypeScript Basics

### TypeScript Exercises
The `src/ts-basics/` folder contains exercises covering:
- Type aliases
- Functions
- Objects
- Optional chaining
- Tuples
- Union types

### Profile Validator
The `src/ts-basics/profile-validator.ts` file defines a `UserProfile` type and an `isNotified()` function.

The function checks whether notifications are enabled and safely returns `false` when settings or notification properties are missing.

**How to run:**

```bash
npx tsx src/ts-basics/profile-validator.ts
```

**Expected output:**
```text
User 1: true
User 2: false
User 3: false
```
