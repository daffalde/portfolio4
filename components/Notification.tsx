import styles from "./notification.module.css";

interface NotifProps {
  condition: boolean;
  headline: string;
  desc: string;
}

export default function Notification({
  condition,
  headline,
  desc,
}: NotifProps) {
  return (
    <>
      <div
        className={`${styles.body} ${condition ? styles.conditionTrue : styles.conditionFalse}`}
      >
        <img
          src={`/${condition ? "check" : "failed"}.png`}
          alt="notifcation icon"
        />
        <span>
          <h6>{headline}</h6>
          <p className="p-second">{desc}</p>
        </span>
      </div>
    </>
  );
}
