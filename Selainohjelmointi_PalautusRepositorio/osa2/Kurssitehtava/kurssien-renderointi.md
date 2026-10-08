# Kurssien renderointi Reactissa

Tässä tiedostossa selitetään, miten `courses`-taulukon kurssit renderöidään React-komponenteiksi.

## Datarakenne

`courses` on taulukko, joka sisältää useita kurssiolioita:

```jsx
const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
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
      }
    ]
  }
]
```

Jokaisella kurssilla on:

- `name`: kurssin nimi
- `id`: kurssin yksilöllinen tunniste
- `parts`: taulukko kurssin osista

Jokaisella `part`-oliolla on:

- `name`: osan nimi
- `exercises`: harjoitusten määrä
- `id`: osan yksilöllinen tunniste

## Komponenttien rakenne

```text
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
```

`courses` ja sen sisältämät oliot ovat dataa. `Course`, `Header`, `Content` ja `Part` ovat React-komponentteja.

## `map` luo komponentit

```jsx
{courses.map(course =>
  <Course key={course.id} course={course}/>
)}
```

Tämä tarkoittaa, että `courses`-taulukko käydään läpi yksi alkio kerrallaan.

Ensimmäisellä kierroksella `course` sisältää Half Stack -kurssin:

```jsx
course = {
  name: 'Half Stack application development',
  id: 1,
  parts: [...]
}
```

Toisella kierroksella `course` sisältää Node.js-kurssin:

```jsx
course = {
  name: 'Node.js',
  id: 2,
  parts: [...]
}
```

Jokaisesta `course`-oliosta luodaan oma `Course`-komponentti.

Sama asia pidemmällä kirjoitusmuodolla:

```jsx
{courses.map((course) => {
  return (
    <Course
      key={course.id}
      course={course}
    />
  )
})}
```

Lyhyessä muodossa nuolen jälkeen oleva JSX palautetaan automaattisesti.

## Propsien välittäminen

```jsx
<Course key={course.id} course={course}/>
```

Tässä:

- `course` vasemmalla puolella on propin nimi
- `course` oikealla puolella on `map`-funktion muuttuja
- koko kurssiolio välitetään `Course`-komponentille

`Course` vastaanottaa olion näin:

```jsx
const Course = ({ course }) => {
```

Sen jälkeen kurssin eri tietoja voidaan välittää eteenpäin:

```jsx
<Header name={course.name}/>
<Content parts={course.parts}/>
```

Tieto kulkee siis näin:

```text
courses[]
   ↓
map(course)
   ↓
<Course course={course}/>
   ↓
Course-komponentti
   ├── course.name  → Header
   └── course.parts → Content
```

## `Course`-komponentti

```jsx
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}
```

`Course` käsittelee aina yhtä kurssia kerrallaan.

Se tekee kaksi asiaa:

1. Lähettää kurssin nimen `Header`-komponentille.
2. Lähettää kurssin osat `Content`-komponentille.

## `Header`-komponentti

```jsx
const Header = ({ name }) => <h2>{name}</h2>
```

`Header` saa kurssin nimen `name`-propsina ja näyttää sen `h2`-otsikkona.

Esimerkiksi:

```jsx
<Header name="Node.js" />
```

näkyy selaimessa näin:

```text
Node.js
```

## `Content`-komponentti

```jsx
const Content = (props) => {
  const parts = props.parts

  const total = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  )

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>total of {total} exercises</p>
    </div>
  )
}
```

`Content` saa yhden kurssin `parts`-taulukon propsina.

```jsx
<Content parts={course.parts}/>
```

Rivi

```jsx
const parts = props.parts
```

ottaa `parts`-taulukon props-oliosta.

## `reduce` laskee harjoitukset yhteen

```jsx
const total = parts.reduce(
  (sum, part) => sum + part.exercises,
  0
)
```

`reduce` käy kaikki osat läpi ja laskee niiden harjoitukset yhteen.

Jos osissa on harjoitusmäärät `10`, `7`, `14` ja `11`, laskenta etenee näin:

```text
0 + 10 = 10
10 + 7 = 17
17 + 14 = 31
31 + 11 = 42
```

Lopputulos on:

```text
total of 42 exercises
```

Toisen kurssin kohdalla laskenta tehdään erikseen. Node.js-kurssilla tulos on `3 + 7 = 10`.

## `parts.map` luo `Part`-komponentit

```jsx
{parts.map((part) => (
  <Part key={part.id} part={part} />
))}
```

Jokaisesta `parts`-taulukon alkiosta luodaan yksi `Part`-komponentti.

Esimerkiksi:

```jsx
<Part
  key={1}
  part={{
    name: 'Fundamentals of React',
    exercises: 10,
    id: 1
  }}
/>
```

`Part` vastaanottaa olion näin:

```jsx
const Part = ({ part }) =>
  <p>{part.name} {part.exercises}</p>
```

Se näyttää osan nimen ja harjoitusten määrän:

```text
Fundamentals of React 10
```

## Mikä on `key`?

```jsx
key={course.id}
```

ja

```jsx
key={part.id}
```

`key` on Reactin tarvitsema yksilöllinen tunniste listan alkioille. Sen avulla React tunnistaa, mikä lista-alkio on kyseessä.

`key` ei ole tavallinen prop, eikä sitä käytetä komponentin sisällä. Se on Reactia varten.

## Koko tapahtumaketju

```text
App
  ↓
 courses.map(course => ...)
  ↓
Course saa yhden course-olion
  ↓
Header saa course.name-arvon
  ↓
Content saa course.parts-taulukon
  ↓
Contentin parts.map(...) käy osat läpi
  ↓
Part saa yhden part-olion
  ↓
Part näyttää part.name- ja part.exercises-arvot
```

Tärkein ajatus on, että `map` muuttaa taulukon alkiot React-komponenteiksi:

```text
courses[] → Course-komponentit
parts[]   → Part-komponentit
```
