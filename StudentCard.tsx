import './StudentCard.css'

export type Student = {
  id: number
  name: string
  course: string
  year: string
}

type StudentCardProps = {
  student: Student
  selected?: boolean
  onSelect: (id: number) => void
}

export function StudentComponent({ student, selected, onSelect }: StudentCardProps) {
  return (
    <article
      className={selected ? 'student-card student-card-selected' : 'student-card'}
    >
      <header className="student-card-header">
        <h3>{student.name}</h3>
        <span className="student-badge">Year {student.year}</span>
      </header>
      <p className="student-course">{student.course}</p>
      <button
        className="student-select-button"
        type="button"
        onClick={() => onSelect(student.id)}
      >
        {selected ? 'Selected' : 'Select student'}
      </button>
    </article>
  )
}

