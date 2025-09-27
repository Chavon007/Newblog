import { IoIosLogOut } from "react-icons/io";
function Logout() {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        console.log("Logout Successful");
        window.location.href = "/login";
      } else {
        console.log("Failed to logout");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-between items-center p-2  cursor-pointer">
      <span className="text-sm font-serif text-white">Log-out</span>
      <button className="pl-1 text-white" onClick={handleLogout}>
        <IoIosLogOut size={20} />
      </button>
    </div>
  );
}
export default Logout;
