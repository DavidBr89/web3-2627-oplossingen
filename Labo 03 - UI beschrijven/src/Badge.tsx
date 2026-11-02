import type { MovieStatus } from "./data/react-ui-starter";

interface BadgeProps {
  status: MovieStatus;
}

// Hier heb ik een translations array gemaakt zodanig dat er andere tekst kan getoond worden ipv de status vanuit TS
const translations = {
  NOW_PLAYING: "Nu in de bioscoop",
  COMING_SOON: "Binnenkort",
  ARCHIVED: "Gearchiveerd",
};

const Badge = ({ status }: BadgeProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        backgroundColor: "#37306b",
        color: "#e5e1ff",
        padding: "6px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 600,
      }}>
      <p>{translations[status]}</p>
    </div>
  );
};

export default Badge;
