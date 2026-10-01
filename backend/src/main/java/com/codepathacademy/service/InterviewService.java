package com.codepathacademy.service;

import com.codepathacademy.dto.response.InterviewQuestionResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    public List<InterviewQuestionResponse> getInterviewQuestions(String category, String level) {
        List<InterviewQuestionResponse> all = getCuratedQuestions();

        return all.stream()
                .filter(q -> category == null || category.equalsIgnoreCase("ALL") || q.getCategory().equalsIgnoreCase(category))
                .filter(q -> level == null || level.equalsIgnoreCase("ALL") || q.getLevel().equalsIgnoreCase(level))
                .collect(Collectors.toList());
    }

    private List<InterviewQuestionResponse> getCuratedQuestions() {
        List<InterviewQuestionResponse> list = new ArrayList<>();

        // Java Questions
        list.add(InterviewQuestionResponse.builder()
                .category("Java")
                .level("Beginner")
                .question("What is the difference between JDK, JRE, and JVM?")
                .answer("JVM (Java Virtual Machine) executes bytecode. JRE (Java Runtime Environment) = JVM + core libraries needed to run Java programs. JDK (Java Development Kit) = JRE + development tools like javac compiler and debugger.")
                .codeSnippet("// JRE provides libraries like java.lang.String\n// JDK provides javac compiler: javac Main.java -> Main.class")
                .keyPoints(List.of("JVM provides platform independence (WORA - Write Once Run Anywhere)", "JDK is for developers; JRE is for end users"))
                .build());

        list.add(InterviewQuestionResponse.builder()
                .category("Java")
                .level("Intermediate")
                .question("How does HashMap work internally in Java?")
                .answer("HashMap works on the principle of Hashing. It uses an array of Node<K,V> buckets. When put(K, V) is called, hashCode() determines the bucket index. If collisions occur, elements are stored in a linked list. In Java 8+, if a bucket has >= 8 elements and total array size >= 64, the linked list transforms into a Red-Black Balanced Binary Tree (O(log n) lookup).")
                .codeSnippet("Map<String, Integer> map = new HashMap<>();\nmap.put(\"Java\", 100); // hash(\"Java\") -> bucket index")
                .keyPoints(List.of("Initial capacity is 16, default load factor is 0.75", "Java 8 converts linked list to Red-Black Tree when threshold reaches 8"))
                .build());

        list.add(InterviewQuestionResponse.builder()
                .category("Java")
                .level("Advanced")
                .question("Explain Java Memory Model: Stack vs Heap, and Garbage Collection mechanics.")
                .answer("Stack memory stores primitive local variables and method call frames. Heap memory stores all objects and reference variables. Garbage Collection operates mainly on the Heap (Young Generation: Eden + Survivor spaces S0/S1, Old Generation). Objects that survive minor GC in Eden move to Survivor and eventually Old Gen where Major GC collects them.")
                .codeSnippet("User u = new User(); // 'u' reference is on Stack, 'new User()' object is allocated on Heap")
                .keyPoints(List.of("Stack is thread-isolated, Heap is shared across threads", "G1 and ZGC provide low-pause garbage collection"))
                .build());

        // Spring Boot Questions
        list.add(InterviewQuestionResponse.builder()
                .category("Spring Boot")
                .level("Beginner")
                .question("What is Dependency Injection (DI) and Inversion of Control (IoC)?")
                .answer("IoC is a design principle where the control of object creation and lifecycle is inverted from the application code to a framework/container (ApplicationContext). Dependency Injection is the pattern used to implement IoC: dependencies are provided ('injected') into a bean via Constructor, Setter, or Field.")
                .codeSnippet("@Service\n@RequiredArgsConstructor\npublic class OrderService {\n    private final PaymentService paymentService; // Injected via Constructor\n}")
                .keyPoints(List.of("Constructor injection is recommended (immutable, easier testing)", "ApplicationContext manages the bean lifecycle"))
                .build());

        list.add(InterviewQuestionResponse.builder()
                .category("Spring Boot")
                .level("Intermediate")
                .question("What happens under the hood when @SpringBootApplication is added?")
                .answer("@SpringBootApplication is a meta-annotation composed of: 1) @SpringBootConfiguration (indicates a configuration class), 2) @EnableAutoConfiguration (scans classpath and configures beans automatically based on available starters), 3) @ComponentScan (scans the current package and subpackages for @Component, @Service, @Repository, @Controller).")
                .codeSnippet("@SpringBootApplication // Combines @Configuration, @EnableAutoConfiguration, @ComponentScan\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}")
                .keyPoints(List.of("Auto-configuration conditions use @ConditionalOnClass and @ConditionalOnMissingBean", "spring.factories or AutoConfiguration.imports loads configurations"))
                .build());

        list.add(InterviewQuestionResponse.builder()
                .category("Spring Boot")
                .level("Advanced")
                .question("Explain Spring Security Filter Chain and Stateless JWT Authentication flow.")
                .answer("Spring Security operates through a chain of filters (SecurityFilterChain). In a stateless JWT system: 1) Request arrives, 2) Custom JwtAuthenticationFilter extracts Bearer token, 3) JwtService validates signature and claims, 4) UserDetails is loaded, 5) UsernamePasswordAuthenticationToken is placed into SecurityContextHolder, 6) Controller executes with @PreAuthorize check.")
                .codeSnippet("SecurityContextHolder.getContext().setAuthentication(authToken); // Authenticated for current thread")
                .keyPoints(List.of("Stateless session policy avoids server-side session overhead", "ExceptionTranslationFilter maps AccessDeniedException to 403 HTTP status"))
                .build());

        // SQL Questions
        list.add(InterviewQuestionResponse.builder()
                .category("SQL")
                .level("Intermediate")
                .question("What is the difference between WHERE and HAVING clause, and how do INDEXES work?")
                .answer("WHERE filters rows BEFORE grouping occurs (cannot use aggregate functions like COUNT or AVG). HAVING filters groups AFTER GROUP BY aggregation. B-Tree Indexes speed up data retrieval by maintaining a sorted tree structure, reducing lookups from O(N) full-table scans to O(log N).")
                .codeSnippet("SELECT department, AVG(salary) FROM employees\nWHERE status = 'ACTIVE'\nGROUP BY department\nHAVING AVG(salary) > 80000;")
                .keyPoints(List.of("WHERE applies to individual records; HAVING applies to aggregated groups", "Indexes speed up SELECT but add overhead to INSERT/UPDATE/DELETE"))
                .build());

        // React Questions
        list.add(InterviewQuestionResponse.builder()
                .category("React")
                .level("Intermediate")
                .question("Explain the React Virtual DOM, reconciliation, and useEffect dependency array rules.")
                .answer("React maintains a lightweight JavaScript representation of the DOM (Virtual DOM). When state changes, a new VDOM tree is generated and compared against the previous one (Diffing / Reconciliation algorithm) to update only the changed elements in the real DOM. In useEffect, empty [] runs on mount; [dep] runs when dep changes; omitting the array runs on every render.")
                .codeSnippet("useEffect(() => {\n  fetchData();\n  return () => cleanup(); // Cleanup runs before re-running or unmount\n}, [topicId]);")
                .keyPoints(List.of("Virtual DOM updates are batched for 60fps performance", "Always return cleanup functions for subscriptions and event listeners"))
                .build());

        // C / C++ Questions
        list.add(InterviewQuestionResponse.builder()
                .category("C / C++")
                .level("Beginner")
                .question("What is a Pointer, and what causes a Segmentation Fault?")
                .answer("A pointer is a variable that stores the memory address of another variable. A Segmentation Fault (SIGSEGV) occurs when a program attempts to access a memory address that it does not have permission to access, such as dereferencing a NULL or uninitialized pointer, writing to read-only memory, or buffer overflow.")
                .codeSnippet("int x = 42;\nint *ptr = &x; // ptr holds memory address of x\nprintf(\"%d\", *ptr); // dereference: prints 42")
                .keyPoints(List.of("Always initialize pointers or set to NULL/nullptr", "Free dynamically allocated memory using free() or delete to prevent memory leaks"))
                .build());

        // Python Questions
        list.add(InterviewQuestionResponse.builder()
                .category("Python")
                .level("Intermediate")
                .question("What is the Python GIL (Global Interpreter Lock) and how does memory management work?")
                .answer("The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once in CPython. Python manages memory using reference counting and a cyclic garbage collector to detect and reclaim isolated cycles of referenced objects.")
                .codeSnippet("import sys\na = []\nb = a\nprint(sys.getrefcount(a)) # Reference count is tracked automatically")
                .keyPoints(List.of("For CPU-bound concurrency, use multiprocessing instead of threading", "I/O bound tasks release GIL during I/O operations"))
                .build());

        return list;
    }
}
