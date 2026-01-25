import React from 'react'

const StatusBoxes = ({
    employeeCompletion,
    employeePending,
    employeePerformanceScore,
    adminAssigned,
    adminCompletedByemployee,
    adminPendingByemployee
}) => {
    const session = JSON.parse(sessionStorage.getItem("loggedUser"));
    const user = session?.user;
    const role = session?.role;
    let statusBoxes=[];
    if(role=="employee"){
        statusBoxes = [
            ["Completed", employeeCompletion],
            ["Pending", employeePending],
            ["Progress", employeePerformanceScore],
        ]
    }
    else{
        statusBoxes = [
            ["Tasks Assigned", adminAssigned],
            ["Completed", adminCompletedByemployee],
            ["Pending", adminPendingByemployee],
        ];
    }

  return (
    <div className={`p-4 flex items-center justify-center`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statusBoxes.map(([title, value], index) => (
              <div
                className="border border-black w-[120px] h-[70px] text-center sm:w-[200px] sm:h-[100px] sm:text-lg"
                key={index}
              >
                <p className="p-1 font-bold text-green-600">{title}</p>
                <hr />
                <p className="p-1 font-bold text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default StatusBoxes
