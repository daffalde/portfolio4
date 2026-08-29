import DbNavbar from "@/components/DbNavbar";
import styles from "../../../styles/dashboard/project.module.css";

export default function ProjectDashboard() {
  return (
    <>
      <div className="homepage">
        <div className="dashboard">
          <DbNavbar />
          <div className={styles.body}>
            <div className={styles.header}>
              <h2>Project</h2>
              <button className="btn-main">
                Add Project
                <img src="/add.png" alt="add icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
