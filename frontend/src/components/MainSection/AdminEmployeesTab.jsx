import React from "react";
import assets from "../../assets/assets.js";

const AdminEmployeesTab = ({employeesData }) => {
  return (
    <div
      className={`grid
        max-w-[1000px]
        mx-auto
        gap-10
        grid-cols-1
        sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
      `}
    >
      {employeesData.map((employee) => (
        <div
          className="w-[300px] h-[250px] border rounded-lg shadow shadow-md shadow-gray-800"
          key={employee._id}
        >
          <div className="flex items-center">
            <img
              src={assets.profile}
              alt=""
              className="w-[100px] h-[100px] rounded-full"
            />
            <div className="flex flex-col items-center overflow-hidden">
              <p className="text-sm sm:text-lg">{employee.employeeName}</p>
              <p className="text-sm sm:text-sm">{employee.employeeMail}</p>
            </div>
          </div>

          <div className="border" />

          <div>
            <p className="text-lg font-bold text-center">Performance Board</p>
            <div className="flex justify-between flex-col items-start p-4">
              <p className="text-orange-400">
                Assigned :{" "}
                <span className="font-bold text-lg text-black">
                  {employee.assignedCount}
                </span>
              </p>
              <p className="text-green-600">
                Completed :{" "}
                <span className="font-bold text-lg text-black">
                  {employee.completedCount}
                </span>
              </p>
              <p className="text-red-600">
                Pending :{" "}
                <span className="font-bold text-lg text-black">
                  {employee.assignedCount - employee.completedCount}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminEmployeesTab;
