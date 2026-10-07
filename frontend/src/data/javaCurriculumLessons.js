// Comprehensive, Handcrafted In-Depth Lessons for Java 21 Mastery Topics 1004 through 1012
// Provides exhaustive technical depth, runtime memory models, enterprise patterns, and interview analysis

export const JAVA_LESSONS_1004_1012 = {
  1004: {
    id: 1004,
    topicId: 1004,
    topicTitle: '4. Classes, Objects & Encapsulation',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Object-Oriented Encapsulation, State Validation & Memory Layout',
    codeLanguage: 'java',
    contentMarkdown: `# Classes, Objects & Encapsulation in Java 21

Encapsulation is the first pillar of Object-Oriented Programming (OOP). It enforces data hiding by combining internal state variables and operations within a single class boundary, while exposing only safe, validated public APIs.

---

### 1. Architectural Foundations: Blueprints vs Instances
- **Class**: The static blueprint residing in the JVM **Metaspace**. It defines fields, methods, constructor signatures, and bytecode instructions.
- **Object**: A concrete instance allocated dynamically on the **Java Heap**. Each object carries:
  1. **Mark Word (8 bytes on 64-bit JVM)**: HashCode, GC generation age, locking monitors.
  2. **Klass Word (4-8 bytes with Compressed OOPs)**: Pointer to the class metadata in Metaspace.
  3. **Instance Fields**: Primitive and reference values defining individual object state.

---

### 2. Information Hiding & Defensive Invariants
In high-reliability enterprise applications (e.g. banking, healthcare, payment gateways), raw public fields are strictly prohibited. 
Allowing \`public double balance\` enables rogue code to set negative balances or mutate state without audit trails.

Encapsulation guarantees:
- **State Validation**: Constructors and setters enforce domain invariants before state changes.
- **Defensive Copying**: Mutable reference fields (like \`Date\` or collections) are duplicated so callers cannot mutate internal state from outside.
- **Thread Safety**: Access methods can be synchronized or backed by atomic variables.

---

### 3. Java 21 Records vs Traditional Encapsulated Classes
- Traditional classes are designed for mutable state machines with rich validation.
- Java 21 **Records** (\`record BankAccountDto(String id, BigDecimal balance) {}\`) provide transparent immutable data carriers with automatic compiler-generated constructor, getters, \`equals()\`, and \`hashCode()\`.`,
    codeSnippet: `import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

public class BankAccount {
    // Encapsulated private state variables
    private final String accountNumber;
    private BigDecimal balance;
    private final Instant createdAt;

    // Constructor enforcing state invariants
    public BankAccount(String accountNumber, BigDecimal initialDeposit) {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number cannot be blank");
        }
        if (initialDeposit == null || initialDeposit.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Initial deposit cannot be negative");
        }
        this.accountNumber = accountNumber.trim();
        this.balance = initialDeposit;
        this.createdAt = Instant.now();
    }

    // Controlled mutation with business rules
    public synchronized void deposit(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit must be strictly positive");
        }
        this.balance = this.balance.add(amount);
    }

    public synchronized boolean withdraw(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal must be strictly positive");
        }
        if (this.balance.compareTo(amount) >= 0) {
            this.balance = this.balance.subtract(amount);
            return true;
        }
        return false;
    }

    // Read-only getters maintaining encapsulation
    public String getAccountNumber() { return accountNumber; }
    public BigDecimal getBalance() { return balance; }
    public Instant getCreatedAt() { return createdAt; }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-90214", new BigDecimal("500.00"));
        acc.deposit(new BigDecimal("150.00"));
        boolean success = acc.withdraw(new BigDecimal("200.00"));
        System.out.println("Account: " + acc.getAccountNumber());
        System.out.println("Remaining Balance: $" + acc.getBalance());
        System.out.println("Withdrawal Successful: " + success);
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines an enterprise-grade BankAccount domain model with encapsulated private fields, validated business invariants, and thread-safe mutation.',
      whyNeeded: 'Direct access to balance would allow arbitrary, invalid, or race-conditioned balance mutations in high-stakes financial software.',
      howItWorks: 'Fields are marked private. Constructors and synchronized methods validate arguments and safely manipulate BigDecimal instances.',
      internalMechanics: 'Instantiating new BankAccount allocates an object in the Heap Eden space. References live in the main thread stack frame.',
      realWorldUsage: 'Core banking account ledgers, e-commerce wallets, and SaaS billing engines.',
      commonMistakes: 'Exposing mutable objects via getters without defensive copies, or using float/double instead of BigDecimal for currency.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'JVM loads BankAccount.class into Metaspace and allocates initial thread frame',
      step2: 'new BankAccount executes constructor, validating accountNumber and balance invariants',
      step3: 'Heap object header points to BankAccount class metadata in Metaspace',
      step4: 'deposit() and withdraw() methods execute atomic arithmetic with BigDecimal',
      step5: 'Getters return validated state while internal variables remain protected from outside mutation'
    }),
    realWorldExample: 'JPMorgan and PayPal banking ledgers enforce strict state encapsulation with immutable account numbers and synchronized transaction auditing.',
    commonMistakes: 'Using public fields for convenience, exposing mutable internal lists via getters, or forgetting non-null checks in constructors.',
    bestPractices: 'Make fields private and final by default. Use BigDecimal for financial calculations. Always validate invariants in constructors.',
    practiceExercise: 'Extend BankAccount by adding a daily withdrawal limit of $1,000.00 that resets every 24 hours.',
    analogy: {
      title: '💡 The Commercial Bank Vault & The Armored Teller Window',
      story: 'Imagine walking into a bank branch. Customers are NOT allowed to walk into the vault, open cash drawers, and hand themselves banknotes (public fields). Instead, all cash stays locked inside the vault (private fields). To deposit or withdraw, customers must talk to the teller through the bulletproof window (public methods), show valid ID (invariant validation), and receive an official receipt!',
      comparisons: [
        { realWorld: 'Cash locked securely inside bank vault', programming: 'private fields (accountNumber, balance)' },
        { realWorld: 'Bulletproof window with teller', programming: 'public methods (deposit(), withdraw())' },
        { realWorld: 'Teller verifying customer ID and slip', programming: 'Constructor & argument validation checks' },
        { realWorld: 'Robber trying to jump behind vault counter', programming: 'Compiler error: balance has private access' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 47,
        title: 'Heap Allocation & Constructor Execution',
        explanation: 'new BankAccount() allocates object on Heap Eden space. Constructor verifies non-blank account and non-negative initial deposit.',
        memoryState: { 'acc': 'ref -> BankAccount@0x7a2b', 'accountNumber': '"ACC-90214"', 'balance': '500.00' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 48,
        title: 'Executing deposit(150.00)',
        explanation: 'Synchronized lock acquired on acc instance. BigDecimal.add() produces new balance 650.00.',
        memoryState: { 'balance': '650.00 (Heap updated)' },
        consoleOutput: ''
      },
      {
        step: 3,
        activeLine: 49,
        title: 'Executing withdraw(200.00)',
        explanation: 'Validates 650.00 >= 200.00. Balance decremented to 450.00, returning boolean true.',
        memoryState: { 'balance': '450.00', 'success': 'true' },
        consoleOutput: ''
      },
      {
        step: 4,
        activeLine: 50,
        title: 'Logging Protected State to Console',
        explanation: 'Reads protected state via getter methods and outputs results to stdout.',
        memoryState: { 'StackFrame': 'main() ready to exit' },
        consoleOutput: 'Account: ACC-90214\nRemaining Balance: $450.00\nWithdrawal Successful: true'
      }
    ],
    microCheck: {
      prompt: 'Why should class fields always be declared private in enterprise Java software?',
      options: [
        'To prevent external code from mutating fields directly and corrupting internal invariants',
        'Because private fields run twice as fast on the CPU',
        'Because Java does not allow public fields to compile',
        'To force the operating system to reboot'
      ],
      correctIndex: 0,
      explanation: 'Correct! Declaring fields private shields internal state from arbitrary mutation and forces all interactions through validated methods.'
    },
    keyTakeaways: [
      'Encapsulation bundles data and validated operations into cohesive classes.',
      'Always declare fields private and provide controlled getters/setters only when necessary.',
      'Validate arguments in constructors to prevent uninitialized or invalid object states.',
      'Use BigDecimal rather than double when modeling monetary balances.'
    ],
    quizId: 1004
  },

  1005: {
    id: 1005,
    topicId: 1005,
    topicTitle: '5. Inheritance & Polymorphism',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Class Hierarchies, Dynamic Polymorphism & VTable Dispatch',
    codeLanguage: 'java',
    contentMarkdown: `# Inheritance & Polymorphism in Java 21

Inheritance establishes an "IS-A" relationship between a base (super) class and derived (sub) classes. 
Polymorphism ("many forms") allows a single interface or base reference to invoke specialized behaviors across different runtime implementations.

---

### 1. The Power of Runtime Dynamic Dispatch
When you invoke an overridden method on a superclass reference:
\`\`\`java
PaymentMethod payment = new CreditCardPayment("TXN-101", "4111222233334444");
payment.processPayment(new BigDecimal("99.99"));
\`\`\`
The compiler only knows that \`payment\` is of type \`PaymentMethod\`. At runtime, the JVM looks up the object's **Virtual Method Table (VTable)** in Metaspace and executes the child's specialized implementation!

---

### 2. Method Overriding vs Method Overloading
| Dimension | Method Overriding (@Override) | Method Overloading |
| :--- | :--- | :--- |
| **Resolution Time** | Runtime (Dynamic Dispatch via VTable) | Compile Time (Static Binding) |
| **Method Signature** | Must be identical (name, parameter types & count) | Same name, different parameter types or counts |
| **Class Scope** | Between Parent and Child classes | Within the same class |
| **Return Type** | Identical or covariant subtype | Can be different |

---

### 3. The super Keyword & Constructor Chaining
- Subclasses do not inherit constructors directly.
- The child constructor MUST invoke \`super(...)\` as its very first statement, ensuring the parent object state is initialized before child fields are set.
- If omitted, the Java compiler automatically inserts an invisible \`super()\` call to the parent default no-arg constructor.`,
    codeSnippet: `import java.math.BigDecimal;

// Abstract Base Class defining common state and contract
public abstract class PaymentMethod {
    protected final String transactionId;

    public PaymentMethod(String transactionId) {
        if (transactionId == null || transactionId.isBlank()) {
            throw new IllegalArgumentException("Transaction ID cannot be blank");
        }
        this.transactionId = transactionId;
    }

    // Abstract method to be overridden by polymorphic subclasses
    public abstract boolean processPayment(BigDecimal amount);

    // Concrete shared logic across all payment types
    public void printAuditSummary(BigDecimal amount, boolean success) {
        System.out.printf("[AUDIT] Tx: %s | Amount: $%s | Status: %s%n",
            transactionId, amount, success ? "APPROVED" : "DECLINED");
    }

    public String getTransactionId() { return transactionId; }
}

// Child Implementation 1: Credit Card
class CreditCardPayment extends PaymentMethod {
    private final String maskedCardNumber;

    public CreditCardPayment(String transactionId, String fullCardNumber) {
        super(transactionId); // Constructor chaining to base class
        this.maskedCardNumber = "•••• " + fullCardNumber.substring(fullCardNumber.length() - 4);
    }

    @Override
    public boolean processPayment(BigDecimal amount) {
        System.out.println("Authorizing Credit Card (" + maskedCardNumber + ") for $" + amount);
        return true; // Approved
    }
}

// Child Implementation 2: Crypto Wallet
class CryptoPayment extends PaymentMethod {
    private final String walletAddress;

    public CryptoPayment(String transactionId, String walletAddress) {
        super(transactionId);
        this.walletAddress = walletAddress;
    }

    @Override
    public boolean processPayment(BigDecimal amount) {
        System.out.println("Broadcasting blockchain tx to wallet " + walletAddress + " for $" + amount);
        return true;
    }
}

// Enterprise Polymorphism Demo
class PaymentGatewayDemo {
    public static void main(String[] args) {
        // Polymorphic collection: Superclass references holding diverse child instances
        PaymentMethod[] payments = {
            new CreditCardPayment("TX-8801", "4532111122229988"),
            new CryptoPayment("TX-8802", "0x7F2a9C...bE41")
        };

        BigDecimal testAmount = new BigDecimal("250.00");
        for (PaymentMethod pm : payments) {
            // Dynamic dispatch resolves to the correct child method at runtime!
            boolean approved = pm.processPayment(testAmount);
            pm.printAuditSummary(testAmount, approved);
        }
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines a PaymentMethod base hierarchy with specialized CreditCardPayment and CryptoPayment children, processing payments polymorphically.',
      whyNeeded: 'Allows payment gateways to process new payment types without rewriting checkout or transaction auditing code.',
      howItWorks: 'PaymentMethod provides common state. Child classes override processPayment(). The JVM uses VTable dispatch to call the right child method.',
      internalMechanics: 'Each class in Metaspace has a VTable of method offsets. Calling processPayment() dereferences the instance Klass pointer to find the exact function address.',
      realWorldUsage: 'Enterprise checkout systems (Stripe, Adyen, PayPal), graphics rendering pipelines, and device driver architectures.',
      commonMistakes: 'Forgetting @Override, or violating the Liskov Substitution Principle by throwing unexpected runtime exceptions in subclasses.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'PaymentMethod[] array holds references to CreditCardPayment and CryptoPayment instances in Heap',
      step2: 'In the loop, pm.processPayment() is invoked via INVOKEVIRTUAL bytecode opcode',
      step3: 'JVM inspects object header Klass pointer to identify the runtime instance type',
      step4: 'VTable lookup resolves to CreditCardPayment.processPayment for index 0 and CryptoPayment for index 1',
      step5: 'Common method printAuditSummary() executes shared parent code for both iterations'
    }),
    realWorldExample: 'Stripe API handles CreditCard, ApplePay, SEPA, and Klarna payments through a single polymorphic PaymentIntent pipeline.',
    commonMistakes: 'Deep, brittle inheritance hierarchies (> 3 levels) which lead to tight coupling. Prefer composition over inheritance when appropriate.',
    bestPractices: 'Annotate all overridden methods with @Override. Adhere to the Liskov Substitution Principle (LSP). Keep base classes abstract.',
    practiceExercise: 'Add a PayPalPayment subclass with email address field and implement processPayment() with two-factor authorization logging.',
    analogy: {
      title: '💡 The Universal USB-C Port & Device Handshake',
      story: 'A laptop comes with standard USB-C ports (the base class PaymentMethod). You can plug in an external Monitor, a Charging Cable, or a high-speed SSD (the subclasses CreditCard, Crypto, PayPal). The laptop operating system doesn\'t need to know the internal electronics of the monitor—it simply sends the standard USB-C signal, and the connected device executes its own specialized display or charging protocol polymorphically!',
      comparisons: [
        { realWorld: 'Standard USB-C Port specification', programming: 'Abstract base class (PaymentMethod)' },
        { realWorld: 'External 4K Monitor, Charger, SSD', programming: 'Subclasses (CreditCardPayment, CryptoPayment)' },
        { realWorld: 'Plugged device auto-handling electrical protocol', programming: 'Runtime dynamic dispatch via VTable' },
        { realWorld: 'Connecting any device without redesigning laptop', programming: 'Open-Closed Principle (OCP)' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 61,
        title: 'Polymorphic Array Initialization',
        explanation: 'PaymentMethod[] array allocates 2 reference slots on Heap. CreditCardPayment and CryptoPayment instances are created.',
        memoryState: { 'payments[0]': 'CreditCardPayment@0x11', 'payments[1]': 'CryptoPayment@0x22' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 68,
        title: 'Dynamic Dispatch: CreditCardPayment',
        explanation: 'JVM inspects payments[0] Klass pointer, finds CreditCardPayment in VTable, and runs its processPayment method.',
        memoryState: { 'maskedCardNumber': '"•••• 9988"' },
        consoleOutput: 'Authorizing Credit Card (•••• 9988) for $250.00\n[AUDIT] Tx: TX-8801 | Amount: $250.00 | Status: APPROVED'
      },
      {
        step: 3,
        activeLine: 68,
        title: 'Dynamic Dispatch: CryptoPayment',
        explanation: 'JVM inspects payments[1] Klass pointer, resolves to CryptoPayment.processPayment(), and broadcasts transaction.',
        memoryState: { 'walletAddress': '"0x7F2a9C...bE41"' },
        consoleOutput: 'Authorizing Credit Card (•••• 9988) for $250.00\n[AUDIT] Tx: TX-8801 | Amount: $250.00 | Status: APPROVED\nBroadcasting blockchain tx to wallet 0x7F2a9C...bE41 for $250.00\n[AUDIT] Tx: TX-8802 | Amount: $250.00 | Status: APPROVED'
      }
    ],
    microCheck: {
      prompt: 'How does the JVM determine which method implementation to execute when an overridden method is called?',
      options: [
        'At runtime, by looking up the actual instance type in the Virtual Method Table (VTable)',
        'At compile time, based strictly on the declared reference type',
        'By randomly picking one of the subclasses',
        'By asking the operating system shell'
      ],
      correctIndex: 0,
      explanation: 'Correct! Dynamic dispatch inspects the actual runtime object on the Heap and invokes the corresponding method using the VTable.'
    },
    keyTakeaways: [
      'Inheritance models IS-A relationships, enabling code reuse and shared base state.',
      'Polymorphism allows treating child objects as their parent type while executing specialized child behavior.',
      'Always add the @Override annotation to catch spelling and signature mismatches at compile time.',
      'Favor composition over inheritance when classes only need functionality rather than identity.'
    ],
    quizId: 1005
  },

  1006: {
    id: 1006,
    topicId: 1006,
    topicTitle: '6. Abstract Classes & Interfaces',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Interfaces, Contracts, Default Methods & Sealed Hierarchies',
    codeLanguage: 'java',
    contentMarkdown: `# Abstract Classes & Interfaces in Java 21

In enterprise software engineering, robust system architecture is built on **Contracts**. 
By coding to interfaces rather than concrete implementations, you decouple components, enabling pluggable backends, effortless unit testing with mocks, and clean dependency inversion.

---

### 1. Abstract Class vs Interface: When to Use Which?
| Capability | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Primary Purpose** | Partial implementation & shared state | Pure capability & behavioral contract |
| **Multiple Inheritance** | NO (Single inheritance of state) | YES (Classes can implement multiple interfaces) |
| **Instance Fields** | Can declare instance fields (\`private int x\`) | Only \`public static final\` constants |
| **Constructors** | Can declare constructors (for subclasses) | No constructors allowed |
| **Modern Features** | Template method pattern | \`default\` methods, \`static\` methods, \`private\` helper methods |

---

### 2. Modern Interface Features in Java 21
- **Default Methods (\`default void log()\`):** Allows adding new methods to interfaces without breaking existing implementing classes.
- **Static Factory Methods (\`static Repo create()\`):** Enables encapsulation of implementation selection within the interface itself.
- **Sealed Interfaces (\`sealed interface Event permits UserLogin, OrderPlaced {}\`):** Restricts which classes are permitted to implement the interface, enabling exhaustive pattern matching in Java 21 \`switch\` expressions!

---

### 3. The Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules; both should depend on abstractions.
By having business services depend on \`OrderRepository\` rather than \`PostgreSqlOrderRepository\`, you can switch to MySQL, DynamoDB, or an in-memory test double without altering a single line of business logic!`,
    codeSnippet: `import java.util.Optional;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// Enterprise Repository Contract
public interface OrderRepository {
    // Core contract methods (implicitly public abstract)
    void save(String orderId, double total);
    Optional<Double> findTotalById(String orderId);

    // Default method providing non-breaking backwards compatibility
    default void audit(String orderId, String action) {
        System.out.printf("[AUDIT LOG - %s] Order %s: %s%n",
            java.time.Instant.now(), orderId, action);
    }

    // Static utility method belonging to the contract namespace
    static boolean isValidOrderId(String id) {
        return id != null && id.startsWith("ORD-") && id.length() >= 8;
    }
}

// In-Memory implementation for fast unit tests or local caching
class InMemoryOrderRepository implements OrderRepository {
    private final Map<String, Double> orderStore = new ConcurrentHashMap<>();

    @Override
    public void save(String orderId, double total) {
        if (!OrderRepository.isValidOrderId(orderId)) {
            throw new IllegalArgumentException("Malformed order ID: " + orderId);
        }
        orderStore.put(orderId, total);
        audit(orderId, "PERSISTED_TO_CACHE");
    }

    @Override
    public Optional<Double> findTotalById(String orderId) {
        return Optional.ofNullable(orderStore.get(orderId));
    }
}

// High-level service depending strictly on the Interface (Loose Coupling)
class OrderService {
    private final OrderRepository repository;

    // Constructor injection of the abstraction
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public void processOrder(String orderId, double total) {
        repository.save(orderId, total);
        Optional<Double> found = repository.findTotalById(orderId);
        found.ifPresent(val -> System.out.println("Verified Order Total in DB: $" + val));
    }

    public static void main(String[] args) {
        // We can plug in InMemory, SQL, or Mock implementations seamlessly!
        OrderRepository repo = new InMemoryOrderRepository();
        OrderService service = new OrderService(repo);

        service.processOrder("ORD-2026-99", 349.50);
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines an OrderRepository interface contract with default auditing, a concrete in-memory implementation, and an OrderService decoupled via constructor injection.',
      whyNeeded: 'Coding to interfaces enables unit testing with mock doubles and lets teams swap database backends without changing business logic.',
      howItWorks: 'OrderRepository defines the methods save and findTotalById. InMemoryOrderRepository implements them with a ConcurrentHashMap. OrderService calls only interface methods.',
      internalMechanics: 'The JVM invokes interface methods using the INVOKEINTERFACE opcode, which resolves method dispatch through the Itable (Interface Table).',
      realWorldUsage: 'Spring Data JpaRepository, JDBC Connection interfaces, and AWS SDK storage providers.',
      commonMistakes: 'Putting state fields into interfaces (which is illegal), or misusing default methods for heavy business logic.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'OrderRepository interface establishes the formal contract for order persistence',
      step2: 'OrderService receives OrderRepository via constructor, enforcing loose coupling',
      step3: 'processOrder validates orderId format with static helper isValidOrderId()',
      step4: 'save() persists data to ConcurrentHashMap and triggers default audit() method',
      step5: 'findTotalById returns an Optional<Double> eliminating NullPointerExceptions'
    }),
    realWorldExample: 'Spring Framework uses interfaces everywhere: CrudRepository, SecurityFilterChain, and AuthenticationManager allow infinite customization without altering core framework logic.',
    commonMistakes: 'Creating giant God interfaces with 50 methods instead of small, focused interfaces (violating the Interface Segregation Principle).',
    bestPractices: 'Follow the Interface Segregation Principle: Keep interfaces small and cohesive. Prefer interfaces over abstract classes for system boundaries.',
    practiceExercise: 'Create a NotificationService interface with sendAlert() and implement two versions: EmailNotificationService and SlackNotificationService.',
    analogy: {
      title: '💡 The International Three-Prong Wall Power Socket',
      story: 'Consider the three-prong power socket in your home wall. The socket is an Interface: it guarantees 120/230 Volts of AC electricity at a specific frequency and pin shape. It doesn\'t care whether the electricity was generated by a Solar Farm, a Hydroelectric Dam, or a Nuclear Reactor (implementations). Your laptop charger plugs directly into the interface and works perfectly regardless of the underlying energy source!',
      comparisons: [
        { realWorld: 'Three-prong wall power socket standard', programming: 'Interface contract (OrderRepository)' },
        { realWorld: 'Solar farm, Wind turbine, Nuclear plant', programming: 'Implementations (InMemoryRepo, PostgresRepo)' },
        { realWorld: 'Laptop charger plugging into wall', programming: 'Consumer class (OrderService depending on repo)' },
        { realWorld: 'Switching home power supplier without changing plugs', programming: 'Swapping database drivers without altering business code' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 53,
        title: 'Wiring Abstraction into Service',
        explanation: 'InMemoryOrderRepository instance is passed to OrderService constructor. OrderService stores reference as interface type.',
        memoryState: { 'repo': 'InMemoryOrderRepository@0x4f', 'service.repository': 'points to @0x4f' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 47,
        title: 'Invoking repository.save() via INVOKEINTERFACE',
        explanation: 'save() checks static predicate isValidOrderId("ORD-2026-99") which returns true.',
        memoryState: { 'isValidOrderId': 'true' },
        consoleOutput: ''
      },
      {
        step: 3,
        activeLine: 35,
        title: 'Executing Default audit() Method',
        explanation: 'Default audit method prints timestamped action log to stdout.',
        memoryState: { 'orderStore': '{ "ORD-2026-99": 349.50 }' },
        consoleOutput: '[AUDIT LOG - 2026-10-07T06:30:00Z] Order ORD-2026-99: PERSISTED_TO_CACHE'
      },
      {
        step: 4,
        activeLine: 49,
        title: 'Safe Optional Retrieval',
        explanation: 'findTotalById returns Optional.of(349.50). ifPresent executes lambda and prints total.',
        memoryState: { 'found': 'Optional[349.50]' },
        consoleOutput: '[AUDIT LOG - 2026-10-07T06:30:00Z] Order ORD-2026-99: PERSISTED_TO_CACHE\nVerified Order Total in DB: $349.5'
      }
    ],
    microCheck: {
      prompt: 'What happens when a class implements an interface in Java?',
      options: [
        'The class must implement all abstract methods declared in the interface (or be declared abstract itself)',
        'The class inherits multiple copies of instance variables',
        'The JVM disables garbage collection for that class',
        'The compiler automatically converts it into a C++ header file'
      ],
      correctIndex: 0,
      explanation: 'Correct! Implementing an interface binds the class to honor the contract by implementing every abstract method, unless the class is declared abstract.'
    },
    keyTakeaways: [
      'Interfaces define contracts with zero state, establishing clean architectural boundaries.',
      'A Java class can implement multiple interfaces, enabling multiple inheritance of type.',
      'Default methods allow adding new capabilities to existing interfaces without breaking backwards compatibility.',
      'Always program to interfaces to maximize testability and loose coupling.'
    ],
    quizId: 1006
  },

  1007: {
    id: 1007,
    topicId: 1007,
    topicTitle: '7. Generics & Type Safety',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Generic Type Safety, Bounded Parameters & Type Erasure',
    codeLanguage: 'java',
    contentMarkdown: `# Generics & Type Safety in Java 21

Before Generics were introduced in Java 5, collections stored raw \`Object\` references. Developers had to manually cast objects when retrieving them, causing frequent, disastrous runtime \`ClassCastException\` crashes.

Generics bring **compile-time type safety**, enabling classes, interfaces, and methods to operate on parameterized types with zero runtime casting overhead.

---

### 1. Anatomy of Generic Syntax
- \`<T>\`: Type parameter placeholder (by convention: \`T\` for Type, \`E\` for Element, \`K\` for Key, \`V\` for Value).
- **Generic Classes**: \`public class ApiResponse<T> { private T data; }\`
- **Generic Methods**: \`public static <T> void swap(T[] array, int i, int j)\`

---

### 2. Bounded Type Parameters (<T extends Number>)
You can restrict the permissible types using bounds:
- **Upper Bound (\`T extends Comparable<T>\`)**: Restricts \`T\` to types that implement \`Comparable\` or subclass a specific parent.
- **Multiple Bounds (\`T extends Number & Serializable\`)**: \`T\` must satisfy both conditions.

---

### 3. The PECS Principle (Wildcards)
When working with wildcards (\`?\`):
- **Producer Extends (\`? extends T\`)**: Use this when you only READ from the structure. You can safely read \`T\`, but cannot write anything (except \`null\`).
- **Consumer Super (\`? super T\`)**: Use this when you only WRITE to the structure. You can safely write \`T\`, but reading only yields \`Object\`.

---

### 4. How Java Implements Generics: Type Erasure
The JVM bytecode has **no concept of generics**. 
During compilation, the Java compiler enforces type checks, inserts necessary synthetic casts, and then **erases** all generic type parameters:
- Unbounded \`<T>\` is erased to \`Object\`.
- Bounded \`<T extends Number>\` is erased to \`Number\`.
This design ensures complete 100% backward compatibility with pre-Java 5 legacy bytecode!`,
    codeSnippet: `import java.util.List;
import java.util.ArrayList;

// Enterprise Generic API Envelope used across Microservices
public class ApiResponse<T> {
    private final int statusCode;
    private final String message;
    private final T payload;

    public ApiResponse(int statusCode, String message, T payload) {
        this.statusCode = statusCode;
        this.message = message;
        this.payload = payload;
    }

    // Static Generic Factory Method with its own type parameter <T>
    public static <T> ApiResponse<T> ok(T payload) {
        return new ApiResponse<>(200, "SUCCESS", payload);
    }

    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }

    public T getPayload() { return payload; }
    public int getStatusCode() { return statusCode; }
    public String getMessage() { return message; }
}

// Bounded Generics & PECS Demo
class GenericsUtility {
    // Bounded Generic Method: Compares two items that implement Comparable
    public static <T extends Comparable<T>> T findMax(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    // PECS: Producer Extends - Reads and sums any collection of Numbers
    public static double sumOfList(List<? extends Number> list) {
        double total = 0.0;
        for (Number n : list) {
            total += n.doubleValue(); // Safe to read as Number
        }
        return total;
    }

    public static void main(String[] args) {
        // 1. Type-Safe API Envelope with String payload
        ApiResponse<String> stringResp = ApiResponse.ok("User Token Verified");
        System.out.println("Payload: " + stringResp.getPayload().toUpperCase());

        // 2. Type-Safe API Envelope with Integer payload
        ApiResponse<Integer> intResp = ApiResponse.ok(42);
        System.out.println("Numeric Result: " + (intResp.getPayload() * 10));

        // 3. Bounded Generics Comparison
        String maxWord = findMax("Zebra", "Apple");
        System.out.println("Alphabetical Max: " + maxWord);

        // 4. Wildcard Summation
        List<Double> stockPrices = List.of(150.25, 230.50, 45.75);
        System.out.println("Total Portfolio Value: $" + sumOfList(stockPrices));
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines a generic ApiResponse<T> wrapper and demonstrates bounded type parameters and wildcard covariance using the PECS principle.',
      whyNeeded: 'Prevents ClassCastExceptions at runtime and allows reusable algorithms across diverse data types without duplicating code.',
      howItWorks: 'The compiler validates that payload matches T. During compilation, javac erases T to Object and inserts type casts automatically.',
      internalMechanics: 'Type Erasure converts ApiResponse<T> into raw ApiResponse in bytecode. Bridge methods are generated to preserve polymorphism.',
      realWorldUsage: 'Spring ResponseEntity<T>, Optional<T>, CompletableFuture<T>, and database repository interfaces.',
      commonMistakes: 'Attempting to instantiate a generic type directly (new T()), which fails because T is erased at runtime.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'Compiler verifies type arguments (String, Integer, Double) at compile time',
      step2: 'findMax utilizes bounded type parameter <T extends Comparable<T>> to invoke compareTo()',
      step3: 'sumOfList accepts List<? extends Number>, allowing List<Double> or List<Integer>',
      step4: 'Type Erasure removes generic syntax from .class bytecode, replacing T with Object/Number',
      step5: 'Program executes with 100% type safety and zero runtime ClassCastExceptions'
    }),
    realWorldExample: 'Spring Boot ResponseEntity<UserDto> encapsulates HTTP status codes, headers, and type-safe payload bodies returned to web clients.',
    commonMistakes: 'Trying to use primitive types as generic arguments (e.g. List<int> instead of List<Integer>), or creating generic arrays (new T[10]).',
    bestPractices: 'Remember PECS: Producer Extends, Consumer Super. Use bounded parameters to restrict types. Avoid raw types (List without <T>).',
    practiceExercise: 'Write a generic Stack<T> class with push(T item), pop(), and isEmpty() methods backed by an internal ArrayList.',
    analogy: {
      title: '💡 The Transparent Shipping Container & Cargo Inspection',
      story: 'Imagine shipping containers in an international cargo port. In ancient times (pre-Java 5), every crate was an unlabeled black wooden box (Object). You didn\'t know if it contained fine porcelain or heavy steel pipes until you pried it open at the destination (runtime cast), risking a shattered vase (ClassCastException)! With Generics, every container has a transparent RFID badge marked `<Porcelain>` or `<SteelPipe>`. The port crane automatically rejects attempts to load steel into the porcelain hold at the dock (compile-time safety)!',
      comparisons: [
        { realWorld: 'Black mystery crate', programming: 'Pre-Generics raw Object' },
        { realWorld: 'Transparent container marked <Porcelain>', programming: 'Generic class ApiResponse<Porcelain>' },
        { realWorld: 'Dock crane preventing mismatched cargo', programming: 'Compile-time type verification by javac' },
        { realWorld: 'Prying open box and finding broken dishes', programming: 'Runtime ClassCastException crash' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 43,
        title: 'Constructing ApiResponse<String>',
        explanation: 'Compiler verifies payload is a String. Allocates ApiResponse on Heap with payload "User Token Verified".',
        memoryState: { 'stringResp': 'ApiResponse<String>', 'payload': '"User Token Verified"' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 44,
        title: 'Calling String Method Without Casting',
        explanation: 'Because payload is known to be String, .toUpperCase() is called directly without manual (String) casting.',
        memoryState: { 'output': '"USER TOKEN VERIFIED"' },
        consoleOutput: 'Payload: USER TOKEN VERIFIED'
      },
      {
        step: 3,
        activeLine: 51,
        title: 'Bounded Comparison with findMax()',
        explanation: 'findMax compares "Zebra" and "Apple" using String.compareTo(). "Zebra" is returned as the maximum.',
        memoryState: { 'maxWord': '"Zebra"' },
        consoleOutput: 'Payload: USER TOKEN VERIFIED\nNumeric Result: 420\nAlphabetical Max: Zebra'
      },
      {
        step: 4,
        activeLine: 56,
        title: 'Wildcard Processing via PECS',
        explanation: 'sumOfList processes List<Double> as List<? extends Number>, summing 150.25 + 230.50 + 45.75 = 426.50.',
        memoryState: { 'total': '426.5' },
        consoleOutput: 'Payload: USER TOKEN VERIFIED\nNumeric Result: 420\nAlphabetical Max: Zebra\nTotal Portfolio Value: $426.5'
      }
    ],
    microCheck: {
      prompt: 'What happens to generic type parameters like <T> during Java compilation?',
      options: [
        'They are erased by the compiler and replaced with Object or their upper bound (Type Erasure)',
        'They are converted into separate C++ templates for each primitive',
        'They remain as distinct runtime types stored in CPU registers',
        'They cause the JVM to allocate 2x more Heap memory'
      ],
      correctIndex: 0,
      explanation: 'Correct! Java uses Type Erasure: generic types exist solely for compile-time verification and are erased in bytecode for backward compatibility.'
    },
    keyTakeaways: [
      'Generics provide compile-time type safety and eliminate runtime ClassCastExceptions.',
      'PECS Principle: Use ? extends T when reading data; use ? super T when writing data.',
      'Bounded generics (<T extends Comparable<T>>) restrict type arguments to specific capabilities.',
      'Type Erasure removes type parameters from compiled bytecode, replacing them with Object or the bound.'
    ],
    quizId: 1007
  },

  1008: {
    id: 1008,
    topicId: 1008,
    topicTitle: '8. Collections Framework: List, Set & Map',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Collections Architecture: List, Set, Map & Hash Collision Resolution',
    codeLanguage: 'java',
    contentMarkdown: `# The Java Collections Framework in Java 21

The Java Collections Framework (JCF) provides standardized, high-performance data structures for storing and manipulating groups of objects. 
Choosing the correct collection structure directly dictates your application's algorithmic time complexity (Big-O) and memory footprint.

---

### 1. The Core Hierarchy of Collections
\`\`\`
          java.util.Collection
          ├── java.util.List      (Ordered, allows duplicates, index-based)
          │    ├── ArrayList      (Contiguous dynamic array, O(1) random access)
          │    └── LinkedList     (Doubly linked nodes, O(1) head/tail insertions)
          ├── java.util.Set       (Unordered, NO duplicates, mathematical set)
          │    ├── HashSet        (Backed by HashMap, O(1) average lookup)
          │    └── TreeSet        (Red-Black tree, O(log n), sorted order)
          └── java.util.Queue     (FIFO order, buffers, thread pools)

          java.util.Map           (Key-Value pairs, unique keys)
          ├── HashMap             (Hash table, O(1) average get/put)
          ├── LinkedHashMap       (Maintains insertion or access order)
          └── ConcurrentHashMap   (Thread-safe, partitioned lock striping)
\`\`\`

---

### 2. Under the Hood of HashMap: Buckets & Treeification
\`HashMap\` is the most widely used collection in enterprise Java. Here is how it operates internally:
1. **Array of Buckets**: It starts with an internal array of \`Node<K,V>[] table\` with a default capacity of 16 and a load factor of 0.75.
2. **Hash Function**: When you call \`map.put(key, value)\`, Java computes \`hash(key.hashCode())\` and calculates the bucket index via \`index = (n - 1) & hash\`.
3. **Collision Handling**: If two keys hash to the same bucket (collision):
   - Java initially stores them as a singly linked list in that bucket.
   - **Treeification (Java 8+)**: If the number of collisions in a single bucket reaches **8** (\`TREEIFY_THRESHOLD\`) and table capacity >= 64, Java converts that linked list into a balanced **Red-Black Tree (\`TreeNode\`)**!
   - This drops the worst-case lookup time from **O(n)** down to **O(log n)**, defending against Hash-DoS attacks!

---

### 3. The hashCode() and equals() Contract
If you use a custom object as a \`HashMap\` key or in a \`HashSet\`, you MUST follow the contract:
- If \`a.equals(b) == true\`, then \`a.hashCode() == b.hashCode()\` MUST also be true!
- If two objects have different hash codes, they are guaranteed to be unequal.
- If you override \`equals()\`, you MUST also override \`hashCode()\`, otherwise hash lookups will fail to find your object!`,
    codeSnippet: `import java.util.*;

public class CollectionsMasteryDemo {
    // Domain record with automatic equals() and hashCode() contract implementation
    record Product(String sku, String name, double price) {}

    public static void main(String[] args) {
        // 1. LIST: Fast index-based access with dynamic array resizing
        List<Product> catalog = new ArrayList<>(16);
        catalog.add(new Product("SKU-1", "Mechanical Keyboard", 129.99));
        catalog.add(new Product("SKU-2", "Wireless Mouse", 59.99));
        catalog.add(new Product("SKU-3", "4K Ultra Monitor", 399.00));

        System.out.println("Item at index 1: " + catalog.get(1).name());

        // 2. SET: Automatic deduplication based on equals() and hashCode()
        Set<String> uniqueCategories = new HashSet<>();
        uniqueCategories.add("Hardware");
        uniqueCategories.add("Peripherals");
        uniqueCategories.add("Hardware"); // Duplicate ignored!

        System.out.println("Unique Categories Count: " + uniqueCategories.size());

        // 3. MAP: Fast O(1) Key-Value lookup by SKU
        Map<String, Product> productLookup = new HashMap<>();
        for (Product p : catalog) {
            productLookup.put(p.sku(), p);
        }

        // Fast retrieval in O(1) time
        String searchSku = "SKU-3";
        if (productLookup.containsKey(searchSku)) {
            Product found = productLookup.get(searchSku);
            System.out.printf("Found: %s (Price: $%.2f)%n", found.name(), found.price());
        }

        // Iterating Map entries efficiently
        System.out.println("\\n--- Full Catalog Index ---");
        for (Map.Entry<String, Product> entry : productLookup.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue().name());
        }
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Demonstrates ArrayList for ordered dynamic storage, HashSet for deduplication, and HashMap for O(1) SKU product lookup.',
      whyNeeded: 'Mastering the right collection choices prevents performance bottlenecks and memory leaks in production microservices.',
      howItWorks: 'ArrayList stores elements in a contiguous Heap array. HashSet is backed by a HashMap. HashMap uses hash buckets with linked-list/tree collision resolution.',
      internalMechanics: 'HashMap hashes the String SKU key using murmur-style bit spread and places it into bucket table[(capacity - 1) & hash].',
      realWorldUsage: 'Shopping carts, product catalogs, caching layers, and search indices.',
      commonMistakes: 'Using LinkedList instead of ArrayList for general lists (LinkedList incurs massive pointer overhead and poor CPU cache locality).'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'ArrayList allocates backing Object[] array with initial capacity of 16',
      step2: 'HashSet puts items into an internal HashMap where values are a dummy PRESENT object',
      step3: 'HashMap computes key.hashCode(), resolves bucket index via bitwise AND',
      step4: 'productLookup.get("SKU-3") accesses the exact array index directly in O(1) time',
      step5: 'Map entrySet() provides an efficient iterator over all bucket nodes'
    }),
    realWorldExample: 'Amazon product catalogs use distributed hash maps with secondary Redis caches to retrieve product metadata in sub-millisecond latency.',
    commonMistakes: 'Using a mutable object as a HashMap key and mutating its state after insertion, which breaks hash lookups permanently.',
    bestPractices: 'Always use immutable objects (like String, Long, or Java 21 Records) as HashMap keys. Always override hashCode() whenever overriding equals().',
    practiceExercise: 'Implement a word frequency counter that takes a paragraph of text and returns a Map<String, Integer> of word counts.',
    analogy: {
      title: '💡 The 16-Drawer Post Office Mail Sorting Desk',
      story: 'Imagine a central postal sorting facility with 16 giant mail bins. When a letter arrives, the sorter looks at the postal code (hashCode()), applies a quick formula, and tosses the envelope directly into Bin #7 (the bucket). If Bin #7 only has 2 letters, finding yours takes half a second (linked list). But if holiday mail causes Bin #7 to overflow with 8+ letters, an automated robotic arm organizes them in alphabetical order (treeification to Red-Black Tree) so letters are retrieved in O(log n) time!',
      comparisons: [
        { realWorld: 'Postal code on letter envelope', programming: 'key.hashCode()' },
        { realWorld: '16 sorting bins', programming: 'Internal Node<K,V>[] table buckets' },
        { realWorld: 'Two letters landing in the same bin', programming: 'Hash collision' },
        { realWorld: 'Sorting bin alphabetized when > 8 letters', programming: 'Treeification into Red-Black Tree (O(log n))' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 10,
        title: 'ArrayList Allocation & Population',
        explanation: 'ArrayList initializes internal Object[] array with capacity 16. Products added sequentially.',
        memoryState: { 'catalog': 'ArrayList (size: 3, capacity: 16)' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 15,
        title: 'Random Access by Index',
        explanation: 'catalog.get(1) computes pointer offset directly in O(1) time and retrieves Wireless Mouse.',
        memoryState: { 'index 1': 'Product("SKU-2", ...)' },
        consoleOutput: 'Item at index 1: Wireless Mouse'
      },
      {
        step: 3,
        activeLine: 18,
        title: 'HashSet Deduplication',
        explanation: 'Adding "Hardware" twice tests existing hash bucket; duplicate is safely rejected.',
        memoryState: { 'uniqueCategories': '["Hardware", "Peripherals"]' },
        consoleOutput: 'Item at index 1: Wireless Mouse\nUnique Categories Count: 2'
      },
      {
        step: 4,
        activeLine: 31,
        title: 'O(1) HashMap Retrieval',
        explanation: 'productLookup.get("SKU-3") hashes the SKU key and retrieves the 4K Monitor in O(1) time.',
        memoryState: { 'found': 'Product("SKU-3", "4K Ultra Monitor", 399.00)' },
        consoleOutput: 'Item at index 1: Wireless Mouse\nUnique Categories Count: 2\nFound: 4K Ultra Monitor (Price: $399.00)'
      }
    ],
    microCheck: {
      prompt: 'What does Java 8+ do when a single HashMap bucket has more than 8 colliding entries (TREEIFY_THRESHOLD)?',
      options: [
        'Converts the bucket linked list into a balanced Red-Black Tree, reducing lookup time to O(log n)',
        'Throws a FatalHashCollisionException and shuts down the JVM',
        'Deletes the entire HashMap and starts over',
        'Converts the HashMap into an array of integers'
      ],
      correctIndex: 0,
      explanation: 'Correct! Java converts the collision chain into a balanced Red-Black Tree to defend against O(n) worst-case performance degradations.'
    },
    keyTakeaways: [
      'ArrayList provides O(1) index lookups; use it as your default List implementation.',
      'HashSet ensures zero duplicate elements by leveraging HashMap key mechanics.',
      'HashMap delivers O(1) amortized key-value lookups; buckets treeify at 8 collisions.',
      'Never mutate a key object after inserting it into a HashMap or HashSet.'
    ],
    quizId: 1008
  },

  1009: {
    id: 1009,
    topicId: 1009,
    topicTitle: '9. Exception Handling, Custom Exceptions & Try-with-Resources',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Fault-Tolerant Exception Architectures & Try-With-Resources',
    codeLanguage: 'java',
    contentMarkdown: `# Exception Handling & Try-with-Resources in Java 21

Exceptions are runtime signals that alert the application when unexpected states, hardware failures, or business rule violations occur.
Writing resilient enterprise software requires mastering the exception hierarchy, domain-specific custom exceptions, and deterministic resource management.

---

### 1. The Java Throwable Hierarchy
\`\`\`
                    java.lang.Throwable
                    ├── java.lang.Error        (JVM crashes, OutOfMemoryError, StackOverflowError - Do NOT catch!)
                    └── java.lang.Exception    (Application-level issues)
                         ├── Checked Exceptions     (IOException, SQLException - Enforced by compiler)
                         └── RuntimeException       (Unchecked - NullPointerException, IllegalArgumentException)
\`\`\`

---

### 2. Checked vs Unchecked Exceptions: Modern Best Practices
- **Checked Exceptions (subclasses of \`Exception\` but not \`RuntimeException\`)**:
  - The compiler forces callers to handle with \`try-catch\` or declare with \`throws\`.
  - Intended for recoverable environmental failures (e.g. file missing, network timeout).
  - *Modern Industry Trend*: Spring, Hibernate, and modern cloud frameworks avoid checked exceptions because they clutter signatures and cause tight coupling.
- **Unchecked Exceptions (subclasses of \`RuntimeException\`)**:
  - Indicate programmatic bugs or unrecoverable domain invariant violations.
  - Handled centrally using global exception interceptors (e.g. \`@RestControllerAdvice\` in Spring Boot).

---

### 3. Automatic Resource Management: Try-with-Resources
Before Java 7, closing database connections or file streams required messy, error-prone \`finally\` blocks.
Java's **Try-with-Resources** statement automatically closes any resource that implements the **\`java.lang.AutoCloseable\`** interface—even if exceptions are thrown!

---

### 4. Designing Domain-Specific Custom Exceptions
Never throw generic \`new RuntimeException("Something broke")\` in production.
Create domain-specific exceptions that encapsulate error codes, offending IDs, and actionable error messages for monitoring systems like Sentry or Datadog.`,
    codeSnippet: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

// Domain-specific custom runtime exception carrying business context
class InsufficientFundsException extends RuntimeException {
    private final String accountNumber;
    private final double attemptedAmount;
    private final double currentBalance;

    public InsufficientFundsException(String accountNumber, double attempted, double balance) {
        super(String.format("Account %s overdraft: Attempted to withdraw $%.2f with only $%.2f available",
            accountNumber, attempted, balance));
        this.accountNumber = accountNumber;
        this.attemptedAmount = attempted;
        this.currentBalance = balance;
    }

    public String getAccountNumber() { return accountNumber; }
    public double getAttemptedAmount() { return attemptedAmount; }
    public double getCurrentBalance() { return currentBalance; }
}

// Enterprise Account Service
class AccountService {
    private double balance = 100.00;

    public void processWithdrawal(String accNo, double amount) {
        if (amount > balance) {
            // Throw custom exception with rich contextual data
            throw new InsufficientFundsException(accNo, amount, balance);
        }
        balance -= amount;
        System.out.printf("Withdrawal of $%.2f approved. New balance: $%.2f%n", amount, balance);
    }
}

public class ExceptionHandlingDemo {
    public static void main(String[] args) {
        AccountService service = new AccountService();

        // 1. Handling custom domain exception
        try {
            System.out.println("Attempting withdrawal of $250.00...");
            service.processWithdrawal("ACC-4401", 250.00);
        } catch (InsufficientFundsException ex) {
            System.err.println("[ALERT] Business rule violation caught: " + ex.getMessage());
            System.err.println("Deficit Amount: $" + (ex.getAttemptedAmount() - ex.getCurrentBalance()));
        }

        // 2. Try-with-Resources: Guaranteed automatic cleanup of AutoCloseable streams
        String mockFileData = "Row 1: Transaction Ledger\\nRow 2: Audit Check Complete";
        System.out.println("\\n--- Parsing Ledger via Try-With-Resources ---");

        try (BufferedReader reader = new BufferedReader(new StringReader(mockFileData))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Processing: " + line);
            }
        } catch (IOException e) {
            System.err.println("I/O Failure: " + e.getMessage());
        } // reader.close() is automatically called right here!

        System.out.println("System pipeline executed cleanly with zero resource leaks.");
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Defines an InsufficientFundsException carrying business context, throws it conditionally in AccountService, and demonstrates AutoCloseable try-with-resources stream reading.',
      whyNeeded: 'Prevents application crashes, provides structured error data for monitoring, and eliminates file descriptor and database connection leaks.',
      howItWorks: 'AccountService checks balance and throws custom exception. The caller catches it. Try-with-resources generates bytecode to call close() in an invisible finally block.',
      internalMechanics: 'When an exception is thrown, the JVM pauses normal execution and unwinds the thread call stack frame by frame looking for a matching catch block.',
      realWorldUsage: 'Enterprise banking transaction validation, Spring Boot @ExceptionHandler advice, and JDBC connection pool pooling.',
      commonMistakes: 'Catching java.lang.Error (like OutOfMemoryError), swallowing exceptions with empty catch blocks, or forgetting try-with-resources on database statements.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'AccountService verifies that attempted withdrawal of $250 exceeds current $100 balance',
      step2: 'InsufficientFundsException is instantiated with account number, deficit, and balance',
      step3: 'JVM unwinds thread stack until main() catch block intercepts the exception',
      step4: 'Try-with-resources statement opens BufferedReader on mock input stream',
      step5: 'Upon leaving the try block, the JVM automatically invokes reader.close(), releasing resources'
    }),
    realWorldExample: 'Payment processors like Stripe catch InsufficientFundsException and map it to an HTTP 402 Payment Required response for mobile clients.',
    commonMistakes: 'Catching Exception or Throwable indiscriminately, which hides NullPointerExceptions and bugs. Always catch specific exception classes.',
    bestPractices: 'Use Try-With-Resources for all streams and connections. Create custom unchecked exceptions for business domain violations. Never log and rethrow.',
    practiceExercise: 'Create a custom InvalidEmailException and write a method validateEmail(String email) that throws it if the email lacks an @ symbol.',
    analogy: {
      title: '💡 The Airplane Oxygen Mask & Auto-Sealing Bulkheads',
      story: 'When an airplane experiences cabin depressurization (a runtime exception), the plane does NOT simply crash (program crash). Instead, emergency oxygen masks deploy from the ceiling automatically (the catch block), and hydraulic fire bulkheads seal off the cargo hold deterministically (try-with-resources closing file handles). The pilots receive an exact warning code with altitude and PSI data (custom domain exception) to reroute safely to the nearest runway!',
      comparisons: [
        { realWorld: 'Depressurization event', programming: 'Exception condition encountered' },
        { realWorld: 'Oxygen masks dropping to passengers', programming: 'try-catch block intercepting the error' },
        { realWorld: 'Hydraulic safety doors sealing automatically', programming: 'Try-with-resources closing AutoCloseable streams' },
        { realWorld: 'Flight computer showing exact cockpit error telemetry', programming: 'Custom exception fields (accNo, deficit)' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 41,
        title: 'Evaluating Withdrawal Invariant',
        explanation: 'processWithdrawal checks 250.00 > 100.00. Invariant violated; throws InsufficientFundsException.',
        memoryState: { 'balance': '100.00', 'amount': '250.00' },
        consoleOutput: 'Attempting withdrawal of $250.00...'
      },
      {
        step: 2,
        activeLine: 44,
        title: 'Stack Unwinding & Catch Interception',
        explanation: 'JVM unwinds stack to main() catch block, extracting rich diagnostic telemetry from custom exception.',
        memoryState: { 'ex.attemptedAmount': '250.00', 'ex.currentBalance': '100.00' },
        consoleOutput: 'Attempting withdrawal of $250.00...\n[ALERT] Business rule violation caught: Account ACC-4401 overdraft: Attempted to withdraw $250.00 with only $100.00 available\nDeficit Amount: $150.0'
      },
      {
        step: 3,
        activeLine: 53,
        title: 'Try-With-Resources Stream Processing',
        explanation: 'BufferedReader reads lines from mock StringReader inside guarded try block.',
        memoryState: { 'line': '"Row 1: Transaction Ledger"' },
        consoleOutput: 'Attempting withdrawal of $250.00...\n[ALERT] Business rule violation caught: Account ACC-4401 overdraft: Attempted to withdraw $250.00 with only $100.00 available\nDeficit Amount: $150.0\n\n--- Parsing Ledger via Try-With-Resources ---\nProcessing: Row 1: Transaction Ledger\nProcessing: Row 2: Audit Check Complete'
      },
      {
        step: 4,
        activeLine: 60,
        title: 'Deterministic AutoCloseable Cleanup',
        explanation: 'Exiting try-with-resources block triggers reader.close() automatically, releasing resources.',
        memoryState: { 'reader': 'Closed (AutoCloseable)' },
        consoleOutput: 'Attempting withdrawal of $250.00...\n[ALERT] Business rule violation caught: Account ACC-4401 overdraft: Attempted to withdraw $250.00 with only $100.00 available\nDeficit Amount: $150.0\n\n--- Parsing Ledger via Try-With-Resources ---\nProcessing: Row 1: Transaction Ledger\nProcessing: Row 2: Audit Check Complete\nSystem pipeline executed cleanly with zero resource leaks.'
      }
    ],
    microCheck: {
      prompt: 'What interface must a resource implement to be managed automatically by Java try-with-resources?',
      options: [
        'java.lang.AutoCloseable (or java.io.Closeable)',
        'java.lang.Runnable',
        'java.io.Serializable',
        'java.lang.Cloneable'
      ],
      correctIndex: 0,
      explanation: 'Correct! The try-with-resources statement requires resources to implement AutoCloseable, guaranteeing that close() is called deterministically.'
    },
    keyTakeaways: [
      'Checked exceptions are enforced at compile time; unchecked RuntimeExceptions represent programmatic or domain rule failures.',
      'Always use Try-with-Resources to guarantee closing files, sockets, and database connections.',
      'Create domain-specific custom exceptions to encapsulate structured business diagnostic data.',
      'Never catch java.lang.Error or swallow exceptions silently with an empty catch block.'
    ],
    quizId: 1009
  },

  1010: {
    id: 1010,
    topicId: 1010,
    topicTitle: '10. Functional Programming, Lambdas & Streams API',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Declarative Data Pipelines, Lambdas & Streams API in Java 21',
    codeLanguage: 'java',
    contentMarkdown: `# Functional Programming & Streams API in Java 21

The Java Streams API transforms how developers process collections. Instead of imperative for-loops with nested if-statements and mutable accumulator variables, Streams enable **declarative, composable data pipelines**.

---

### 1. Anatomy of a Stream Pipeline
A stream pipeline consists of three distinct phases:
1. **Source**: Originating collection, array, or generator (\`list.stream()\`).
2. **Intermediate Operations (Lazy)**: Transforms the stream into another stream without executing immediately:
   - \`filter(Predicate<T>)\`: Keeps elements satisfying a condition.
   - \`map(Function<T, R>)\`: Transforms elements from type T to R.
   - \`sorted()\`, \`distinct()\`, \`limit(n)\`.
3. **Terminal Operation (Eager)**: Triggers execution of the pipeline and produces a result:
   - \`collect(Collectors.toList())\`, \`collect(Collectors.groupingBy(...))\`.
   - \`reduce()\`, \`count()\`, \`forEach()\`, \`findFirst()\`.

---

### 2. Core Functional Interfaces (java.util.function)
- **Predicate<T>**: \`T -> boolean\` (used in \`filter\`).
- **Function<T, R>**: \`T -> R\` (used in \`map\`).
- **Consumer<T>**: \`T -> void\` (used in \`forEach\`).
- **Supplier<T>**: \`() -> T\` (used in factories and lazy evaluation).

---

### 3. Method References (Class::method)
Method references provide shorthand syntax for lambdas that merely delegate to an existing method:
- Static method: \`Math::max\` equivalent to \`(a, b) -> Math.max(a, b)\`.
- Instance method on parameter: \`String::toUpperCase\` equivalent to \`s -> s.toUpperCase()\`.
- Constructor: \`ArrayList::new\` equivalent to \`() -> new ArrayList<>()\`.

---

### 4. Parallel Streams (list.parallelStream())
Parallel streams split large datasets across multiple CPU cores using the **ForkJoinPool.commonPool()**.
*Warning*: Use parallel streams only for computationally expensive, CPU-bound tasks with independent, stateless operations. Never use parallel streams for I/O-bound database or HTTP network operations!`,
    codeSnippet: `import java.util.*;
import java.util.stream.Collectors;

public class StreamsMasteryDemo {
    // Immutable Java 21 Record for e-commerce transactions
    record Transaction(String id, String category, double amount, boolean isSuccess) {}

    public static void main(String[] args) {
        List<Transaction> transactions = List.of(
            new Transaction("TX-101", "Electronics", 1299.99, true),
            new Transaction("TX-102", "Books", 24.50, true),
            new Transaction("TX-103", "Electronics", 450.00, true),
            new Transaction("TX-104", "Grocery", 85.20, false), // Failed transaction
            new Transaction("TX-105", "Electronics", 89.00, true),
            new Transaction("TX-106", "Books", 115.00, true)
        );

        // 1. FILTER & MAP: Extract successful high-value Electronics transactions (> $100)
        List<String> highValueElectronics = transactions.stream()
            .filter(Transaction::isSuccess)                         // Keep only successful
            .filter(t -> "Electronics".equals(t.category()))       // Only Electronics category
            .filter(t -> t.amount() >= 100.0)                       // Filter amount >= 100
            .map(t -> String.format("%s: $%.2f", t.id(), t.amount())) // Transform to String
            .toList(); // Java 16+ unmodifiable list collector

        System.out.println("High Value Electronics: " + highValueElectronics);

        // 2. REDUCE & SUM: Calculate total revenue of all successful transactions
        double totalRevenue = transactions.stream()
            .filter(Transaction::isSuccess)
            .mapToDouble(Transaction::amount)
            .sum();

        System.out.printf("Total Successful Revenue: $%.2f%n", totalRevenue);

        // 3. GROUPING BY: Group successful transactions by Category and calculate total per category
        Map<String, Double> revenueByCategory = transactions.stream()
            .filter(Transaction::isSuccess)
            .collect(Collectors.groupingBy(
                Transaction::category,
                Collectors.summingDouble(Transaction::amount)
            ));

        System.out.println("\\n--- Revenue Breakdown By Category ---");
        revenueByCategory.forEach((cat, rev) ->
            System.out.printf("Category: %-12s | Revenue: $%.2f%n", cat, rev));
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Processes e-commerce transactions using declarative stream pipelines: filters high-value items, computes total revenue, and groups revenue by category.',
      whyNeeded: 'Replaces verbose, bug-prone nested loops and temporary accumulator variables with clean, readable, composable functional code.',
      howItWorks: 'Stream pipelines evaluate lazily: elements are pulled one by one through filter and map stages upon reaching terminal operations like toList() or collect().',
      internalMechanics: 'Stream operations construct a linked pipeline of Sink stages. The terminal operation creates a push-based traversal over the underlying Spliterator.',
      realWorldUsage: 'Data transformations in REST microservices, analytics pipelines, report generation, and financial reconciliation.',
      commonMistakes: 'Reusing an already-consumed stream (throws IllegalStateException: stream has already been operated upon or closed).'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'transactions.stream() obtains a Spliterator over the immutable collection',
      step2: 'filter stages form lazy predicate checks evaluated only when terminal operation begins',
      step3: 'map transforms matched Transaction records into formatted String descriptions',
      step4: 'mapToDouble and sum() use unboxed primitive double streams for high computational throughput',
      step5: 'Collectors.groupingBy partitions data into a Map with Category keys and summed values'
    }),
    realWorldExample: 'Netflix backend microservices process millions of viewing events per minute using functional stream aggregations and filters.',
    commonMistakes: 'Performing side-effects (like modifying external variables) inside stream filters, or converting tiny lists to parallelStream() which adds overhead.',
    bestPractices: 'Keep stream operations pure and stateless. Favor method references (Class::method) over verbose lambdas. Use primitive streams (IntStream, DoubleStream) to avoid boxing.',
    practiceExercise: 'Given a list of customer names, use streams to filter names starting with "A", convert them to uppercase, and collect them into a sorted list.',
    analogy: {
      title: '💡 The Automated Industrial Assembly Conveyor Line',
      story: 'Imagine a modern automotive manufacturing plant. Instead of one worker running around the factory floor gathering parts one by one (imperative loops), parts move down a high-speed conveyor line (the Stream). The first sensor diverts defective parts off the belt (filter). The next robotic arm coats each car in paint (map). At the end of the line, completed cars are loaded into transport trailers (collect)! If no trailer is waiting at the end (terminal operation), the conveyor belt doesn\'t even start running (lazy evaluation)!',
      comparisons: [
        { realWorld: 'Conveyor belt with parts moving', programming: 'Stream pipeline (list.stream())' },
        { realWorld: 'Quality control sensor kicking out bad parts', programming: 'filter(Predicate)' },
        { realWorld: 'Robotic paint sprayer modifying part', programming: 'map(Function)' },
        { realWorld: 'Loading cars into transport trailer', programming: 'collect(Collectors.toList())' },
        { realWorld: 'Conveyor only moving when trailer is parked', programming: 'Lazy evaluation until terminal operation' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 18,
        title: 'Stream Pipeline Assembly (Lazy)',
        explanation: 'transactions.stream() attaches filter and map stages. Zero items evaluated yet due to lazy evaluation.',
        memoryState: { 'Pipeline': 'Head -> filter -> filter -> filter -> map' },
        consoleOutput: ''
      },
      {
        step: 2,
        activeLine: 24,
        title: 'Terminal toList() Execution',
        explanation: 'Terminal operation triggers iteration. Matched items TX-101 ($1299.99) and TX-103 ($450.00) are mapped and collected.',
        memoryState: { 'highValueElectronics': '["TX-101: $1299.99", "TX-103: $450.00"]' },
        consoleOutput: 'High Value Electronics: [TX-101: $1299.99, TX-103: $450.00]'
      },
      {
        step: 3,
        activeLine: 28,
        title: 'Primitive DoubleStream Summation',
        explanation: 'mapToDouble prevents boxing. Sums successful amounts: 1299.99 + 24.50 + 450.00 + 89.00 + 115.00 = 1978.49.',
        memoryState: { 'totalRevenue': '1978.49' },
        consoleOutput: 'High Value Electronics: [TX-101: $1299.99, TX-103: $450.00]\nTotal Successful Revenue: $1978.49'
      },
      {
        step: 4,
        activeLine: 35,
        title: 'Grouping By Category with Downstream Collector',
        explanation: 'Collectors.groupingBy aggregates revenue by category: Electronics = $1838.99, Books = $139.50.',
        memoryState: { 'revenueByCategory': '{ "Electronics": 1838.99, "Books": 139.50 }' },
        consoleOutput: 'High Value Electronics: [TX-101: $1299.99, TX-103: $450.00]\nTotal Successful Revenue: $1978.49\n\n--- Revenue Breakdown By Category ---\nCategory: Books        | Revenue: $139.50\nCategory: Electronics  | Revenue: $1838.99'
      }
    ],
    microCheck: {
      prompt: 'What happens if you define intermediate stream operations (like .filter() and .map()) without invoking a terminal operation?',
      options: [
        'Nothing executes; intermediate operations are evaluated lazily only when a terminal operation is called',
        'The stream executes immediately in the background',
        'A StackOverflowError is thrown',
        'The computer CPU fans run at maximum speed'
      ],
      correctIndex: 0,
      explanation: 'Correct! Stream pipelines are strictly lazy. No filtering or mapping happens until a terminal operation (like collect, count, or findFirst) requests data.'
    },
    keyTakeaways: [
      'Streams provide declarative, readable data processing pipelines.',
      'Intermediate operations (filter, map) are lazy; terminal operations (collect, sum) trigger evaluation.',
      'Never mutate shared state from within stream operations; keep operations pure and stateless.',
      'Use primitive streams (IntStream, LongStream, DoubleStream) to avoid autoboxing overhead.'
    ],
    quizId: 1010
  },

  1011: {
    id: 1011,
    topicId: 1011,
    topicTitle: '11. Multithreading, Virtual Threads & Concurrency',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'Project Loom Virtual Threads & High-Throughput Concurrency in Java 21',
    codeLanguage: 'java',
    contentMarkdown: `# Multithreading & Virtual Threads in Java 21

Concurrency enables applications to perform multiple operations simultaneously. 
With **Java 21 LTS**, Java revolutionized concurrent programming by introducing **Virtual Threads (Project Loom)**, shattering the historical thread-per-request throughput ceiling.

---

### 1. Traditional Platform Threads vs Java 21 Virtual Threads
| Feature | Platform Thread (OS Thread) | Virtual Thread (Java 21 Project Loom) |
| :--- | :--- | :--- |
| **Backing Engine** | 1:1 mapped to physical Operating System kernel thread | M:N multiplexed onto a small pool of OS **Carrier Threads** |
| **Stack Memory** | ~1 MB reserved per thread (fixed OS stack) | ~Few hundred bytes allocated dynamically on the Java Heap |
| **Creation Cost** | Expensive (~1 millisecond, requires OS system call) | Virtually free (microseconds, just a standard Java object) |
| **Maximum Count** | ~2,000 to 5,000 before OS thread exhaustion / OOM | **Millions** of concurrent threads running simultaneously |
| **Blocking Behavior** | Thread blocks OS thread during I/O (wasting CPU) | Unmounts continuation from carrier thread, freeing CPU! |

---

### 2. How Virtual Threads Work Under the Hood
Virtual Threads utilize **Continuation** mechanics managed by the JVM:
1. When a Virtual Thread runs CPU computations, it is mounted onto an OS **Carrier Thread** (backed by a \`ForkJoinPool\`).
2. When the Virtual Thread performs a blocking operation (such as a database query, file read, or HTTP network call with \`Thread.sleep()\`):
   - The JVM **unmounts** the virtual thread stack frame and copies it into Heap memory.
   - The underlying Carrier Thread is immediately freed to execute other waiting virtual tasks!
3. When the I/O event finishes (e.g. database returns rows), the JVM scheduler picks an available carrier thread, remounts the continuation stack frame, and resumes execution seamlessly!

---

### 3. Launching Virtual Threads in Java 21
\`\`\`java
// 1. Thread factory / builder
Thread.ofVirtual().name("worker-1").start(runnable);

// 2. High-throughput Executor Service for concurrent tasks
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> fetchFromDatabase());
    executor.submit(() -> callPaymentApi());
} // Auto-closes and waits for all tasks to complete!
\`\`\`

---

### 4. Concurrency Guardrails with Virtual Threads
- **Do NOT Pool Virtual Threads**: Virtual threads are lightweight and disposable. Never use thread pools with virtual threads; create a new one per task!
- **Avoid Pinning**: Pinning occurs when a virtual thread blocks inside a \`synchronized\` block or native method, preventing it from unmounting. Use \`java.util.concurrent.locks.ReentrantLock\` instead of \`synchronized\` for I/O locks.`,
    codeSnippet: `import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

public class VirtualThreadsMasteryDemo {
    public static void main(String[] args) throws InterruptedException {
        int totalTasks = 10_000;
        AtomicInteger completedCount = new AtomicInteger(0);

        System.out.println("Launching " + totalTasks + " Virtual Threads concurrently...");
        Instant start = Instant.now();

        // High-Throughput Java 21 Virtual Thread Per Task Executor
        // try-with-resources guarantees waiting for all virtual threads to finish!
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= totalTasks; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    try {
                        // Simulate blocking I/O (e.g. database or network call)
                        // Virtual thread automatically UNMOUNTS from OS carrier thread!
                        Thread.sleep(Duration.ofMillis(50));
                        
                        int count = completedCount.incrementAndGet();
                        if (taskId == 1 || taskId == 5_000 || taskId == 10_000) {
                            System.out.printf("[Task #%05d] Executed on: %s%n",
                                taskId, Thread.currentThread());
                        }
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                });
            }
        } // Block awaits termination of all 10,000 tasks

        Instant finish = Instant.now();
        long durationMs = Duration.between(start, finish).toMillis();

        System.out.println("\\n--- Concurrency Benchmark Summary ---");
        System.out.println("Total Tasks Completed: " + completedCount.get());
        System.out.println("Total Execution Time:  " + durationMs + " ms");
        System.out.println("Status: Zero OS thread starvation encountered!");
    }
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Executes 10,000 concurrent simulated network tasks using Java 21 Executors.newVirtualThreadPerTaskExecutor() with non-blocking carrier thread unmounting.',
      whyNeeded: 'Historical platform threads would crash with OutOfMemoryError or exhaust OS threads when creating 10,000 threads. Virtual threads complete them in milliseconds.',
      howItWorks: 'The JVM mounts virtual threads onto a small pool of carrier OS threads. When Thread.sleep() or network I/O blocks, the virtual thread unmounts until data is ready.',
      internalMechanics: 'Under the hood, Project Loom uses Continuation objects. Blocking events yield the carrier thread without blocking physical kernel resources.',
      realWorldUsage: 'High-throughput microservices (Spring Boot 3.2+), cloud gateways, and real-time chat/notification engines.',
      commonMistakes: 'Using ThreadPoolExecutor or pooling virtual threads (virtual threads are disposable), or blocking inside synchronized blocks (thread pinning).'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'Executors.newVirtualThreadPerTaskExecutor() initializes a virtual thread factory',
      step2: 'Loop submits 10,000 distinct tasks; each gets its own lightweight virtual thread',
      step3: 'Thread.sleep(50ms) triggers carrier thread unmount; OS thread executes another task',
      step4: 'AtomicInteger safely increments across concurrent threads without locks',
      step5: 'Executor auto-closes and finishes all 10,000 tasks in ~150 milliseconds total'
    }),
    realWorldExample: 'Spring Boot 3.2+ with spring.threads.virtual.enabled=true processes 10x more concurrent HTTP requests per server without changing controller code.',
    commonMistakes: 'Pooling virtual threads in fixed-size pools, or using ThreadLocal variables with giant memory allocations across millions of virtual threads.',
    bestPractices: 'Use Executors.newVirtualThreadPerTaskExecutor() for request handling. Use ReentrantLock instead of synchronized for I/O operations.',
    practiceExercise: 'Write a program that uses a virtual thread executor to fetch mock HTTP responses from 5 different microservice endpoints in parallel.',
    analogy: {
      title: '💡 10,000 Airline Passengers vs 10,000 Giant Jet Engines',
      story: 'In legacy Java (Platform Threads), wanting to handle 10,000 concurrent tasks was like trying to build 10,000 full-sized Boeing 747 jet engines (heavy OS threads, 1MB each)—the airport runs out of runway and catches fire immediately! In Java 21 (Virtual Threads), your 10,000 tasks are passenger boarding passes (Virtual Threads). The airline only owns 8 physical airplanes (Carrier OS Threads). Passengers sit in seats, and when a passenger stops to read a book or sleep (blocking I/O), they step aside so other passengers can fly!',
      comparisons: [
        { realWorld: 'Physical Boeing 747 airplane', programming: 'OS Platform Thread (Carrier thread)' },
        { realWorld: 'Individual passenger boarding pass', programming: 'Lightweight Virtual Thread (Project Loom)' },
        { realWorld: 'Passenger pausing to read book at gate', programming: 'Virtual thread unmounting on I/O block' },
        { realWorld: 'Airport handling 10,000 passengers with 8 planes', programming: 'Running 10,000 virtual threads on 8 CPU cores' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 15,
        title: 'Virtual Thread Per Task Executor Initialization',
        explanation: 'Initializes virtual thread executor. Carrier thread pool automatically sizes to CPU core count.',
        memoryState: { 'totalTasks': '10,000', 'completedCount': '0' },
        consoleOutput: 'Launching 10000 Virtual Threads concurrently...'
      },
      {
        step: 2,
        activeLine: 22,
        title: 'Submitting 10,000 Tasks & Non-Blocking Park',
        explanation: 'Each task launches on a virtual thread. Thread.sleep(50ms) unmounts virtual stack; carrier threads remain 100% active.',
        memoryState: { 'CarrierThreads': 'Active (ForkJoinPool-worker)', 'VirtualThreads': '10,000 parked on Heap' },
        consoleOutput: 'Launching 10000 Virtual Threads concurrently...\n[Task #00001] Executed on: VirtualThread[#23]/runnable@ForkJoinPool-1-worker-1'
      },
      {
        step: 3,
        activeLine: 25,
        title: 'Midway Task Completion',
        explanation: 'Task #5,000 completes seamlessly without blocking OS kernel threads.',
        memoryState: { 'completedCount': '5,000+' },
        consoleOutput: 'Launching 10000 Virtual Threads concurrently...\n[Task #00001] Executed on: VirtualThread[#23]/runnable@ForkJoinPool-1-worker-1\n[Task #05000] Executed on: VirtualThread[#5022]/runnable@ForkJoinPool-1-worker-3'
      },
      {
        step: 4,
        activeLine: 34,
        title: 'Executor Auto-Close & All Tasks Resolved',
        explanation: 'All 10,000 tasks finish in ~150ms. Zero OS thread starvation encountered.',
        memoryState: { 'completedCount': '10,000' },
        consoleOutput: 'Launching 10000 Virtual Threads concurrently...\n[Task #00001] Executed on: VirtualThread[#23]/runnable@ForkJoinPool-1-worker-1\n[Task #05000] Executed on: VirtualThread[#5022]/runnable@ForkJoinPool-1-worker-3\n[Task #10000] Executed on: VirtualThread[#10022]/runnable@ForkJoinPool-1-worker-2\n\n--- Concurrency Benchmark Summary ---\nTotal Tasks Completed: 10000\nTotal Execution Time:  158 ms\nStatus: Zero OS thread starvation encountered!'
      }
    ],
    microCheck: {
      prompt: 'What happens when a Java 21 Virtual Thread encounters a blocking I/O operation (like Thread.sleep or reading from a database)?',
      options: [
        'The JVM unmounts the virtual thread from its carrier OS thread, allowing the carrier thread to execute other work',
        'The entire operating system freezes until the database responds',
        'The virtual thread is permanently killed and loses all state',
        'The JVM throws an OutOfMemoryError'
      ],
      correctIndex: 0,
      explanation: 'Correct! When a virtual thread blocks on I/O, the JVM unmounts its continuation to the Heap, freeing the underlying carrier OS thread to do productive work.'
    },
    keyTakeaways: [
      'Virtual Threads are lightweight threads managed by the JVM rather than the OS kernel.',
      'Blocking operations cause virtual threads to unmount from their carrier threads without consuming OS resources.',
      'Never pool Virtual Threads—create a new one per task using Executors.newVirtualThreadPerTaskExecutor().',
      'Use ReentrantLock instead of synchronized for I/O locks to prevent carrier thread pinning.'
    ],
    quizId: 1011
  },

  1012: {
    id: 1012,
    topicId: 1012,
    topicTitle: '12. JVM Memory Anatomy, Garbage Collection Tuning & JIT',
    courseId: 1,
    courseTitle: 'Complete Java 21 Mastery: From Fundamentals to Advanced Architecture',
    title: 'JVM Memory Architecture, Garbage Collection Tuning & JIT Compilation',
    codeLanguage: 'java',
    contentMarkdown: `# JVM Memory Anatomy, Garbage Collection & JIT in Java 21

To architect high-throughput, low-latency enterprise applications, you must understand how the **Java Virtual Machine (JVM)** manages physical hardware resources, allocates runtime memory, reclaims garbage, and compiles bytecode to bare-metal CPU machine code.

---

### 1. JVM Runtime Data Areas
The JVM divides memory into five distinct runtime data areas:
1. **Thread Stack (Per-Thread)**: Stores call frames, primitive local variables, and object reference pointers. Allocated per thread and popped automatically upon method exit.
2. **Java Heap (Shared)**: Where all objects and arrays reside. Managed automatically by the Garbage Collector.
   - **Young Generation**: Where newly allocated objects start.
     - **Eden Space**: Initial allocation area (accelerated by Thread Local Allocation Buffers - TLAB).
     - **Survivor Spaces (S0 / S1)**: Objects that survive minor GC copies alternate between S0 and S1.
   - **Old Generation (Tenured)**: Long-lived objects that survive multiple GC cycles (default threshold: 15).
3. **Metaspace (Shared, Native RAM)**: Replaced PermGen in Java 8. Stores class definitions, method bytecode, VTables, and static fields in native OS memory.
4. **Code Cache (Native RAM)**: Stores compiled machine code generated by the JIT compiler.
5. **Program Counter (PC) Register (Per-Thread)**: Tracks the memory address of the current executing bytecode instruction.

---

### 2. Modern Garbage Collectors in Java 21
- **G1 GC (Garbage-First)**: Default since Java 9. Divides the heap into hundreds of regional blocks (1MB to 32MB). Collects regions with the most garbage first to satisfy a target pause time (\`-XX:MaxGCPauseMillis=200\`).
- **ZGC (Z Garbage Collector)**: Production-ready in Java 21. Uses colored pointers and load barriers to perform virtually all GC work concurrently with running application threads.
  - **Guarantee**: Sub-millisecond pause times (< 1ms) even on multi-terabyte heaps! Enable with: \`-XX:+UseZGC\`.
- **Generational ZGC (Java 21)**: Combines ZGC's sub-millisecond pauses with generational collection (collecting young objects more frequently), delivering exceptional throughput.

---

### 3. Just-In-Time (JIT) Compilation: Tiered Compilation
The JVM executes code in tiers:
1. **Tier 0 (Interpreter)**: Runs bytecode immediately without compilation delay.
2. **Tier 1-3 (C1 Client Compiler)**: Quickly compiles frequently called methods into native code with basic optimizations.
3. **Tier 4 (C2 Server Compiler)**: For hot methods (heavy loop iterations or invocations), C2 applies aggressive optimizations:
   - **Method Inlining**: Inlines small method calls directly into the caller, eliminating call frame overhead.
   - **Escape Analysis**: If an object does not escape the current method, the JVM can allocate it on the **Stack** instead of the Heap, eliminating GC overhead entirely!
   - **Loop Unrolling & Vectorization**: Converts operations into SIMD CPU vector instructions.`,
    codeSnippet: `public class JvmInternalsMasteryDemo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        // 1. Inspecting JVM Runtime Memory Profile
        long mb = 1024 * 1024;
        long maxMemoryMB = runtime.maxMemory() / mb;
        long totalMemoryMB = runtime.totalMemory() / mb;
        long freeMemoryMB = runtime.freeMemory() / mb;
        long usedMemoryMB = totalMemoryMB - freeMemoryMB;

        System.out.println("=== JVM Runtime Memory Profile ===");
        System.out.printf("Max Heap (-Xmx):       %d MB%n", maxMemoryMB);
        System.out.printf("Allocated Heap (-Xms): %d MB%n", totalMemoryMB);
        System.out.printf("Used Heap Memory:      %d MB%n", usedMemoryMB);
        System.out.printf("Available Free Heap:   %d MB%n", freeMemoryMB);
        System.out.printf("Available CPU Cores:   %d%n", runtime.availableProcessors());

        // 2. Escape Analysis Demonstration (Stack Allocation vs Heap)
        System.out.println("\\n--- Running JIT Warmup & Escape Analysis Loop ---");
        long start = System.nanoTime();

        long sum = 0;
        for (int i = 0; i < 10_000_000; i++) {
            // Point instance does not escape this method!
            // C2 JIT compiler applies Escape Analysis and Scalar Replacement:
            // Eliminates Heap allocation completely by keeping x and y in CPU registers!
            Point p = new Point(i, i * 2);
            sum += p.x() + p.y();
        }

        long elapsedMs = (System.nanoTime() - start) / 1_000_000;
        System.out.println("10 Million Point Calculations completed in: " + elapsedMs + " ms");
        System.out.println("Result Checksum: " + sum);
        System.out.println("JIT C2 Optimization: Verified via Scalar Replacement!");
    }

    // Local record used for escape analysis testing
    record Point(long x, long y) {}
}`,
    codeExplanationJson: JSON.stringify({
      whatDoesItDo: 'Inspects JVM memory runtime stats and demonstrates C2 JIT compilation optimizations including Escape Analysis and Scalar Replacement.',
      whyNeeded: 'Understanding JVM memory allows developers to size heaps accurately, prevent OutOfMemoryErrors, and tune garbage collection for high performance.',
      howItWorks: 'Runtime.getRuntime() queries JVM metrics. The 10-million loop triggers C2 JIT optimization, converting Point objects into CPU register scalars.',
      internalMechanics: 'Escape analysis proves Point instances do not escape main(). The JIT compiler eliminates heap allocation, running at pure CPU speed.',
      realWorldUsage: 'High-frequency trading engines, Spring Boot production container sizing in Kubernetes, and cloud microservice tuning.',
      commonMistakes: 'Setting -Xms much lower than -Xmx in production (causing continuous heap resizing pauses), or modifying GC flags without profiling with GC logs.'
    }),
    howItWorksJson: JSON.stringify({
      step1: 'Runtime.getRuntime() queries JVM memory bounds configured by host or -Xmx flags',
      step2: 'Memory stats display max allowed Heap, currently committed Heap, and free space',
      step3: '10-million iteration loop begins in interpreted mode, quickly triggering C1 and C2 JIT tiers',
      step4: 'C2 compiler detects Point does not escape; scalar replacement allocates x and y to registers',
      step5: 'Loop completes in milliseconds without allocating 10 million Point objects on the Heap'
    }),
    realWorldExample: 'Netflix and LinkedIn tune production JVMs with -XX:+UseZGC -Xms8g -Xmx8g to achieve 99.9th percentile response latencies under 5 milliseconds.',
    commonMistakes: 'Manually calling System.gc(), which forces a full Stop-The-World garbage collection pause in production.',
    bestPractices: 'Set -Xms and -Xmx to the same value in production containers to prevent heap resizing overhead. Use ZGC for latency-sensitive applications.',
    practiceExercise: 'Run a Java program with flags -XX:+PrintCompilation -verbose:gc and observe how the JIT compiler optimizes hot methods in real-time.',
    analogy: {
      title: '💡 The Municipal City Recycling & Composting Facility',
      story: 'Think of JVM memory like a clean, high-tech modern city. Daily kitchen vegetable scraps (Eden space) are collected every morning in small green bins (Minor GC)—it happens fast and doesn\'t block traffic. Durable furniture and appliances that survive years (Old Generation) are sent to specialized recycling centers during scheduled non-blocking maintenance windows (ZGC). The city building code department (JIT C2 Compiler) inspects frequently traveled roads and replaces traffic lights with high-speed underpasses (method inlining and escape analysis)!',
      comparisons: [
        { realWorld: 'Daily kitchen food scraps', programming: 'Short-lived objects in Eden space' },
        { realWorld: 'Morning green bin neighborhood collection', programming: 'Minor Garbage Collection (G1/ZGC)' },
        { realWorld: 'Durable steel furniture lasting for years', programming: 'Old/Tenured Generation objects' },
        { realWorld: 'Civil engineer paving direct high-speed underpasses', programming: 'JIT C2 compiler optimizing hot bytecode to native machine code' }
      ]
    },
    executionSteps: [
      {
        step: 1,
        activeLine: 6,
        title: 'Querying JVM Runtime Bounds',
        explanation: 'Runtime.getRuntime() reads host JVM memory allocation. Converts bytes to megabytes.',
        memoryState: { 'maxMemoryMB': '4096 MB', 'allocatedHeap': '256 MB' },
        consoleOutput: '=== JVM Runtime Memory Profile ===\nMax Heap (-Xmx):       4096 MB\nAllocated Heap (-Xms): 256 MB\nUsed Heap Memory:      8 MB\nAvailable Free Heap:   248 MB\nAvailable CPU Cores:   16'
      },
      {
        step: 2,
        activeLine: 20,
        title: 'JIT Tier 0 to Tier 3 Transition',
        explanation: 'Loop begins. Bytecode interpreted first; after 10,000 iterations, C1 JIT compiles method.',
        memoryState: { 'LoopCounter': '10,000' },
        consoleOutput: '=== JVM Runtime Memory Profile ===\nMax Heap (-Xmx):       4096 MB\nAllocated Heap (-Xms): 256 MB\nUsed Heap Memory:      8 MB\nAvailable Free Heap:   248 MB\nAvailable CPU Cores:   16\n\n--- Running JIT Warmup & Escape Analysis Loop ---'
      },
      {
        step: 3,
        activeLine: 24,
        title: 'C2 Escape Analysis & Scalar Replacement',
        explanation: 'C2 compiler detects Point does not escape. Eliminates Heap allocation entirely; uses CPU registers.',
        memoryState: { 'HeapAllocation': '0 bytes (Scalar Replacement)' },
        consoleOutput: '=== JVM Runtime Memory Profile ===\nMax Heap (-Xmx):       4096 MB\nAllocated Heap (-Xms): 256 MB\nUsed Heap Memory:      8 MB\nAvailable Free Heap:   248 MB\nAvailable CPU Cores:   16\n\n--- Running JIT Warmup & Escape Analysis Loop ---\n10 Million Point Calculations completed in: 14 ms\nResult Checksum: 299999970000000\nJIT C2 Optimization: Verified via Scalar Replacement!'
      }
    ],
    microCheck: {
      prompt: 'What optimization does the C2 JIT compiler perform when Escape Analysis determines an object never leaves the method where it was created?',
      options: [
        'Scalar Replacement: It eliminates the Heap allocation entirely and keeps fields in CPU registers or Stack',
        'It writes the object to the computer hard drive',
        'It immediately invokes System.gc()',
        'It converts the object to a PDF file'
      ],
      correctIndex: 0,
      explanation: 'Correct! Scalar replacement breaks the object into its individual scalar fields, storing them in CPU registers or the stack without allocating any Heap memory.'
    },
    keyTakeaways: [
      'JVM memory is divided into Stack (thread-specific frames) and Heap (shared objects and collections).',
      'The modern ZGC garbage collector delivers sub-millisecond (< 1ms) pause times on multi-terabyte heaps.',
      'The C2 JIT compiler applies Escape Analysis, Method Inlining, and Scalar Replacement for maximum speed.',
      'Never invoke System.gc() manually in production; configure equal -Xms and -Xmx heap sizes.'
    ],
    quizId: 1012
  }
};
