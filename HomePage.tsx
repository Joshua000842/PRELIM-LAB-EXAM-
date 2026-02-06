import { HeaderComponent } from '../components/Header'

export function HomePage() {
  return (
    <section>
      <HeaderComponent
        title="Welcome to the Student Info App"
        subtitle="Manage and view basic student information in one place."
      />
      <p>
        Use this simple app to explore how React components, props, state, routing, and API
        calls work together in a modern frontend project.
      </p>
      <p>
        Navigate to the <strong>Students</strong> page to see a list of students and some
        data loaded from a public API.
      </p>
    </section>
  )
}

