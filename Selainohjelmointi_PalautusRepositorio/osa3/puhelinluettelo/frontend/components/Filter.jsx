
const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Search by name or number:
    <input
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder='search'
    />
  </div>
)
export default Filter