import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";

export default function RootLayout() {
  return (
    <div className="container">
      <Sidebar/>
      <main className="content">
        <Outlet/>
      </main>
    </div>
  )
}