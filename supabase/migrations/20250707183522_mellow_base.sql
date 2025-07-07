/*
  # Create 20 dummy blog posts

  1. New Data
    - Insert 20 sample blog posts with varied content
    - Each post has unique title, slug, and markdown content
    - Random view counts for demonstration
    - Dates spread over the last few months

  2. Content Types
    - Technology posts
    - Lifestyle posts  
    - Tutorial posts
    - Opinion pieces
    - How-to guides
*/

INSERT INTO posts (title, slug, body, view_count, created_at) VALUES
(
  'Getting Started with React Hooks',
  'getting-started-with-react-hooks',
  '# Getting Started with React Hooks

React Hooks revolutionized how we write React components. They allow you to use state and other React features without writing a class.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components.

### useState Hook

The most basic hook is `useState`:

```javascript
const [count, setCount] = useState(0);
```

This gives you a state variable and a function to update it.

## Benefits of Hooks

- **Simpler code**: No need for class components
- **Better reusability**: Custom hooks can be shared
- **Easier testing**: Function components are easier to test

Hooks have made React development more enjoyable and productive.',
  42,
  '2024-12-15 10:30:00'
),
(
  'The Art of Minimalist Design',
  'the-art-of-minimalist-design',
  '# The Art of Minimalist Design

Less is more. This principle has guided designers for decades, and it''s more relevant today than ever.

## What is Minimalism?

Minimalist design focuses on:
- **Simplicity**: Remove unnecessary elements
- **Functionality**: Every element serves a purpose
- **White space**: Let content breathe
- **Typography**: Clean, readable fonts

## Why Choose Minimalism?

1. **Better user experience**: Users can focus on what matters
2. **Faster loading**: Fewer elements mean better performance
3. **Timeless appeal**: Minimalist designs age well

> "Simplicity is the ultimate sophistication" - Leonardo da Vinci

The best designs are often the simplest ones.',
  67,
  '2024-12-10 14:20:00'
),
(
  'Building Your First API with Node.js',
  'building-your-first-api-with-nodejs',
  '# Building Your First API with Node.js

APIs are the backbone of modern web applications. Let''s build one from scratch using Node.js and Express.

## Setting Up

First, initialize your project:

```bash
npm init -y
npm install express
```

## Creating the Server

```javascript
const express = require(''express'');
const app = express();

app.get(''/api/users'', (req, res) => {
  res.json({ message: ''Hello API!'' });
});

app.listen(3000, () => {
  console.log(''Server running on port 3000'');
});
```

## Adding Routes

- GET `/api/users` - Get all users
- POST `/api/users` - Create a user
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

This covers the basic CRUD operations for a REST API.',
  89,
  '2024-12-08 09:15:00'
),
(
  'The Future of Remote Work',
  'the-future-of-remote-work',
  '# The Future of Remote Work

The pandemic changed how we work forever. Remote work is here to stay, but what does the future hold?

## Current Trends

- **Hybrid models**: Mix of office and remote work
- **Digital nomadism**: Work from anywhere
- **Async communication**: Less meetings, more flexibility

## Challenges to Overcome

1. **Collaboration**: How do we maintain team spirit?
2. **Work-life balance**: Setting boundaries at home
3. **Career development**: Growing without face-to-face interaction

## Tools That Help

- **Communication**: Slack, Discord, Teams
- **Project management**: Notion, Asana, Trello
- **Video calls**: Zoom, Google Meet, Loom

The companies that adapt to remote work will attract the best talent.',
  156,
  '2024-12-05 16:45:00'
),
(
  'CSS Grid vs Flexbox: When to Use What',
  'css-grid-vs-flexbox-when-to-use-what',
  '# CSS Grid vs Flexbox: When to Use What

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes.

## Flexbox: One-Dimensional Layouts

Use Flexbox for:
- Navigation bars
- Card layouts
- Centering content
- Distributing space along one axis

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## CSS Grid: Two-Dimensional Layouts

Use Grid for:
- Page layouts
- Complex card grids
- Magazine-style layouts
- Overlapping elements

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}
```

## The Rule of Thumb

- **Flexbox**: Content-first approach
- **Grid**: Layout-first approach

Often, you''ll use both together in the same project.',
  73,
  '2024-12-02 11:30:00'
),
(
  'Productivity Tips for Developers',
  'productivity-tips-for-developers',
  '# Productivity Tips for Developers

Being productive as a developer isn''t just about coding faster. It''s about working smarter.

## Time Management

### The Pomodoro Technique
- Work for 25 minutes
- Take a 5-minute break
- Repeat 4 times, then take a longer break

### Time blocking
Schedule specific times for:
- Deep work (coding)
- Meetings
- Learning
- Email/Slack

## Code Organization

1. **Use meaningful variable names**
2. **Write comments for complex logic**
3. **Keep functions small and focused**
4. **Refactor regularly**

## Tools That Help

- **Code editors**: VS Code, Vim, Sublime
- **Version control**: Git workflows
- **Task runners**: npm scripts, Gulp, Webpack
- **Documentation**: README files, inline comments

Remember: The best code is code that doesn''t need to be written.',
  91,
  '2024-11-28 13:20:00'
),
(
  'Understanding JavaScript Closures',
  'understanding-javascript-closures',
  '# Understanding JavaScript Closures

Closures are one of JavaScript''s most powerful features, yet they confuse many developers.

## What is a Closure?

A closure is when a function has access to variables from an outer scope even after the outer function has returned.

```javascript
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
```

## Why Closures Matter

1. **Data privacy**: Create private variables
2. **Function factories**: Generate specialized functions
3. **Event handlers**: Maintain state in callbacks

## Common Use Cases

- Module patterns
- Callback functions
- Event listeners
- Partial application

## Potential Pitfalls

- Memory leaks if not handled properly
- Confusion with `this` binding
- Performance implications

Understanding closures will make you a better JavaScript developer.',
  128,
  '2024-11-25 08:45:00'
),
(
  'The Psychology of Color in Web Design',
  'the-psychology-of-color-in-web-design',
  '# The Psychology of Color in Web Design

Colors evoke emotions and influence behavior. Understanding color psychology can make your designs more effective.

## Color Meanings

### Red
- **Emotion**: Passion, urgency, excitement
- **Use cases**: Call-to-action buttons, sales, food

### Blue
- **Emotion**: Trust, calm, professional
- **Use cases**: Corporate sites, healthcare, finance

### Green
- **Emotion**: Growth, nature, success
- **Use cases**: Environmental sites, finance, health

### Yellow
- **Emotion**: Happiness, optimism, attention
- **Use cases**: Children''s sites, warnings, highlights

## Color Combinations

- **Monochromatic**: Different shades of one color
- **Complementary**: Opposite colors on the color wheel
- **Triadic**: Three evenly spaced colors
- **Analogous**: Adjacent colors on the wheel

## Accessibility Considerations

Always ensure sufficient contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Use tools like WebAIM''s contrast checker

Color should never be the only way to convey information.',
  85,
  '2024-11-22 15:10:00'
),
(
  'Getting Started with TypeScript',
  'getting-started-with-typescript',
  '# Getting Started with TypeScript

TypeScript adds static typing to JavaScript, making your code more reliable and maintainable.

## Why TypeScript?

- **Catch errors early**: Find bugs at compile time
- **Better IDE support**: Autocomplete and refactoring
- **Self-documenting code**: Types serve as documentation
- **Easier refactoring**: Confident code changes

## Basic Types

```typescript
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}
```

## Functions

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;
```

