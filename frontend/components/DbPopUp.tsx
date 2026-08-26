import styles from "./dbPopUp.module.css";

export function PopUpBody() {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.body}>
          <div className={styles.header}>
            <button>
              <img src="/back.png" alt="back icon" />
            </button>
            <h5>Add Project</h5>
          </div>
          <div className={styles.actionButton}>
            <button className="btn-second">Cancel</button>
            <button className="btn-main">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
