# Employee Management System (Full Stack Java Application)

## Project Overview
A comprehensive Employee Management System designed to demonstrate full-stack development using Java technologies, providing complete CRUD (Create, Read, Update, Delete) operations for managing employee records.

## 🚀 Technologies Stack
### Backend
- Java 11+
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven/Gradle
- MySQL/PostgreSQL

### Frontend
- React.js
- Redux
- Axios
- Bootstrap/Material UI
- React Router

### Additional Technologies
- RESTful API
- JWT Authentication
- Swagger Documentation
- Docker (Optional)

## 🌟 Key Features
- Employee Registration
- Employee Listing
- Employee Update
- Employee Deletion
- Search and Filter Employees
- Role-Based Access Control
- Validation and Error Handling

## 📦 Project Structure
```
employee-management-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/employeemanagement/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       └── model/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── redux/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

## 🛠 Backend Development (Spring Boot)

### 1. Employee Model
```java
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "email")
    private String email;
    
    // Constructors, Getters, Setters
}
```

### 2. Repository Layer
```java
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Custom query methods
    List<Employee> findByLastName(String lastName);
}
```

### 3. Service Layer
```java
@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    // Create Employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee by ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

    // Update Employee
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = getEmployeeById(id);
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        return employeeRepository.save(employee);
    }

    // Delete Employee
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }
}
```

### 4. Controller Layer
```java
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
        @PathVariable Long id, 
        @Valid @RequestBody Employee employeeDetails
    ) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
```

## 🖥️ Frontend Development (React)

### Employee List Component
```jsx
function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        EmployeeService.getAllEmployees()
            .then(response => {
                setEmployees(response.data);
            });
    }, []);

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(() => {
                setEmployees(employees.filter(emp => emp.id !== id));
            });
    };

    return (
        <div>
            <h2>Employees List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button onClick={() => deleteEmployee(employee.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

## 🔒 Security Configuration
- Implement JWT Authentication
- Role-Based Access Control
- Secure REST Endpoints
- Password Encryption

## 📊 Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

## 🚀 Deployment
- Backend: Spring Boot JAR
- Frontend: React Build
- Docker Containerization (Optional)
- Cloud Deployment (AWS, Azure, GCP)

## 🧪 Testing
- Unit Testing with JUnit
- Integration Testing
- Mockito for Mocking
- React Component Testing

## 📋 Prerequisites
- Java 11+
- Node.js
- MySQL/PostgreSQL
- Maven/Gradle
- IDE (IntelliJ/Eclipse)

## 🔧 Setup and Installation
1. Clone the repository
2. Configure database settings
3. Run backend server
4. Install frontend dependencies
5. Start frontend development server

## 📝 Additional Features
- Pagination
- Sorting
- Advanced Filtering
- Export to CSV/Excel
- Logging
- Internationalization

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📄 License
MIT License

## 📞 Contact
- Steve Ongera 
- steveongerah@gmail.com
- Project Link: [GitHub Repository]

---

**Note**: Any Issue fell free to contanct me at +254112284093 (Whatsapp)