## Getting Started

1. Install TypeScript: `npm install -g typescript`
2. Create a `tsconfig.json` file
3. Start writing `.ts` files
4. Compile with `tsc`

TypeScript has a learning curve, but the benefits are worth it.',
  112,
  '2024-11-18 12:00:00'
),
(
  'The Importance of Web Accessibility',
  'the-importance-of-web-accessibility',
  '# The Importance of Web Accessibility

Web accessibility ensures that websites are usable by everyone, including people with disabilities.

## Why Accessibility Matters

- **Inclusive design**: Serve all users equally
- **Legal compliance**: Avoid lawsuits and fines
- **Better SEO**: Accessible sites rank better
- **Improved UX**: Benefits everyone, not just disabled users

## Common Accessibility Issues

1. **Missing alt text** on images
2. **Poor color contrast**
3. **Keyboard navigation** problems
4. **Missing form labels**
5. **Inaccessible focus states**

## WCAG Guidelines

The Web Content Accessibility Guidelines provide standards:

### Level A (Minimum)
- Images have alt text
- Videos have captions
- Content is keyboard accessible

### Level AA (Standard)
- Color contrast ratios met
- Text can be resized to 200%
- Focus indicators are visible

### Level AAA (Enhanced)
- Highest level of accessibility
- Often not required but good to aim for

## Tools for Testing

- **Screen readers**: NVDA, JAWS, VoiceOver
- **Automated testing**: axe, Lighthouse
- **Manual testing**: Keyboard navigation, color blindness simulators

Accessibility is not optional—it''s a responsibility.',
  94,
  '2024-11-15 09:30:00'
),
(
  'Modern JavaScript Features You Should Know',
  'modern-javascript-features-you-should-know',
  '# Modern JavaScript Features You Should Know

JavaScript evolves rapidly. Here are the modern features that will make your code cleaner and more efficient.

## ES6+ Features

### Destructuring
```javascript
// Array destructuring
const [first, second] = [1, 2, 3];

// Object destructuring
const { name, age } = user;
```

### Template Literals
```javascript
const message = `Hello, ${name}! You are ${age} years old.`;
```

### Arrow Functions
```javascript
const multiply = (a, b) => a * b;
```

## Async/Await

```javascript
async function fetchData() {
  try {
    const response = await fetch(''/api/data'');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(''Error:'', error);
  }
}
```

## Optional Chaining

```javascript
// Safe property access
const street = user?.address?.street;

// Safe method calls
user?.getName?.();
```

## Nullish Coalescing

```javascript
const username = user.name ?? ''Anonymous'';
```

## Modules

```javascript
// Export
export const PI = 3.14159;
export default function calculate() { }

// Import
import calculate, { PI } from ''./math.js'';
```

These features make JavaScript more powerful and enjoyable to write.',
  147,
  '2024-11-12 14:45:00'
),
(
  'Building Responsive Layouts with CSS',
  'building-responsive-layouts-with-css',
  '# Building Responsive Layouts with CSS

Responsive design ensures your website looks great on all devices. Here''s how to build layouts that adapt.

## Mobile-First Approach

Start with mobile styles, then enhance for larger screens:

```css
/* Mobile styles (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

## Flexible Units

Use relative units instead of fixed pixels:

- **rem**: Relative to root font size
- **em**: Relative to parent font size
- **%**: Relative to parent element
- **vw/vh**: Relative to viewport
- **fr**: Fractional units in Grid

## CSS Grid for Layouts

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Flexbox for Components

```css
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

## Images and Media

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Testing Responsive Design

- Use browser dev tools
- Test on real devices
- Consider different orientations
- Check touch targets (minimum 44px)

Responsive design is about creating flexible, adaptable layouts.',
  76,
  '2024-11-08 10:15:00'
),
(
  'The Art of Code Reviews',
  'the-art-of-code-reviews',
  '# The Art of Code Reviews

Code reviews are essential for maintaining code quality and sharing knowledge within teams.

## Why Code Reviews Matter

- **Catch bugs early**: Fresh eyes spot issues
- **Knowledge sharing**: Learn from each other
- **Maintain standards**: Consistent code style
- **Mentorship**: Help junior developers grow

## What to Look For

### Functionality
- Does the code do what it''s supposed to do?
- Are edge cases handled?
- Is error handling appropriate?

### Readability
- Are variable names descriptive?
- Is the code well-structured?
- Are comments helpful and necessary?

### Performance
- Are there any obvious bottlenecks?
- Is the algorithm efficient?
- Are resources properly managed?

### Security
- Are inputs validated?
- Are there any security vulnerabilities?
- Is sensitive data handled properly?

## Best Practices

### For Reviewers
1. **Be constructive**: Suggest improvements, don''t just criticize
2. **Ask questions**: "Why did you choose this approach?"
3. **Praise good code**: Acknowledge clever solutions
4. **Focus on the code**: Not the person

### For Authors
1. **Keep changes small**: Easier to review
2. **Write good commit messages**: Explain the why
3. **Test your code**: Don''t submit broken code
4. **Be open to feedback**: Learn from suggestions

## Tools

- GitHub/GitLab pull requests
- Crucible, Review Board
- IDE plugins for inline reviews

Good code reviews make the entire team better.',
  103,
  '2024-11-05 16:20:00'
),
(
  'Understanding REST API Design',
  'understanding-rest-api-design',
  '# Understanding REST API Design

REST (Representational State Transfer) is an architectural style for designing web APIs.

## REST Principles

### 1. Stateless
Each request must contain all information needed to process it.

### 2. Client-Server Architecture
Clear separation between client and server responsibilities.

### 3. Cacheable
Responses should be cacheable when appropriate.

### 4. Uniform Interface
Consistent way to interact with resources.

## HTTP Methods

- **GET**: Retrieve data
- **POST**: Create new resource
- **PUT**: Update entire resource
- **PATCH**: Partial update
- **DELETE**: Remove resource

## URL Structure

```
GET /api/users          # Get all users
GET /api/users/123      # Get specific user
POST /api/users         # Create new user
PUT /api/users/123      # Update user
DELETE /api/users/123   # Delete user
```

## Response Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

## Best Practices

1. **Use nouns for resources**: `/users` not `/getUsers`
2. **Be consistent**: Same patterns throughout
3. **Version your API**: `/api/v1/users`
4. **Use proper HTTP status codes**
5. **Provide meaningful error messages**

## Example Response

```json
{
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

Well-designed APIs are a joy to work with.',
  118,
  '2024-11-02 11:40:00'
),
(
  'The Power of CSS Custom Properties',
  'the-power-of-css-custom-properties',
  '# The Power of CSS Custom Properties

CSS Custom Properties (CSS Variables) bring dynamic styling capabilities to CSS.

## What are CSS Custom Properties?

CSS Custom Properties allow you to store values that can be reused throughout your stylesheet.

```css
:root {
  --primary-color: #3498db;
  --font-size-large: 2rem;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  font-size: var(--font-size-large);
  padding: var(--spacing-unit);
}
```

## Advantages Over Sass Variables

1. **Runtime changes**: Can be modified with JavaScript
2. **Cascade and inheritance**: Follow CSS rules
3. **Browser support**: Native CSS feature
4. **Dynamic theming**: Easy theme switching

## Dynamic Theming

```css
/* Light theme */
:root {
  --bg-color: white;
  --text-color: black;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-color: black;
  --text-color: white;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

## JavaScript Integration

```javascript
// Get custom property value
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue(''--primary-color'');

// Set custom property value
document.documentElement.style
  .setProperty(''--primary-color'', ''#e74c3c'');
```

## Use Cases

- **Design systems**: Consistent spacing and colors
- **Responsive design**: Different values at different breakpoints
- **Component theming**: Customizable components
- **Animation**: Smooth transitions between states

## Browser Support

Supported in all modern browsers. For older browsers, provide fallbacks:

```css
.button {
  background-color: #3498db; /* Fallback */
  background-color: var(--primary-color);
}
```

CSS Custom Properties make your stylesheets more maintainable and flexible.',
  87,
  '2024-10-30 13:25:00'
),
(
  'Debugging JavaScript Like a Pro',
  'debugging-javascript-like-a-pro',
  '# Debugging JavaScript Like a Pro

Debugging is an essential skill for any developer. Here are techniques to find and fix bugs efficiently.

## Browser Developer Tools

### Console Methods
```javascript
console.log(''Basic logging'');
console.warn(''Warning message'');
console.error(''Error message'');
console.table(arrayOfObjects);
console.group(''Group label'');
console.time(''timer'');
console.timeEnd(''timer'');
```

### Breakpoints
- **Line breakpoints**: Click line numbers
- **Conditional breakpoints**: Right-click for conditions
- **DOM breakpoints**: Break on element changes
- **Event breakpoints**: Break on specific events

## Debugging Techniques

### 1. Rubber Duck Debugging
Explain your code line by line to a rubber duck (or colleague).

### 2. Binary Search
Comment out half your code to isolate the problem.

### 3. Add Logging
Strategic console.log statements to trace execution.

### 4. Use the Debugger Statement
```javascript
function problematicFunction() {
  debugger; // Execution will pause here
  // Your code here
}
```

## Common JavaScript Bugs

### Scope Issues
```javascript
// Problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 3, 3, 3
}

// Solution
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 0, 1, 2
}
```

### Async/Await Errors
```javascript
// Problem
async function fetchData() {
  const data = await fetch(''/api/data'');
  return data.json(); // Missing await
}

// Solution
async function fetchData() {
  const response = await fetch(''/api/data'');
  const data = await response.json();
  return data;
}
```

## Tools and Extensions

- **React DevTools**: Debug React components
- **Vue DevTools**: Debug Vue applications
- **Redux DevTools**: Debug state management
- **Lighthouse**: Performance and accessibility auditing

## Prevention is Better Than Cure

1. **Use TypeScript**: Catch errors at compile time
2. **Write tests**: Unit and integration tests
3. **Use linters**: ESLint, Prettier
4. **Code reviews**: Fresh eyes catch bugs

Remember: Every bug is an opportunity to learn something new.',
  134,
  '2024-10-27 09:50:00'
),
(
  'Creating Smooth CSS Animations',
  'creating-smooth-css-animations',
  '# Creating Smooth CSS Animations

Well-crafted animations enhance user experience and bring interfaces to life.

## CSS Transitions

For simple state changes:

```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: red;
}
```

## CSS Animations

For complex, repeating animations:

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}
```

## Performance Considerations

### Use Transform and Opacity
These properties don''t trigger layout or paint:

```css
/* Good - only triggers composite */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}

