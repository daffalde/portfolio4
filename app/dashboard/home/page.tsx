import DbNavbar from "@/components/DbNavbar";
import styles from "../../../styles/dashboard/home.module.css";

export default function HomeDashboard() {
  return (
    <>
      <div className="homepage">
        <div className="dashboard">
          <DbNavbar />
        </div>
      </div>
    </>
  );
}
