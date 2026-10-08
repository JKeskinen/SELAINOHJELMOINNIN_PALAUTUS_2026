

// Header vastaanottaa kurssin nimen propsina ja näyttää sen otsikkona.
const Header = ({ name }) => <h2>{name}</h2>


// Course käsittelee yhtä kurssia kerrallaan.
// Se välittää kurssin nimen Header-komponentille
// ja kurssin osat Content-komponentille.
const Course = ({course}) => {
  console.log('Course',course)
  return (
    <div>    
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

// Part näyttää yhden kurssin osan nimen ja harjoitusten määrän.
const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

// Content vastaanottaa yhden kurssin kaikki parts-osat.
const Content = (props) => {
  console.log("Content",props)

  // Otetaan parts-taulukko props-oliosta.
  const parts = props.parts

  // Lasketaan tämän kurssin kaikkien osien harjoitukset yhteen.
  // reduce käy parts-taulukon läpi ja kasvattaa summaa jokaisella osalla.
  const total = parts.reduce((sum, part) => sum + part.exercises,0)

  return (
  <div>
    {/* Jokaisesta part-alkiosta luodaan oma Part-komponentti. */}
    {/* key auttaa Reactia tunnistamaan listan eri alkiot. */}
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}


const App = () => {

  // courses on kohdassa 2.4 taulukko-muodossa, koska sovelluksessa on useita kursseja.
  // Jokaisella kurssilla on oma nimi, id ja parts-taulukko.

  // Kurssikirjaston rakenne:
  /*
        Rakenne:
        App
        ├── h1: Web development curriculum
        └── courses[]
            ├── Course
            │   ├── Header (h2): Half Stack application development
            │   └── Content
            │       ├── Part (p): Fundamentals of React
            │       ├── Part (p): Using props to pass data
            │       ├── Part (p): State of a component
            │       └── Part (p): Redux
            └── Course
                ├── Header (h2): Node.js
                └── Content
                    ├── Part (p): Routing
                    └── Part (p): Middlewares
        
        courses-lista:
        Course
        ├── Header (h2)
        │   └── course.name: Half Stack application development
        └── Content
            └── Part
                ├── part.name: Fundamentals of React
                ├── part.exercises: 10
                └── part.id: 1
  
        */

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log(courses)

  return (
    <div>
      {/*
        Käydään kaikki kurssit läpi.
        Jokaisesta kurssista luodaan oma Course-komponentti.
        Kurssi välitetään komponentille course-propsina.

        courses[]
          ↓
        map(course)
          ↓
        <Course course={course} />
          ↓
        Course-komponentti
          ├── course.name → Header
          └── course.parts → Content
      */}
      <h1>Web development curriculum</h1>
      {courses.map(course =>
      <Course key = {course.id} course={course}/>
      )}
    </div>
  )
}

export default App