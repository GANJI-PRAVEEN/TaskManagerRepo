import React,{useEffect} from "react";

const AdminTasksStatsTable = ({adminTasksStats}) => {

  useEffect(() => {
    console.log("adminTasksStats ",adminTasksStats)
  },[])

  return (
    <div className="w-full mt-8">
    {adminTasksStats?.length===0 && (
      <p className='text-xl sm:text-xl font-bold text-center p-2 text-red-600'>Please do Skill-Up employees and create Task </p>
    )}
      <div className="border bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* to enable scrolling horizontal */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-bold text-xl">
                  Task
                </th>
                <th className="px-4 py-2 text-left text-gray-700  font-bold text-xl">
                  Employees
                </th>
                <th className="px-4 py-2 text-left text-gray-700  font-bold text-xl">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-gray-700  font-bold text-xl">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>

              {adminTasksStats.flatMap((task) =>
                task.employees?.map((emp) => (
                  <tr
                    key={`${task.taskID}-${emp.employeeID}`}
                    className="border-t"
                  >
                    <td className="px-4 py-2 text-left font-semibold">
                      {task?.taskTitle}
                    </td>
                    <td className="px-4 py-2 text-left font-semibold">
                      {emp?.employeeName}
                    </td>
                    <td
                      className={`px-4 py-2 text-left font-semibold
                              ${emp?.status === "completed" ? "text-green-600" : emp?.status === "pending" ? "text-yellow-600" : "text-blue-600"}
                              
                              `}
                    >
                      {emp?.status}
                    </td>
                    <td className="px-4 py-2 text-left font-semibold">
                      {new Date(task?.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTasksStatsTable;
