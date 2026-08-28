import DbNavbar from "@/components/DbNavbar";
import "../../styles/dashboard/dashboardGlobal.css";
import styles from "../../styles/dashboard/dbHome.module.css";

export default function DashboardHome() {
  return (
    <>
      <div className="db-body">
        <div className="db-page">
          <DbNavbar />
          <div className="db-content">
            <div className="db-c-header">
              <h2>Dashboard</h2>
            </div>
            <div className={styles.homeContent}>
              <p className="p-second">No data available yet.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
