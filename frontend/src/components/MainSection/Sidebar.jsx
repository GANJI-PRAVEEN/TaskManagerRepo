import React,{useState,useEffect} from "react";
import assets from "../../assets/assets.js";
const Sidebar = ({
  openSideBar,
  setSideBar,
  sideBarOptions,
  setActiveSidebarTab,

}) => {
  const session = JSON.parse(sessionStorage.getItem("loggedUser"));
  const user = session.user;
  const userRole = session.userRole;
   const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsHoverSupported(mediaQuery.matches);
  }, []);
  return (
    <div className="relative">
      <div
        className={`
          fixed left-0 top-14 h-full
          bg-[#003566]/90 
          transition-all duration-300 ease-in-out
          ${openSideBar ? "sm:w-[250px] rounded-tr-md w-[200px] z-[90]" : "w-[50px]"}
        `}
        onMouseEnter={() => {
        if (isHoverSupported) setSideBar(true);
      }}
      onMouseLeave={() => {
        if (isHoverSupported) setSideBar(false);
      }}
      onClick={() => {
        if (!isHoverSupported) setSideBar(!openSideBar);
      }}
      >
        {!openSideBar && (
          <div className="flex flex-col items-center space-y-10 p-3 text-white sm:text-md text-sm">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="material-symbols-outlined">checklist_rtl</span>
            <span className="material-symbols-outlined">pending_actions</span>
            <span className="material-symbols-outlined">logout</span>
          </div>
        )}

        {openSideBar && (
          <div className="flex flex-col items-center text-white z-[100]">
            <div className="flex items-center gap-3 m-3">
              <img
                src={assets.profile}
                alt="profile"
                className="w-[80px] h-[80px] rounded-full"
              />
              <p className="text-lg name-font">Welcome, {user?.employeeName || user?.adminName}</p>
            </div>

            <div className="w-full border border-white/40" />

            {sideBarOptions.map((item) => (
              <div
                key={item.id}
                className="
                  group w-full cursor-pointer
                  hover:bg-[#343a40]
                  transition-colors duration-300
                "
                onClick={() => setActiveSidebarTab(item.id)}
              >
                <div className="relative flex items-center py-3">
                  <p
                    className="
                    mx-auto font-bold
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                  >
                    {item.label}
                  </p>
                  <span
                    className="
                    material-symbols-outlined absolute right-3
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                  >
                    arrow_right
                  </span>
                </div>
                <div className="border border-white/30" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
