import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {ThreeCircles} from 'react-loader-spinner'
import NavBar from '../NavBar'
import './style.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)

  useEffect(() => {
    getJobDetails()
  })

  const params = useParams()

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://BACKEND_API_URL/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    // const response = await fetch(apiUrl, options)
    // const data = await response.json()
    // if (response.ok === true) {
      
    //   // setJobDetails(jobDetailsDummy)
    //   setApiStatus(apiStatusConstant.success)
    // } else {
    //   setApiStatus(apiStatusConstant.failure)
    // }
    const jobDetailsDummy = {
      id: 3,
      companyLogoUrl: '/victaman-logo.png',
      compname: 'Victaman',
      employmentType: 'Full Time',
      jobDescription: "A software engineer is responsible for the design, development, and delivery of software. They work with programming languages, frameworks, databases, and servers to create software solutions that meet their company's needs. They also test software to ensure it's functioning properly, and troubleshoot problems when they arise. Software engineers may work on a variety of projects, from creating company apps to building out websites to designing software for robots.",
      location: 'Hyderabad',
      packagePerAnnum: '10 LPA',
      role: 'Software Developer - ReactJS',
      category: 'Software Development',
      workType: 'on-site',
      hiringCommision: '10%',
      hiringNeed: 'Immediate',
      companyWebsiteUrl: 'https://www.victaman.com/',
    }
    setJobDetails(jobDetailsDummy)
    setApiStatus(apiStatusConstant.success)
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <ThreeCircles type="ThreeDots" color="#f9a828" height="50" width="50" />
    </div>
  )

  const renderJobDetails = () => {
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
      companyWebsiteUrl,
    } = jobDetails
    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-details-logo-title-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-logo"
            />
            <div className="job-details-title-rating-con">
              <h1 className="job-details-title">{compname}</h1>
              <h1 className="job-details-title">{role}</h1>
              <p className="job-details-rating">{category}</p>
            </div>
          </div>
          <div className="job-details-location-type-salary-con">
            <div className="job-details-location-type-con">
              <div className="job-details-location-type">
                <TiLocation className="job-details-location-icon" />
                <p className="job-details-location">{location}</p>
              </div>
              <div className="job-details-location-type">
                <BsFillBriefcaseFill className="job-details-location-icon" />
                <p className="job-details-location">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-salary">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <p className="job-detials-misc"><span className='misc-head'>Commission:</span> {hiringCommision}</p>
          <p className="job-detials-misc"><span className='misc-head'>Notice Period:</span> {hiringNeed}</p>
          <p className="job-detials-misc"><span className='misc-head'>Work Type:</span> {workType}</p>
          <div className="job-details-desc-visit-con">
            <h1 className="job-details-desc-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="job-details-visit-con"
              target="_blank"
              rel="noreferrer"
            >
              <p className="job-details-visit">Visit</p>
              <HiOutlineExternalLink />
            </a>
          </div>
          <p className="job-details-desc">{jobDescription}</p>
        </div>
      </div>
    )
  }

  const renderJobDetailsFailure = () => (
    <div className="jobs-details-failure-container">
      <img
        src="/failure-img.avif"
        alt="failure view"
        className="jobs-details-failure-image"
      />
      <h1 className="jobs-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobs-details-failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-details-failure-retry-button"
        onClick={getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  const renderSwitchCase = () => {
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return renderLoader()
      case apiStatusConstant.success:
        return renderJobDetails()
      case apiStatusConstant.failure:
        return renderJobDetailsFailure()
      default:
        return null
    }
  }

    return (
      <div>
        <NavBar isLoggedIn={true} />
        {renderSwitchCase()}
      </div>
    )
}

export default JobDetails