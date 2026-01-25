import React from "react";

const ProfilePage = ({
  activeSidebarTab,
  profile,
  userRole,
  employeePerformanceScore,
  adminPerformanceScore,
  getPerformanceLabel,
  assets,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          activeSidebarTab === "employeeProfile" ||
          activeSidebarTab === "adminProfile"
            ? "block"
            : "hidden"
        } h-[400px] sm:h-[450px] w-[320px] sm:w-[450px] lg:[600px] m-10 border overflow-hidden rounded-lg shadow shadow-md flex flex-col items-center `}
      >
        <div className=" h-[150px] sm:h-[200px] m-6 sm:m-8 w-[150px] sm:w-[200px] text-center">
          <img
            src={assets.profile}
            alt=""
            className="rounded-full border shadow-lg shadow-gray-500"
          />
          <hr />
        </div>

        <div>
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

          <p
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
