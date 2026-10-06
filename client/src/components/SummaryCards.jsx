function SummaryCards({ visitors }) {
  const total = visitors.length;
  const checkedIn = visitors.filter((v) => v.status === 'Checked In').length;
  const checkedOut = total - checkedIn;

  const card = (label, value, color) => (
    <div className="col-md-4 mb-3">
      <div className={`card text-white bg-${color}`}>
        <div className="card-body">
          <h6 className="card-title mb-1">{label}</h6>
          <h2 className="mb-0">{value}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="row">
      {card('Total Visitors', total, 'primary')}
      {card('Currently Checked In', checkedIn, 'success')}
      {card('Checked Out', checkedOut, 'secondary')}
    </div>
  );
}

export default SummaryCards;