interface TicketCounterProps {
  numberOfTickets: number;
  increase: () => void;
  decrease: () => void;
}

const TicketCounter = ({
  numberOfTickets,
  increase,
  decrease,
}: TicketCounterProps) => {
  return (
    <div style={{ margin: "16px 0 16px 0" }}>
      <h1>Ticket Counter</h1>
      <p>Tickets: {numberOfTickets}</p>
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          marginTop: "16px",
        }}>
        <button onClick={increase}>Verhoog</button>
        <button onClick={decrease} disabled={numberOfTickets < 1}>
          Verlaag
        </button>
      </div>
    </div>
  );
};

export default TicketCounter;
