import styles from "./popUp.module.css";

interface prompt {
  close: () => void;
  action: () => void | Promise<void>;
  title: string;
  button: string;
  desc: string;
}

export default function PopUp({ close, action, title, button, desc }: prompt) {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.body}>
          <div className={styles.head}>
            <h5>{title}</h5>
            <button onClick={close}>
              <img src="/close.png" alt="close icon" />
            </button>
          </div>
          <div className={styles.content}>
            <img src="/warning.png" alt="warning image" />
            <p>{desc}</p>
          </div>
          <div className={styles.action}>
            <button onClick={close} className="btn-second">
              Cancel
            </button>
            <button onClick={action} className="btn-main">
              {button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
