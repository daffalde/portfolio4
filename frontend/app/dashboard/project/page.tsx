import DbNavbar from "@/components/DbNavbar";
import "../../../styles/dashboard/dashboardGlobal.css";
import styles from "../../../styles/dashboard/dbHome.module.css";

export default function DashboardProject() {
  return (
    <>
      <div className="db-body">
        <div className="db-page">
          <DbNavbar />
          <div className="db-content">
            <div className="db-c-header">
              <h2>Project</h2>
              <button className="btn-main">
                <p>New Project</p>
                <img src="/add.png" alt="add icon" />
              </button>
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
