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
    practiceExercise: 'Modify the code snippet to print your name, your favorite programming stack, and your target completion year.'
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
    practiceExercise: 'Create a NotificationService bean and inject it into UserService to send welcome emails upon registration.'
  }
};

export const DEFAULT_QUIZZES = {
  1001: {
    id: 1001,
    topicId: 1001,
    title: 'Java Architecture & Syntax Assessment',
    difficulty: 'BEGINNER',
    questions: [
      {
        id: 1,
        prompt: 'What is the role of the Java Virtual Machine (JVM)?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        options: [
          'It compiles Java source files (.java) directly to machine code',
          'It executes platform-independent bytecode (.class) on the host operating system',
          'It acts as a code formatter and style linter',
          'It is only used for debugging memory leaks'
        ],
        correctAnswers: ['It executes platform-independent bytecode (.class) on the host operating system'],
        explanation: 'The JVM provides Write Once, Run Anywhere (WORA) capability by interpreting and JIT-compiling Java bytecode (.class) on any operating system.'
      },
      {
        id: 2,
        prompt: 'What happens when you run this Java program?',
        codeSnippet: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        int y = 4;
        System.out.println(x / y);
    }
}`,
        type: 'CODE_OUTPUT',
        options: ['2.5', '2', '2.0', 'Compilation Error'],
        correctAnswers: ['2'],
        explanation: 'In Java, integer division truncates decimal fractions. 10 / 4 evaluates to 2. To get 2.5, at least one operand must be a double: (double) x / y.'
      }
    ]
  }
};

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
