//määritellään Header, Content ja Total komponentit
//Header komponentti, joka ottaa vastaan propsin ja renderöi kurssin nimen
//Content komponentti, joka ottaa vastaan propsin ja renderöi osan nimen ja tehtävien määrän
//Total komponentti, joka ottaa vastaan propsin ja renderöi tehtävien kokonaismäärän

const Header = (props) => {
console.log('Propsin arvo on',props)
return <h1>{props.course}</h1>
}

// Content komponentti, joka ottaa vastaan propsin ja renderöi osan nimen ja tehtävien määrän
const Content = (props) => {
  console.log('Propsin arvo on',props)
  return (
  <div>
    <p>{props.parts[0].name} {props.parts[0].exercises}</p>
    <p>{props.parts[1].name} {props.parts[1].exercises}</p>
    <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </div>
  )
}

// Total komponentti, joka ottaa vastaan propsin ja renderöi tehtävien kokonaismäärän
const Total = (props) => {
  console.log('Propsin arvo on',props)
  return <p>Number of exercises {props.parts[0].exercises + 
    props.parts[1].exercises + props.parts[2].exercises}</p>
}





//App pääkomponentti, jossa const course sisältää nimen ja harjoitusten määrän
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  }

  // return, renderöi Header, Content ja Total komponentit.
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}
export default App