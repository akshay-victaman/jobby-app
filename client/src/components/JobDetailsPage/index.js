import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import {Oval} from 'react-loader-spinner'
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { useParams, Redirect } from 'react-router-dom'
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

const JobDetailsPage = () => {
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
  const [error, setError] = useState('')
  const [candidateList, setCandidateList] = useState([])

  useEffect(() => {
    getJobDetails()
    fetchHumarResources()
    getCandidates()
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

  const getCandidates = async () => {
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `http://localhost:5000/jobs/candidate/${id}`
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
        const username = Cookies.get('username')
        const role = Cookies.get('role')
        if(role === 'HR') {
          const filteredData = data.filter(eachItem => eachItem.applied_by === username)
          const formattedData = filteredData.map(eachItem => ({
            candidateId: eachItem.candidate_id,
            candidateName: eachItem.name,
            candidateEmail: eachItem.email,
            candidatePhone: eachItem.phone,
            offerStatus: eachItem.offer_status,
            offeredDate: eachItem.offered_date,
            appliedBy: eachItem.applied_by
          }))
          setCandidateList(formattedData)
        } else {
          const formattedData = data.map(eachItem => ({
            candidateId: eachItem.candidate_id,
            candidateName: eachItem.name,
            candidateEmail: eachItem.email,
            candidatePhone: eachItem.phone,
            offerStatus: eachItem.offer_status,
            offeredDate: eachItem.offered_date,
            appliedBy: eachItem.applied_by
          }))
          setCandidateList(formattedData)
        }
        console.log(data)
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

  const postCandidateDetails = async (close) => {
    if(candidateName === '' || candidateEmail === '' || candidatePhone === '' || offerStatus === '') {
      setError("All fields are mandatory")
      return
    }
    setError("")
    const username = Cookies.get('username')
    const candidateData = {
      candidateName,
      candidateEmail,
      candidatePhone,
      jobId: jobDetails.id,
      username,
      offerStatus
    }
    const url = 'http://localhost:5000/jobs/candidate/add'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify(candidateData)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            setError(data.error)
        } else {
            setCandidateList([...candidateList, candidateData])
            setError("")
            setCandidateName('')
            setCandidateEmail('')
            setCandidatePhone('')
            setOfferStatus('')
            close()
        }
    } else {
        setError(data.error)
    }
  }

  const handleCandidateStatusChange = (e) => {
    setOfferStatus(e.target.value)
  }

  const updateCandidateStatus = async (candidateId, close) => {
    if(offerStatus === '') {
      setError("All fields are mandatory")
      return
    }
    setError("")
    const username = Cookies.get('username')
    const candidateData = {
      candidateId,
      jobId: jobDetails.id,
      username,
      offerStatus
    }
    const url = 'http://localhost:5000/jobs/candidate/status/update'
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify(candidateData)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            setError(data.error)
        } else {
            setCandidateList(candidateList.map(eachItem => {
              if(eachItem.candidateId === candidateId) {
                return {
                  ...eachItem,
                  offerStatus
                }
              }
              return eachItem
            }))
            setOfferStatus('')
            close()
        }
    } else {
        setError(data.error)
    }
  }

  const handleArchieveJob = async (close) => {
    const url = `http://localhost:5000/admin/archive-job/${jobDetails.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            alert(data.error)
        } else {
            setJobDetails({
              ...jobDetails,
              status: 'ARCHIVED'
            })
            alert(data.message)
            close()
        }
    } else {
        alert(data.error)
    }
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
        <label className="homepage-label" htmlFor='candidateName'>Candidate Name</label>
        <input type="text" className="homepage-input" id='candidateName' value={candidateName} onChange={handleCandidateNameChange} />
        <label className="homepage-label" htmlFor='candidateEmail'>Candidate Email</label>
        <input type="text" className="homepage-input" id='candidateEmail' value={candidateEmail} onChange={handleCandidateEmailChange} />
        <label className="homepage-label" htmlFor='candidatePhone'>Candidate Phone</label>
        <input type="text" className="homepage-input" id='candidatePhone' value={candidatePhone} onChange={handleCandidatePhoneChange} />
        <label className="homepage-label" htmlFor='offerStatus'>Offer Status</label>
        <select className="homepage-input" id='offerStatus' value={offerStatus} onChange={handleOfferStatusChange}>
        <option value=''>Select Offer Status</option>
        <option value='Pending'>Pending</option>
        <option value='Accepted'>Accepted</option>
        <option value='Rejected'>Rejected</option>
        <option value='On-hold'>On-hold</option>
        <option value='ongoing'>Ongoing</option>
        </select>
        <button className="login-button" onClick={() => {postCandidateDetails(close)}}>Submit</button>
        {error!=="" && <p className="error-message">*{error}</p>}
    </div>
  )

  const renderUpdateStatus = (close, candidateId) => (
    <div className="modal-form">
        <label className="homepage-label" htmlFor='offerStatus'>Offer Status</label>
        <select className="homepage-input" id='offerStatus' value={offerStatus} onChange={handleCandidateStatusChange}>
          <option value=''>Select Offer Status</option>
          <option value='Pending'>Pending</option>
          <option value='Accepted'>Accepted</option>
          <option value='Rejected'>Rejected</option>
          <option value='On-hold'>On-hold</option>
          <option value='ongoing'>Ongoing</option>
        </select>
        <button className="login-button" onClick={() => {updateCandidateStatus(candidateId, close)}}>Update Status</button>
        {error!=="" && <p className="error-message">*{error}</p>}
    </div>
  )

  const renderArchieveJob = close => (
    <div className="modal-form">
        <label className="homepage-label">Do you really want to archieve this job?</label>
        <div className='achieve-button-con'>
          <button className='job-details-upload-candidate-button' onClick={() => handleArchieveJob(close)}>YES</button>
          <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>NO</button>
        </div>
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
          { jobDetails.status === 'ARCHIVED' ? <p className="job-details-posted-at">This job is archived</p> 
          :
            (userType === 'HR' || userType === 'ADMIN') &&
            <Popup
              trigger={<button className='job-details-upload-candidate-button'>
                        {userType === 'HR' ? 'Upload Candidate' : 'Archieve Job'}
                      </button>}
              modal
            >
              {close => (
                <div className="modal">
                  <button className="modal-close-button" onClick={close}>
                    &times;
                  </button>
                  {
                    userType === 'ADMIN' ? renderArchieveJob(close) : renderUploadCandidaete(close)
                  }
                </div>
              )}
            </Popup>
          }
          {/* <button className="job-details-upload-candidate-button">Archieve Job</button> */}
        </div>
      </div>
    )
  }

  const renderCandidates = () => (
    // offeredDate: eachItem.offered_date
      <div className="job-details-candidates-container">
        <h1 className="job-details-candidates-heading">Candidates</h1>
        <div className='table-container'>
          <table className="job-details-candidates-table">
              <tr className="job-details-candidates-table-heading">
                <th className="job-details-candidates-table-heading-cell">
                  Name
                </th>
                <th className="job-details-candidates-table-heading-cell">
                  Email
                </th>
                <th className="job-details-candidates-table-heading-cell">
                  Phone
                </th>
                <th className="job-details-candidates-table-heading-cell">
                  Offer Status
                </th>
                {
                  Cookies.get('role') !== 'HR' &&
                  <th className="job-details-candidates-table-heading-cell">
                    Shortlisted By
                  </th>
                }
                
                {
                  Cookies.get('role') !== 'ADMIN' && (
                    <th className="job-details-candidates-table-heading-cell">
                      Update Status
                    </th>
                  )
                }
                
              </tr>
              
              {
                candidateList.length > 0 ? candidateList.map(eachItem => (
                <tr className="job-details-candidates-table-row">
                    <td className="job-details-candidates-table-cell">
                      {eachItem.candidateName}
                    </td>
                    <td className="job-details-candidates-table-cell">
                    {eachItem.candidateEmail}
                    </td>
                    <td className="job-details-candidates-table-cell">
                    {eachItem.candidatePhone}
                    </td>
                    <td className="job-details-candidates-table-cell">
                    {eachItem.offerStatus}
                    </td>
                    {
                      Cookies.get('role') !== 'HR' &&
                      <td className="job-details-candidates-table-cell">
                      {eachItem.appliedBy}
                      </td>
                    }
                    {
                      Cookies.get('role') !== 'ADMIN' && (
                    <td className="job-details-candidates-table-cell">
                      <Popup
                        trigger={<button className="job-details-upload-candidate-button update-button">Update</button>}
                        modal
                      >
                        {close => (
                          <div className="modal">
                            <button className="modal-close-button" onClick={close}>
                              &times;
                            </button>
                            {renderUpdateStatus(close, eachItem.candidateId)}
                          </div>
                        )}
                      </Popup>
                    </td>
                    )}
                  </tr>
                ))
                :
                <p className='' style={{textAlign: 'center'}}>no records found!</p>
              }
          </table>
        </div>
      </div>
    )

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

    const role = Cookies.get('role')
    if(role === 'BDE') {
      return <Redirect to='/bde-portal' />
    }

    return (
      <div>
        <NavBar isLoggedIn={true} />
        {renderSwitchCase()}
        {renderCandidates()}
      </div>
    )
}

export default JobDetailsPage