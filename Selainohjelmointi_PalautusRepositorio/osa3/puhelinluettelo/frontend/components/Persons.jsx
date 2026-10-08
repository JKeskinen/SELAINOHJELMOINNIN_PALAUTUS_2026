// Persons-komponentti
// Ottaa vastaan 'person' ja 'deletePerson'-propsin ja palauttaa taulukon, 
// joka renderöi jokaiselle henkilölle oman rivin ja poistonapin.


const Persons = ({persons, deletePerson}) => {
  //console.log('Type of deletePerson:', typeof deletePerson)
  return(
    <table>
      <tbody>
        <tr>
          <td><strong>NAME</strong></td>
          <td><strong>NUMBER</strong></td>
        </tr>
        {persons.map((person) =>(
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
              </td>              
          </tr> 
            ))}
      </tbody>
    </table>
  )
}

export default Persons