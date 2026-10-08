const Notification = ({ message, type }) => {
  if (!message) return null;

  // type 'ok' (vihreä), 'error' (punainen), 'warning' (keltainen)
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification