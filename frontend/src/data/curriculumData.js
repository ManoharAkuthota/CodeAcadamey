// Comprehensive offline-resilient curriculum and course catalog
// Ensures courses ALWAYS render on deployment, local, and preview environments

export const DEFAULT_COURSES = [
  {
    id: 1,
    title: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    slug: 'java-mastery',
    languageName: 'Java',
    description: 'Comprehensive journey through Java 21: variables, loops, OOP principles, collections framework, exception handling, and concurrent streams.',
    level: 'Beginner to Advanced',
    estimatedHours: 40,
    moduleCount: 4,
    topicCount: 12,
    progressPercentage: 25,
    modules: [
      {
        id: 101,
        title: 'Module 1: Java Basics & Syntax',
        description: 'Learn the anatomy of Java programs, the JVM execution model, primitive data types, and operators.',
        moduleOrder: 1,
        topics: [
          {
            id: 1001,
            title: '1. Introduction to Java & JVM Architecture',
            slug: 'java-intro-jvm',
            summary: 'Understand JVM, JRE, JDK, bytecode compilation, and write your first Hello World program.',
            topicOrder: 1,
            completed: true,
          },
          {
            id: 1002,
            title: '2. Primitive Types, Variables & Operators',
            slug: 'java-variables-types',
            summary: 'Explore primitive data types, memory stack allocations, type casting, and arithmetic operators.',
            topicOrder: 2,
            completed: true,
          },
          {
            id: 1003,
            title: '3. Control Flow: Conditionals & Loops',
            slug: 'java-control-flow',
            summary: 'Master if-else logic, switch pattern matching, while loops, and enhanced for-each iteration.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 102,
        title: 'Module 2: Object-Oriented Programming (OOP)',
        description: 'Master the four pillars of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
        moduleOrder: 2,
        topics: [
          {
            id: 1004,
            title: '4. Classes, Objects & Encapsulation',
            slug: 'java-classes-encapsulation',
            summary: 'Understand blueprints, instance states, private fields, and getter/setter access control.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 1005,
            title: '5. Inheritance & Polymorphism',
            slug: 'java-inheritance-polymorphism',
            summary: 'Class hierarchies, method overriding, super keyword, and runtime dynamic dispatch.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 1006,
            title: '6. Abstract Classes & Interfaces',
            slug: 'java-interfaces-abstraction',
            summary: 'Contracts in Java, default interface methods, multiple inheritance of type, and decoupled architecture.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 103,
        title: 'Module 3: Collections & Generics',
        description: 'List, Set, Map, and algorithmic complexity of JVM data structures.',
        moduleOrder: 3,
        topics: [
          {
            id: 1007,
            title: '7. Generics & Type Safety',
            slug: 'java-generics',
            summary: 'Generic classes, bounded type parameters, and type erasure.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 1008,
            title: '8. List, Set & Map Framework',
            slug: 'java-collections-framework',
            summary: 'ArrayList vs LinkedList, HashSet bucket hashing, and HashMap internal mechanics.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 104,
        title: 'Module 4: Modern Java 21 & Concurrency',
        description: 'Streams API, Records, Sealed Classes, and Virtual Threads.',
        moduleOrder: 4,
        topics: [
          {
            id: 1009,
            title: '9. Functional Programming & Streams API',
            slug: 'java-streams-lambdas',
            summary: 'Declarative data pipelines with map, filter, reduce, and parallel streams.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 1010,
            title: '10. Virtual Threads & Project Loom',
            slug: 'java-virtual-threads',
            summary: 'High-throughput lightweight concurrency on the carrier thread pool.',
            topicOrder: 2,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Spring Boot 3 & Microservices Architecture: Zero to Hero',
    slug: 'spring-boot-zero-to-hero',
    languageName: 'Java',
    frameworkName: 'Spring Boot',
    description: 'Master Dependency Injection, REST APIs, JPA/Hibernate, Spring Security, JWT authentication, and distributed microservices.',
    level: 'Intermediate to Advanced',
    estimatedHours: 50,
    moduleCount: 4,
    topicCount: 10,
    progressPercentage: 10,
    modules: [
      {
        id: 201,
        title: 'Module 1: Spring Core & Dependency Injection',
        description: 'Explore IoC containers, bean lifecycles, and loose coupling.',
        moduleOrder: 1,
        topics: [
          {
            id: 2001,
            title: '1. Inversion of Control (IoC) & Dependency Injection',
            slug: 'spring-ioc-di',
            summary: 'Understand how Spring manages objects, handles dependency wiring, and eliminates tight coupling.',
            topicOrder: 1,
            completed: true,
          },
          {
            id: 2002,
            title: '2. Component Scanning & Bean Configuration',
            slug: 'spring-beans-config',
            summary: 'Master @Component, @Service, @Repository, @Configuration, and @Bean scopes.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 202,
        title: 'Module 2: Building Production REST APIs',
        description: 'Controllers, DTOs, validations, and standard HTTP error handling.',
        moduleOrder: 2,
        topics: [
          {
            id: 2003,
            title: '3. RESTful Routing & Request Mapping',
            slug: 'spring-rest-controllers',
            summary: 'HTTP verbs (GET, POST, PUT, DELETE), @PathVariable, and @RequestBody parsing.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 2004,
            title: '4. Global Exception Handling & DTO Validation',
            slug: 'spring-validation-exceptions',
            summary: 'Clean error responses with @RestControllerAdvice and Jakarta Bean Validation.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 203,
        title: 'Module 3: Spring Data JPA & Database Persistence',
        description: 'Relational database mapping, HikariCP, and repository queries.',
        moduleOrder: 3,
        topics: [
          {
            id: 2005,
            title: '5. Entity Modeling & Hibernate Relationships',
            slug: 'spring-data-jpa-entities',
            summary: 'OneToMany, ManyToOne, cascade types, and lazy fetching mechanics.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 2006,
            title: '6. Derived Queries & Native SQL Projections',
            slug: 'spring-data-queries',
            summary: 'Custom JPQL and native SQL queries with Spring Data repositories.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 204,
        title: 'Module 4: Spring Security & JWT Authentication',
        description: 'Securing endpoints, stateless sessions, and role-based permissions.',
        moduleOrder: 4,
        topics: [
          {
            id: 2007,
            title: '7. Security Filter Chain & Stateless Auth',
            slug: 'spring-security-filters',
            summary: 'How Spring Security intercepts incoming HTTP requests with authentication filters.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 2008,
            title: '8. JWT Tokens & Refresh Token Rotation',
            slug: 'spring-security-jwt',
            summary: 'Cryptographic token generation, claims extraction, and revocation strategies.',
            topicOrder: 2,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Modern React 18: Components, Hooks, State & Production Web Apps',
    slug: 'react-mastery',
    languageName: 'JavaScript',
    frameworkName: 'React',
    description: 'Build responsive modern web applications with React 18, Vite, Tailwind CSS, Hooks, React Router, and Axios.',
    level: 'Beginner to Intermediate',
    estimatedHours: 35,
    moduleCount: 3,
    topicCount: 8,
    progressPercentage: 0,
    modules: [
      {
        id: 301,
        title: 'Module 1: Components, JSX & State Management',
        description: 'Learn component lifecycles, useState, useEffect, and reactive rendering.',
        moduleOrder: 1,
        topics: [
          {
            id: 3001,
            title: '1. React Components & useState Hook',
            slug: 'react-components-usestate',
            summary: 'Understand components as pure functions of state and props with reactive UI rendering.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 3002,
            title: '2. Side Effects with useEffect & Cleanup',
            slug: 'react-useeffect-lifecycle',
            summary: 'Fetching data, subscribing to browser events, and memory cleanup.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 302,
        title: 'Module 2: Routing & Global State',
        description: 'React Router v6, context providers, and customized hooks.',
        moduleOrder: 2,
        topics: [
          {
            id: 3003,
            title: '3. Client-Side Routing with React Router v6',
            slug: 'react-router-v6',
            summary: 'Dynamic routes, outlet layouts, nested navigations, and protected route guards.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 3004,
            title: '4. Global Context & Custom Hooks Pattern',
            slug: 'react-context-custom-hooks',
            summary: 'Eliminate prop drilling with React Context and clean reusable hook abstractions.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 303,
        title: 'Module 3: Performance & Production Deployment',
        description: 'Memoization, lazy loading, code-splitting, and Docker deployment.',
        moduleOrder: 3,
        topics: [
          {
            id: 3005,
            title: '5. React Reconciliation & Memoization',
            slug: 'react-memo-performance',
            summary: 'Virtual DOM diffing algorithm, useMemo, useCallback, and React.memo.',
            topicOrder: 1,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'SQL & Relational Database Architecture: From SELECT to Optimization',
    slug: 'sql-mastery',
    languageName: 'SQL',
    description: 'Master SQL queries, table joins, aggregation, schema design, constraints, and query indexing.',
    level: 'Beginner to Intermediate',
    estimatedHours: 25,
    moduleCount: 3,
    topicCount: 7,
    progressPercentage: 0,
    modules: [
      {
        id: 401,
        title: 'Module 1: Querying Data & Relational Joins',
        description: 'SELECT statements, filtering with WHERE, ordering, and joining multiple tables.',
        moduleOrder: 1,
        topics: [
          {
            id: 4001,
            title: '1. SQL SELECT, WHERE & ORDER BY',
            slug: 'sql-select-fundamentals',
            summary: 'Learn how to retrieve data from tables with filtering, projection, and sorting.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 4002,
            title: '2. INNER, LEFT & FULL OUTER Joins',
            slug: 'sql-joins-deep-dive',
            summary: 'Connecting relational tables with foreign keys and multi-table Venn diagrams.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 402,
        title: 'Module 2: Aggregations & Grouping',
        description: 'GROUP BY, HAVING, subqueries, and window functions.',
        moduleOrder: 2,
        topics: [
          {
            id: 4003,
            title: '3. Grouping & Aggregate Functions',
            slug: 'sql-group-by-aggregates',
            summary: 'COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING clauses.',
            topicOrder: 1,
            completed: false,
          }
        ]
      },
      {
        id: 403,
        title: 'Module 3: Indexing & Performance Tuning',
        description: 'B-Tree indexes, execution plans, and EXPLAIN query analysis.',
        moduleOrder: 3,
        topics: [
          {
            id: 4004,
            title: '4. B-Tree Indexes & EXPLAIN Query Plans',
            slug: 'sql-indexes-explain',
            summary: 'How relational storage engines locate rows and how to eliminate full table scans.',
            topicOrder: 1,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'C Systems Programming: Memory, Pointers & Operating Systems',
    slug: 'c-systems-programming',
    languageName: 'C',
    description: 'Master low-level programming: pointers, memory allocation (malloc/free), stack vs heap, structs, and UNIX system calls.',
    level: 'Intermediate',
    estimatedHours: 30,
    moduleCount: 3,
    topicCount: 6,
    progressPercentage: 0,
    modules: [
      {
        id: 501,
        title: 'Module 1: Pointers & Direct Memory Access',
        description: 'Memory addresses, pointer arithmetic, dereferencing, and pointer-to-pointer.',
        moduleOrder: 1,
        topics: [
          {
            id: 5001,
            title: '1. Pointers, Addresses & Dereferencing',
            slug: 'c-pointers-basics',
            summary: 'Directly address RAM memory cells using pointers and dereference operations.',
            topicOrder: 1,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'C++ Object-Oriented Programming & Standard Template Library (STL)',
    slug: 'cpp-oop-stl',
    languageName: 'C++',
    description: 'High-performance C++20: classes, references, copy/move constructors, RAII, templates, and standard algorithms.',
    level: 'Advanced',
    estimatedHours: 35,
    moduleCount: 3,
    topicCount: 6,
    progressPercentage: 0,
    modules: [
      {
        id: 601,
        title: 'Module 1: Classes & RAII',
        description: 'Destructors, smart pointers (unique_ptr, shared_ptr), and Resource Acquisition Is Initialization.',
        moduleOrder: 1,
        topics: [
          {
            id: 6001,
            title: '1. Smart Pointers & RAII Pattern',
            slug: 'cpp-smart-pointers',
            summary: 'Eliminate memory leaks forever with std::unique_ptr and modern C++ ownership semantics.',
            topicOrder: 1,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Python 3 for Software Engineers: Data Structures & Automation',
    slug: 'python-software-engineering',
    languageName: 'Python',
    description: 'Master Pythonic idioms: lists, dicts, generators, decorators, OOP, file I/O, and REST API consumption.',
    level: 'Beginner to Intermediate',
    estimatedHours: 30,
    moduleCount: 3,
    topicCount: 6,
    progressPercentage: 0,
    modules: [
      {
        id: 701,
        title: 'Module 1: Pythonic Foundations',
        description: 'List comprehensions, dictionary operations, and generator expressions.',
        moduleOrder: 1,
        topics: [
          {
            id: 7001,
            title: '1. Comprehensions & Generator Pipelines',
            slug: 'python-comprehensions',
            summary: 'Write elegant, readable, memory-efficient data transformations with Python expressions.',
            topicOrder: 1,
            completed: false,
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Modern JavaScript ES6+ & Full-Stack Node.js Foundations',
    slug: 'javascript-es6-fullstack',
    languageName: 'JavaScript',
    description: 'Deep dive into closures, prototypal inheritance, Promises, async/await, the Event Loop, and Express APIs.',
    level: 'Beginner to Intermediate',
    estimatedHours: 32,
    moduleCount: 3,
    topicCount: 6,
    progressPercentage: 0,
    modules: [
      {
        id: 801,
        title: 'Module 1: Asynchronous JavaScript',
        description: 'Event Loop, Callbacks, Promises, and async/await syntax.',
        moduleOrder: 1,
        topics: [
          {
            id: 8001,
            title: '1. The Event Loop, Microtasks & Promises',
            slug: 'js-event-loop-promises',
            summary: 'How single-threaded JavaScript handles non-blocking asynchronous operations.',
            topicOrder: 1,
            completed: false,
          }
        ]
      }
    ]
  }
];

export const DEFAULT_LESSONS = {
  1001: {
    id: 1001,
    topicId: 1001,
    topicTitle: 'Introduction to Java & JVM Architecture',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Java Execution Model & First Program',
    codeLanguage: 'java',
    contentMarkdown: `# Welcome to Java 21 Programming

Java is a class-based, object-oriented programming language designed for portability and enterprise reliability.
Its key philosophy is **WORA** (Write Once, Run Anywhere).

### How Java Runs Under the Hood:
1. **Source Code (\`Main.java\`)** is written by the developer.
2. **Compiler (\`javac\`)** compiles source code into platform-independent **Bytecode (\`Main.class\`)**.
3. **Java Virtual Machine (JVM)** interprets or Just-In-Time (JIT) compiles the bytecode into machine native code for the host CPU.

---

### The Fundamental Anatomy:
- \`public class Main\`: In Java, every line of executable code must live inside a class.
- \`public static void main(String[] args)\`: The universal entry point where JVM execution begins.
- \`System.out.println()\`: Standard output stream printing a line of text to the console.`,
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        // Welcome message to console
        System.out.println("Hello, CodePath Academy!");

        int releaseYear = 2026;
        String language = "Java 21 LTS";
        System.out.println("Learning " + language + " in " + releaseYear);
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines the entry class Main with the standard static main method and prints greeting lines to stdout.',
      whyNeeded: 'Java requires an explicit, structured entry point for the JVM ClassLoader and bytecode execution engine.',
      howItWorks: 'The JVM loads Main.class into Method Area memory and invokes main(String[] args) on the initial execution thread.',
      internalMechanics: 'Variables releaseYear and language are allocated inside the stack frame of main. String literals reside in the String Pool.',
      realWorldUsage: 'Entry point of every standalone Java program, Spring Boot runner, and microservice container.',
      commonMistakes: 'Forgetting String[] args or missing public static, which causes NoSuchMethodError: main.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'User navigates to lesson page in CodePath Academy UI',
      step2: 'React renders 3-pane layout with curriculum, code editor, and live notes',
      step3: 'Student reads theory and inspects interactive 6-dimension code breakdown',
      step4: 'Student completes comprehension quiz with instant feedback',
      step5: 'Progress updates in real-time with confetti reward and XP points'
    }),
    realWorldExample: 'Every enterprise banking system and Spring Boot microservice starts with a public static void main method.',
    commonMistakes: 'Mismatched filename: In Java, the public class name must exactly match the file name (Main.java).',
    bestPractices: 'Keep main method minimal. Delegate business orchestration to dedicated service and domain classes.',
    practiceExercise: 'Modify the code snippet to print your name, your favorite programming stack, and your target completion year.',
    analogy: {
      title: '💡 The Universal Musical Sheet & The Orchestra',
      story: 'Imagine a composer writes a piece of sheet music in standard musical notes (Bytecode). It does not matter whether the musician plays a Violin (Windows), a Piano (macOS), or a Flute (Linux)—as long as the musician knows how to read music (the JVM), the song plays identically everywhere without rewriting a single bar! You compose once in Java, compile to musical notation (Bytecode), and let each instrument\'s JVM perform it on their OS.',
      comparisons: [
        { realWorld: 'Composer writing notes', programming: 'Developer writing Main.java' },
        { realWorld: 'Standard Musical Sheet notation', programming: 'Compiled Bytecode (Main.class)' },
        { realWorld: 'Musician who can read sheet music', programming: 'Java Virtual Machine (JVM)' },
        { realWorld: 'Specific Instrument (Violin, Piano, Flute)', programming: 'Operating System (Windows, macOS, Linux)' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 1,
        title: 'JVM Bootstrapping & Class Loading',
        explanation: 'The JVM ClassLoader verifies bytecode integrity and loads the class Main into the Method Area.',
        memoryState: { 'ClassLoader': 'Verified', 'MethodArea': 'Main.class loaded' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 2,
        title: 'Invoking Entry Point main()',
        explanation: 'The JVM execution engine allocates a new stack frame on the main thread for public static void main(String[] args).',
        memoryState: { 'ThreadStack': 'main() frame pushed', 'args': 'String[0]' },
        consoleOutput: ''
      },
      {
        step: 3,
        activeLine: 4,
        title: 'First Greeting Output',
        explanation: 'System.out.println flushes the string literal "Hello, CodePath Academy!" to standard console output.',
        memoryState: { 'ThreadStack': 'main() frame' },
        consoleOutput: 'Hello, CodePath Academy!'
      },
      {
        step: 4,
        activeLine: 6,
        title: 'Primitive Integer Allocation',
        explanation: 'Variable releaseYear is allocated as a 32-bit primitive integer directly inside the current stack frame with value 2026.',
        memoryState: { 'releaseYear': '2026 (int, 4 bytes on Stack)' },
        consoleOutput: 'Hello, CodePath Academy!'
      },
      {
        step: 5,
        activeLine: 7,
        title: 'String Pool Literal Reference',
        explanation: 'String "Java 21 LTS" is stored in the Heap String Pool, and reference variable language points to it.',
        memoryState: { 'releaseYear': '2026', 'language': 'ref -> "Java 21 LTS" (Heap)' },
        consoleOutput: 'Hello, CodePath Academy!'
      },
      {
        step: 6,
        activeLine: 8,
        title: 'Concatenation & Output Completion',
        explanation: 'Java concatenates "Learning " + language + " in " + releaseYear and outputs the final string to stdout.',
        memoryState: { 'releaseYear': '2026', 'language': '"Java 21 LTS"' },
        consoleOutput: 'Hello, CodePath Academy!\nLearning Java 21 LTS in 2026'
      }
    ],
    microCheck: {
      prompt: 'Why can compiled Java bytecode (.class) run on both a Windows PC and a Linux server without recompiling?',
      options: [
        'Because Windows and Linux have identical CPU architectures',
        'Because each OS has its own JVM that translates the same bytecode into host machine instructions',
        'Because Java compiles directly to raw C binary',
        'Because Java requires no compiler at all'
      ],
      correctIndex: 1,
      explanation: 'Spot on! The Java compiler (javac) creates universal bytecode (.class). The specific JVM installed on Windows or Linux converts that universal bytecode into native machine instructions for that specific host operating system.'
    },
    keyTakeaways: [
      'Write Once, Run Anywhere (WORA): Bytecode is platform-agnostic; JVM implementations are platform-specific.',
      'Universal Entry Point: Execution always commences at public static void main(String[] args).',
      'Memory Allocation: Primitives live on the Stack; Objects and String literals live in the Heap.'
    ]
  },
  2001: {
    id: 2001,
    topicId: 2001,
    topicTitle: 'Inversion of Control (IoC) & Dependency Injection',
    courseId: 2,
    courseTitle: 'Spring Boot 3 & Microservices Architecture',
    title: 'Dependency Injection Principles in Spring Boot',
    codeLanguage: 'java',
    contentMarkdown: `# Inversion of Control & Dependency Injection

In traditional programming, an object instantiates its own dependencies using \`new\`:
\`\`\`java
OrderService service = new OrderService(); // Tight coupling!
\`\`\`
In Spring, the **IoC Container (ApplicationContext)** creates, manages, and injects instances (Beans) automatically.

### Why Constructor Injection is Recommended:
1. **Immutability**: Dependencies can be marked \`final\`.
2. **Testability**: Easy to inject mocks in unit tests without Spring context.
3. **Fail-Fast**: Missing dependencies fail at startup rather than during execution.`,
    codeSnippet: `@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String username, String rawPassword) {
        String hashed = passwordEncoder.encode(rawPassword);
        User user = new User(username, hashed);
        return userRepository.save(user);
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines a Spring Service bean with UserRepository and PasswordEncoder automatically injected via constructor.',
      whyNeeded: 'Decouples UserService from specific database implementations and hashing algorithms, allowing easy mocking in unit tests.',
      howItWorks: 'Spring scans the classpath for @Service, registers UserService in ApplicationContext, and autowires required dependencies at startup.',
      internalMechanics: 'The Spring BeanFactory performs reflection and constructor resolution, creating singleton bean instances stored in the concurrent bean map.',
      realWorldUsage: 'Standard enterprise backend service pattern across financial, cloud, and SaaS applications.',
      commonMistakes: 'Using field injection (@Autowired private Repo repo) which makes unit testing harder and prevents immutability.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'Client registers via frontend Auth Modal',
      step2: 'POST /api/auth/register hits AuthController',
      step3: 'AuthController invokes AuthService which calls BCryptPasswordEncoder',
      step4: 'User is persisted to MySQL via UserRepository.save()',
      step5: 'JwtService crafts signed JWT access & refresh tokens returned in 200 OK response'
    }),
    realWorldExample: 'Our very own CodePath Academy AuthService uses Constructor Injection for repositories and password encoders!',
    commonMistakes: 'Using @Autowired directly on fields instead of constructor injection.',
    bestPractices: 'Use Lombok @RequiredArgsConstructor and final fields for clean constructor injection.',
    practiceExercise: 'Create a NotificationService bean and inject it into UserService to send welcome emails upon registration.',
    analogy: {
      title: '💡 The Restaurant Kitchen & The Dedicated Supplier',
      story: 'Imagine a Chef (your UserService) who needs fresh vegetables (UserRepository) and cooking knives (PasswordEncoder). In bad design, the Chef leaves the kitchen, drives to the farm, and digs up the carrots himself (tight coupling with "new"). In Spring Inversion of Control, the Chef simply lists what ingredients they need at the kitchen door (Constructor parameters), and the Restaurant Manager (Spring IoC Container) delivers them ready-to-use every morning!',
      comparisons: [
        { realWorld: 'The Chef cooking meals', programming: 'UserService executing business logic' },
        { realWorld: 'Fresh vegetables & kitchen knives', programming: 'Dependencies (UserRepository, PasswordEncoder)' },
        { realWorld: 'Chef driving to farm with "new"', programming: 'Tight coupling via new UserRepositoryImpl()' },
        { realWorld: 'Restaurant Manager delivering items', programming: 'Spring IoC Container (Dependency Injection)' }
      ]
    },
    microCheck: {
      prompt: 'Why is Constructor Injection preferred over Field Injection (@Autowired on private fields) in Spring Boot?',
      options: [
        'Constructor injection makes fields final and allows easy unit testing with mock objects without starting Spring',
        'Constructor injection compiles to faster C machine code',
        'Field injection does not work in Java 21',
        'Constructor injection is only used for databases'
      ],
      correctIndex: 0,
      explanation: 'Correct! With constructor injection, dependencies can be declared final (immutable), and you can easily pass mock objects directly in simple unit tests without booting the heavy Spring ApplicationContext.'
    }
  },
  1002: {
    id: 1002,
    topicId: 1002,
    topicTitle: 'Primitive Types, Variables & Operators',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Variables, Data Types & Stack Allocation',
    codeLanguage: 'java',
    contentMarkdown: `# Primitive Types & Memory Architecture

Java provides 8 built-in primitive data types categorized into integers, floating points, characters, and booleans:
- **Integers**: \`byte\` (8-bit), \`short\` (16-bit), \`int\` (32-bit), \`long\` (64-bit)
- **Floating-point**: \`float\` (32-bit IEEE 754), \`double\` (64-bit IEEE 754)
- **Logical & Text**: \`boolean\` (true/false), \`char\` (16-bit Unicode)

### Stack vs Heap:
Local primitive variables live entirely inside the **Call Stack Frame**. When the method completes, the frame is popped and memory is immediately reclaimed without Garbage Collection overhead.`,
    codeSnippet: `public class VariablesDemo {
    public static void main(String[] args) {
        int age = 22;               // 32-bit integer on Stack
        double gpa = 3.95;          // 64-bit float on Stack
        boolean isEnrolled = true;  // Boolean flag
        char tier = 'A';            // Unicode character

        System.out.println("Student Profile: Age=" + age + ", GPA=" + gpa);
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Declares primitive variables for age, gpa, enrollment status, and tier, then prints them.',
      whyNeeded: 'Primitives provide raw computational efficiency without object wrapper overhead.',
      howItWorks: 'The compiler translates each declaration into specific bytecode opcodes (e.g. iconst, dload, istore).',
      internalMechanics: 'Memory is allocated directly within the operand stack and local variable table of the main thread stack.',
      realWorldUsage: 'High-frequency computations, financial order book engines, and game loops.',
      commonMistakes: 'Trying to assign a larger type to a smaller type without explicit casting: int x = 3.99 (fails).'
    }),
    realWorldExample: 'Financial exchange engines use primitive long for timestamps and nanosecond latency.',
    commonMistakes: 'Confusing integer division (10 / 4 = 2) with decimal division.',
    bestPractices: 'Use double for scientific math, but BigDecimal for financial currency calculations.',
    practiceExercise: 'Declare a float variable representing a temperature and cast it explicitly to an integer.',
    analogy: {
      title: '💡 The Labeled Tupperware Storage Containers',
      story: 'Think of computer memory like kitchen storage containers. A small jar holds salt (byte/char), a standard canister holds sugar (int), and an extra large container holds flour (double). You cannot pour 5 liters of flour into a tiny salt shaker without it spilling everywhere (overflow/compilation error)! Each variable is simply a container with a custom name label stuck on the outside.',
      comparisons: [
        { realWorld: "Name label stuck on box ('age')", programming: "Variable identifier ('int age')" },
        { realWorld: "Physical shape & size of box", programming: "Data Type (int, double, char)" },
        { realWorld: "Actual contents inside box", programming: "Stored value (22, 3.95)" },
        { realWorld: "Trying to cram a watermelon into a cup", programming: "Type Overflow / Type Incompatibility" }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 3,
        title: 'Stack Allocation for age',
        explanation: 'int age allocates 4 bytes in the local variable array with binary representation of 22.',
        memoryState: { 'age': '22 (4 bytes stack)' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 4,
        title: 'Stack Allocation for gpa',
        explanation: 'double gpa allocates 8 bytes in IEEE 754 format for 3.95.',
        memoryState: { 'age': '22', 'gpa': '3.95 (8 bytes stack)' },
        consoleOutput: ''
      },
      {
        step: 3,
        activeLine: 8,
        title: 'Stdout Print Execution',
        explanation: 'Variables are concatenated and written to standard console output.',
        memoryState: { 'age': '22', 'gpa': '3.95', 'tier': "'A'" },
        consoleOutput: 'Student Profile: Age=22, GPA=3.95'
      }
    ],
    microCheck: {
      prompt: 'Where are primitive variables declared inside a method stored in Java runtime memory?',
      options: [
        'Directly in the current thread stack frame',
        'In the garbage-collected Heap space',
        'On the hard drive swap partition',
        'In browser localStorage'
      ],
      correctIndex: 0,
      explanation: 'Spot on! Local primitives reside directly in the thread stack frame for instant O(1) allocation and zero GC overhead.'
    },
    keyTakeaways: [
      'Primitives are stored directly on the stack, not as pointers.',
      'Java has 8 primitives: byte, short, int, long, float, double, boolean, char.',
      'Integer division truncates decimal fractions automatically.'
    ]
  },
  1003: {
    id: 1003,
    topicId: 1003,
    topicTitle: 'Control Flow: Conditionals & Loops',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Conditional Branching & Loop Iteration',
    codeLanguage: 'java',
    contentMarkdown: `# Control Flow in Java

Control flow statements determine the path of execution through your code based on logical conditions.

### Core Constructs:
- **if / else-if / else**: Boolean condition branching.
- **Enhanced Switch**: Java 21 pattern matching switch expressions.
- **Loops**: \`for\`, \`while\`, \`do-while\`, and enhanced \`for-each\` loops for iterating collections.`,
    codeSnippet: `public class ControlFlowDemo {
    public static void main(String[] args) {
        int score = 88;

        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C");
        }

        for (int i = 1; i <= 3; i++) {
            System.out.println("Lap " + i + " Completed");
        }
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Evaluates a student score and assigns a letter grade, then runs a 3-iteration for-loop.',
      whyNeeded: 'Enables computers to make dynamic decisions based on variable inputs.',
      howItWorks: 'Evaluates boolean comparison opcodes (if_icmpge) and jumps to bytecode branch targets.',
      internalMechanics: 'Loop counter i is stored on stack and incremented via iinc opcode.',
      realWorldUsage: 'Authorization checks, pagination loops, retry logic in network requests.',
      commonMistakes: 'Off-by-one errors in loop boundaries (< vs <=).'
    }),
    realWorldExample: 'E-commerce discount engines checking customer loyalty tiers with if-else logic.',
    commonMistakes: 'Using = (assignment) instead of == (comparison).',
    bestPractices: 'Use break and early returns to avoid deep nesting ("arrow anti-pattern").',
    practiceExercise: 'Write a while loop that counts down from 10 to 1 and prints "Blastoff!".',
    analogy: {
      title: '💡 The Railway Track Switching Junction & The Roundabout',
      story: 'Imagine a train traveling down a track (sequential execution). An "if-else" statement is a railway junction switch: based on whether the signal is green or red (true or false), the train switches to Track B and completely skips Track A. A "loop" is like a roundabout where the train circles until the conductor counts 3 laps, then flips the switch to exit!',
      comparisons: [
        { realWorld: "Train track switch lever", programming: "if (score >= 80)" },
        { realWorld: "Alternative railroad path", programming: "else { ... }" },
        { realWorld: "Running laps around a roundabout", programming: "for (int i = 1; i <= 3; i++)" },
        { realWorld: "Exit gate opening after 3 laps", programming: "Loop termination condition" }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 3,
        title: 'Variable Initialization',
        explanation: 'score is set to 88 on stack.',
        memoryState: { 'score': '88' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 7,
        title: 'Evaluating Branch condition score >= 80',
        explanation: 'Condition 88 >= 80 evaluates to true, taking the Grade B branch.',
        memoryState: { 'score': '88', 'branch': 'Grade: B' },
        consoleOutput: 'Grade: B'
      },
      {
        step: 3,
        activeLine: 13,
        title: 'For-Loop Iteration 1 to 3',
        explanation: 'Loop counter i increments from 1 to 3, printing each lap completion message.',
        memoryState: { 'i': '3 (loop terminates at 4)' },
        consoleOutput: 'Grade: B\nLap 1 Completed\nLap 2 Completed\nLap 3 Completed'
      }
    ],
    microCheck: {
      prompt: 'What happens if a loop condition (like while(true)) never becomes false?',
      options: [
        'An infinite loop occurs, potentially freezing the execution thread',
        'The JVM automatically skips the loop after 100 cycles',
        'The computer reboots immediately',
        'The Java compiler deletes the file'
      ],
      correctIndex: 0,
      explanation: 'Correct! Without an exit condition or break statement, an infinite loop runs indefinitely, consuming 100% of a CPU core until stopped.'
    },
    keyTakeaways: [
      'if-else enables conditional branch execution.',
      'Always guard against off-by-one errors in loop boundaries.',
      'Use break to terminate loops early and continue to skip to the next iteration.'
    ]
  },
  3001: {
    id: 3001,
    topicId: 3001,
    topicTitle: 'React Components & useState Hook',
    courseId: 3,
    courseTitle: 'React 18 & Frontend Architecture: From Foundations to Fullstack',
    title: 'State Management & Reactive UI with useState',
    codeLanguage: 'javascript',
    contentMarkdown: `# React Components & useState Hook

In React, components are pure functions that map state and props to user interfaces.
When state changes, React automatically re-executes the component and updates the DOM!

### Rules of State:
1. **Never mutate state directly**: Always call the setter function (e.g., \`setCount(count + 1)\`).
2. **State is Preserved across Renders**: React holds the state in its internal Fiber tree.
3. **Re-rendering is Batched**: React 18 batches multiple state updates automatically for high performance.`,
    codeSnippet: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-white rounded-xl border">
      <p className="text-sm font-bold">Current Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs"
      >
        Increment
      </button>
    </div>
  );
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Initializes a reactive counter starting at 0 and increments it on button click.',
      whyNeeded: 'Declarative state eliminates manual document.getElementById() and DOM manipulation.',
      howItWorks: 'Calling setCount enqueues a re-render. React diffs the Virtual DOM and updates real DOM.',
      internalMechanics: 'State is attached to the component Fiber node in a memoized state linked list.',
      realWorldUsage: 'Shopping cart item counts, search input fields, modals, and tab switches.',
      commonMistakes: 'Doing count = count + 1 directly, which will not trigger a component re-render.'
    }),
    realWorldExample: 'Every interactive button, shopping cart counter, and modal toggle in modern web apps uses useState.',
    commonMistakes: 'Mutating state arrays or objects directly instead of creating shallow copies.',
    bestPractices: 'Keep state as local as possible. Pass state down through props or Context only when needed.',
    practiceExercise: 'Add a Decrement and a Reset button to the Counter component.',
    analogy: {
      title: '💡 The Digital LED Stadium Scoreboard & The Referee Clicker',
      story: 'In traditional HTML/JS, updating a number on screen was like climbing a ladder with a paintbrush to paint over a wooden scoreboard. In React, the component is a high-tech digital LED scoreboard, and useState is the clicker in the referee hand. When the referee presses the clicker button, the electronic scoreboard instantly and automatically updates only the altered digit!',
      comparisons: [
        { realWorld: "Digital LED Scoreboard", programming: "React Component UI" },
        { realWorld: "Referee handheld clicker", programming: "useState setter function setCount()" },
        { realWorld: "Number displayed on board", programming: "Current state value 'count'" },
        { realWorld: "Board auto-updating in millisecond", programming: "Virtual DOM reconciliation & re-render" }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 4,
        title: 'Initial Mount & State Hookup',
        explanation: 'React initializes Fiber node and sets count state to 0.',
        memoryState: { 'count': '0', 'rendered': 'Current Count: 0' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 10,
        title: 'User Clicks Increment Button',
        explanation: 'onClick fires, invoking setCount(0 + 1). React schedules re-render.',
        memoryState: { 'count': '1 (pending update)' },
        consoleOutput: ''
      },
      {
        step: 3,
        activeLine: 7,
        title: 'Re-render & Virtual DOM Diff',
        explanation: 'Component executes with count = 1. Only the text node "1" is updated in real DOM.',
        memoryState: { 'count': '1', 'rendered': 'Current Count: 1' },
        consoleOutput: 'Render completed. DOM updated: count = 1'
      }
    ],
    microCheck: {
      prompt: 'What happens if you modify a state variable directly (e.g., count = 5) instead of calling setCount(5)?',
      options: [
        'The variable value changes in memory, but React does NOT re-render the UI on screen',
        'React immediately updates the DOM and prints an error',
        'The browser tab crashes',
        'The page reloads completely'
      ],
      correctIndex: 0,
      explanation: 'Spot on! React only knows to re-render when you invoke the setter function (setCount). Direct mutations bypass React change detection entirely.'
    },
    keyTakeaways: [
      'useState provides reactive state that triggers UI re-renders.',
      'Always treat React state as immutable—use setter functions.',
      'React batches updates for high rendering performance.'
    ]
  },
  4001: {
    id: 4001,
    topicId: 4001,
    topicTitle: 'SQL SELECT, WHERE & ORDER BY',
    courseId: 4,
    courseTitle: 'SQL & Relational Database Architecture: From SELECT to Optimization',
    title: 'Relational Querying & Data Projection',
    codeLanguage: 'sql',
    contentMarkdown: `# SQL Querying Fundamentals

SQL (Structured Query Language) is the declarative language used to manage and query relational databases.

### The Standard Query Anatomy:
- **SELECT**: Columns to project in the result set.
- **FROM**: The source table(s) to query.
- **WHERE**: Filtering condition (evaluates row by row).
- **ORDER BY**: Sort order (\`ASC\` or \`DESC\`).
- **LIMIT**: Maximum number of rows returned.`,
    codeSnippet: `SELECT 
    student_id, 
    full_name, 
    gpa, 
    major 
FROM students 
WHERE gpa >= 3.5 AND major = 'Computer Science' 
ORDER BY gpa DESC 
LIMIT 10;`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Queries top 10 Computer Science students with GPA >= 3.5 sorted from highest to lowest.',
      whyNeeded: 'Retrieves targeted subsets of records without loading entire multi-gigabyte tables into memory.',
      howItWorks: 'Storage engine reads table index (or scans table), evaluates WHERE filter, sorts rows, and returns projected columns.',
      internalMechanics: 'The query optimizer selects the best B-Tree index and generates an execution plan.',
      realWorldUsage: 'Leaderboards, user search queries, filtered reporting dashboards.',
      commonMistakes: 'Using SELECT * in production, which wastes network bandwidth and prevents index-only scans.'
    }),
    realWorldExample: 'LinkedIn searching candidates by job title, years of experience, and location.',
    commonMistakes: 'Forgetting quotation marks around string literals in WHERE clauses.',
    bestPractices: 'Avoid SELECT * in production; index columns frequently used in WHERE and ORDER BY clauses.',
    practiceExercise: 'Write a query to find all students enrolled after 2024 sorted alphabetically by full_name.',
    analogy: {
      title: '💡 The University Filing Cabinet & The Highlighting Filter',
      story: 'Imagine an office assistant standing in front of a giant filing cabinet with 10,000 student folders (the table). "SELECT" is telling the assistant which specific sheets of paper to pull out. "WHERE" is the screening checklist ("Only folders with GPA >= 3.5"). "ORDER BY" arranges the pulled folders from highest to lowest score on the desk, and "LIMIT 10" takes the top 10 folders off the stack!',
      comparisons: [
        { realWorld: "Filing Cabinet", programming: "Table ('FROM students')" },
        { realWorld: "Which forms to photocopy", programming: "Column Projection ('SELECT student_id, full_name')" },
        { realWorld: "Screening checklist criteria", programming: "Filter Condition ('WHERE gpa >= 3.5')" },
        { realWorld: "Sorting highest to lowest", programming: "Sorting Clause ('ORDER BY gpa DESC')" }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 5,
        title: 'FROM Clause Evaluation',
        explanation: 'Database identifies the source table students and checks schema permissions.',
        memoryState: { 'Table': 'students (10,000 records)' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 6,
        title: 'WHERE Filtering via B-Tree Index',
        explanation: 'Rows not meeting (gpa >= 3.5 AND major = "Computer Science") are filtered out.',
        memoryState: { 'Filtered': '142 candidate rows' },
        consoleOutput: ''
      },
      {
        step: 3,
        activeLine: 7,
        title: 'ORDER BY & LIMIT 10',
        explanation: 'Top 10 rows with highest GPA are selected and projected to client.',
        memoryState: { 'Result': '10 rows returned' },
        consoleOutput: '+----+----------------+------+------------------+\n| id | full_name      | gpa  | major            |\n+----+----------------+------+------------------+\n|  1 | Alex Developer | 3.98 | Computer Science |\n|  2 | Maria Chen     | 3.95 | Computer Science |\n+----+----------------+------+------------------+\n10 rows in set (0.01 sec)'
      }
    ],
    microCheck: {
      prompt: 'In what logical order does an SQL engine process a query?',
      options: [
        'FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT',
        'SELECT -> FROM -> WHERE -> ORDER BY',
        'LIMIT -> SELECT -> WHERE -> FROM',
        'ORDER BY -> SELECT -> FROM -> WHERE'
      ],
      correctIndex: 0,
      explanation: 'Spot on! The database first locates the table (FROM), filters rows (WHERE), selects columns (SELECT), sorts results (ORDER BY), and finally limits the output (LIMIT).'
    },
    keyTakeaways: [
      'Logical order of execution begins at FROM and WHERE, before SELECT.',
      'Always specify explicit columns instead of SELECT * in production.',
      'Index columns that appear in WHERE and ORDER BY for high query performance.'
    ]
  }
};

// Universal Helper: Find topic metadata anywhere in curriculum
export function findTopicMetadata(targetId) {
  const numId = Number(targetId);
  const strId = String(targetId).toLowerCase();

  for (const course of DEFAULT_COURSES) {
    for (const mod of (course.modules || [])) {
      for (const top of (mod.topics || [])) {
        if (top.id === numId || top.slug === strId || top.lessonId === numId) {
          return {
            courseId: course.id,
            courseTitle: course.title,
            moduleId: mod.id,
            moduleTitle: mod.title,
            topicId: top.id,
            topicTitle: top.title,
            topicSlug: top.slug,
            summary: top.summary || 'Interactive curriculum topic',
            languageName: course.languageName || 'Java'
          };
        }
      }
    }
  }
  return null;
}

// Universal Lesson Provider: Returns handcrafted lesson or dynamically generates customized topic lesson
export function getOrGenerateLesson(targetId) {
  if (DEFAULT_LESSONS[targetId]) {
    return DEFAULT_LESSONS[targetId];
  }

  const meta = findTopicMetadata(targetId);
  if (!meta) {
    return DEFAULT_LESSONS[1001]; // Default fallback
  }

  const lang = (meta.languageName || 'java').toLowerCase();
  const cleanTitle = meta.topicTitle.replace(/^\d+\.\s*/, '');

  return {
    id: meta.topicId,
    topicId: meta.topicId,
    topicTitle: meta.topicTitle,
    courseId: meta.courseId,
    courseTitle: meta.courseTitle,
    moduleTitle: meta.moduleTitle,
    title: cleanTitle,
    codeLanguage: lang === 'c++' ? 'cpp' : lang,
    contentMarkdown: `# ${cleanTitle}

Welcome to this dedicated module on **${cleanTitle}** in ${meta.courseTitle}.

### Core Concept:
${meta.summary}

### Key Learning Objectives:
1. Understand the core principles and syntax requirements.
2. Master runtime memory allocation and execution flow.
3. Write clean, production-ready, maintainable code adhering to industry best practices.`,
    codeSnippet: lang === 'python'
      ? `# ${cleanTitle} in Python\ndef main():\n    print("Mastering ${cleanTitle}")\n    items = [1, 2, 3, 4, 5]\n    print("Processed:", [x * 2 for x in items])\n\nif __name__ == '__main__':\n    main()`
      : lang === 'sql'
      ? `-- ${cleanTitle} in SQL\nSELECT id, name, category, status \nFROM records \nWHERE status = 'ACTIVE' \nORDER BY id DESC \nLIMIT 5;`
      : lang === 'javascript'
      ? `// ${cleanTitle} in JavaScript\nfunction executeTopic() {\n  const message = "Mastering ${cleanTitle}";\n  console.log(message);\n  return { success: true, timestamp: Date.now() };\n}\n\nexecuteTopic();`
      : `// ${cleanTitle} in ${meta.languageName}\npublic class TopicDemo {\n    public static void main(String[] args) {\n        System.out.println("Mastering ${cleanTitle}");\n        int status = 200;\n        System.out.println("Status Code: " + status);\n    }\n}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: `Implements the core logic for ${cleanTitle} following language idioms.`,
      whyNeeded: `Fundamental building block for writing reliable applications in ${meta.languageName}.`,
      howItWorks: `Executes instructions sequentially and manages state in runtime memory.`,
      internalMechanics: `Allocates stack memory frames and tracks variable bindings.`,
      realWorldUsage: `Applied across microservices, web apps, and enterprise systems.`,
      commonMistakes: `Check null values and boundary conditions.`
    }),
    analogy: {
      title: `💡 Real-World Metaphor for ${cleanTitle}`,
      story: `Think of ${cleanTitle} like a well-organized workspace tool: it solves a specific problem cleanly without unnecessary moving parts, letting you assemble larger systems with total confidence.`,
      comparisons: [
        { realWorld: "The Specialized Tool", programming: `${cleanTitle} syntax construct` },
        { realWorld: "The Final Assembled Product", programming: "The running software application" }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 1,
        title: 'Initialization & Loading',
        explanation: `Runtime loads definitions for ${cleanTitle}.`,
        memoryState: { 'status': 'Initialized' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 3,
        title: 'Execution & Output',
        explanation: `Executes instructions and outputs result to console.`,
        memoryState: { 'status': 'Active' },
        consoleOutput: `Mastering ${cleanTitle}`
      }
    ],
    microCheck: {
      prompt: `What is the primary benefit of mastering ${cleanTitle}?`,
      options: [
        `It provides modularity, clarity, and predictable execution in ${meta.languageName}`,
        'It makes code run on hardware without a CPU',
        'It is only used for temporary drafts',
        'It eliminates the need for software testing'
      ],
      correctIndex: 0,
      explanation: `Spot on! Mastering ${cleanTitle} is essential for writing clean, efficient, and maintainable software.`
    },
    keyTakeaways: [
      `1. Master the fundamentals of ${cleanTitle} before moving to advanced frameworks.`,
      '2. Write unit tests to verify behavior and guard against regressions.',
      '3. Follow clean code and industry best practices.'
    ],
    quizId: meta.topicId
  };
}

export const DEFAULT_QUIZZES = {
  1001: {
    id: 1001,
    topicId: 1001,
    title: 'Java Architecture & Syntax Assessment',
    difficulty: 'BEGINNER',
    questions: [
      {
        id: 1,
        prompt: 'What is the primary role of the Java Virtual Machine (JVM)?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'JVM Architecture',
        hint: 'Think about WORA (Write Once, Run Anywhere): Does the JVM execute human-readable source code or compiled bytecode?',
        options: [
          'It compiles Java source files (.java) directly to machine code',
          'It executes platform-independent bytecode (.class) on the host operating system',
          'It acts as a code formatter and style linter',
          'It is only used for debugging memory leaks'
        ],
        correctAnswers: ['It executes platform-independent bytecode (.class) on the host operating system'],
        explanation: 'The JVM provides Write Once, Run Anywhere (WORA) capability by interpreting and JIT-compiling Java bytecode (.class) on any operating system.',
        optionJustifications: [
          {
            option: 'It compiles Java source files (.java) directly to machine code',
            isCorrect: false,
            reason: 'This is the job of the compiler (javac), which produces bytecode (.class), not native machine code.'
          },
          {
            option: 'It executes platform-independent bytecode (.class) on the host operating system',
            isCorrect: true,
            reason: 'The JVM interprets or JIT-compiles bytecode into the host CPU\'s native instructions, enabling portability across Windows, Mac, and Linux.'
          },
          {
            option: 'It acts as a code formatter and style linter',
            isCorrect: false,
            reason: 'Linters and formatters (like Checkstyle or Prettier) do this; the JVM is an execution engine.'
          },
          {
            option: 'It is only used for debugging memory leaks',
            isCorrect: false,
            reason: 'The JVM is the mandatory runtime environment for all Java programs, not just a debugger.'
          }
        ]
      },
      {
        id: 2,
        prompt: 'What is the console output of this Java program?',
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        int y = 4;
        System.out.println(x / y);
    }
}`,
        type: 'CODE_OUTPUT',
        conceptTag: 'Integer Division',
        hint: 'Both x and y are declared as primitive int! What happens to fractional numbers when dividing integers in Java?',
        options: ['2.5', '2', '2.0', 'Compilation Error'],
        correctAnswers: ['2'],
        explanation: 'In Java, integer division truncates decimal fractions. 10 / 4 evaluates to 2. To get 2.5, at least one operand must be a double: (double) x / y.',
        optionJustifications: [
          {
            option: '2.5',
            isCorrect: false,
            reason: 'Common trap! In Java, dividing two integers always produces an integer, discarding the decimal fraction.'
          },
          {
            option: '2',
            isCorrect: true,
            reason: 'Integer division strictly truncates toward zero: 10 / 4 = 2.5 -> truncated to 2.'
          },
          {
            option: '2.0',
            isCorrect: false,
            reason: 'Since both operands are int, the result type is int (2), not double (2.0).'
          },
          {
            option: 'Compilation Error',
            isCorrect: false,
            reason: 'Dividing two integer variables is completely valid Java syntax and compiles without error.'
          }
        ]
      }
    ]
  }
};

// Universal Quiz Provider
export function getOrGenerateQuiz(targetId) {
  if (DEFAULT_QUIZZES[targetId]) {
    return DEFAULT_QUIZZES[targetId];
  }

  const meta = findTopicMetadata(targetId);
  const title = meta ? meta.topicTitle.replace(/^\d+\.\s*/, '') : 'Knowledge Assessment';

  return {
    id: Number(targetId) || 1001,
    topicId: Number(targetId) || 1001,
    title: `${title} Assessment`,
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: `Which principle is fundamental when working with ${title}?`,
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Core Concepts',
        hint: 'Consider how memory safety, clean architecture, and modularity ensure robust software.',
        options: [
          'Ensuring proper encapsulation, type safety, and clean separation of concerns',
          'Hardcoding configuration values inside business logic functions',
          'Ignoring compiler warnings and exception handling',
          'Disabling all runtime type checks'
        ],
        correctAnswers: ['Ensuring proper encapsulation, type safety, and clean separation of concerns'],
        explanation: 'Proper encapsulation and type safety are critical principles for maintainable, production-ready engineering.',
        optionJustifications: [
          {
            option: 'Ensuring proper encapsulation, type safety, and clean separation of concerns',
            isCorrect: true,
            reason: 'Correct: Clean architecture promotes testability, reliability, and long-term maintainability.'
          },
          {
            option: 'Hardcoding configuration values inside business logic functions',
            isCorrect: false,
            reason: 'Antipattern: Configuration should be externalized in environment variables or properties.'
          },
          {
            option: 'Ignoring compiler warnings and exception handling',
            isCorrect: false,
            reason: 'Dangerous: Compiler warnings often highlight potential runtime bugs or memory leaks.'
          },
          {
            option: 'Disabling all runtime type checks',
            isCorrect: false,
            reason: 'Incorrect: Runtime type checks protect against class cast exceptions.'
          }
        ]
      },
      {
        id: 2,
        prompt: `What is the expected outcome of applying this ${title} pattern correctly?`,
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Best Practices',
        hint: 'Think about maintainability, testability, and runtime predictability.',
        options: [
          'High testability, predictable state transitions, and lower maintenance costs',
          'Uncontrolled memory leaks and random crashes',
          'Complete inability to debug the application',
          'Slower network speeds on the client machine'
        ],
        correctAnswers: ['High testability, predictable state transitions, and lower maintenance costs'],
        explanation: 'Applying industry standard design patterns ensures code is easy to test, debug, and scale.',
        optionJustifications: [
          {
            option: 'High testability, predictable state transitions, and lower maintenance costs',
            isCorrect: true,
            reason: 'Accurate: Good design patterns reduce cognitive load and simplify automated testing.'
          },
          {
            option: 'Uncontrolled memory leaks and random crashes',
            isCorrect: false,
            reason: 'Incorrect: Proper patterns prevent memory leaks rather than causing them.'
          },
          {
            option: 'Complete inability to debug the application',
            isCorrect: false,
            reason: 'Incorrect: Clear patterns enhance observability and debuggability.'
          },
          {
            option: 'Slower network speeds on the client machine',
            isCorrect: false,
            reason: 'Irrelevant: Code patterns do not degrade physical network speed.'
          }
        ]
      }
    ]
  };
}

export const DEFAULT_DASHBOARD = {
  totalCoursesEnrolled: 4,
  topicsCompleted: 3,
  averageQuizScore: 92,
  codingProblemsSolved: 2,
  currentStreak: 4,
  learningHours: 8.5,
  currentLevel: 'Junior Developer',
  totalXp: 380,
  nextLevelXp: 500,
  resumeTopic: {
    topicId: 1003,
    topicTitle: '3. Control Flow: Conditionals & Loops',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    lessonId: 1001
  },
  weeklyActivity: [
    { day: 'Mon', xp: 60, lessons: 1 },
    { day: 'Tue', xp: 120, lessons: 2 },
    { day: 'Wed', xp: 50, lessons: 1 },
    { day: 'Thu', xp: 90, lessons: 1 },
    { day: 'Fri', xp: 140, lessons: 2 },
    { day: 'Sat', xp: 80, lessons: 1 },
    { day: 'Sun', xp: 40, lessons: 1 }
  ],
  skillDistribution: [
    { subject: 'Java Core', proficiency: 75 },
    { subject: 'Spring Boot', proficiency: 60 },
    { subject: 'React Frontend', proficiency: 80 },
    { subject: 'SQL / Databases', proficiency: 70 },
    { subject: 'Data Structures', proficiency: 65 },
    { subject: 'DevOps / Docker', proficiency: 50 }
  ],
  languageProgress: [
    { language: 'Java 21', progressPercentage: 25, color: '#f97316' },
    { language: 'Spring Boot 3', progressPercentage: 15, color: '#16a34a' },
    { language: 'React 18', progressPercentage: 30, color: '#06b6d4' },
    { language: 'SQL / MySQL', progressPercentage: 20, color: '#3b82f6' }
  ],
  recentAchievements: [
    { title: 'First Lesson', xpReward: 100 },
    { title: 'Code Warrior', xpReward: 150 },
    { title: 'Bug Hunter', xpReward: 80 }
  ]
};
