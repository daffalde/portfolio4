import DbNavbar from "@/components/DbNavbar";
import styles from "../../../styles/dashboard/home.module.css";

export default function HomeDashboard() {
  return (
    <>
      <div className="homepage">
        <div className="dashboard">
          <DbNavbar />
          <div className={styles.body}>
            <h2>Dashboard</h2>
            <div className={styles.content}>
              <p className="p-second">No data available yet.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
