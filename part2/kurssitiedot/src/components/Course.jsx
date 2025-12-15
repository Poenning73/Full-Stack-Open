const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map( part => <Part part={part} /> )}
    </div>
  )
}

const Total = ({ parts }) => {
  console.log(parts)
  const total = parts.reduce( (total, part) => total + part.exercises, 0 )

  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course