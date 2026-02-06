import { useEffect, useState } from 'react'
import { HeaderComponent } from '../components/Header'
import { StudentComponent, type Student } from '../components/StudentCard'

type ApiUser = {
  id: number
  name: string
  email: string
}

export function StudentsPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

  const [studentsLoading, setStudentsLoading] = useState(true)
  const [apiUsers, setApiUsers] = useState<ApiUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const students: Student[] = [
    { id: 1, name: 'Cody Rhodes', course: 'BS Information Technology', year: '1' },
    { id: 2, name: 'Sami Zayn', course: 'BS Computer Science', year: '1' },
    { id: 3, name: 'Becky Lynch', course: 'BS Information Technology', year: '2' },
    { id: 4, name: 'Bianca Belair', course: 'BS Computer Science', year: '2' },
    { id: 5, name: 'Roman Reigns', course: 'BS Information Technology', year: '3' },
    { id: 6, name: 'Alexa Bliss', course: 'BS Computer Science', year: '3' },
    { id: 7, name: 'LA Knight', course: 'BS Information Technology', year: '4' },
    { id: 8, name: 'Stephanie Vaquer', course: 'BS Computer Science', year: '4' },
    { id: 9, name: 'Damian Priest', course: 'BS Information Technology', year: '4' },
    { id: 10, name: 'Sol Ruca', course: 'BS Computer Science', year: '4' },
];


  useEffect(() => {
    // Simulate a 3 second loading state for the local student list
    const timeoutId = window.setTimeout(() => {
      setStudentsLoading(false)
    }, 3000)

    async function fetchUsers() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Failed to load data from the API.')
        }

        const data: ApiUser[] = await response.json()
        setApiUsers(data.slice(0, 5))
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong loading the API.'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  const selectedStudent = students.find((s) => s.id === selectedStudentId) ?? null

  return (
    <>
      {studentsLoading && (
        <div className="students-loading-modal">
          <div className="students-loading-modal-content">
            <div className="students-loading-spinner" />
            <h2 className="students-loading-title">Loading students</h2>
            <p className="students-loading-subtitle">
              Preparing the list. This will only take a moment...
            </p>
          </div>
        </div>
      )}

      <section>
        <HeaderComponent
          title="Students"
          subtitle="View local student data and a small list from a public API."
        />

        <div className="students-layout">
          <div className="students-column">
            <h2>Local students</h2>
            <p>
              Click the button on a student card to select them. This uses React{' '}
              <strong>state</strong> to manage which student is currently highlighted.
            </p>

            <div className="students-grid">
              {students.map((student) => (
                <StudentComponent
                  key={student.id}
                  student={student}
                  selected={student.id === selectedStudentId}
                  onSelect={setSelectedStudentId}
                />
              ))}
            </div>
          </div>

          <aside className="students-column students-details">
            <h2>Selected student details</h2>
            {selectedStudent ? (
              <div className="selected-student-panel">
                <p>
                  <strong>Name:</strong> {selectedStudent.name}
                </p>
                <p>
                  <strong>Course:</strong> {selectedStudent.course}
                </p>
                <p>
                  <strong>Year:</strong> {selectedStudent.year}
                </p>
              </div>
            ) : (
              <p>No student selected yet. Choose one from the list.</p>
            )}
          </aside>
        </div>

        <section className="api-section">
          <h2>Sample data from JSONPlaceholder</h2>
          {isLoading && <p>Loading users from public API...</p>}
          {error && <p className="error-message">Error: {error}</p>}
          {!isLoading && !error && (
            <ol className="api-list">
              {apiUsers.map((user, index) => (
                <li key={user.id}>
                  <span className="api-list-name">
                    {index + 1}. {user.name}
                  </span>
                  <span className="api-list-email">{user.email}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </section>
    </>
  )
}

