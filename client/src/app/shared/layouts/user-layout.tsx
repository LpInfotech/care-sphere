import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default UserLayout;
