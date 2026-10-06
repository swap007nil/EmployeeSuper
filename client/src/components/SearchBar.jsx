function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control"
      style={{ maxWidth: 300 }}
      placeholder="Search by name or mobile"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;