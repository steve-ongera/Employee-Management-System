import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validationForm()) {
      const employeeData = { firstName, lastName, email };
      console.log(employeeData);

      if (id) {
        updateEmployee(id, employeeData)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => console.error(error));
      } else {
        createEmployee(employeeData)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => console.error(error));
      }
    }
  }

  function validationForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is Required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is Required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email Id is Required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container">
      <br /> <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center mt-2">{id ? "UPDATE" : "ADD"} EMPLOYEE</h3>
          <div className="card-body">
            <form>
              <div className="mb-3 form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  name="firstName"
                  placeholder="Enter Employee First Name"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                {firstName.trim() && (
                  <p className="invalid-feedback">{errors.firstName}</p>
                )}
              </div>

              <div className="mb-3 form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  name="lastName"
                  placeholder="Enter Employee Last Name"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />

                {lastName.trim() && (
                  <p className="invalid-feedback">{errors.lastName}</p>
                )}
              </div>

              <div className="mb-3 form-group">
                <label className="form-label">Email Id</label>
                <input
                  type="text"
                  value={email}
                  name="emailId"
                  placeholder="Enter Employee Email Id"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {email.trim() && (
                  <p className="invalid-feedback">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                onClick={saveOrUpdateEmployee}
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
