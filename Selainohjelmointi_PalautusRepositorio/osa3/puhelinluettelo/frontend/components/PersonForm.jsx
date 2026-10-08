import Filter from './Filter'


const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
  persons,
  searchTerm,
  handleSearchChange,
  deletePerson
}) => (
    <>
  <form onSubmit={addPerson}>
    <div>

      Name:
      <input
        value={newName}
        required
        onChange={handleNameChange}
        placeholder="Name"
      />
    </div>

    <div>
      Number:
      <input
        value={newNumber}
        onChange={handleNumberChange}
        placeholder="1234"
      />
    </div>

    <button type="submit">Add new person</button>


  </form>
    <div>
      <Filter
        persons={persons}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        deletePerson={deletePerson}
        
      />
    </div>
    </>
)

export default PersonForm