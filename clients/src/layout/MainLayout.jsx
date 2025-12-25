// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <main className="min-h-screen ">
        <Outlet />
      </main>
      
      <Footer />
    </>
  );
}
