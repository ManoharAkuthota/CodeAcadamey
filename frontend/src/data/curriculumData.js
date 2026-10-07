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
          },
          {
            id: 4005,
            title: '5. Query Optimization & Indexing Strategies',
            slug: 'sql-query-optimization',
            summary: 'Composite indexes, covering indexes, and analyzing slow query logs.',
            topicOrder: 2,
            completed: false,
          }
        ]
      },
      {
        id: 404,
        title: 'Module 4: Transactions, ACID Safety & Schema Design',
        description: 'ACID guarantees, transaction isolation levels, and database normalization.',
        moduleOrder: 4,
        topics: [
          {
            id: 4006,
            title: '6. ACID Transactions & Concurrency Locks',
            slug: 'sql-acid-transactions',
            summary: 'Commit, rollback, savepoints, deadlocks, and isolation levels (Read Committed, Serializable).',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 4007,
            title: '7. Relational Schema Normalization (1NF to 3NF)',
            slug: 'sql-schema-normalization',
            summary: 'Eliminate data redundancy with foreign keys and Boyce-Codd normal forms.',
            topicOrder: 2,
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
    estimatedHours: 35,
    moduleCount: 5,
    topicCount: 15,
    progressPercentage: 0,
    modules: [
      {
        id: 501,
        title: 'Module 1: C Fundamentals & Memory Anatomy',
        description: 'Compilation model with gcc, standard I/O, primitives, and memory sizes.',
        moduleOrder: 1,
        topics: [
          {
            id: 5001,
            title: '1. Introduction to C & GCC Compilation Pipeline',
            slug: 'c-intro-compilation',
            summary: 'Preprocessing, compilation, assembly, and linking phases in C programs.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 5002,
            title: '2. Primitive Data Types, Memory Sizes & sizeof',
            slug: 'c-variables-types',
            summary: 'Inspect byte sizes of char, short, int, long, float, and double in RAM.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 5003,
            title: '3. Arithmetic, Logical & Bitwise Operators',
            slug: 'c-operators-bitwise',
            summary: 'Bit shifting (<<, >>), masks (&, |, ^), and low-level flag manipulations.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 502,
        title: 'Module 2: Control Flow & Modular Functions',
        description: 'Conditionals, loops, function call stack frames, and recursion.',
        moduleOrder: 2,
        topics: [
          {
            id: 5004,
            title: '4. Conditionals & Switch Branching',
            slug: 'c-control-flow',
            summary: 'if-else branching, switch jump tables, and boolean logic in C.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 5005,
            title: '5. Iteration Loops: for, while & do-while',
            slug: 'c-loops',
            summary: 'Loop mechanics, termination conditions, break and continue flow control.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 5006,
            title: '6. Functions, Stack Frames & Scope',
            slug: 'c-functions-stack',
            summary: 'Call stack frames, pass-by-value semantics, and local variable lifecycles.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 503,
        title: 'Module 3: Arrays, Strings & Data Structures',
        description: 'Contiguous memory buffers, null-terminated strings, and custom structs.',
        moduleOrder: 3,
        topics: [
          {
            id: 5007,
            title: '7. Contiguous Arrays & Buffer Addressing',
            slug: 'c-arrays-buffers',
            summary: 'Contiguous RAM array layout, multi-dimensional matrices, and boundary safety.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 5008,
            title: '8. Strings & Null-Terminating Characters (\\0)',
            slug: 'c-strings-null-terminator',
            summary: 'String handling with string.h, strlen, strcpy, and avoiding buffer overflows.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 5009,
            title: '9. Custom Structures, Memory Alignment & Padding',
            slug: 'c-structs-padding',
            summary: 'struct declarations, memory alignment, padding bytes, and union types.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 504,
        title: 'Module 4: Pointers & Dynamic Memory Management',
        description: 'Direct memory addressing, dereferencing, malloc, calloc, and free.',
        moduleOrder: 4,
        topics: [
          {
            id: 5010,
            title: '10. Pointers, Memory Addresses & Dereferencing',
            slug: 'c-pointers-basics',
            summary: 'Directly address RAM memory cells using pointers and dereference operations.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 5011,
            title: '11. Pointer Arithmetic & Double Pointers (**ptr)',
            slug: 'c-pointer-arithmetic',
            summary: 'Incrementing pointers across data type strides and managing 2D pointer arrays.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 5012,
            title: '12. Dynamic Memory: malloc, calloc & free',
            slug: 'c-dynamic-memory-malloc',
            summary: 'Heap memory allocation, checking NULL pointers, and preventing memory leaks.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 505,
        title: 'Module 5: File I/O & Systems Programming',
        description: 'File streams, binary I/O, preprocessor directives, and system calls.',
        moduleOrder: 5,
        topics: [
          {
            id: 5013,
            title: '13. File Streams: fopen, fread, fwrite & fclose',
            slug: 'c-file-handling',
            summary: 'Reading and writing text and binary files using standard I/O streams.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 5014,
            title: '14. Preprocessor Directives, Macros & Header Guards',
            slug: 'c-preprocessor-macros',
            summary: '#define macros, conditional compilation (#ifdef), and header file structuring.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 5015,
            title: '15. Advanced C: Function Pointers & System Calls',
            slug: 'c-function-pointers-syscalls',
            summary: 'Callbacks via function pointers and executing low-level UNIX POSIX system calls.',
            topicOrder: 3,
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
    estimatedHours: 40,
    moduleCount: 5,
    topicCount: 15,
    progressPercentage: 0,
    modules: [
      {
        id: 601,
        title: 'Module 1: C++ Foundations & Type References',
        description: 'C++ syntax, pass-by-reference, function overloading, and namespaces.',
        moduleOrder: 1,
        topics: [
          {
            id: 6001,
            title: '1. C++ Syntax, Streams (cin/cout) & Namespaces',
            slug: 'cpp-syntax-namespaces',
            summary: 'Explore std namespace, iostream buffering, and type-safe I/O in modern C++.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 6002,
            title: '2. Pass-by-Reference (&) & Const Correctness',
            slug: 'cpp-references-const',
            summary: 'Eliminate copy overhead using references and enforce immutability with const.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 6003,
            title: '3. Function Overloading & Default Arguments',
            slug: 'cpp-function-overloading',
            summary: 'Compile-time polymorphism with overloaded functions and default parameters.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 602,
        title: 'Module 2: Object-Oriented Programming & Classes',
        description: 'Encapsulation, constructors, destructors, and member methods.',
        moduleOrder: 2,
        topics: [
          {
            id: 6004,
            title: '4. Classes, Objects & Private Encapsulation',
            slug: 'cpp-classes-encapsulation',
            summary: 'Define blueprints, access specifiers (public, private), and member initializers.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 6005,
            title: '5. Constructors, Destructors & Member Initialization',
            slug: 'cpp-constructors-destructors',
            summary: 'Manage object lifecycles, initializer lists, and deterministic cleanup.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 6006,
            title: '6. Deep Copy, Copy Constructors & Rule of Three',
            slug: 'cpp-copy-constructors',
            summary: 'Shallow vs deep copying, copy assignment operators, and resource ownership.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 603,
        title: 'Module 3: Inheritance & Runtime Polymorphism',
        description: 'Class hierarchies, virtual functions, and abstract interfaces.',
        moduleOrder: 3,
        topics: [
          {
            id: 6007,
            title: '7. Class Inheritance & Base Class Access',
            slug: 'cpp-inheritance',
            summary: 'Public and protected inheritance, calling base constructors, and code reuse.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 6008,
            title: '8. Virtual Functions, VTables & Dynamic Dispatch',
            slug: 'cpp-virtual-functions',
            summary: 'Runtime polymorphism via virtual keyword, VTable pointers, and method overriding.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 6009,
            title: '9. Pure Virtual Functions & Abstract Interfaces',
            slug: 'cpp-abstract-interfaces',
            summary: 'Define pure virtual methods (= 0) and establish contract interfaces in C++.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 604,
        title: 'Module 4: RAII & Smart Pointers (Memory Safety)',
        description: 'Resource Acquisition Is Initialization, unique_ptr, shared_ptr, and move semantics.',
        moduleOrder: 4,
        topics: [
          {
            id: 6010,
            title: '10. RAII Pattern & Deterministic Cleanup',
            slug: 'cpp-raii-pattern',
            summary: 'Tie resource allocation to object lifetime to eliminate leaks permanently.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 6011,
            title: '11. std::unique_ptr & Exclusive Ownership',
            slug: 'cpp-unique-ptr',
            summary: 'Zero-overhead smart pointers with move-only ownership and auto destruction.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 6012,
            title: '12. std::shared_ptr, std::weak_ptr & Reference Counting',
            slug: 'cpp-shared-weak-ptr',
            summary: 'Shared ownership with atomic reference counting and breaking circular refs.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 605,
        title: 'Module 5: Standard Template Library (STL) & Templates',
        description: 'Generic programming, containers, iterators, and algorithms.',
        moduleOrder: 5,
        topics: [
          {
            id: 6013,
            title: '13. Function & Class Templates',
            slug: 'cpp-templates-generic',
            summary: 'Write type-independent generic classes and functions with template<typename T>.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 6014,
            title: '14. STL Containers: vector, map & unordered_map',
            slug: 'cpp-stl-containers',
            summary: 'Dynamic arrays, Red-Black trees (std::map), and hash tables (std::unordered_map).',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 6015,
            title: '15. STL Algorithms (std::sort, find) & Lambdas',
            slug: 'cpp-stl-algorithms-lambdas',
            summary: 'Modern high-performance algorithms with modern C++ anonymous lambda closures.',
            topicOrder: 3,
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
    estimatedHours: 35,
    moduleCount: 5,
    topicCount: 15,
    progressPercentage: 0,
    modules: [
      {
        id: 701,
        title: 'Module 1: Pythonic Syntax & Core Types',
        description: 'Python interpreter, variables, dynamic typing, strings, and operators.',
        moduleOrder: 1,
        topics: [
          {
            id: 7001,
            title: '1. Python Execution Model & Clean Syntax',
            slug: 'python-intro-syntax',
            summary: 'How CPython bytecode works, indentation rules, and interactive REPL.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 7002,
            title: '2. Dynamic Variables & Type Casting',
            slug: 'python-variables-types',
            summary: 'Duck typing, integers, floats, booleans, and type casting functions (int(), str()).',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 7003,
            title: '3. Strings, Slicing & F-Strings Formatting',
            slug: 'python-strings-formatting',
            summary: 'String methods (.strip(), .split()), slicing ([start:stop:step]), and f-string interpolation.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 702,
        title: 'Module 2: Control Flow & Modular Functions',
        description: 'Conditionals, loops, functions, default arguments, and lambda expressions.',
        moduleOrder: 2,
        topics: [
          {
            id: 7004,
            title: '4. Conditionals & Logical Operators (if-elif-else)',
            slug: 'python-control-flow',
            summary: 'Boolean logic, truthy/falsy values, and conditional branching.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 7005,
            title: '5. Iteration: for Loops, while Loops & range()',
            slug: 'python-loops',
            summary: 'Iterating sequences with for-in, enumerate(), zip(), break, and continue.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 7006,
            title: '6. Functions, *args, **kwargs & Lambdas',
            slug: 'python-functions-args',
            summary: 'Defining modular functions, arbitrary arguments, and anonymous lambda functions.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 703,
        title: 'Module 3: Core Data Structures (Lists, Dicts, Sets)',
        description: 'In-depth mastery of Python collections and computational complexity.',
        moduleOrder: 3,
        topics: [
          {
            id: 7007,
            title: '7. Lists: Indexing, Slicing & Methods',
            slug: 'python-lists',
            summary: 'Dynamic arrays in Python, .append(), .pop(), .sort(), and reference copies.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 7008,
            title: '8. Tuples & Unpacking',
            slug: 'python-tuples',
            summary: 'Immutable sequences, tuple unpacking, and using tuples as dictionary keys.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 7009,
            title: '9. Dictionaries & Hash Mapping',
            slug: 'python-dictionaries',
            summary: 'Key-value mapping with O(1) hash lookups, .get(), .items(), and nested dictionaries.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 704,
        title: 'Module 4: Advanced Python Patterns & Metaprogramming',
        description: 'Comprehensions, generators, decorators, and context managers.',
        moduleOrder: 4,
        topics: [
          {
            id: 7010,
            title: '10. List & Dictionary Comprehensions',
            slug: 'python-comprehensions',
            summary: 'Write elegant, readable, memory-efficient data transformations in one line.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 7011,
            title: '11. Generator Functions & yield Pipelines',
            slug: 'python-generators',
            summary: 'Lazy evaluation, stream processing massive files without memory exhaustion.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 7012,
            title: '12. Decorators & Higher-Order Wrappers',
            slug: 'python-decorators',
            summary: 'Wrap functions with @decorator syntax for logging, authentication, and caching.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 705,
        title: 'Module 5: OOP, REST APIs & File Handling',
        description: 'Classes, inheritance, context managers, and calling REST APIs.',
        moduleOrder: 5,
        topics: [
          {
            id: 7013,
            title: '13. Classes, __init__ & Object-Oriented Design',
            slug: 'python-oop',
            summary: 'Define classes, self binding, dunder magic methods (__repr__, __str__), and inheritance.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 7014,
            title: '14. File I/O & Context Managers (with open)',
            slug: 'python-file-io',
            summary: 'Reading, writing text and JSON files safely with automatic file handle closure.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 7015,
            title: '15. Consuming REST APIs with requests & JSON',
            slug: 'python-rest-apis',
            summary: 'Perform HTTP GET/POST requests, parse JSON payloads, and handle network errors.',
            topicOrder: 3,
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
    estimatedHours: 35,
    moduleCount: 5,
    topicCount: 15,
    progressPercentage: 0,
    modules: [
      {
        id: 801,
        title: 'Module 1: JS Execution & Modern Syntax',
        description: 'Execution context, scopes, hoisting, let/const, and data types.',
        moduleOrder: 1,
        topics: [
          {
            id: 8001,
            title: '1. Execution Context, Call Stack & Hoisting',
            slug: 'js-execution-context',
            summary: 'How the V8 JavaScript engine parses code, allocates memory, and manages call stack frames.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 8002,
            title: '2. Variable Scopes: var vs let vs const',
            slug: 'js-scopes-variables',
            summary: 'Block scope, function scope, and the Temporal Dead Zone (TDZ).',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 8003,
            title: '3. Data Types, Primitives & Type Coercion',
            slug: 'js-data-types-coercion',
            summary: 'Numbers, Strings, Booleans, null vs undefined, and strict equality (=== vs ==).',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 802,
        title: 'Module 2: Functions, Closures & Array Methods',
        description: 'Arrow functions, lexical this, closures, map, filter, and reduce.',
        moduleOrder: 2,
        topics: [
          {
            id: 8004,
            title: '4. Functions, Arrow Syntax & Lexical this',
            slug: 'js-functions-this',
            summary: 'Function declarations vs expressions, arrow functions, and how this binds.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 8005,
            title: '5. Closures & Private Variable State',
            slug: 'js-closures',
            summary: 'Understand lexical scoping and encapsulate private state in functions.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 8006,
            title: '6. Higher-Order Array Methods (map, filter, reduce)',
            slug: 'js-array-methods',
            summary: 'Functional declarative data transformations without mutating original arrays.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 803,
        title: 'Module 3: Objects, Prototypes & Modern ES6+',
        description: 'Object manipulation, prototype chain, destructuring, and modules.',
        moduleOrder: 3,
        topics: [
          {
            id: 8007,
            title: '7. Objects, Prototypes & Prototypal Inheritance',
            slug: 'js-prototypes-objects',
            summary: 'How JavaScript inherits properties through the prototype chain and modern ES6 class syntax.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 8008,
            title: '8. Modern ES6+: Destructuring, Spread & Rest',
            slug: 'js-es6-destructuring',
            summary: 'Unpack arrays and objects effortlessly with modern syntax operators.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 8009,
            title: '9. ES Modules (import / export)',
            slug: 'js-es-modules',
            summary: 'Organize applications with modular files, default exports, and named exports.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 804,
        title: 'Module 4: Asynchronous JavaScript & Promises',
        description: 'Event Loop, microtasks, Promise chaining, and async/await.',
        moduleOrder: 4,
        topics: [
          {
            id: 8010,
            title: '10. The Event Loop, Microtasks & Macrotasks',
            slug: 'js-event-loop-promises',
            summary: 'How single-threaded JavaScript handles non-blocking asynchronous operations.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 8011,
            title: '11. Promises & Asynchronous Resolution',
            slug: 'js-promises-chaining',
            summary: 'Promise states (pending, fulfilled, rejected), .then(), .catch(), and Promise.all().',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 8012,
            title: '12. async / await & Async Error Handling',
            slug: 'js-async-await',
            summary: 'Write synchronous-looking asynchronous code with try/catch exception guards.',
            topicOrder: 3,
            completed: false,
          }
        ]
      },
      {
        id: 805,
        title: 'Module 5: Web APIs & Backend Foundations',
        description: 'Fetch API, LocalStorage, DOM manipulation, and Node.js basics.',
        moduleOrder: 5,
        topics: [
          {
            id: 8013,
            title: '13. Fetch API & HTTP Network Requests',
            slug: 'js-fetch-api',
            summary: 'Fetch data from remote REST endpoints, parse JSON responses, and handle HTTP status codes.',
            topicOrder: 1,
            completed: false,
          },
          {
            id: 8014,
            title: '14. DOM Manipulation & Event Bubbling',
            slug: 'js-dom-events',
            summary: 'Select DOM elements, attach event listeners, and manage event delegation.',
            topicOrder: 2,
            completed: false,
          },
          {
            id: 8015,
            title: '15. Node.js & Express REST Backend Foundations',
            slug: 'js-nodejs-express',
            summary: 'Run JavaScript on the server with Node.js and build RESTful JSON API endpoints.',
            topicOrder: 3,
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
  const codeLang = (lang === 'c++' || lang === 'cpp') ? 'cpp' : (lang === 'c' ? 'c' : (lang === 'javascript' || lang === 'js' ? 'javascript' : (lang === 'python' ? 'python' : (lang === 'sql' ? 'sql' : 'java'))));

  let codeSnippet = '';
  let codeExplanation = {};
  let executionSteps = [];
  let analogy = {};
  let microCheck = {};
  let keyTakeaways = [];
  let realWorldExample = '';
  let commonMistakes = '';
  let bestPractices = '';
  let practiceExercise = '';

  if (codeLang === 'c') {
    codeSnippet = `#include <stdio.h>
#include <stdlib.h>

// Topic: ${cleanTitle}
int main(void) {
    printf("Mastering ${cleanTitle} in C\\n");
    int status = 1;
    if (status) {
        printf("Systems concept verified successfully.\\n");
    }
    return 0;
}`;
    codeExplanation = {
      whatDoesItDo: `Implements the core logic for ${cleanTitle} using standard C systems programming idioms.`,
      whyNeeded: `Essential low-level construct providing direct hardware, memory, and register control.`,
      howItWorks: `Compiled by GCC/Clang directly into architecture-specific machine code with zero runtime overhead.`,
      internalMechanics: `Allocates local stack frames and interacts with virtual RAM addresses.`,
      realWorldUsage: `Employed in Linux operating system kernels, embedded robotics, and Redis data engines.`,
      commonMistakes: `Forgetting memory boundaries leading to segmentation faults or memory leaks.`
    };
    executionSteps = [
      { step: 1, activeLine: 5, title: 'Entry Point & Call Frame', explanation: 'main() initiates execution frame on the CPU thread stack.', memoryState: { 'status': 'uninitialized' }, consoleOutput: '' },
      { step: 2, activeLine: 6, title: 'Standard I/O Stream', explanation: 'printf writes the concept string to stdout buffer.', memoryState: { 'status': '1' }, consoleOutput: `Mastering ${cleanTitle} in C` },
      { step: 3, activeLine: 10, title: 'Process Exit Code 0', explanation: 'Returns status code 0 to the host OS kernel.', memoryState: { 'RAX': '0 (EXIT_SUCCESS)' }, consoleOutput: `Mastering ${cleanTitle} in C\nSystems concept verified successfully.` }
    ];
    analogy = {
      title: `💡 Industrial Precision Lathe for ${cleanTitle}`,
      story: `Working with ${cleanTitle} in C is like operating an industrial manual lathe: there are no digital safety bumpers, giving you unmatched raw cutting speed and hardware accuracy if you measure carefully!`,
      comparisons: [
        { realWorld: "Industrial cutting tool", programming: `${cleanTitle} C syntax construct` },
        { realWorld: "Raw solid metal block", programming: "System RAM buffer" },
        { realWorld: "Machinist safety goggles", programming: "Compiler warnings (-Wall -Wextra)" },
        { realWorld: "Final machined part", programming: "Running native binary executable" }
      ]
    };
    microCheck = {
      prompt: `Why is mastering ${cleanTitle} important when engineering low-level C software?`,
      options: [
        `It provides direct control over CPU instructions and physical memory layout`,
        `It requires a Java Virtual Machine to execute`,
        `It automatically disables all compiler checks`,
        `It is only used in web browsers`
      ],
      correctIndex: 0,
      explanation: `Spot on! In C, mastering ${cleanTitle} gives you predictable execution and complete hardware authority.`
    };
    keyTakeaways = [
      `1. Master memory layout and pointer semantics for ${cleanTitle}.`,
      `2. Always check return codes and pointer validity before dereferencing.`,
      `3. Compile with -Wall -Wextra to catch bugs at compile time.`
    ];
    realWorldExample = `Used in high-performance network sockets, Linux drivers, and embedded microcontrollers.`;
    commonMistakes = `Dereferencing uninitialized pointers or ignoring buffer bounds.`;
    bestPractices = `Always initialize pointers, verify malloc returns, and free all dynamically allocated memory.`;
    practiceExercise = `Write a standalone C function demonstrating ${cleanTitle} with custom test inputs.`;
  } else if (codeLang === 'cpp') {
    codeSnippet = `#include <iostream>
#include <vector>
#include <string>

// Topic: ${cleanTitle}
int main() {
    std::cout << "Mastering ${cleanTitle} in Modern C++\\n";
    std::vector<int> data = {10, 20, 30};
    for (const auto& item : data) {
        std::cout << "Item: " << item << "\\n";
    }
    return 0;
}`;
    codeExplanation = {
      whatDoesItDo: `Demonstrates ${cleanTitle} following modern C++ RAII and STL best practices.`,
      whyNeeded: `Provides zero-cost abstractions combining speed with safe, readable architecture.`,
      howItWorks: `Compiled directly to native binary; STL containers manage resources deterministically.`,
      internalMechanics: `Stack allocation with automatic destructor cleanup when leaving scope.`,
      realWorldUsage: `Unreal Engine 5 games, autonomous vehicle systems, and high-frequency trading engines.`,
      commonMistakes: `Unnecessary copying of objects by value instead of const references.`
    };
    executionSteps = [
      { step: 1, activeLine: 6, title: 'Main Initialization', explanation: 'Initializes stack variables and outputs greeting.', memoryState: { 'std::cout': 'ready' }, consoleOutput: `Mastering ${cleanTitle} in Modern C++` },
      { step: 2, activeLine: 7, title: 'STL Vector Construction', explanation: 'vector allocates dynamic buffer on Heap using RAII.', memoryState: { 'data': '{10, 20, 30}' }, consoleOutput: `Mastering ${cleanTitle} in Modern C++` },
      { step: 3, activeLine: 11, title: 'Scope Cleanup & Exit', explanation: 'Vector destructor frees heap buffer automatically on scope exit.', memoryState: { 'data': 'Destructed (RAII)' }, consoleOutput: `Mastering ${cleanTitle} in Modern C++\nItem: 10\nItem: 20\nItem: 30` }
    ];
    analogy = {
      title: `💡 Modern Formula 1 Cockpit for ${cleanTitle}`,
      story: `Modern C++ gives you the raw horsepower of a Formula 1 racing engine with state-of-the-art telemetry and safety harnesses: zero-cost abstractions that protect your memory without sacrificing lap times.`,
      comparisons: [
        { realWorld: "F1 racing engine", programming: "C++ high-performance execution" },
        { realWorld: "Safety harness", programming: "RAII smart pointers (std::unique_ptr)" },
        { realWorld: "Telemetry steering wheel", programming: "STL containers & modern algorithms" },
        { realWorld: "Pit crew inspection", programming: "Compile-time template verification" }
      ]
    };
    microCheck = {
      prompt: `What is the principal benefit of applying RAII principles to ${cleanTitle} in C++?`,
      options: [
        `Guaranteed deterministic resource cleanup without needing a garbage collector`,
        `It converts C++ code into Python at runtime`,
        `It bypasses the need for constructors`,
        `It eliminates all syntax rules`
      ],
      correctIndex: 0,
      explanation: `Correct! RAII ties resource lifetimes directly to stack scopes, eliminating leaks permanently.`
    };
    keyTakeaways = [
      `1. Use RAII to manage all resource lifecycles automatically.`,
      `2. Pass complex objects by const reference (const T&) to eliminate copy overhead.`,
      `3. Leverage the Standard Template Library (STL) over raw manual arrays.`
    ];
    realWorldExample = `Chromium rendering engine and Unreal Engine core subsystem architecture.`;
    commonMistakes = `Using raw pointers and manual delete instead of smart pointers.`;
    bestPractices = `Favor std::make_unique and pass non-owning references by const&.`;
    practiceExercise = `Write an RAII wrapper demonstrating ${cleanTitle} with custom constructor and destructor logs.`;
  } else if (codeLang === 'python') {
    codeSnippet = `# Topic: ${cleanTitle}
def process_data():
    print("Mastering ${cleanTitle} in Python 3")
    dataset = [1, 2, 3, 4, 5]
    transformed = [x * 10 for x in dataset if x > 2]
    print(f"Result: {transformed}")
    return transformed

if __name__ == '__main__':
    process_data()
`;
    codeExplanation = {
      whatDoesItDo: `Implements ${cleanTitle} with clean Python 3 idioms, list comprehensions, and type-safe structures.`,
      whyNeeded: `Provides rapid prototyping and expressive syntax for production engineering.`,
      howItWorks: `CPython compiles source to bytecode (.pyc) and evaluates in the Python Virtual Machine.`,
      internalMechanics: `PyObject structs managed by reference counting and cyclic garbage collection.`,
      realWorldUsage: `Machine learning with PyTorch, web backends with FastAPI/Django, and data processing.`,
      commonMistakes: `Mutable default arguments and mixing tabs with spaces.`
    };
    executionSteps = [
      { step: 1, activeLine: 9, title: 'Module Execution Entry', explanation: 'Checks __name__ == "__main__" and enters function frame.', memoryState: { '__name__': '"__main__"' }, consoleOutput: '' },
      { step: 2, activeLine: 3, title: 'List Transformation', explanation: 'Evaluates list comprehension at C-speed in CPython.', memoryState: { 'dataset': '[1, 2, 3, 4, 5]', 'transformed': '[30, 40, 50]' }, consoleOutput: `Mastering ${cleanTitle} in Python 3` },
      { step: 3, activeLine: 6, title: 'Formatted Output & Return', explanation: 'F-string interpolation prints transformed results.', memoryState: { 'returned': '[30, 40, 50]' }, consoleOutput: `Mastering ${cleanTitle} in Python 3\nResult: [30, 40, 50]` }
    ];
    analogy = {
      title: `💡 The Universal Swiss Army Knife for ${cleanTitle}`,
      story: `Python is like a master Swiss Army Knife: it has an elegant, purpose-built blade for every scenario, letting you solve complex automation challenges with minimal, expressive code.`,
      comparisons: [
        { realWorld: "Multi-tool blade", programming: `${cleanTitle} Pythonic construct` },
        { realWorld: "Compact folding mechanism", programming: "List comprehension / concise syntax" },
        { realWorld: "Clear instructions on handle", programming: "PEP 8 clean code standard" },
        { realWorld: "Self-sharpening steel", programming: "Automatic memory & Garbage Collection" }
      ]
    };
    microCheck = {
      prompt: `Why is Python's approach to ${cleanTitle} favored in modern data and backend engineering?`,
      options: [
        `High developer productivity, readability, and a rich standard library ecosystem`,
        `It requires no CPU to execute`,
        `It is impossible to make any logic errors in Python`,
        `It only runs on supercomputers`
      ],
      correctIndex: 0,
      explanation: `Correct! Python prioritizes human readability and velocity without sacrificing powerful features.`
    };
    keyTakeaways = [
      `1. Follow PEP 8 guidelines for clean, readable, idiomatic code.`,
      `2. Use type hints (typing module) to ensure long-term codebase maintainability.`,
      `3. Leverage built-in comprehensions and generators for high memory efficiency.`
    ];
    realWorldExample = `Production data pipelines at Instagram, Spotify, and Netflix.`;
    commonMistakes = `Modifying a list while iterating over it in a for-loop.`;
    bestPractices = `Use virtual environments, type annotations, and comprehensions.`;
    practiceExercise = `Write a Python function demonstrating ${cleanTitle} that handles edge cases and invalid inputs gracefully.`;
  } else if (codeLang === 'javascript') {
    codeSnippet = `// Topic: ${cleanTitle}
function runTopicDemo() {
  console.log("Mastering ${cleanTitle} in JavaScript");
  const items = [10, 20, 30, 40];
  const doubled = items.map(n => n * 2);
  console.log("Transformed items:", doubled);
  return { success: true, count: doubled.length };
}

runTopicDemo();`;
    codeExplanation = {
      whatDoesItDo: `Implements ${cleanTitle} using modern ES6+ syntax and functional array methods.`,
      whyNeeded: `Essential for building responsive browser frontends and scalable Node.js microservices.`,
      howItWorks: `Parsed and compiled Just-In-Time (JIT) by Google V8 into optimized machine code.`,
      internalMechanics: `Single-threaded event loop architecture handling non-blocking operations.`,
      realWorldUsage: `Modern React/Next.js web applications and Express/NestJS backend APIs.`,
      commonMistakes: `Accidental global variables, stale closures, and unhandled Promise rejections.`
    };
    executionSteps = [
      { step: 1, activeLine: 2, title: 'Function Frame Pushed', explanation: 'runTopicDemo pushed onto V8 Call Stack.', memoryState: { 'items': 'uninitialized' }, consoleOutput: '' },
      { step: 2, activeLine: 4, title: 'Array Method Transformation', explanation: 'map() applies arrow callback non-destructively.', memoryState: { 'doubled': '[20, 40, 60, 80]' }, consoleOutput: `Mastering ${cleanTitle} in JavaScript` },
      { step: 3, activeLine: 9, title: 'Return Object & Pop Frame', explanation: 'Returns status object and pops frame from Call Stack.', memoryState: { 'result': '{ success: true, count: 4 }' }, consoleOutput: `Mastering ${cleanTitle} in JavaScript\nTransformed items: [20, 40, 60, 80]` }
    ];
    analogy = {
      title: `💡 Interactive Command Dashboard for ${cleanTitle}`,
      story: `JavaScript is like the interactive touchscreen console of a modern electric car: it reacts instantaneously to every driver tap (Event Loop) while continuously updating maps and battery analytics in the background!`,
      comparisons: [
        { realWorld: "Responsive touchscreen", programming: "Browser UI & DOM Events" },
        { realWorld: "Background battery monitoring", programming: "Non-blocking Asynchronous event loop" },
        { realWorld: "Driver profile preset", programming: "Closure & Lexical scope" },
        { realWorld: "Instant accelerator pedal", programming: "V8 JIT compilation" }
      ]
    };
    microCheck = {
      prompt: `What is the primary role of the JavaScript Event Loop when processing ${cleanTitle}?`,
      options: [
        `Coordinating non-blocking asynchronous callbacks while keeping the single main thread responsive`,
        `Compiling JavaScript to C++ binary files`,
        `Managing database schema migrations`,
        `Rebooting the browser on error`
      ],
      correctIndex: 0,
      explanation: `Correct! The Event Loop checks the Call Stack and moves tasks from the Microtask and Macrotask queues to execute asynchronously without blocking the UI.`
    };
    keyTakeaways = [
      `1. Use const by default, let when reassigning, and avoid var entirely.`,
      `2. Understand the single-threaded Event Loop and Microtask Queue priority.`,
      `3. Treat state as immutable—use map, filter, and spread operators.`
    ];
    realWorldExample = `Interactive web applications powered by React, Vue, and Node.js.`;
    commonMistakes = `Mutating state arrays directly instead of returning new copies.`;
    bestPractices = `Favor pure functions, arrow syntax, and handle async errors with try/catch.`;
    practiceExercise = `Write an asynchronous function demonstrating ${cleanTitle} using async/await and try/catch.`;
  } else if (codeLang === 'sql') {
    codeSnippet = `-- Topic: ${cleanTitle}
SELECT 
    id, 
    name, 
    status, 
    created_at 
FROM records 
WHERE status = 'ACTIVE' 
ORDER BY created_at DESC 
LIMIT 10;`;
    codeExplanation = {
      whatDoesItDo: `Queries filtered records demonstrating relational query projection and indexing patterns.`,
      whyNeeded: `Relational database querying is fundamental to all persistent software backends.`,
      howItWorks: `Parsed by SQL engine, optimized via execution plan, and retrieved via B-Tree index scan.`,
      internalMechanics: `Storage engine loads 16KB index pages into InnoDB Buffer Pool to satisfy query.`,
      realWorldUsage: `E-commerce order history, enterprise financial ledgers, and user profile queries.`,
      commonMistakes: `Using SELECT * in production or omitting indexes on WHERE/ORDER BY columns.`
    };
    executionSteps = [
      { step: 1, activeLine: 6, title: 'FROM & WHERE Evaluation', explanation: 'Engine locates records table and filters rows with status = ACTIVE.', memoryState: { 'TableScan': 'Index used: idx_status' }, consoleOutput: '' },
      { step: 2, activeLine: 7, title: 'ORDER BY & LIMIT', explanation: 'Sorts candidate rows by created_at and limits output to top 10.', memoryState: { 'ResultBuffer': '10 rows selected' }, consoleOutput: '' },
      { step: 3, activeLine: 2, title: 'Column Projection to Client', explanation: 'Flushes projected columns (id, name, status, created_at) to client.', memoryState: { 'NetworkPacket': 'Sent to client' }, consoleOutput: `+----+------------------+---------+---------------------+\n| id | name             | status  | created_at          |\n+----+------------------+---------+---------------------+\n|  1 | Record Alpha     | ACTIVE  | 2026-10-06 12:00:00 |\n+----+------------------+---------+---------------------+` }
    ];
    analogy = {
      title: `💡 The High-Speed Library Index Card Catalog`,
      story: `Querying an SQL database is like asking a librarian with an indexed card catalog. Instead of walking through 100,000 shelves checking every book (full table scan), the librarian looks at the alphabetical card index (B-Tree) and walks directly to the exact shelf in 2 seconds!`,
      comparisons: [
        { realWorld: "Entire library bookshelves", programming: "Database Table" },
        { realWorld: "Card catalog drawer", programming: "B-Tree Index" },
        { realWorld: "Only pulling specific book titles", programming: "SELECT column projection" },
        { realWorld: "Checking book availability badge", programming: "WHERE condition filter" }
      ]
    };
    microCheck = {
      prompt: `Why should production applications avoid using "SELECT *" when querying ${cleanTitle}?`,
      options: [
        `It wastes network bandwidth, increases memory usage, and prevents index-only covering scans`,
        `It is unsupported in SQL standard 2023`,
        `It automatically deletes unprojected columns`,
        `It turns off database transactions`
      ],
      correctIndex: 0,
      explanation: `Correct! Explicit column projection reduces network transfer, saves client memory, and enables high-performance covering index scans.`
    };
    keyTakeaways = [
      `1. Query execution begins at FROM and WHERE, before SELECT projection.`,
      `2. Index columns frequently used in WHERE, JOIN, and ORDER BY clauses.`,
      `3. Always specify explicit column names rather than SELECT *.`
    ];
    realWorldExample = `High-frequency banking payment ledgers and e-commerce shopping carts.`;
    commonMistakes = `Missing indexes on foreign keys causing slow table joins.`;
    bestPractices = `Use EXPLAIN to inspect query plans and verify index utilization.`;
    practiceExercise = `Write an SQL query demonstrating ${cleanTitle} with a JOIN between two relational tables.`;
  } else {
    // Default Java
    codeSnippet = `// Topic: ${cleanTitle}
public class TopicDemo {
    public static void main(String[] args) {
        System.out.println("Mastering ${cleanTitle} in Java 21");
        int status = 200;
        System.out.println("Status: " + status);
    }
}`;
    codeExplanation = {
      whatDoesItDo: `Implements ${cleanTitle} following Java 21 enterprise architecture patterns.`,
      whyNeeded: `Fundamental building block for robust enterprise JVM applications.`,
      howItWorks: `Compiled to bytecode (.class) and executed by the Java Virtual Machine.`,
      internalMechanics: `Local primitives allocated on Thread Stack; objects allocated in Heap.`,
      realWorldUsage: `Enterprise microservices, Spring Boot backends, and cloud native architectures.`,
      commonMistakes: `NullPointerExceptions and improper exception handling.`
    };
    executionSteps = [
      { step: 1, activeLine: 2, title: 'JVM Class Loading', explanation: 'JVM loads TopicDemo class into Method Area.', memoryState: { 'ClassLoader': 'Verified' }, consoleOutput: '' },
      { step: 2, activeLine: 3, title: 'Entry Point Execution', explanation: 'main() stack frame allocated and outputs greeting.', memoryState: { 'status': '200' }, consoleOutput: `Mastering ${cleanTitle} in Java 21` },
      { step: 3, activeLine: 5, title: 'Completion & Stack Pop', explanation: 'Outputs status code and pops thread stack frame.', memoryState: { 'StackFrame': 'Popped' }, consoleOutput: `Mastering ${cleanTitle} in Java 21\nStatus: 200` }
    ];
    analogy = {
      title: `💡 Enterprise Architectural Blueprint for ${cleanTitle}`,
      story: `Java is like an enterprise skyscraper blueprint: strict building codes, reinforced concrete foundations, and inspectable plumbing ensure the structure can scale to 100 stories without swaying in a storm!`,
      comparisons: [
        { realWorld: "Architectural blueprint", programming: "Java Class definition" },
        { realWorld: "Reinforced concrete pillar", programming: "Strong static type safety" },
        { realWorld: "Universal construction equipment", programming: "Java Virtual Machine (JVM)" },
        { realWorld: "Building code inspection", programming: "Java Compiler (javac) checks" }
      ]
    };
    microCheck = {
      prompt: `What is the primary advantage of Java's JVM architecture when deploying ${cleanTitle}?`,
      options: [
        `Write Once, Run Anywhere (WORA): Bytecode runs portably across any OS with a JVM`,
        `It bypasses all operating system memory protections`,
        `It requires no computer memory`,
        `It only works on Oracle hardware`
      ],
      correctIndex: 0,
      explanation: `Correct! Bytecode (.class) is platform-agnostic, allowing Java applications to run identically on Linux, Windows, and macOS.`
    };
    keyTakeaways = [
      `1. Understand JVM memory division: Stack (primitives/frames) vs Heap (objects).`,
      `2. Design clean, decoupled classes with encapsulation and clear contracts.`,
      `3. Write unit tests with JUnit 5 to safeguard business logic.`
    ];
    realWorldExample = `Enterprise banking architectures and Spring Boot cloud microservices.`;
    commonMistakes = `Unchecked NullPointerExceptions when calling methods on uninitialized objects.`;
    bestPractices = `Use Optional, immutable records, and constructor injection.`;
    practiceExercise = `Write a Java class demonstrating ${cleanTitle} with private fields and getter/setter methods.`;
  }

  return {
    id: meta.topicId,
    topicId: meta.topicId,
    topicTitle: meta.topicTitle,
    courseId: meta.courseId,
    courseTitle: meta.courseTitle,
    moduleTitle: meta.moduleTitle,
    title: cleanTitle,
    codeLanguage: codeLang,
    contentMarkdown: `# ${cleanTitle}\n\nWelcome to this dedicated module on **${cleanTitle}** in ${meta.courseTitle}.\n\n### Core Concept:\n${meta.summary}\n\n### Key Learning Objectives:\n1. Understand the core principles and syntax requirements of ${meta.languageName}.\n2. Master runtime memory allocation, stack/heap lifecycles, and execution flow.\n3. Write clean, production-ready, maintainable code adhering to industry best practices.`,
    codeSnippet,
    codeExplanationJson: JSON.stringify(codeExplanation),
    howItWorksJson: JSON.stringify({
      step1: `User initiates ${cleanTitle} lesson in CodePath Academy`,
      step2: `Interactive 3-pane layout displays curriculum, code editor, and live notes`,
      step3: `Student inspects 6-aspect breakdown and step-by-step execution stepper`,
      step4: `Micro check validates concept retention with instant feedback`,
      step5: `Student earns XP and updates daily streak progress`
    }),
    realWorldExample,
    commonMistakes,
    bestPractices,
    practiceExercise,
    analogy,
    executionSteps,
    microCheck,
    keyTakeaways,
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
  },
  5001: {
    id: 5001,
    topicId: 5001,
    title: 'C Compilation Pipeline & Architecture Assessment',
    difficulty: 'BEGINNER',
    questions: [
      {
        id: 1,
        prompt: 'Which phase of GCC compilation expands #include headers and #define macros?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Preprocessor',
        hint: 'Think about the step executed with gcc -E before actual machine assembly.',
        options: [
          'The Preprocessor',
          'The Linker',
          'The Operating System Shell',
          'The Virtual Machine'
        ],
        correctAnswers: ['The Preprocessor'],
        explanation: 'The Preprocessor handles text substitution, macro expansion, and header inclusions prior to compiler code generation.',
        optionJustifications: [
          { option: 'The Preprocessor', isCorrect: true, reason: 'The preprocessor parses all # directives and generates preprocessed code.' },
          { option: 'The Linker', isCorrect: false, reason: 'The linker combines object files at the very end.' },
          { option: 'The Operating System Shell', isCorrect: false, reason: 'The shell merely invokes the gcc command.' },
          { option: 'The Virtual Machine', isCorrect: false, reason: 'C compiles to native machine code; there is no virtual machine.' }
        ]
      }
    ]
  },
  5010: {
    id: 5010,
    topicId: 5010,
    title: 'C Pointers & Memory Architecture Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'What does the unary & operator do when applied to a variable (e.g., &val) in C?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Pointer Address-Of',
        hint: 'Distinguish between the value stored and where the variable resides in memory.',
        options: [
          'Returns the memory address of the variable in RAM',
          'Multiplies the variable by 2',
          'Allocates heap memory',
          'Converts the variable into a string'
        ],
        correctAnswers: ['Returns the memory address of the variable in RAM'],
        explanation: 'The address-of operator & returns the virtual memory address pointing to the variable location.',
        optionJustifications: [
          { option: 'Returns the memory address of the variable in RAM', isCorrect: true, reason: '&val yields the pointer to val.' },
          { option: 'Multiplies the variable by 2', isCorrect: false, reason: 'Arithmetic operators do multiplication, not unary &.' },
          { option: 'Allocates heap memory', isCorrect: false, reason: 'Heap memory is allocated via malloc(), not &.' },
          { option: 'Converts the variable into a string', isCorrect: false, reason: 'No type conversion to string is performed.' }
        ]
      }
    ]
  },
  6001: {
    id: 6001,
    topicId: 6001,
    title: 'Modern C++ Syntax & Namespaces Assessment',
    difficulty: 'BEGINNER',
    questions: [
      {
        id: 1,
        prompt: 'Why is pass-by-const-reference (const T&) preferred over pass-by-value for complex C++ objects?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Const Reference',
        hint: 'Consider memory copying of large std::vector or std::string instances.',
        options: [
          'It eliminates expensive deep copies while protecting the original object from modification',
          'It forces the program to run in single-thread mode',
          'It converts C++ to C syntax',
          'It causes automatic garbage collection'
        ],
        correctAnswers: ['It eliminates expensive deep copies while protecting the original object from modification'],
        explanation: 'Passing by const reference passes only a pointer-sized memory reference while compiler enforcement ensures immutability.',
        optionJustifications: [
          { option: 'It eliminates expensive deep copies while protecting the original object from modification', isCorrect: true, reason: 'Zero-copy efficiency plus const immutability.' },
          { option: 'It forces the program to run in single-thread mode', isCorrect: false, reason: 'References have no effect on threading.' },
          { option: 'It converts C++ to C syntax', isCorrect: false, reason: 'References are a native C++ language feature.' },
          { option: 'It causes automatic garbage collection', isCorrect: false, reason: 'C++ uses deterministic RAII, not GC.' }
        ]
      }
    ]
  },
  7001: {
    id: 7001,
    topicId: 7001,
    title: 'Python 3 Execution & Syntax Assessment',
    difficulty: 'BEGINNER',
    questions: [
      {
        id: 1,
        prompt: 'In CPython, what primary mechanism handles automatic memory deallocation for objects?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Python Memory Management',
        hint: 'Every PyObject has an internal ob_refcnt counter.',
        options: [
          'Reference counting supplemented by a cyclic garbage collector',
          'Manual free() calls required in every function',
          'Memory is never freed in Python',
          'The operating system swap file'
        ],
        correctAnswers: ['Reference counting supplemented by a cyclic garbage collector'],
        explanation: 'CPython frees objects as soon as their reference count drops to 0, with a cyclic garbage collector collecting circular references.',
        optionJustifications: [
          { option: 'Reference counting supplemented by a cyclic garbage collector', isCorrect: true, reason: 'Primary mechanism is reference counting.' },
          { option: 'Manual free() calls required in every function', isCorrect: false, reason: 'Python has automatic memory management.' },
          { option: 'Memory is never freed in Python', isCorrect: false, reason: 'Objects with zero references are deallocated immediately.' },
          { option: 'The operating system swap file', isCorrect: false, reason: 'The OS swap partition is not Python memory management.' }
        ]
      }
    ]
  },
  8001: {
    id: 8001,
    topicId: 8001,
    title: 'JavaScript Execution Context Assessment',
    difficulty: 'BEGINNER',
    questions: [
      {
        id: 1,
        prompt: 'What happens when accessing a "let" or "const" variable before its declaration in JavaScript?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Temporal Dead Zone',
        hint: 'Unlike var which returns undefined, let and const are trapped in the TDZ.',
        options: [
          'A ReferenceError is thrown because the variable is in the Temporal Dead Zone (TDZ)',
          'It evaluates to undefined with no error',
          'It evaluates to null',
          'The browser immediately reloads'
        ],
        correctAnswers: ['A ReferenceError is thrown because the variable is in the Temporal Dead Zone (TDZ)'],
        explanation: 'Variables declared with let and const cannot be accessed before their declaration line due to the Temporal Dead Zone.',
        optionJustifications: [
          { option: 'A ReferenceError is thrown because the variable is in the Temporal Dead Zone (TDZ)', isCorrect: true, reason: 'Accessing TDZ variables results in a ReferenceError.' },
          { option: 'It evaluates to undefined with no error', isCorrect: false, reason: 'Only var evaluates to undefined during hoisting.' },
          { option: 'It evaluates to null', isCorrect: false, reason: 'null is an explicit assignment, not a hoisting default.' },
          { option: 'The browser immediately reloads', isCorrect: false, reason: 'It throws a JS runtime error, not a page reload.' }
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
  const langName = meta?.languageName || 'Programming';

  return {
    id: Number(targetId) || 1001,
    topicId: Number(targetId) || 1001,
    title: `${title} Assessment (${langName})`,
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: `Which core principle is fundamental when applying ${title} in ${langName}?`,
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: `${langName} Fundamentals`,
        hint: `Consider memory safety, clean modularity, and language-specific best practices.`,
        options: [
          `Ensuring proper encapsulation, type safety, and clean error handling`,
          `Hardcoding all configuration values directly in business logic functions`,
          `Ignoring compiler warnings and runtime exceptions`,
          `Disabling all automated unit tests`
        ],
        correctAnswers: [`Ensuring proper encapsulation, type safety, and clean error handling`],
        explanation: `Clean architecture and robust typing are essential for writing production-grade software in ${langName}.`,
        optionJustifications: [
          { option: `Ensuring proper encapsulation, type safety, and clean error handling`, isCorrect: true, reason: 'Correct: Follows industry software engineering standards.' },
          { option: `Hardcoding all configuration values directly in business logic functions`, isCorrect: false, reason: 'Antipattern: Configuration must be decoupled.' },
          { option: `Ignoring compiler warnings and runtime exceptions`, isCorrect: false, reason: 'Dangerous: Compiler warnings highlight defects.' },
          { option: `Disabling all automated unit tests`, isCorrect: false, reason: 'Incorrect: Tests guarantee regression safety.' }
        ]
      },
      {
        id: 2,
        prompt: `What is the primary architectural benefit of mastering ${title} in ${langName}?`,
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Production Architecture',
        hint: 'Think about runtime predictability, performance, and long-term maintainability.',
        options: [
          'High testability, predictable state transitions, and lower maintenance overhead',
          'Uncontrolled memory leaks and random crashes',
          'Inability to inspect stack traces during debugging',
          'Degrading physical network speeds'
        ],
        correctAnswers: ['High testability, predictable state transitions, and lower maintenance overhead'],
        explanation: 'Applying industry standard idioms ensures code is easy to test, maintain, and scale.',
        optionJustifications: [
          { option: 'High testability, predictable state transitions, and lower maintenance overhead', isCorrect: true, reason: 'Accurate: Good patterns reduce bugs and cognitive load.' },
          { option: 'Uncontrolled memory leaks and random crashes', isCorrect: false, reason: 'Incorrect: Proper patterns prevent memory leaks.' },
          { option: 'Inability to inspect stack traces during debugging', isCorrect: false, reason: 'Incorrect: Clean architecture enhances observability.' },
          { option: 'Degrading physical network speeds', isCorrect: false, reason: 'Irrelevant: Code patterns do not alter physical network cables.' }
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
