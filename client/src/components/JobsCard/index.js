import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './style.css'

const JobsCard = props => {
  const {jobsItem} = props
  
  const {
    id,
    companyLogoUrl,
    compname,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    role,
    category,
    workType,
    hiringCommision,
    hiringNeed,
    postedBy,
    status,
    createdAt,
  } = jobsItem
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobs-list-item-container">
        <div className="jobs-logo-name-con">
          <img src={companyLogoUrl} alt="company logo" className="jobs-logo" />
          <div className="jobs-title-con">
            <h1 className="job-title">{compname}</h1>
            <h1 className="job-title">{role}</h1>
            <p className="job-rating-number">{category}</p>
          </div>
        </div>
        <div className="jobs-loc-type-salary-con">
          <div className="jobs-loc-type-con">
            <div className="jobs-location-con">
              <TiLocation className="job-location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="jobs-location-con">
              <BsFillBriefcaseFill className="job-type-icon" />
              <p className="job-location">{employmentType}</p>
            </div>
          </div>
          <p className="job-salary">{packagePerAnnum} LPA</p>
        </div>
        <hr className="jobs-line" />
        <p className="job-detials">Commission: {hiringCommision}</p>
        <p className="job-detials">Notice Period: {hiringNeed}</p>
        <p className="job-detials">Work Type: {workType}</p>
        <h1 className="job-desc-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard