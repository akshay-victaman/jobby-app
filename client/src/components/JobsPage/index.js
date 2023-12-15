import JobsSection from '../JobsSection'
import NavBar from '../NavBar'
import './style.css'

const JobsPage = () => (
  <>
    <NavBar isLoggedIn={true} />
    <div className="jobs-container">
      <JobsSection />
    </div>
  </>
)

export default JobsPage