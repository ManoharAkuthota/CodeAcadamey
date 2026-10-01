package com.codepathacademy.config;

import com.codepathacademy.entity.*;
import com.codepathacademy.entity.Module;
import com.codepathacademy.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;
    private final LanguageRepository languageRepository;
    private final FrameworkRepository frameworkRepository;
    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final LessonRepository lessonRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final CodingProblemRepository codingProblemRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            logger.info("Database already seeded. Skipping initial data seeding.");
            return;
        }

        logger.info("Initializing CodePath Academy database with curriculum, quizzes, and seed accounts...");

        // 1. Seed Users
        seedUsers();

        // 2. Seed Achievements
        seedAchievements();

        // 3. Seed Languages & Frameworks
        seedLanguagesAndFrameworks();

        // 4. Seed Courses, Modules, Topics, Lessons & Quizzes
        seedCurriculum();

        // 5. Seed Coding Challenges
        seedCodingProblems();

        logger.info("Database initialization completed successfully!");
    }

    private void seedUsers() {
        User admin = User.builder()
                .fullName("Platform Administrator")
                .username("admin")
                .email("admin@codepath.com")
                .password(passwordEncoder.encode("Admin@123"))
                .role(Role.ROLE_ADMIN)
                .xp(1000)
                .level("Software Engineer")
                .streakDays(14)
                .learningHours(45.0)
                .lastActiveDate(LocalDate.now())
                .build();
        userRepository.save(admin);

        User student = User.builder()
                .fullName("Alex Chen")
                .username("student")
                .email("student@codepath.com")
                .password(passwordEncoder.encode("Student@123"))
                .role(Role.ROLE_USER)
                .xp(180)
                .level("Beginner")
                .streakDays(4)
                .learningHours(8.5)
                .lastActiveDate(LocalDate.now())
                .build();
        userRepository.save(student);
    }

    private void seedAchievements() {
        achievementRepository.save(Achievement.builder()
                .badgeKey("FIRST_LESSON")
                .title("First Lesson")
                .description("Completed your very first programming lesson")
                .icon("BookOpen")
                .xpReward(100)
                .category("Learning")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("FIRST_QUIZ")
                .title("Knowledge Seeker")
                .description("Completed your first interactive topic quiz")
                .icon("HelpCircle")
                .xpReward(100)
                .category("Quiz")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("QUIZ_MASTER")
                .title("Quiz Master")
                .description("Achieved 100% perfect score on a topic quiz")
                .icon("Award")
                .xpReward(250)
                .category("Quiz")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("SEVEN_DAY_STREAK")
                .title("7 Day Streak")
                .description("Maintained your daily learning streak for 7 consecutive days")
                .icon("Flame")
                .xpReward(300)
                .category("Consistency")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("JAVA_BEGINNER")
                .title("Java Beginner")
                .description("Completed Java fundamentals and OOP basics")
                .icon("Coffee")
                .xpReward(150)
                .category("Language")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("PYTHON_EXPLORER")
                .title("Python Explorer")
                .description("Completed Python fundamentals and data structures")
                .icon("Terminal")
                .xpReward(150)
                .category("Language")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("PROBLEM_SOLVER")
                .title("Problem Solver")
                .description("Successfully solved an in-browser coding problem with all test cases passed")
                .icon("Code2")
                .xpReward(200)
                .category("Coding")
                .build());

        achievementRepository.save(Achievement.builder()
                .badgeKey("FULL_STACK_LEARNER")
                .title("Full Stack Architect")
                .description("Completed the full-stack path: React + Spring Boot + MySQL")
                .icon("Layers")
                .xpReward(500)
                .category("Milestone")
                .build());
    }

    private void seedLanguagesAndFrameworks() {
        // Languages
        Language c = Language.builder()
                .name("C")
                .slug("c")
                .description("The foundational mother of modern programming languages. Master memory management, pointers, and low-level computer architecture.")
                .whyLearn("C gives you intimate understanding of how operating systems, memory registers, and hardware execute instructions.")
                .difficulty("Intermediate")
                .prerequisites("None – Great for absolute beginners willing to understand the computer.")
                .icon("Cpu")
                .color("#3b82f6")
                .displayOrder(1)
                .build();
        languageRepository.save(c);

        Language cpp = Language.builder()
                .name("C++")
                .slug("cpp")
                .description("High-performance language expanding C with Object-Oriented Programming, templates, and the powerful Standard Template Library (STL).")
                .whyLearn("Industry gold standard for game engines, browser kernels, competitive programming, and high-frequency trading systems.")
                .difficulty("Advanced")
                .prerequisites("C or basic programming logic")
                .icon("Layers")
                .color("#6366f1")
                .displayOrder(2)
                .build();
        languageRepository.save(cpp);

        Language java = Language.builder()
                .name("Java")
                .slug("java")
                .description("Enterprise-grade, object-oriented language running on the JVM. Master robust architectures, multithreading, and strong typing.")
                .whyLearn("Drives financial systems, cloud microservices, Android apps, and massive backend enterprise software globally.")
                .difficulty("Intermediate")
                .prerequisites("Basic programming concepts")
                .icon("Coffee")
                .color("#f97316")
                .displayOrder(3)
                .build();
        languageRepository.save(java);

        Language python = Language.builder()
                .name("Python")
                .slug("python")
                .description("Elegant, readable, and incredibly versatile language driving Artificial Intelligence, data science, automation, and web backends.")
                .whyLearn("Fastest syntax to learn, immense ecosystem of AI libraries, and highest developer productivity.")
                .difficulty("Beginner")
                .prerequisites("None")
                .icon("Terminal")
                .color("#eab308")
                .displayOrder(4)
                .build();
        languageRepository.save(python);

        Language javascript = Language.builder()
                .name("JavaScript")
                .slug("javascript")
                .description("The universal language of the web. Powers interactive frontend user interfaces, servers with Node.js, and mobile applications.")
                .whyLearn("Every website on Earth runs JavaScript. Unlocks full-stack capability with a single language.")
                .difficulty("Beginner")
                .prerequisites("HTML & CSS basics")
                .icon("Code")
                .color("#eab308")
                .displayOrder(5)
                .build();
        languageRepository.save(javascript);

        Language sql = Language.builder()
                .name("SQL / MySQL")
                .slug("sql")
                .description("Structured Query Language for managing and querying relational databases. Master joins, indexing, ACID transactions, and schema design.")
                .whyLearn("All software needs persistent data. Relational data modeling is the foundation of backend engineering.")
                .difficulty("Beginner")
                .prerequisites("None")
                .icon("Database")
                .color("#06b6d4")
                .displayOrder(6)
                .build();
        languageRepository.save(sql);

        // Frameworks
        Framework springBoot = Framework.builder()
                .name("Spring Boot")
                .slug("spring-boot")
                .category("Java")
                .description("Production-ready Java framework for building scalable enterprise microservices, RESTful APIs, and secure web applications.")
                .whyUseIt("Eliminates boilerplate configuration, provides embedded Tomcat, production metrics with Actuator, and rock-solid Spring ecosystem.")
                .prerequisites("Java 21, Core OOP, Maven, SQL")
                .architecture("Client -> DispatcherServlet -> Controller -> Service -> Repository -> Hibernate/JPA -> MySQL Database")
                .coreConcepts("Inversion of Control (IoC), Dependency Injection, Spring Security, JPA/Hibernate, Actuator, RestController")
                .icon("ShieldCheck")
                .color("#22c55e")
                .displayOrder(1)
                .build();
        frameworkRepository.save(springBoot);

        Framework react = Framework.builder()
                .name("React")
                .slug("react")
                .category("JavaScript")
                .description("Declarative, component-based frontend library for building modern, responsive, and high-performance user interfaces.")
                .whyUseIt("Virtual DOM diffing, component reusability, rich ecosystem (Vite, Next.js, React Router), and developer ergonomics.")
                .prerequisites("HTML5, CSS3, Modern JavaScript (ES6+), DOM APIs")
                .architecture("Component Tree -> Virtual DOM Reconciliation -> Fiber Engine -> Browser Real DOM")
                .coreConcepts("JSX, State, Props, Hooks (useState, useEffect, useContext), Component Lifecycle, SPA Routing")
                .icon("Layers")
                .color("#06b6d4")
                .displayOrder(2)
                .build();
        frameworkRepository.save(react);

        Framework django = Framework.builder()
                .name("Django")
                .slug("django")
                .category("Python")
                .description("The web framework for perfectionists with deadlines. High-level Python framework encouraging rapid development and clean design.")
                .whyUseIt("Batteries-included philosophy: built-in admin dashboard, ORM, authentication system, and CSRF security.")
                .prerequisites("Python, Object-Oriented Programming, Relational Databases")
                .architecture("MVT (Model-View-Template) Pattern and Django REST Framework for API serializers.")
                .coreConcepts("ORM Models, Class-Based Views, URL Routing, Django Admin, Migrations")
                .icon("Server")
                .color("#10b981")
                .displayOrder(3)
                .build();
        frameworkRepository.save(django);

        Framework node = Framework.builder()
                .name("Node.js & Express")
                .slug("nodejs-express")
                .category("JavaScript")
                .description("Asynchronous event-driven JavaScript runtime and minimalist web framework for building fast, scalable network applications.")
                .whyUseIt("Single language across frontend and backend, non-blocking I/O, npm ecosystem with millions of packages.")
                .prerequisites("JavaScript ES6, Asynchronous Programming (Promises, Async/Await)")
                .architecture("Event Loop -> Libuv Thread Pool -> Non-blocking I/O Operations")
                .coreConcepts("Middleware pipeline, Routing, JSON body parsing, CORS, Error handling")
                .icon("Cpu")
                .color("#84cc16")
                .displayOrder(4)
                .build();
        frameworkRepository.save(node);
    }

    private void seedCurriculum() {
        Language javaLang = languageRepository.findBySlug("java").orElseThrow();
        Language cLang = languageRepository.findBySlug("c").orElseThrow();
        Language pyLang = languageRepository.findBySlug("python").orElseThrow();
        Language sqlLang = languageRepository.findBySlug("sql").orElseThrow();
        Framework springBootFw = frameworkRepository.findBySlug("spring-boot").orElseThrow();
        Framework reactFw = frameworkRepository.findBySlug("react").orElseThrow();

        // 1. JAVA CORE COURSE
        Course javaCourse = Course.builder()
                .title("Complete Java 21 Mastery: From Fundamentals to Advanced Architecture")
                .slug("java-mastery")
                .language(javaLang)
                .description("Comprehensive journey through Java 21: variables, loops, object-oriented programming, collections framework, exception handling, and streams.")
                .level("Beginner to Advanced")
                .estimatedHours(40)
                .thumbnail("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80")
                .displayOrder(1)
                .build();
        javaCourse = courseRepository.save(javaCourse);

        // Java Module 1: Fundamentals
        Module javaMod1 = Module.builder()
                .course(javaCourse)
                .title("Module 1: Java Basics & Syntax")
                .description("Learn the anatomy of Java programs, the JVM execution model, primitive data types, and operators.")
                .moduleOrder(1)
                .build();
        javaMod1 = moduleRepository.save(javaMod1);

        Topic javaTopic1 = Topic.builder()
                .module(javaMod1)
                .title("1. Introduction to Java & JVM Architecture")
                .slug("java-intro-jvm")
                .summary("Understand JVM, JRE, JDK, bytecode compilation, and write your first Hello World program.")
                .topicOrder(1)
                .build();
        javaTopic1 = topicRepository.save(javaTopic1);

        Lesson javaLesson1 = Lesson.builder()
                .topic(javaTopic1)
                .title("Java Execution Model & First Program")
                .contentMarkdown("""
# Welcome to Java 21 Programming

Java is a class-based, object-oriented programming language designed for portability and enterprise reliability.
Its key philosophy is **WORA** (Write Once, Run Anywhere).

### How Java Runs Under the Hood:
1. **Source Code (`Main.java`)** is written by the developer.
2. **Compiler (`javac`)** compiles source code into platform-independent **Bytecode (`Main.class`)**.
3. **Java Virtual Machine (JVM)** interprets or Just-In-Time (JIT) compiles the bytecode into machine native code for the host CPU.

---

### The Fundamental Anatomy:
- `public class Main`: In Java, every line of executable code must live inside a class.
- `public static void main(String[] args)`: The universal entry point where JVM execution begins.
- `System.out.println()`: Standard output stream printing a line of text to the console.
""")
                .codeSnippet("""
public class Main {
    public static void main(String[] args) {
        // Welcome message to console
        System.out.println("Hello, CodePath Academy!");

        int releaseYear = 2026;
        String language = "Java 21 LTS";
        System.out.println("Learning " + language + " in " + releaseYear);
    }
}
""")
                .codeLanguage("java")
                .codeExplanationJson("""
{
  "whatDoesItDo": "Declares a Main class and runs the main entrypoint to print formatted strings to console.",
  "whyNeeded": "Every standalone Java application requires an entry method with exact signature 'public static void main(String[] args)' for the JVM launcher.",
  "howItWorks": "javac compiles Main.java into Main.class bytecode. The JVM class loader loads Main.class, verifies bytecode integrity, and invokes main().",
  "internalMechanics": "The JVM creates a main thread with a dedicated call stack frame. System.out resolves to a PrintStream instance hooked to stdout file descriptor.",
  "realWorldUsage": "Starting microservices, command line utilities, and server daemons in enterprise production environments.",
  "commonMistakes": "Forgetting 'static' (causes NoSuchMethodError), mismatched filename vs public class name (Main.java must match class Main)."
}
""")
                .howItWorksJson("""
{
  "step1": "Student clicks Run / Submit in React UI",
  "step2": "React triggers Axios POST to /api/problems/{id}/submit with JWT token",
  "step3": "Spring Boot Security Filter verifies Bearer token and sets SecurityContext",
  "step4": "LessonController / CodingController delegates to Service layer",
  "step5": "Service queries Repository; Hibernate emits SQL to MySQL 8.0",
  "step6": "Result transforms into ApiResponse JSON and updates React state"
}
""")
                .realWorldExample("Every Spring Boot enterprise microservice starts from a static main method initiating SpringApplication.run().")
                .commonMistakes("Naming the file differently than the public class name. In Java, if class is public class Main, file MUST be Main.java.")
                .bestPractices("Always use PascalCase for class names and camelCase for method and variable names.")
                .practiceExercise("Modify the code to declare two variables: int age and String name, and print 'My name is [name] and I am [age] years old.'")
                .build();
        lessonRepository.save(javaLesson1);

        // Quiz for Java Topic 1
        Quiz javaQuiz1 = Quiz.builder()
                .topic(javaTopic1)
                .title("Test Your Knowledge: Java Fundamentals & JVM")
                .description("Check your understanding of JVM, bytecode, and basic program syntax.")
                .difficulty("EASY")
                .passingScore(70)
                .timeLimitMinutes(10)
                .build();
        javaQuiz1 = quizRepository.save(javaQuiz1);

        questionRepository.save(Question.builder()
                .quiz(javaQuiz1)
                .questionType(QuestionType.MULTIPLE_CHOICE)
                .prompt("What does the Java compiler (javac) produce from a .java source file?")
                .codeSnippet("javac Application.java")
                .optionsJson("[\"Machine binary code (.exe)\", \"Platform-independent Bytecode (.class)\", \"Assembly language source\", \"Native C source code\"]")
                .correctAnswersJson("[\"Platform-independent Bytecode (.class)\"]")
                .explanation("javac translates human-readable Java code into bytecode stored in .class files, which can then run on any JVM regardless of OS.")
                .wrongAnswersExplanationJson("{\"Machine binary code (.exe)\": \"C and C++ produce machine binaries directly, but Java compiles to portable bytecode.\", \"Assembly language source\": \"Compilers to assembly are native tools; Java uses bytecode for cross-platform portability.\"}")
                .relatedTopic("JVM Architecture")
                .displayOrder(1)
                .build());

        questionRepository.save(Question.builder()
                .quiz(javaQuiz1)
                .questionType(QuestionType.CODE_OUTPUT)
                .prompt("What will be the output of executing the following Java snippet?")
                .codeSnippet("""
int x = 10;
System.out.println(x++);
System.out.println(++x);
""")
                .optionsJson("[\"10 followed by 12\", \"11 followed by 11\", \"10 followed by 11\", \"11 followed by 12\"]")
                .correctAnswersJson("[\"10 followed by 12\"]")
                .explanation("x++ is post-increment: it evaluates to 10 and then increments x to 11. ++x is pre-increment: it increments 11 to 12 immediately and evaluates to 12.")
                .wrongAnswersExplanationJson("{\"11 followed by 12\": \"Post-increment returns the original value before incrementing, so the first line outputs 10.\"}")
                .relatedTopic("Operators")
                .displayOrder(2)
                .build());

        // Java Topic 2: Variables & Data Types
        Topic javaTopic2 = Topic.builder()
                .module(javaMod1)
                .title("2. Variables, Primitive Types & Type Casting")
                .slug("java-variables-primitives")
                .summary("Master Java's 8 primitive types, memory allocations, reference types, and type promotion.")
                .topicOrder(2)
                .prerequisiteTopicId(javaTopic1.getId())
                .build();
        javaTopic2 = topicRepository.save(javaTopic2);

        Lesson javaLesson2 = Lesson.builder()
                .topic(javaTopic2)
                .title("Primitive Data Types and Scope")
                .contentMarkdown("""
# Primitive Data Types in Java

Java is strongly typed. Variables must be declared with their explicit data type.

### 8 Primitive Types:
1. `byte` (8-bit signed)
2. `short` (16-bit signed)
3. `int` (32-bit signed, standard for whole numbers)
4. `long` (64-bit signed, suffix `L`)
5. `float` (32-bit floating point, suffix `f`)
6. `double` (64-bit floating point, standard for decimals)
7. `boolean` (`true` or `false`)
8. `char` (16-bit Unicode character)
""")
                .codeSnippet("""
public class DataDemo {
    public static void main(String[] args) {
        int studentCount = 1250;
        double averageScore = 88.75;
        boolean isEnrolled = true;
        char grade = 'A';

        // Widening casting (automatic)
        double totalScore = studentCount * averageScore;

        System.out.println("Total points: " + totalScore);
        System.out.println("Status: " + isEnrolled + " with Grade: " + grade);
    }
}
""")
                .codeLanguage("java")
                .codeExplanationJson("""
{
  "whatDoesItDo": "Declares primitive variables of different types and performs safe numerical multiplication with type widening.",
  "whyNeeded": "Choosing the correct data type optimizes CPU cache usage and enforces compile-time safety against corrupted values.",
  "howItWorks": "Variables are allocated directly in stack memory frames as raw binary values rather than heap references.",
  "internalMechanics": "Multiplication between int and double causes implicit type promotion: int studentCount is widened to 64-bit IEEE 754 double before IEEE floating point arithmetic.",
  "realWorldUsage": "Computing financial balances, inventory counts, and status flags in backend business services.",
  "commonMistakes": "Integer division truncation: 5 / 2 yields 2 instead of 2.5 unless cast to double: 5.0 / 2."
}
""")
                .howItWorksJson("""
{
  "step1": "Lesson details requested by student",
  "step2": "React checks authentication token in LocalStorage",
  "step3": "GET /api/lessons/{id} called",
  "step4": "LessonService fetches lesson and checks UserProgress table to determine completion state",
  "step5": "Interactive lesson viewer renders code with syntax highlighting and explanation drawer"
}
""")
                .realWorldExample("Calculating order totals with tax rates in e-commerce billing engines.")
                .commonMistakes("Assuming floating point types are exact for currency. Use BigDecimal for precise financial math!")
                .bestPractices("Always use meaningful camelCase variable names like studentCount instead of x or cnt.")
                .practiceExercise("Declare variables to store product price, discount percentage, and calculate the discounted price.")
                .build();
        lessonRepository.save(javaLesson2);

        // Java Module 2: OOP & Architecture
        Module javaMod2 = Module.builder()
                .course(javaCourse)
                .title("Module 2: Object-Oriented Programming (OOP)")
                .description("Master the four pillars of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction.")
                .moduleOrder(2)
                .build();
        javaMod2 = moduleRepository.save(javaMod2);

        Topic javaTopic3 = Topic.builder()
                .module(javaMod2)
                .title("3. Classes, Objects & Encapsulation")
                .slug("java-classes-encapsulation")
                .summary("Understand blueprints, instance states, private fields, and getter/setter access control.")
                .topicOrder(1)
                .prerequisiteTopicId(javaTopic2.getId())
                .build();
        javaTopic3 = topicRepository.save(javaTopic3);

        Lesson javaLesson3 = Lesson.builder()
                .topic(javaTopic3)
                .title("Encapsulation & Object Design")
                .contentMarkdown("""
# Encapsulation in Java

Encapsulation is the bundling of data (fields) and methods that operate on that data into a single unit (class), while restricting direct access from outside.

### Benefits of Encapsulation:
- **Control over data**: Fields can be validated in setters before assignment.
- **Security & Integrity**: Internal state cannot be corrupted by external classes.
- **Maintainability**: Internal representation can change without breaking client code.
""")
                .codeSnippet("""
public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialDeposit) {
        this.accountNumber = accountNumber;
        this.balance = Math.max(0, initialDeposit);
    }

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Deposited $" + amount + ". New Balance: $" + this.balance);
        }
    }

    public double getBalance() {
        return this.balance;
    }
}
""")
                .codeLanguage("java")
                .codeExplanationJson("""
{
  "whatDoesItDo": "Models a secure BankAccount class using private fields and validated public methods.",
  "whyNeeded": "Preventing external code from directly modifying balance (e.g. account.balance = -99999).",
  "howItWorks": "Private access modifier restricts direct member access to code inside BankAccount.",
  "internalMechanics": "Instances live on the Heap; public methods manipulate state via this reference pointer.",
  "realWorldUsage": "Domain models in banking, fintech, and ERP enterprise architectures.",
  "commonMistakes": "Exposing mutable references directly via getters (breaking encapsulation)."
}
""")
                .howItWorksJson("""
{
  "step1": "User clicks 'Mark Topic Complete'",
  "step2": "POST /api/lessons/topic/{id}/complete executed",
  "step3": "LessonService saves UserProgress record and calls GamificationService.addXp()",
  "step4": "GamificationService checks if First Lesson badge should unlock",
  "step5": "UI triggers animated XP notification and unlocks subsequent prerequisite topics"
}
""")
                .realWorldExample("Domain entities like User, Account, and Order in Spring Data JPA.")
                .commonMistakes("Making all fields public for convenience.")
                .bestPractices("Make fields private by default. Provide getters and setters only when necessary.")
                .practiceExercise("Add a withdraw(double amount) method that verifies sufficient funds before debiting balance.")
                .build();
        lessonRepository.save(javaLesson3);

        // 2. SPRING BOOT ENTERPRISE COURSE
        Course springCourse = Course.builder()
                .title("Spring Boot 3 & Microservices Architecture: Zero to Hero")
                .slug("spring-boot-zero-to-hero")
                .framework(springBootFw)
                .description("Master Dependency Injection, REST APIs, JPA/Hibernate, Spring Security, JWT authentication, and MySQL integration.")
                .level("Intermediate to Advanced")
                .estimatedHours(50)
                .thumbnail("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80")
                .displayOrder(2)
                .build();
        springCourse = courseRepository.save(springCourse);

        Module springMod1 = Module.builder()
                .course(springCourse)
                .title("Module 1: Spring Core & Dependency Injection")
                .description("Explore IoC containers, bean lifecycles, and loose coupling.")
                .moduleOrder(1)
                .build();
        springMod1 = moduleRepository.save(springMod1);

        Topic springTopic1 = Topic.builder()
                .module(springMod1)
                .title("1. Inversion of Control (IoC) & Dependency Injection")
                .slug("spring-ioc-di")
                .summary("Understand how Spring manages objects, handles dependency wiring, and eliminates tight coupling.")
                .topicOrder(1)
                .build();
        springTopic1 = topicRepository.save(springTopic1);

        Lesson springLesson1 = Lesson.builder()
                .topic(springTopic1)
                .title("Dependency Injection Principles in Spring Boot")
                .contentMarkdown("""
# Inversion of Control & Dependency Injection

In traditional programming, an object instantiates its own dependencies using `new`:
```java
OrderService service = new OrderService(); // Tight coupling!
```
In Spring, the **IoC Container (ApplicationContext)** creates, manages, and injects instances (Beans) automatically.

### Why Constructor Injection is Recommended:
1. **Immutability**: Dependencies can be marked `final`.
2. **Testability**: Easy to inject mocks in unit tests without Spring context.
3. **Fail-Fast**: Missing dependencies fail at startup rather than during execution.
""")
                .codeSnippet("""
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String username, String rawPassword) {
        String hashed = passwordEncoder.encode(rawPassword);
        User user = new User(username, hashed);
        return userRepository.save(user);
    }
}
""")
                .codeLanguage("java")
                .codeExplanationJson("""
{
  "whatDoesItDo": "Defines a Spring Service bean with UserRepository and PasswordEncoder automatically injected via constructor.",
  "whyNeeded": "Decouples UserService from specific database implementations and hashing algorithms, allowing easy mocking in unit tests.",
  "howItWorks": "Spring scans the classpath for @Service, registers UserService in ApplicationContext, and autowires required dependencies at startup.",
  "internalMechanics": "The Spring BeanFactory performs reflection and constructor resolution, creating singleton bean instances stored in the concurrent bean map.",
  "realWorldUsage": "Standard enterprise backend service pattern across financial, cloud, and SaaS applications.",
  "commonMistakes": "Using field injection (@Autowired private Repo repo) which makes unit testing harder and prevents immutability."
}
""")
                .howItWorksJson("""
{
  "step1": "Client registers via frontend Auth Modal",
  "step2": "POST /api/auth/register hits AuthController",
  "step3": "AuthController invokes AuthService which calls BCryptPasswordEncoder",
  "step4": "User is persisted to MySQL via UserRepository.save()",
  "step5": "JwtService crafts signed JWT access & refresh tokens returned in 200 OK response"
}
""")
                .realWorldExample("Our very own CodePath Academy AuthService uses Constructor Injection for repositories and password encoders!")
                .commonMistakes("Using @Autowired directly on fields instead of constructor injection.")
                .bestPractices("Use Lombok @RequiredArgsConstructor and final fields for clean constructor injection.")
                .practiceExercise("Create a NotificationService bean and inject it into UserService to send welcome emails upon registration.")
                .build();
        lessonRepository.save(springLesson1);

        // 3. REACT COURSE
        Course reactCourse = Course.builder()
                .title("Modern React 18: Components, Hooks, State & Production Web Apps")
                .slug("react-mastery")
                .framework(reactFw)
                .description("Build responsive modern web applications with React 18, Vite, Tailwind CSS, Hooks, React Router, and Axios.")
                .level("Beginner to Intermediate")
                .estimatedHours(35)
                .thumbnail("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80")
                .displayOrder(3)
                .build();
        reactCourse = courseRepository.save(reactCourse);

        Module reactMod1 = Module.builder()
                .course(reactCourse)
                .title("Module 1: Components, JSX & State Management")
                .description("Learn component lifecycles, useState, useEffect, and reactive rendering.")
                .moduleOrder(1)
                .build();
        reactMod1 = moduleRepository.save(reactMod1);

        Topic reactTopic1 = Topic.builder()
                .module(reactMod1)
                .title("1. React Components & useState Hook")
                .slug("react-components-usestate")
                .summary("Understand components as pure functions of state and props with reactive UI rendering.")
                .topicOrder(1)
                .build();
        reactTopic1 = topicRepository.save(reactTopic1);

        Lesson reactLesson1 = Lesson.builder()
                .topic(reactTopic1)
                .title("Building Declarative UI with useState")
                .contentMarkdown("""
# React Components and State

In React, the user interface is a direct function of **State** and **Props**:
$$UI = f(State)$$

When state changes via a setter function (`setCount`), React re-renders the component and updates only the modified DOM nodes via its reconciliation engine.
""")
                .codeSnippet("""
import React, { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 bg-slate-900 rounded-lg text-white">
            <h2 className="text-xl font-bold">Counter: {count}</h2>
            <div className="flex gap-2 mt-3">
                <button 
                    onClick={() => setCount(prev => prev + 1)}
                    className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">
                    Increment
                </button>
                <button 
                    onClick={() => setCount(0)}
                    className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600">
                    Reset
                </button>
            </div>
        </div>
    );
}
""")
                .codeLanguage("javascript")
                .codeExplanationJson("""
{
  "whatDoesItDo": "Creates a reactive interactive Counter component using React's useState hook.",
  "whyNeeded": "Allows UI elements to react instantly to user clicks and persist variable state across re-renders without querying document.getElementById.",
  "howItWorks": "useState returns a state value and an updater function. Calling setCount queues a re-render in the React Fiber scheduler.",
  "internalMechanics": "React compares virtual DOM nodes before and after state mutation, generating minimal DOM patches for the browser engine.",
  "realWorldUsage": "Form inputs, shopping cart tallies, dark mode toggles, and modal states throughout web apps.",
  "commonMistakes": "Mutating state directly (count = count + 1) which bypasses the scheduler and causes stale UI."
}
""")
                .howItWorksJson("""
{
  "step1": "User clicks the button in the React UI",
  "step2": "React triggers state change and schedules reconciliation",
  "step3": "DOM patch updates the counter label with zero full-page reload"
}
""")
                .realWorldExample("The topic completion and bookmark buttons in CodePath Academy are built with React state!")
                .commonMistakes("Directly modifying state: count = count + 1 instead of setCount(prev => prev + 1).")
                .bestPractices("Always pass functional updater prev => prev + 1 when new state depends on previous state.")
                .practiceExercise("Add a Decrement button that prevents the counter from falling below 0.")
                .build();
        lessonRepository.save(reactLesson1);

        // 4. SQL COURSE
        Course sqlCourse = Course.builder()
                .title("SQL & Relational Database Architecture: From SELECT to Optimization")
                .slug("sql-mastery")
                .language(sqlLang)
                .description("Master SQL queries, table joins, aggregation, schema design, constraints, and query indexing.")
                .level("Beginner to Intermediate")
                .estimatedHours(25)
                .thumbnail("https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80")
                .displayOrder(4)
                .build();
        sqlCourse = courseRepository.save(sqlCourse);

        Module sqlMod1 = Module.builder()
                .course(sqlCourse)
                .title("Module 1: Querying Data & Relational Joins")
                .description("SELECT statements, filtering with WHERE, ordering, and joining multiple tables.")
                .moduleOrder(1)
                .build();
        sqlMod1 = moduleRepository.save(sqlMod1);

        Topic sqlTopic1 = Topic.builder()
                .module(sqlMod1)
                .title("1. SQL SELECT, WHERE & ORDER BY")
                .slug("sql-select-fundamentals")
                .summary("Learn how to retrieve data from tables with filtering, projection, and sorting.")
                .topicOrder(1)
                .build();
        sqlTopic1 = topicRepository.save(sqlTopic1);

        Lesson sqlLesson1 = Lesson.builder()
                .topic(sqlTopic1)
                .title("Mastering SQL Data Retrieval")
                .contentMarkdown("""
# Structured Query Language (SQL)

SQL is the universal declarative language for managing structured data in relational database management systems (RDBMS) like MySQL, PostgreSQL, and Oracle.

### The Basic Query Structure:
```sql
SELECT column1, column2 
FROM table_name 
WHERE condition 
ORDER BY column1 ASC;
```
""")
                .codeSnippet("""
-- Retrieve active students with score above 80 ordered by score
SELECT id, full_name, email, score, created_at
FROM students
WHERE status = 'ACTIVE' AND score >= 80.0
ORDER BY score DESC
LIMIT 10;
""")
                .codeLanguage("sql")
                .codeExplanationJson("""
{
  "whatDoesItDo": "Filters the students table for active students scoring >= 80, sorts them highest to lowest, and returns the top 10.",
  "whyNeeded": "Enables precise data slicing, pagination, and leaderboard calculations in database systems.",
  "howItWorks": "Database query optimizer generates an execution plan, leverages B-Tree indexes on status and score, and streams matched rows.",
  "internalMechanics": "The SQL engine parses syntax, validates permissions, checks query cache, and searches InnoDB data pages.",
  "realWorldUsage": "Fetching user profiles, dashboards, and reporting tables across all web systems.",
  "commonMistakes": "Using SELECT * in production queries, which increases network transmission and prevents covering index optimizations."
}
""")
                .howItWorksJson("""
{
  "step1": "Client requests student leaderboard",
  "step2": "Spring Data JPA query method triggers Hibernate",
  "step3": "Hibernate formats prepared SQL statement with parameters",
  "step4": "HikariCP connection executes query on MySQL 8.0 server",
  "step5": "ResultSet is mapped to Java DTOs and transmitted to React frontend"
}
""")
                .realWorldExample("Backend analytics endpoints querying top active learners for the dashboard.")
                .commonMistakes("Using SELECT * in production queries instead of selecting only the necessary columns.")
                .bestPractices("Always index columns frequently used in WHERE and ORDER BY clauses.")
                .practiceExercise("Write a query to find all students whose email ends with '@codepath.com'.")
                .build();
        lessonRepository.save(sqlLesson1);
    }

    private void seedCodingProblems() {
        Language javaLang = languageRepository.findBySlug("java").orElse(null);
        Language pyLang = languageRepository.findBySlug("python").orElse(null);

        // Problem 1: Two Sum
        CodingProblem p1 = CodingProblem.builder()
                .title("Two Sum")
                .slug("two-sum")
                .language(javaLang)
                .difficulty("EASY")
                .category("Arrays")
                .description("""
Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.
""")
                .constraints("2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.")
                .inputFormat("nums = [2,7,11,15], target = 9")
                .outputFormat("[0, 1]")
                .sampleInput("[2, 7, 11, 15], 9")
                .sampleOutput("[0, 1]")
                .starterCode("""
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here using HashMap for O(n) time complexity
        return new int[]{0, 1};
    }
}
""")
                .testCasesJson("""
[
  {"input": "[2, 7, 11, 15], target = 9", "expectedOutput": "[0, 1]", "hidden": false},
  {"input": "[3, 2, 4], target = 6", "expectedOutput": "[1, 2]", "hidden": false},
  {"input": "[3, 3], target = 6", "expectedOutput": "[0, 1]", "hidden": true}
]
""")
                .hints("A brute force O(n^2) checks every pair. Can you use a Hash Map to store compliments in O(n) time?")
                .xpReward(50)
                .build();
        codingProblemRepository.save(p1);

        // Problem 2: Reverse a String
        CodingProblem p2 = CodingProblem.builder()
                .title("Reverse a String")
                .slug("reverse-string")
                .language(javaLang)
                .difficulty("EASY")
                .category("Strings")
                .description("""
Write a function that reverses a string. The input string is given as an array of characters or string.
""")
                .constraints("1 <= s.length <= 10^5\ns consists of printable ASCII characters.")
                .inputFormat("s = \"hello\"")
                .outputFormat("\"olleh\"")
                .sampleInput("\"hello\"")
                .sampleOutput("\"olleh\"")
                .starterCode("""
class Solution {
    public String reverseString(String s) {
        // Implement in-place or two-pointer reversal
        return new StringBuilder(s).reverse().toString();
    }
}
""")
                .testCasesJson("""
[
  {"input": "hello", "expectedOutput": "olleh", "hidden": false},
  {"input": "CodePath", "expectedOutput": "htaPedoC", "hidden": false},
  {"input": "racecar", "expectedOutput": "racecar", "hidden": true}
]
""")
                .hints("Consider the two-pointer approach swapping characters from opposite ends toward the middle.")
                .xpReward(50)
                .build();
        codingProblemRepository.save(p2);

        // Problem 3: Palindrome Number
        CodingProblem p3 = CodingProblem.builder()
                .title("Palindrome Number")
                .slug("palindrome-number")
                .language(pyLang)
                .difficulty("EASY")
                .category("Math")
                .description("""
Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.
An integer is a palindrome when it reads the same backward as forward (e.g. 121 is a palindrome, while 123 is not).
""")
                .constraints("-2^31 <= x <= 2^31 - 1")
                .inputFormat("x = 121")
                .outputFormat("true")
                .sampleInput("121")
                .sampleOutput("true")
                .starterCode("""
def is_palindrome(x: int) -> bool:
    # Handle negative numbers and numbers ending in 0
    if x < 0:
        return False
    return str(x) == str(x)[::-1]
""")
                .testCasesJson("""
[
  {"input": "121", "expectedOutput": "true", "hidden": false},
  {"input": "-121", "expectedOutput": "false", "hidden": false},
  {"input": "10", "expectedOutput": "false", "hidden": true}
]
""")
                .hints("Negative numbers can never be palindromes because of the leading minus sign.")
                .xpReward(50)
                .build();
        codingProblemRepository.save(p3);
    }
}
