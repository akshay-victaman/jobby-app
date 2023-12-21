import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import {Oval} from 'react-loader-spinner'
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { useParams } from 'react-router-dom'
import Popup from 'reactjs-popup';
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
  const [humarResources, setHumarResources] = useState([])
  const [selectedHR, setSelectedHR] = useState('')
  const [loading, setLoading] = useState(false)
  const [hrAssigned, setHrAssigned] = useState(0)
  const [candidateName, setCandidateName] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidatePhone, setCandidatePhone] = useState('')
  const [offerStatus, setOfferStatus] = useState('')

  useEffect(() => {
    getJobDetails()
    fetchHumarResources()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHrAssigned(0)
    }, 5000)
    return () => clearTimeout(timer)
  }, [hrAssigned])

  const params = useParams()

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `http://localhost:5000/jobs/details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
      } else {

        const formattedData = {
          id: data.id,
          companyLogoUrl: data.company_logo_url,
          category: data.category,
          compname: data.company_name,
          packagePerAnnum: data.ctc,
          employmentType: data.employment_type,
          jobDescription: data.description,
          location: data.location,
          role: data.title,
          workType: data.work_type,
          hiringNeed: data.hiring_need,
          hiringCommision: data.commission,
          postedBy: data.posted_by,
          status: data.status,
          createdAt: data.created_at,
        }
        setJobDetails(formattedData)
        setApiStatus(apiStatusConstant.success)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const fetchHumarResources = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch('http://localhost:5000/api/users/all/hr', options)
    const data = await response.json()
    setHumarResources(data)
  }

  const handleHumanResourceChange = (e) => {
    setSelectedHR(e.target.value)
  }

  const assignJobToHR = async () => {
    if(selectedHR === '') {
      return
    }
    setLoading(true)
    const username = Cookies.get('username')
    const assingedData = {
      jobId: jobDetails.id,
      assignedTo: selectedHR,
      assignedBy: username
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify(assingedData)
    }
    const response = await fetch('http://localhost:5000/jobs/assign', options)
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            alert(data.error)
            setHrAssigned(2)
        } else {
            setHrAssigned(1)
        }
    } else {
        setHrAssigned(2)
    }
    setLoading(false)
  }

  const handleCandidateNameChange = (e) => {
    setCandidateName(e.target.value)
  }

  const handleCandidateEmailChange = (e) => {
    setCandidateEmail(e.target.value)
  }

  const handleCandidatePhoneChange = (e) => {
    setCandidatePhone(e.target.value)
  }

  const handleOfferStatusChange = (e) => {
    setOfferStatus(e.target.value)
  }

  const postCandidateDetails = async () => {
    /*
      "candidateName": "santhosh",
      "candidateEmail": "santhosh123@gmail.com",
      "candidatePhone": "9874563210",
      "jobId": "38993740-f3d8-4749-871f-9dab5dfafce7",
      "username": "Akshay",
      "offerStatus": "Pending"
    */
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <ThreeCircles type="ThreeDots" color="#f9a828" height="50" width="50" />
    </div>
  )

  const renderAssignToHR = () => (
    <div className='job-details-assign-con'>
      <div className='job-details-assign-sub-con'>
        <label className='job-details-assign'>Assign to HR: </label>
        <select className='job-details-select' value={selectedHR} onChange={handleHumanResourceChange}>
          <option value=''>Select HR</option>
            {   humarResources.length > 0 &&
                humarResources.map(eachItem => <option value={eachItem.username}>{eachItem.username + ' - ' + eachItem.location + ' - ' + eachItem.hiring_ctc + ' LPA - ' + eachItem.industry}</option>)
            }
        </select>
      </div>
      <div className='job-details-assign-sub-con'>
        <button className='job-details-assign-button' disabled={loading} onClick={assignJobToHR} >
          {loading ? 
            <Oval
                height={16}
                width={16}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffffff"
                strokeWidth={3}
                strokeWidthSecondary={3}
            />
            :
            "Assign"
          }
        </button>
        <p className='job-details-assign-status'>
          {hrAssigned === 1 && <FaCircleCheck className='check-icon' /> }
          {hrAssigned === 2 && <IoIosCloseCircle className='cross-circle-icon' /> }
          {hrAssigned === 2 && "Try Again"}
        </p>
      </div>
    </div>
  )

  const renderUploadCandidaete = (close) => (
    <div className="modal-form">
        <label className="homepage-label">Candidate Name</label>
        <input type="text" className="homepage-input" value={candidateName} onChange={handleCandidateNameChange} />
        <label className="homepage-label">Candidate Email</label>
        <input type="text" className="homepage-input" value={candidateEmail} onChange={handleCandidateEmailChange} />
        <label className="homepage-label">Candidate Phone</label>
        <input type="text" className="homepage-input" value={candidatePhone} onChange={handleCandidatePhoneChange} />
        <label className="homepage-label">Offer Status</label>
        <select className="homepage-input" value={offerStatus} onChange={handleOfferStatusChange}>
        <option value=''>Select Offer Status</option>
        <option value='Pending'>Pending</option>
        <option value='Accepted'>Accepted</option>
        <option value='Rejected'>Rejected</option>
        <option value='On-hold'>On-hold</option>
        <option value='ongoing'>Ongoing</option>
        </select>
        <button className="login-button" onClick={() => {postCandidateDetails(); close()}}>Submit</button>
    </div>
  )

  const renderJobDetails = () => {
    const {
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
      postedBy,
      status,
      createdAt,
    } = jobDetails
    const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

    const userType = Cookies.get('role')

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
          {userType === 'AC' && renderAssignToHR()}
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
            <p className="job-details-salary">{packagePerAnnum} LPA</p>
          </div>
          <hr className="line" />
          <p className="job-detials-misc"><span className='misc-head'>Status:</span> {status}</p>
          <p className="job-detials-misc"><span className='misc-head'>Assigned By:</span> {postedBy}</p>
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
          <p className="job-details-posted-at">Posted {formattedDate}</p>
          {
            userType === 'HR' &&
            <Popup
              trigger={<button className='job-details-upload-candidate-button'>Upload Candidate</button>}
              modal
            >
              {close => (
                <div className="modal">
                  <button className="modal-close-button" onClick={close}>
                    &times;
                  </button>
                  {renderUploadCandidaete(close)}
                </div>
              )}
            </Popup>
          }
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