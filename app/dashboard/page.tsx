import Dashnav from "../components/Dashnav";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <>
      <div className="container container-dashboard">
        <div className={styles.container_dashboard}>
          <Dashnav />
        </div>
      </div>
    </>
  );
}
