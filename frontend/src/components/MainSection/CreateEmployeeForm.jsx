import React, { useState } from "react";
import {
  createEmployeeAPI,
  fetchEmployeesAPI,
  loadEmployeesDataAPI,
} from "../../api/database";
import { toast } from "react-toastify";

const CreateEmployeeForm = ({ setemployeesData,setCreateEmployeeBtn ,createEmployeeBtn}) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const user = session?.user;
  const userRole = session?.role;
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [errors, setErrors] = useState({});

  const generateStrongPassword = (empName, empMail) => {
    const userName = empMail.split("@")[0].trim();
    //mail => ganjipraveen444 and name is praveen then password => ganjipraveen4447(7=> len(empName))
    console.log("userName- ", userName);
    const lengthOfEmpName = empName.trim().length;
    return `${userName}${lengthOfEmpName}`;
  };

  const handleSubmit = async () => {
    try {
      let newErrors = [];
      if (!empName.trim()) {
        newErrors.setEmpNameError = "Please Type Emp Name.";
      }
      if (!empEmail.trim()) {
        newErrors.setEmpEmailError = "Please Type Emp Email.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});

      //generate employee auto password using email and name
      const empPassword = generateStrongPassword(empName, empEmail);
      const res = await createEmployeeAPI({ empName, empEmail, empPassword }); //calling api
      if (!res.success) {
        console.log("sorry unable to create ", res.message);
        toast.error("unable to create pls try again");
      } else {
        toast.success("Successfully created Employee!!");
        setCreateEmployeeBtn(false)
        console.log("password is ", empPassword);
        const res = await loadEmployeesDataAPI();
        if (res.success) {
          setemployeesData(res.employees);
          setCreateEmployeeBtn(false);
          toast.success("fetched employees data");
        } else {
          
          console.log("somethingwent wrong- ", res.message);
        }
      }
    } catch (error) {
      console.log("some error at popup in employeesTab {admin}");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 top-10">
      <div className="p-2 w-[300px] ml-10 sm:ml-0 sm:w-[500px] border bg-white">
        <div className="relative">
          <p className=" text-xl sm:text-2xl font-bold text-center mt-4">
            Create Employee
          </p>
          {createEmployeeBtn && (
            <span className="absolute right-4 top-0 hover:cursor-pointer material-symbols-outlined" onClick={() => setCreateEmployeeBtn(false)}>close</span>

          )}
          
        </div>
        <hr className="mx-10 sm:mx-20 bg-green-700" />
        <div className="flex flex-col items-center justify-center sm:p-4 p-3 py-10 gap-7 mx-0 mt-2 sm:mx-10">
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Enter Name of Employee.."
              className="w-full bg-gray-500/30 border outline-none p-3"
              onChange={(e) => {
                setEmpName(e.target.value);
                setErrors((prev) => ({ ...prev, setEmpNameError: "" }));
              }}
            />
            {errors.setEmpNameError && (
              <p className="text-red-700 py-1 px-1">{errors.setEmpNameError}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Enter Mail of Employee.."
              className="w-full bg-gray-500/30 border outline-none p-3"
              onChange={(e) => {
                setEmpEmail(e.target.value);
                setErrors((prev) => ({ ...prev, setEmpEmailError: "" }));
              }}
            />
            {errors.setEmpEmailError && (
              <p className="text-red-700 py-1 px-1">
                {errors.setEmpEmailError}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="border py-1 px-6 rounded-md bg-green-600 text-white hover:bg-green-800 hover:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateEmployeeForm;