/* Avoid - triggers layout */
.element {
  left: 100px;
  width: 200px;
}
```

### Hardware Acceleration
Force GPU acceleration for smooth animations:

```css
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* Force hardware acceleration */
}
```

## Easing Functions

Choose the right easing for natural motion:

- **ease-in**: Slow start, fast end
- **ease-out**: Fast start, slow end
- **ease-in-out**: Slow start and end
- **cubic-bezier()**: Custom curves

```css
.custom-ease {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Animation Best Practices

1. **Keep it subtle**: Don''t overdo it
2. **Respect user preferences**: Check `prefers-reduced-motion`
3. **Optimize for 60fps**: Aim for smooth frame rates
4. **Use appropriate duration**: 200-500ms for most UI animations

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Loading Animations

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

Great animations feel natural and enhance the user experience.',
  96,
  '2024-10-24 14:30:00'
),
(
  'The Future of Web Development',
  'the-future-of-web-development',
  '# The Future of Web Development

Web development is constantly evolving. Here''s what''s shaping the future of our industry.

## Emerging Technologies

### WebAssembly (WASM)
- Run high-performance code in browsers
- Languages like Rust, C++, and Go on the web
- Gaming, image processing, and complex calculations

### Progressive Web Apps (PWAs)
- Native app experience in browsers
- Offline functionality
- Push notifications
- App store distribution

### Web Components
- Reusable custom elements
- Framework-agnostic components
- Better encapsulation and reusability

## Development Trends

### JAMstack Architecture
- **J**avaScript, **A**PIs, and **M**arkup
- Static site generators
- Serverless functions
- Better performance and security

### Micro-frontends
- Break large apps into smaller pieces
- Independent deployment
- Technology diversity
- Team autonomy

### Edge Computing
- Compute closer to users
- Reduced latency
- Better performance globally
- CDN evolution

## AI and Machine Learning

### AI-Assisted Development
- GitHub Copilot and similar tools
- Automated code generation
- Bug detection and fixes
- Code optimization suggestions

### ML in Browsers
- TensorFlow.js
- Real-time image processing
- Natural language processing
- Personalized user experiences

## New JavaScript Features

### Top-level await
```javascript
// No need to wrap in async function
const data = await fetch(''/api/data'');
```

### Optional chaining and nullish coalescing
```javascript
const value = obj?.prop?.nested ?? ''default'';
```

### Private class fields
```javascript
class MyClass {
  #privateField = ''secret'';
}
```

## CSS Evolution

### Container Queries
```css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

### CSS Houdini
- Custom CSS properties and values
- Paint API for custom rendering
- Layout API for custom layouts

The future of web development is exciting and full of possibilities.',
  162,
  '2024-10-21 12:15:00'
),
(
  'Mastering Git Workflows',
  'mastering-git-workflows',
  '# Mastering Git Workflows

Git is essential for modern development. Understanding different workflows helps teams collaborate effectively.

## Basic Git Commands

```bash
# Initialize repository
git init

# Add files to staging
git add .
git add filename.js

# Commit changes
git commit -m "Add new feature"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main
```

## Branching Strategies

### Git Flow
- **main**: Production-ready code
- **develop**: Integration branch
- **feature**: New features
- **release**: Prepare releases
- **hotfix**: Emergency fixes

### GitHub Flow
Simpler workflow:
1. Create feature branch
2. Make changes and commit
3. Open pull request
4. Review and merge
5. Deploy

### GitLab Flow
Combines Git Flow and GitHub Flow with environment branches.

## Best Practices

### Commit Messages
Follow conventional commits:
```
feat: add user authentication
fix: resolve login bug
docs: update API documentation
style: format code with prettier
refactor: simplify user service
test: add unit tests for auth
```

### Branch Naming
Use descriptive names:
```
feature/user-authentication
bugfix/login-error
hotfix/security-patch
```

### Pull Request Guidelines
1. **Small, focused changes**: Easier to review
2. **Clear description**: Explain what and why
3. **Link to issues**: Reference related tickets
4. **Request specific reviewers**: Get the right eyes on code

## Advanced Git Techniques

### Interactive Rebase
Clean up commit history:
```bash
git rebase -i HEAD~3
```

### Cherry-picking
Apply specific commits:
```bash
git cherry-pick abc123
```

### Stashing
Save work in progress:
```bash
git stash
git stash pop
```

### Bisect
Find problematic commits:
```bash
git bisect start
git bisect bad
git bisect good abc123
```

## Merge vs Rebase

### Merge
- Preserves commit history
- Shows when features were integrated
- Creates merge commits

### Rebase
- Linear history
- Cleaner commit log
- Rewrites history (use carefully)

## Handling Conflicts

1. **Identify conflicts**: Git marks conflicted files
2. **Resolve manually**: Edit files to fix conflicts
3. **Test thoroughly**: Ensure everything works
4. **Commit resolution**: Complete the merge/rebase

Good Git practices make collaboration smooth and history clear.',
  108,
  '2024-10-18 08:40:00'
),
(
  'Web Performance Optimization Techniques',
  'web-performance-optimization-techniques',
  '# Web Performance Optimization Techniques

Fast websites provide better user experiences and rank higher in search results.

## Measuring Performance

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity
- **CLS (Cumulative Layout Shift)**: Visual stability

### Tools
- **Lighthouse**: Built into Chrome DevTools
- **PageSpeed Insights**: Google''s web performance tool
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Performance monitoring

## Optimization Strategies

### Image Optimization
```html
<!-- Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="Description">
</picture>

<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Responsive images -->
<img srcset="small.jpg 480w, large.jpg 800w" 
     sizes="(max-width: 600px) 480px, 800px"
     src="large.jpg" alt="Description">
```

### Code Splitting
```javascript
// Dynamic imports
const LazyComponent = React.lazy(() => import(''./LazyComponent''));

// Route-based splitting
const Home = lazy(() => import(''./pages/Home''));
const About = lazy(() => import(''./pages/About''));
```

### Resource Hints
```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-image.jpg" as="image">

<!-- Prefetch future resources -->
<link rel="prefetch" href="next-page.html">

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//example.com">
```

## CSS Optimization

### Critical CSS
Inline critical CSS and load the rest asynchronously:
```html
<style>
  /* Critical CSS here */
</style>
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel=''stylesheet''">
```

### CSS Containment
```css
.component {
  contain: layout style paint;
}
```

## JavaScript Optimization

### Tree Shaking
Remove unused code:
```javascript
// Import only what you need
import { debounce } from ''lodash'';
// Instead of
import _ from ''lodash'';
```

### Service Workers
Cache resources for offline access:
```javascript
self.addEventListener(''fetch'', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## Server-Side Optimization

### Compression
Enable gzip/brotli compression on your server.

### CDN
Use Content Delivery Networks to serve static assets.

### HTTP/2
Take advantage of multiplexing and server push.

### Caching Headers
```
Cache-Control: public, max-age=31536000
ETag: "abc123"
```

## Performance Budget

Set limits for:
- Total page size
- Number of requests
- Time to interactive
- Core Web Vitals scores

Monitor these metrics and fail builds that exceed budgets.

Performance is a feature, not an afterthought.',
  145,
  '2024-10-15 15:55:00'
);