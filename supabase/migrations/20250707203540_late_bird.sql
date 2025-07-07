/*
  # Create sample blog posts with rough notation highlighting

  1. New Content
    - Sample blog posts demonstrating rough notation features
    - Posts include various highlighting techniques using custom syntax
    - Content covers React Hooks, Modern CSS, and Node.js topics

  2. Data Safety
    - Uses INSERT ... ON CONFLICT to handle existing slugs
    - Updates existing posts if slugs already exist
    - Preserves view counts for existing posts
*/

-- Insert or update sample blog posts with rough notation examples
INSERT INTO posts (title, slug, body, footer, view_count) VALUES 
(
  'Getting Started with React Hooks',
  'getting-started-with-react-hooks',
  '# Getting Started with React Hooks

React Hooks revolutionized how we write React components. [highlight]Hooks allow you to use state and other React features without writing a class component[/highlight].

## What are Hooks?

Hooks are [underline]functions that let you "hook into" React state and lifecycle features[/underline] from function components. They were introduced in React 16.8 and have become the standard way to write React components.

### Key Benefits

- [circle]Simpler component logic[/circle]
- [box]Better code reusability[/box]
- [highlight]Easier testing and debugging[/highlight]

## Most Common Hooks

### useState Hook

The [underline]useState hook[/underline] lets you add state to functional components:

```javascript
import React, { useState } from ''react'';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect Hook

[circle]useEffect is like componentDidMount, componentDidUpdate, and componentWillUnmount combined[/circle]. It lets you perform side effects in function components:

```javascript
import React, { useState, useEffect } from ''react'';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Best Practices

1. [highlight]Always use hooks at the top level[/highlight] - never inside loops, conditions, or nested functions
2. [underline]Use multiple state variables[/underline] instead of one complex state object
3. [box]Extract custom hooks[/box] for reusable stateful logic
4. [bracket]Remember that hooks are just JavaScript functions[/bracket]

## Common Mistakes to Avoid

- [crossed-off]Using hooks inside class components[/crossed-off] ❌
- [crossed-off]Calling hooks conditionally[/crossed-off] ❌
- [crossed-off]Forgetting dependency arrays in useEffect[/crossed-off] ❌

## Conclusion

React Hooks provide a [highlight]more direct API to the React concepts you already know[/highlight]. They offer a powerful and flexible way to share stateful logic between components while keeping your code clean and maintainable.',
  '',
  42
),
(
  'Modern CSS Techniques for 2024',
  'modern-css-techniques-2024',
  '# Modern CSS Techniques for 2024

CSS has evolved tremendously over the past few years. [highlight]Modern CSS gives us powerful tools to create beautiful, responsive designs with less code[/highlight].

## Container Queries

[circle]Container queries are a game-changer for responsive design[/circle]. Unlike media queries that respond to viewport size, container queries respond to the size of a containing element.

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

## CSS Grid Subgrid

[underline]Subgrid allows nested grids to participate in the sizing of their parent grid[/underline]:

```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.child-grid {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}
```

## CSS Cascade Layers

[box]Cascade layers give you more control over the CSS cascade[/box]:

```css
@layer reset, base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .button { 
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}
```

## New Color Functions

CSS now supports [highlight]advanced color manipulation[/highlight]:

```css
.element {
  /* Relative color syntax */
  background: oklch(from blue calc(l + 0.2) c h);
  
  /* Color mixing */
  border-color: color-mix(in oklch, blue 70%, white);
}
```

## CSS Nesting

[underline]Native CSS nesting[/underline] is now supported in modern browsers:

```css
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }
}
```

## Logical Properties

[circle]Logical properties make internationalization easier[/circle]:

```css
.element {
  /* Instead of margin-left and margin-right */
  margin-inline: 1rem;
  
  /* Instead of padding-top and padding-bottom */
  padding-block: 0.5rem;
  
  /* Instead of border-left */
  border-inline-start: 2px solid blue;
}
```

## CSS Custom Properties (Variables)

[box]CSS variables are incredibly powerful for theming[/box]:

```css
:root {
  --primary-color: #007aff;
  --spacing-unit: 0.5rem;
  --border-radius: calc(var(--spacing-unit) * 0.5);
}

.button {
  background: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}
```

## What''s Coming Next

- [bracket]View Transitions API for smooth page transitions[/bracket]
- [bracket]CSS Anchor Positioning for tooltips and popovers[/bracket]
- [bracket]CSS Scroll-driven Animations[/bracket]

## Deprecated Techniques

- [crossed-off]Float-based layouts[/crossed-off] - Use Flexbox or Grid instead
- [crossed-off]Table-based layouts[/crossed-off] - Modern CSS has better solutions
- [crossed-off]Vendor prefixes for modern properties[/crossed-off] - Most are no longer needed

## Conclusion

[highlight]Modern CSS is more powerful and expressive than ever before[/highlight]. These new features allow us to write cleaner, more maintainable stylesheets while creating better user experiences.',
  '',
  38
),
(
  'Building Scalable Node.js Applications',
  'building-scalable-nodejs-applications',
  '# Building Scalable Node.js Applications

Building applications that can handle growth is crucial for long-term success. [highlight]Scalability isn''t just about handling more users - it''s about maintaining performance and reliability as your application grows[/highlight].

## Architecture Patterns

### Microservices Architecture

[circle]Microservices break your application into small, independent services[/circle]:

```javascript
// User Service
const express = require(''express'');
const app = express();

app.get(''/users/:id'', async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  res.json(user);
});

app.listen(3001);
```

```javascript
// Order Service  
const express = require(''express'');
const app = express();

app.post(''/orders'', async (req, res) => {
  const order = await orderService.create(req.body);
  res.json(order);
});

app.listen(3002);
```

### Event-Driven Architecture

[underline]Event-driven patterns help decouple services[/underline]:

```javascript
const EventEmitter = require(''events'');
const eventBus = new EventEmitter();

// Publisher
class OrderService {
  async createOrder(orderData) {
    const order = await this.repository.save(orderData);
    eventBus.emit(''order.created'', order);
    return order;
  }
}

// Subscriber
class EmailService {
  constructor() {
    eventBus.on(''order.created'', this.sendConfirmationEmail.bind(this));
  }
  
  async sendConfirmationEmail(order) {
    // Send email logic
  }
}
```

## Database Optimization

### Connection Pooling

[box]Always use connection pooling for database connections[/box]:

```javascript
const { Pool } = require(''pg'');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Query Optimization

[underline]Optimize your database queries[/underline]:

```sql
-- Bad: N+1 query problem
SELECT * FROM users;
-- Then for each user:
SELECT * FROM posts WHERE user_id = ?;

-- Good: Use JOINs
SELECT u.*, p.* 
FROM users u 
LEFT JOIN posts p ON u.id = p.user_id;
```

## Caching Strategies

### Redis Caching

[circle]Implement caching for frequently accessed data[/circle]:

```javascript
const redis = require(''redis'');
const client = redis.createClient();

class UserService {
  async getUser(id) {
    // Try cache first
    const cached = await client.get(`user:${id}`);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Fetch from database
    const user = await this.repository.findById(id);
    
    // Cache for 1 hour
    await client.setex(`user:${id}`, 3600, JSON.stringify(user));
    
    return user;
  }
}
```

## Load Balancing

### Horizontal Scaling

[highlight]Scale horizontally by running multiple instances[/highlight]:

```javascript
const cluster = require(''cluster'');
const numCPUs = require(''os'').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on(''exit'', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP port
  require(''./app.js'');
  console.log(`Worker ${process.pid} started`);
}
```

## Monitoring and Logging

### Structured Logging

[box]Use structured logging for better observability[/box]:

```javascript
const winston = require(''winston'');

const logger = winston.createLogger({
  level: ''info'',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: ''error.log'', level: ''error'' }),
    new winston.transports.File({ filename: ''combined.log'' })
  ]
});

