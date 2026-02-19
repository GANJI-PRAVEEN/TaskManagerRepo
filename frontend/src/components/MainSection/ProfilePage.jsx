import React from "react";
import assets from "../../assets/assets.js";

const ProfilePage = ({
  employeesData,
}) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const user = session.user;
  const userRole = session.role;
  let profile =[];
  let adminAssigned = employeesData.reduce(
    (sum, employee) => sum + employee.assignedCount,
    0,
  );
  let adminCompletedByemployee = employeesData.reduce(
    (sum, employee) => sum + employee.completedCount,
    0,
  );
  

  let employeeCompletion = 10;
  let employeePending = 6;
  let taskCompletionRate = (adminCompletedByemployee / adminAssigned) * 100;
  let employeeProductivity =
    employeesData.length === 0 ? 0 : employeeCompletion / employeesData.length;
  let employeePerformanceScore = Math.min(employeeProductivity * 10, 100);
  let adminPerformanceScore =
    taskCompletionRate * 0.5 + employeePerformanceScore * 0.2;

  adminPerformanceScore = Math.round(adminPerformanceScore);
  let adminPendingByemployee = adminAssigned - adminCompletedByemployee;

  function getPerformanceLabel(score) {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  }


  if(userRole=='employee'){
    profile = [
      { label: "Name", value: user?.employeeName },
      { label: "Email", value: user?.employeeMail },
      { label: "Total Tasks Completed", value: employeeCompletion },

    ];
  }
  else{
    profile = [
      { label: "Name", value: user?.adminName },
      { label: "Email", value: user?.adminMail },
      { label: "Total Tasks Created", value: adminAssigned },
    ];
  }
  return (
    <div className="flex items-center justify-center ">
      <div
        className={`p-5 h-[400px] sm:h-[450px] w-[400px] sm:w-[450px] lg:[600px] profile-bg  overflow-hidden rounded-lg shadow shadow-md flex flex-col items-center `}
      >
        <div className="h-[150px] sm:h-[200px] m-6 sm:m-8 w-[150px] sm:w-[200px] text-center ">
          <img
            src={assets.profile}
            alt=""
            className="rounded-full border shadow-lg shadow-gray-500"
          />
          <hr />
        </div>

        <div className='bg-amber-100/80 p-5 rounded-md'>
          {profile.map((detail) => (
            <div key={detail.label} className="flex flex-col">
              <p className="text-md sm:text-xl">
                {detail.label}:
                <span className="font-bold text-sm sm:text-xl text-center">
                  {detail.value}
                </span>
              </p>
            </div>
          ))}

          {/* <p
            className={`${
              userRole === "employee" ? "block" : "hidden"
            } text-center text-xl border bg-pink-600 rounded-lg mt-5 text-white`}
          >
            {getPerformanceLabel(employeePerformanceScore)}
          </p>

          <p
            className={`${
              userRole === "admin" ? "block" : "hidden"
            } text-center text-xl border bg-pink-600 rounded-lg mt-5 text-white`}
          >
            {getPerformanceLabel(adminPerformanceScore)}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
