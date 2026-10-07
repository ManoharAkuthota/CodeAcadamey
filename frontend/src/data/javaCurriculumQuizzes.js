// Comprehensive Quizzes for Java 21 Mastery Topics 1004 through 1012
// Provides code analysis, output prediction, and architectural comprehension tests

export const JAVA_QUIZZES_1004_1012 = {
  1004: {
    id: 1004,
    topicId: 1004,
    title: 'Classes, Objects & Encapsulation Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'Why should class fields always be declared private and exposed only via validated methods or getters?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Encapsulation',
        hint: 'Think about domain invariants: What stops external callers from setting an account balance to -50,000 if fields are public?',
        options: [
          'To shield internal state from arbitrary mutation and enforce business validation invariants',
          'Because public fields do not work in Java 21',
          'To reduce the size of the compiled .class file on disk',
          'Because private variables are executed on the GPU'
        ],
        correctAnswers: ['To shield internal state from arbitrary mutation and enforce business validation invariants'],
        explanation: 'Encapsulation restricts direct field access, ensuring that all state changes pass through methods that enforce domain rules, validation, and defensive copying.',
        optionJustifications: [
          { option: 'To shield internal state from arbitrary mutation and enforce business validation invariants', isCorrect: true, reason: 'Correct: Encapsulation enforces data hiding and invariant protection.' },
          { option: 'Because public fields do not work in Java 21', isCorrect: false, reason: 'Public fields are valid Java syntax, but an architectural antipattern.' },
          { option: 'To reduce the size of the compiled .class file on disk', isCorrect: false, reason: 'Access specifiers do not affect binary file size significantly.' },
          { option: 'Because private variables are executed on the GPU', isCorrect: false, reason: 'Access specifiers have nothing to do with GPU execution.' }
        ]
      },
      {
        id: 2,
        prompt: 'Where is an object instance allocated when you execute "new BankAccount()"?',
        codeSnippet: 'BankAccount acc = new BankAccount("ACC-1", BigDecimal.ZERO);',
        type: 'SINGLE_CHOICE',
        conceptTag: 'Memory Allocation',
        hint: 'Distinguish between the reference variable (acc) and the actual object instance itself.',
        options: [
          'The object instance is allocated in the Java Heap; the reference variable resides in the Thread Stack frame',
          'The entire object is allocated directly inside CPU cache L1 only',
          'Both the object and reference variable reside in the JVM Metaspace',
          'In the operating system kernel page table'
        ],
        correctAnswers: ['The object instance is allocated in the Java Heap; the reference variable resides in the Thread Stack frame'],
        explanation: 'In Java, "new" allocates the object on the Java Heap (managed by Garbage Collection). The local variable "acc" is a pointer stored on the current thread stack frame.',
        optionJustifications: [
          { option: 'The object instance is allocated in the Java Heap; the reference variable resides in the Thread Stack frame', isCorrect: true, reason: 'Accurate: Java follows heap object allocation with stack reference pointers.' },
          { option: 'The entire object is allocated directly inside CPU cache L1 only', isCorrect: false, reason: 'L1 cache holds cached memory lines, not full Java object allocations.' },
          { option: 'Both the object and reference variable reside in the JVM Metaspace', isCorrect: false, reason: 'Metaspace stores class metadata, not dynamic runtime instances.' },
          { option: 'In the operating system kernel page table', isCorrect: false, reason: 'JVM manages heap allocations, not raw OS kernel page tables.' }
        ]
      }
    ]
  },

  1005: {
    id: 1005,
    topicId: 1005,
    title: 'Inheritance & Polymorphism Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'What is the console output of this polymorphic Java program?',
        codeSnippet: `class Animal {
    void speak() { System.out.print("Generic "); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.print("Woof "); }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();
    }
}`,
        type: 'CODE_OUTPUT',
        conceptTag: 'Dynamic Method Dispatch',
        hint: 'The declared reference type is Animal, but the actual runtime object on the Heap is Dog! Which method does dynamic dispatch invoke?',
        options: ['Woof ', 'Generic ', 'Compilation Error', 'Generic Woof '],
        correctAnswers: ['Woof '],
        explanation: 'Java uses dynamic runtime dispatch via the Virtual Method Table (VTable). Since the actual instance on the heap is a Dog, Dog.speak() is invoked.',
        optionJustifications: [
          { option: 'Woof ', isCorrect: true, reason: 'Dynamic dispatch executes the overridden method of the runtime object.' },
          { option: 'Generic ', isCorrect: false, reason: 'The base method is overridden and replaced in the VTable.' },
          { option: 'Compilation Error', isCorrect: false, reason: 'Upcasting from Dog to Animal is completely valid in Java.' },
          { option: 'Generic Woof ', isCorrect: false, reason: 'Overriding replaces the parent method; it does not chain unless super.speak() is called.' }
        ]
      },
      {
        id: 2,
        prompt: 'What must a child constructor do if its parent class has no default no-argument constructor?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Constructor Chaining',
        hint: 'Subclasses must ensure base state is initialized before child state.',
        options: [
          'Explicitly call super(...) with matching arguments as the very first line of the child constructor',
          'Use the this keyword to call itself repeatedly',
          'Nothing, the compiler creates a blank parent automatically',
          'Declare the child class as static'
        ],
        correctAnswers: ['Explicitly call super(...) with matching arguments as the very first line of the child constructor'],
        explanation: 'If a parent class only defines parameterized constructors, every subclass constructor must explicitly invoke super(...) as its first statement to initialize parent state.',
        optionJustifications: [
          { option: 'Explicitly call super(...) with matching arguments as the very first line of the child constructor', isCorrect: true, reason: 'Mandatory Java constructor chaining requirement.' },
          { option: 'Use the this keyword to call itself repeatedly', isCorrect: false, reason: 'Calling this() recursively causes infinite loops or compilation errors.' },
          { option: 'Nothing, the compiler creates a blank parent automatically', isCorrect: false, reason: 'Compiler only generates super() if a no-arg constructor exists.' },
          { option: 'Declare the child class as static', isCorrect: false, reason: 'Top-level classes cannot be static.' }
        ]
      }
    ]
  },

  1006: {
    id: 1006,
    topicId: 1006,
    title: 'Abstract Classes & Interfaces Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'Which feature introduced in Java 8 allows adding new methods to interfaces without breaking existing implementing classes?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Default Methods',
        hint: 'It uses a specific keyword that provides a default method body.',
        options: [
          'Default methods (using the default keyword)',
          'Static abstract methods',
          'Friend classes',
          'Multiple inheritance of fields'
        ],
        correctAnswers: ['Default methods (using the default keyword)'],
        explanation: 'Default methods allow interfaces to define concrete methods with default implementations, providing backward compatibility when evolving libraries.',
        optionJustifications: [
          { option: 'Default methods (using the default keyword)', isCorrect: true, reason: 'Default methods provide non-breaking backwards compatibility.' },
          { option: 'Static abstract methods', isCorrect: false, reason: 'Static abstract methods do not exist in Java.' },
          { option: 'Friend classes', isCorrect: false, reason: 'Friend classes exist in C++, not in Java.' },
          { option: 'Multiple inheritance of fields', isCorrect: false, reason: 'Java interfaces never hold mutable instance state.' }
        ]
      },
      {
        id: 2,
        prompt: 'Why is programming to an interface (e.g. OrderRepository repo = new SqlOrderRepository()) considered a best practice in software engineering?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Loose Coupling',
        hint: 'Think about unit testing and switching databases in the future.',
        options: [
          'It decouples business services from concrete implementations, enabling easy mocking in tests and pluggable backends',
          'It forces the program to compile into binary C code',
          'It turns off the Java Garbage Collector',
          'It makes the code run in single-threaded mode'
        ],
        correctAnswers: ['It decouples business services from concrete implementations, enabling easy mocking in tests and pluggable backends'],
        explanation: 'Coding to interfaces satisfies the Dependency Inversion Principle, letting you inject test mocks or swap out infrastructure without changing business logic.',
        optionJustifications: [
          { option: 'It decouples business services from concrete implementations, enabling easy mocking in tests and pluggable backends', isCorrect: true, reason: 'Fundamental principle of enterprise decoupled architecture.' },
          { option: 'It forces the program to compile into binary C code', isCorrect: false, reason: 'Bytecode execution remains unchanged.' },
          { option: 'It turns off the Java Garbage Collector', isCorrect: false, reason: 'Interfaces have no effect on GC.' },
          { option: 'It makes the code run in single-threaded mode', isCorrect: false, reason: 'Interfaces do not restrict threading.' }
        ]
      }
    ]
  },

  1007: {
    id: 1007,
    topicId: 1007,
    title: 'Generics & Type Safety Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'What is Type Erasure in Java generics?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Type Erasure',
        hint: 'What does the Java compiler do with <T> when generating .class bytecode?',
        options: [
          'The compiler verifies type safety at compile time, then removes generic type parameters, replacing them with Object or their upper bound in bytecode',
          'A runtime process that deletes unused classes from memory',
          'A security feature that encrypts variable names',
          'A hardware instruction that wipes CPU registers'
        ],
        correctAnswers: ['The compiler verifies type safety at compile time, then removes generic type parameters, replacing them with Object or their upper bound in bytecode'],
        explanation: 'Type Erasure was chosen in Java 5 to maintain 100% backward compatibility with legacy bytecode: generic types are removed after compile-time type verification.',
        optionJustifications: [
          { option: 'The compiler verifies type safety at compile time, then removes generic type parameters, replacing them with Object or their upper bound in bytecode', isCorrect: true, reason: 'Exact definition of Java type erasure.' },
          { option: 'A runtime process that deletes unused classes from memory', isCorrect: false, reason: 'That describes class unloading, not type erasure.' },
          { option: 'A security feature that encrypts variable names', isCorrect: false, reason: 'Type erasure is not encryption.' },
          { option: 'A hardware instruction that wipes CPU registers', isCorrect: false, reason: 'Type erasure is purely a compiler mechanism.' }
        ]
      },
      {
        id: 2,
        prompt: 'According to the PECS principle (Producer Extends, Consumer Super), which wildcard should you use if your method only READS data from a collection of Numbers?',
        codeSnippet: 'public static double sum(List<???> numbers) { ... }',
        type: 'SINGLE_CHOICE',
        conceptTag: 'PECS Wildcards',
        hint: 'The collection produces items for you to read. Producer Extends!',
        options: [
          'List<? extends Number>',
          'List<? super Number>',
          'List<Object>',
          'List<? extends Object & Number>'
        ],
        correctAnswers: ['List<? extends Number>'],
        explanation: 'Producer Extends: When you only read (consume items produced by the list), use <? extends T>. You can safely read items as type Number.',
        optionJustifications: [
          { option: 'List<? extends Number>', isCorrect: true, reason: 'Producer Extends allows reading items safely as Number.' },
          { option: 'List<? super Number>', isCorrect: false, reason: 'Consumer Super is for writing items into the collection.' },
          { option: 'List<Object>', isCorrect: false, reason: 'Inflexible; List<Double> cannot be passed to List<Object> in Java.' },
          { option: 'List<? extends Object & Number>', isCorrect: false, reason: 'Wildcard bounds do not support multiple intersection bounds directly.' }
        ]
      }
    ]
  },

  1008: {
    id: 1008,
    topicId: 1008,
    title: 'Collections Framework: List, Set & Map Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'In Java 8 and later, what does HashMap do when the number of colliding elements in a single bucket reaches 8 (TREEIFY_THRESHOLD)?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'HashMap Treeification',
        hint: 'What data structure drops collision lookup time from O(n) to O(log n)?',
        options: [
          'Converts the bucket linked list into a balanced Red-Black Tree',
          'Throws a HashCollisionException and terminates the program',
          'Deletes the duplicate keys silently',
          'Converts the entire HashMap into an ArrayList'
        ],
        correctAnswers: ['Converts the bucket linked list into a balanced Red-Black Tree'],
        explanation: 'Java 8+ converts crowded bucket linked lists into balanced Red-Black Trees when reaching 8 entries, reducing worst-case lookups from O(n) to O(log n).',
        optionJustifications: [
          { option: 'Converts the bucket linked list into a balanced Red-Black Tree', isCorrect: true, reason: 'Guarantees O(log n) lookup during hash collisions.' },
          { option: 'Throws a HashCollisionException and terminates the program', isCorrect: false, reason: 'Collisions are normal and handled transparently.' },
          { option: 'Deletes the duplicate keys silently', isCorrect: false, reason: 'Keys with different values are preserved.' },
          { option: 'Converts the entire HashMap into an ArrayList', isCorrect: false, reason: 'Only the specific bucket is treeified.' }
        ]
      },
      {
        id: 2,
        prompt: 'What happens if you use a mutable object as a HashMap key and mutate one of its fields after inserting it?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'HashCode Contract',
        hint: 'The key\'s hashCode() changes, but its bucket location does not change!',
        options: [
          'The key can no longer be found via map.get(key), causing a memory leak and silent data loss',
          'The HashMap automatically recalculates and moves the object to the new bucket',
          'The JVM throws an ImmediateKeyMutationException',
          'The key is deleted automatically'
        ],
        correctAnswers: ['The key can no longer be found via map.get(key), causing a memory leak and silent data loss'],
        explanation: 'Mutating a key alters its hashCode. Subsequent map.get() calls check the new bucket rather than the old bucket, making the item unfindable.',
        optionJustifications: [
          { option: 'The key can no longer be found via map.get(key), causing a memory leak and silent data loss', isCorrect: true, reason: 'Hash maps do not re-index on internal key mutation.' },
          { option: 'The HashMap automatically recalculates and moves the object to the new bucket', isCorrect: false, reason: 'HashMaps have no listeners for field mutations.' },
          { option: 'The JVM throws an ImmediateKeyMutationException', isCorrect: false, reason: 'No exception is thrown; failure is silent.' },
          { option: 'The key is deleted automatically', isCorrect: false, reason: 'The entry remains in the old bucket indefinitely.' }
        ]
      }
    ]
  },

  1009: {
    id: 1009,
    topicId: 1009,
    title: 'Exception Handling & Try-with-Resources Assessment',
    difficulty: 'INTERMEDIATE',
    questions: [
      {
        id: 1,
        prompt: 'What is the principal advantage of using try-with-resources over traditional try-catch-finally blocks?',
        codeSnippet: `try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    return br.readLine();
}`,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Try-with-Resources',
        hint: 'What interface enables automatic deterministic closing?',
        options: [
          'Guaranteed deterministic closing of AutoCloseable resources, even if exceptions are thrown, eliminating resource leaks',
          'It converts I/O operations into multithreaded background tasks',
          'It prevents all exceptions from ever occurring',
          'It increases the file read speed by 10x'
        ],
        correctAnswers: ['Guaranteed deterministic closing of AutoCloseable resources, even if exceptions are thrown, eliminating resource leaks'],
        explanation: 'Try-with-resources guarantees that close() is invoked on any AutoCloseable resource when exiting the try block, preventing file descriptor and socket leaks.',
        optionJustifications: [
          { option: 'Guaranteed deterministic closing of AutoCloseable resources, even if exceptions are thrown, eliminating resource leaks', isCorrect: true, reason: 'Guarantees reliable resource deallocation.' },
          { option: 'It converts I/O operations into multithreaded background tasks', isCorrect: false, reason: 'Execution remains synchronous on the current thread.' },
          { option: 'It prevents all exceptions from ever occurring', isCorrect: false, reason: 'Exceptions can still be thrown and caught.' },
          { option: 'It increases the file read speed by 10x', isCorrect: false, reason: 'It provides safety, not raw disk acceleration.' }
        ]
      },
      {
        id: 2,
        prompt: 'Why should enterprise applications NEVER catch java.lang.Error (or catch Throwable indiscriminately)?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Throwable Hierarchy',
        hint: 'Errors include OutOfMemoryError and StackOverflowError.',
        options: [
          'Errors represent fatal JVM problems (like OutOfMemoryError) that cannot be safely recovered from',
          'Because catching Error is a compilation error in Java',
          'Because Error does not inherit from Throwable',
          'Because it shuts down the operating system kernel'
        ],
        correctAnswers: ['Errors represent fatal JVM problems (like OutOfMemoryError) that cannot be safely recovered from'],
        explanation: 'java.lang.Error represents severe JVM conditions where memory or VM state is corrupted. Applications should let them terminate the process.',
        optionJustifications: [
          { option: 'Errors represent fatal JVM problems (like OutOfMemoryError) that cannot be safely recovered from', isCorrect: true, reason: 'JVM state cannot be guaranteed after fatal errors.' },
          { option: 'Because catching Error is a compilation error in Java', isCorrect: false, reason: 'It compiles, but is a severe antipattern.' },
          { option: 'Because Error does not inherit from Throwable', isCorrect: false, reason: 'Error directly subclasses Throwable.' },
          { option: 'Because it shuts down the operating system kernel', isCorrect: false, reason: 'It only affects the JVM process.' }
        ]
      }
    ]
  },

  1010: {
    id: 1010,
    topicId: 1010,
    title: 'Functional Programming & Streams API Assessment',
    difficulty: 'ADVANCED',
    questions: [
      {
        id: 1,
        prompt: 'What is the console output of this Java Streams pipeline?',
        codeSnippet: `List<String> names = List.of("anna", "bob", "alex", "charlie");
long count = names.stream()
    .filter(s -> s.startsWith("a"))
    .map(String::toUpperCase)
    .count();
System.out.println(count);`,
        type: 'CODE_OUTPUT',
        conceptTag: 'Stream Pipeline Evaluation',
        hint: 'Count how many strings start with "a" in the input list.',
        options: ['2', '1', '4', 'Compilation Error'],
        correctAnswers: ['2'],
        explanation: 'Only "anna" and "alex" start with "a". Filter keeps 2 elements. map transforms them to uppercase. count() terminates and returns 2.',
        optionJustifications: [
          { option: '2', isCorrect: true, reason: 'Exactly two strings ("anna", "alex") satisfy the filter condition.' },
          { option: '1', isCorrect: false, reason: 'Both anna and alex match.' },
          { option: '4', isCorrect: false, reason: '"bob" and "charlie" do not start with "a".' },
          { option: 'Compilation Error', isCorrect: false, reason: 'Valid Java stream code.' }
        ]
      },
      {
        id: 2,
        prompt: 'Why are Stream intermediate operations (like filter and map) referred to as "lazy"?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Lazy Evaluation',
        hint: 'When does the pipeline actually start processing items?',
        options: [
          'They do not process any elements until a terminal operation (like collect, count, or findFirst) is invoked',
          'They run on low-priority background threads',
          'They only execute once every 60 seconds',
          'They take twice as long to execute as for-loops'
        ],
        correctAnswers: ['They do not process any elements until a terminal operation (like collect, count, or findFirst) is invoked'],
        explanation: 'Intermediate operations simply build the execution pipeline. Computation only begins when an eager terminal operation requests data.',
        optionJustifications: [
          { option: 'They do not process any elements until a terminal operation (like collect, count, or findFirst) is invoked', isCorrect: true, reason: 'Accurate definition of stream laziness.' },
          { option: 'They run on low-priority background threads', isCorrect: false, reason: 'Streams execute synchronously on the caller thread unless parallel.' },
          { option: 'They only execute once every 60 seconds', isCorrect: false, reason: 'There is no time-based throttling.' },
          { option: 'They take twice as long to execute as for-loops', isCorrect: false, reason: 'Laziness often makes streams faster via short-circuiting.' }
        ]
      }
    ]
  },

  1011: {
    id: 1011,
    topicId: 1011,
    title: 'Multithreading & Virtual Threads Assessment',
    difficulty: 'ADVANCED',
    questions: [
      {
        id: 1,
        prompt: 'What fundamental architectural breakthrough do Java 21 Virtual Threads provide over traditional Platform Threads?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Project Loom Virtual Threads',
        hint: 'Consider how many threads can run without exhausting OS memory.',
        options: [
          'Lightweight user-mode threads multiplexed onto a few OS carrier threads, allowing millions of concurrent tasks with non-blocking unmounting during I/O',
          'They execute Java code directly on GPU graphics cores',
          'They completely remove the need for memory allocation',
          'They disable all garbage collection'
        ],
        correctAnswers: ['Lightweight user-mode threads multiplexed onto a few OS carrier threads, allowing millions of concurrent tasks with non-blocking unmounting during I/O'],
        explanation: 'Virtual Threads cost only a few hundred bytes each and unmount from OS carrier threads on blocking I/O, allowing servers to handle millions of concurrent connections.',
        optionJustifications: [
          { option: 'Lightweight user-mode threads multiplexed onto a few OS carrier threads, allowing millions of concurrent tasks with non-blocking unmounting during I/O', isCorrect: true, reason: 'Core breakthrough of Project Loom in Java 21.' },
          { option: 'They execute Java code directly on GPU graphics cores', isCorrect: false, reason: 'Virtual threads run on the CPU.' },
          { option: 'They completely remove the need for memory allocation', isCorrect: false, reason: 'Continuations are allocated on the Heap.' },
          { option: 'They disable all garbage collection', isCorrect: false, reason: 'GC operates normally.' }
        ]
      },
      {
        id: 2,
        prompt: 'Why is it an antipattern to use a fixed thread pool (e.g. Executors.newFixedThreadPool(50)) with Virtual Threads?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'Virtual Thread Antipatterns',
        hint: 'Virtual threads are designed to be cheap and disposable.',
        options: [
          'Virtual Threads are virtually free to create and should be instantiated one per task, not pooled in limited buckets',
          'Pooling virtual threads crashes the JVM with an OutOfMemoryError',
          'Virtual threads cannot be submitted to executors',
          'Pooling forces all threads to run in single-core mode'
        ],
        correctAnswers: ['Virtual Threads are virtually free to create and should be instantiated one per task, not pooled in limited buckets'],
        explanation: 'Pooling was invented to amortize the expensive 1MB creation cost of OS threads. Virtual threads are disposable; pool the resource, not the thread!',
        optionJustifications: [
          { option: 'Virtual Threads are virtually free to create and should be instantiated one per task, not pooled in limited buckets', isCorrect: true, reason: 'Virtual threads are designed to be transient per task.' },
          { option: 'Pooling virtual threads crashes the JVM with an OutOfMemoryError', isCorrect: false, reason: 'It will run, but limits concurrency unnecessarily.' },
          { option: 'Virtual threads cannot be submitted to executors', isCorrect: false, reason: 'Executors.newVirtualThreadPerTaskExecutor() is standard.' },
          { option: 'Pooling forces all threads to run in single-core mode', isCorrect: false, reason: 'Carrier threads still use all CPU cores.' }
        ]
      }
    ]
  },

  1012: {
    id: 1012,
    topicId: 1012,
    title: 'JVM Memory Architecture & GC Tuning Assessment',
    difficulty: 'ADVANCED',
    questions: [
      {
        id: 1,
        prompt: 'Which modern Java 21 Garbage Collector provides sub-millisecond (< 1ms) maximum pause times even on multi-terabyte heaps?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'ZGC Architecture',
        hint: 'It uses colored pointers and concurrent load barriers.',
        options: [
          'ZGC (Z Garbage Collector, enabled via -XX:+UseZGC)',
          'Serial GC (-XX:+UseSerialGC)',
          'CMS (Concurrent Mark Sweep)',
          'Parallel Mark-Sweep GC'
        ],
        correctAnswers: ['ZGC (Z Garbage Collector, enabled via -XX:+UseZGC)'],
        explanation: 'ZGC performs virtually all phases (marking, relocation, reference processing) concurrently with application threads, guaranteeing pauses under 1 millisecond.',
        optionJustifications: [
          { option: 'ZGC (Z Garbage Collector, enabled via -XX:+UseZGC)', isCorrect: true, reason: 'Sub-millisecond low latency garbage collector in Java 21.' },
          { option: 'Serial GC (-XX:+UseSerialGC)', isCorrect: false, reason: 'Serial GC is single-threaded and causes long pauses.' },
          { option: 'CMS (Concurrent Mark Sweep)', isCorrect: false, reason: 'CMS was deprecated and removed in Java 14.' },
          { option: 'Parallel Mark-Sweep GC', isCorrect: false, reason: 'Parallel GC prioritizes throughput but has multi-second Stop-The-World pauses.' }
        ]
      },
      {
        id: 2,
        prompt: 'What optimization does the C2 JIT compiler perform when Escape Analysis proves an object never escapes the method where it is instantiated?',
        codeSnippet: null,
        type: 'SINGLE_CHOICE',
        conceptTag: 'JIT Escape Analysis',
        hint: 'What is Scalar Replacement?',
        options: [
          'Scalar Replacement: It eliminates Heap allocation completely, mapping object fields to CPU registers or stack slots',
          'It writes the object to the host swap file',
          'It converts the object to a singleton in Metaspace',
          'It forces immediate garbage collection'
        ],
        correctAnswers: ['Scalar Replacement: It eliminates Heap allocation completely, mapping object fields to CPU registers or stack slots'],
        explanation: 'Scalar Replacement disassembles the object into scalar fields and stores them in CPU registers or stack frames, avoiding Heap allocation and GC overhead entirely.',
        optionJustifications: [
          { option: 'Scalar Replacement: It eliminates Heap allocation completely, mapping object fields to CPU registers or stack slots', isCorrect: true, reason: 'Major C2 JIT speed optimization.' },
          { option: 'It writes the object to the host swap file', isCorrect: false, reason: 'The JVM avoids disk writes for active memory.' },
          { option: 'It converts the object to a singleton in Metaspace', isCorrect: false, reason: 'Metaspace is for class metadata, not local objects.' },
          { option: 'It forces immediate garbage collection', isCorrect: false, reason: 'Escape analysis eliminates GC need instead of triggering it.' }
        ]
      }
    ]
  }
};