// Usage
logger.info(''User created'', { 
  userId: user.id, 
  email: user.email,
  timestamp: new Date().toISOString()
});
```

## Performance Optimization

### Async/Await Best Practices

[underline]Handle concurrent operations efficiently[/underline]:

```javascript
// Bad: Sequential execution
async function processUsers(userIds) {
  const results = [];
  for (const id of userIds) {
    const user = await fetchUser(id);
    results.push(user);
  }
  return results;
}

// Good: Parallel execution
async function processUsers(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return Promise.all(promises);
}
```

## Security Considerations

### Rate Limiting

[circle]Implement rate limiting to prevent abuse[/circle]:

```javascript
const rateLimit = require(''express-rate-limit'');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: ''Too many requests from this IP''
});

app.use(''/api/'', limiter);
```

## Common Anti-Patterns

- [crossed-off]Blocking the event loop with synchronous operations[/crossed-off]
- [crossed-off]Not handling errors properly[/crossed-off]
- [crossed-off]Storing sessions in memory[/crossed-off]
- [crossed-off]Not using environment variables for configuration[/crossed-off]

## Key Takeaways

1. [highlight]Design for failure - assume things will break[/highlight]
2. [underline]Monitor everything - you can''t fix what you can''t see[/underline]
3. [box]Cache aggressively but invalidate intelligently[/box]
4. [bracket]Scale horizontally rather than vertically when possible[/bracket]

Building scalable Node.js applications requires careful planning and the right architectural decisions from the start.',
  '',
  56
)
ON CONFLICT (slug) 
DO UPDATE SET 
  title = EXCLUDED.title,
  body = EXCLUDED.body,
  footer = EXCLUDED.footer,
  updated_at = now();