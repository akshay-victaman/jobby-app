import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import {ThreeCircles} from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import { FaFilter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import JobsCard from '../JobsCard'
import FilterJobs from '../FilterJobs'
import './style.css'
import SalaryRangeList from '../SalaryRangeList'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// const jobsListDummy = [
//   {
//     id: 1,
//     companyLogoUrl: '/victaman-logo.png',
//     compname: 'Victaman',
//     employmentType: 'Full Time',
//     jobDescription: "A software engineer is responsible for the design, development, and delivery of software. They work with programming languages, frameworks, databases, and servers to create software solutions that meet their company's needs. They also test software to ensure it's functioning properly, and troubleshoot problems when they arise. Software engineers may work on a variety of projects, from creating company apps to building out websites to designing software for robots.",
//     location: 'Hyderabad',
//     packagePerAnnum: '10 LPA',
//     role: 'Software Developer - ReactJS',
//     category: 'Software Development',
//     workType: 'on-site',
//     hiringCommision: '10%',
//     hiringNeed: 'Immediate',
//   },
//   {
//     id: 2,
//     companyLogoUrl: '/victaman-logo.png',
//     compname: 'Victaman',
//     employmentType: 'Full Time',
//     jobDescription: "A software engineer is responsible for the design, development, and delivery of software. They work with programming languages, frameworks, databases, and servers to create software solutions that meet their company's needs. They also test software to ensure it's functioning properly, and troubleshoot problems when they arise. Software engineers may work on a variety of projects, from creating company apps to building out websites to designing software for robots.",
//     location: 'Hyderabad',
//     packagePerAnnum: '10 LPA',
//     role: 'Software Developer - ReactJS',
//     category: 'Software Development',
//     workType: 'on-site',
//     hiringCommision: '10%',
//     hiringNeed: 'Immediate',
//   },
//   {
//     id: 3,
//     companyLogoUrl: '/victaman-logo.png',
//     compname: 'Victaman',
//     employmentType: 'Full Time',
//     jobDescription: "A software engineer is responsible for the design, development, and delivery of software. They work with programming languages, frameworks, databases, and servers to create software solutions that meet their company's needs. They also test software to ensure it's functioning properly, and troubleshoot problems when they arise. Software engineers may work on a variety of projects, from creating company apps to building out websites to designing software for robots.",
//     location: 'Hyderabad',
//     packagePerAnnum: '10 LPA',
//     role: 'Software Developer - ReactJS',
//     category: 'Software Development',
//     workType: 'on-site',
//     hiringCommision: '10%',
//     hiringNeed: 'Immediate',
//   }
// ]

const JobsSection = () => {

    const [jobsList, setJobsList] = useState([])
    const [employmentTypeList, setEmploymentTypeList] = useState([])
    const [minimumPackageList, setMinimumPackageList] = useState([])
    const [industryTypeList, setIndustryTypeList] = useState([])
    const [locationTypeList, setLocationTypeList] = useState([])
    const [workPlaceType, setWorkPlaceType] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [archieve, setArchieve] = useState(false)


  useEffect(() => {
    getJobsCard()
    }, [employmentTypeList, minimumPackageList])

  const archieveJobs = () => {
    console.log(archieve)
    if(archieve) {
      setJobsList(jobsList.filter(eachJob => eachJob.status === 'ARCHIVED'))
    } else {
      getJobsCard()
    }
  }

  const onSelectArchieve = async () => {
    await setArchieve(!archieve, archieveJobs())
    // archieveJobs()
  }

  const onSelectEmploymentType = event => {
    if (employmentTypeList.includes(event.target.value)) {
      const newEmploymentTypeList = employmentTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setEmploymentTypeList(newEmploymentTypeList)
    } else {
      setEmploymentTypeList([...employmentTypeList, event.target.value])
    }
  }

  const onSelectIndustryType = event => {
    if (industryTypeList.includes(event.target.value)) {
      const newIndustryTypeList = industryTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setIndustryTypeList(newIndustryTypeList)
    } else {
      setIndustryTypeList([...industryTypeList, event.target.value])
    }
  }

  const onSelectLocataionType = event => {
    if (locationTypeList.includes(event.target.value)) {
      const newLocationTypeList = locationTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setLocationTypeList(newLocationTypeList)
    } else {
      setLocationTypeList([...locationTypeList, event.target.value])
    }
  }

  const onSelectWorkPlaceType = event => {
    if (workPlaceType.includes(event.target.value)) {
      const newWorkPlaceTypeList = workPlaceType.filter(
        eachItem => eachItem !== event.target.value,
      )
      setWorkPlaceType(newWorkPlaceTypeList)
    } else {
      setWorkPlaceType([...workPlaceType, event.target.value])
    }
  }

  const onChangeSalaryRange = event => {
    if (minimumPackageList.includes(event.target.value)) {
      const newMinimumPackageList = minimumPackageList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setMinimumPackageList(newMinimumPackageList)
    } else {
      setMinimumPackageList([...minimumPackageList, event.target.value])
    }
  }

  const onToggleFilter = () => {
    setToggleFilter(!toggleFilter)
  }

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const onKeyEnter = event => {
    if (event.key === 'Enter') {
      getJobsCard()
    }
  }

  const onClickButton = () => {
    getJobsCard()
  }

  const getJobsCard = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const username = Cookies.get('username')
    const role = Cookies.get('role')
    let apiUrl = ""
    if (role === 'AC') {
      apiUrl = `http://localhost:5000/jobs/account-manager/${username}`
    } else if (role === 'HR') {
      apiUrl = `http://localhost:5000/jobs/hr/${username}`
    } else {
      apiUrl = `http://localhost:5000/admin/get-jobs/all`
    }
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log('api data', data)
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
      } else {
        const updatedData = data.map(eachItem => ({
          id: eachItem.id,
          companyLogoUrl: eachItem.company_logo_url,
          category: eachItem.category,
          compname: eachItem.company_name,
          packagePerAnnum: eachItem.ctc,
          employmentType: eachItem.employment_type,
          jobDescription: eachItem.description,
          location: eachItem.location,
          role: eachItem.title,
          workType: eachItem.work_type,
          hiringNeed: eachItem.hiring_need,
          hiringCommision: eachItem.commission,
          postedBy: eachItem.posted_by,
          status: eachItem.status,
          createdAt: eachItem.created_at,
        }))
        console.log('updated data',updatedData)
      /*
        assigned_to
        category
        commission
        company_name
        created_at
        ctc
        description
        employment_type
        hiring_need
        id
        location
        no_of_openings
        posted_by
        skills
        status
        title
        updated_at
        work_type

      */

        setJobsList(updatedData)
        setApiStatus(apiStatusConstant.success)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const renderJobsCards = () => {
    const noJobs = jobsList.length === 0

    return (
      <div className="jobs-section-container">
        {noJobs ? (
          renderNoJobFound()
        ) : (
          <ul className="jobs-card-list">
            {jobsList.map(eachJob => (
              <JobsCard key={eachJob.id} jobsItem={eachJob} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  const renderNoJobFound = () => (
    <div className="jobs-failure-container">
      <img
        src="/no-data-found.jpg"
        alt="no jobs"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">No Jobs Found</h1>
      <p className="jobs-failure-desc">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  const renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="/failure-img.avif"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-retry-button"
        onClick={getJobsCard}
      >
        Retry
      </button>
    </div>
  )

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <ThreeCircles type="ThreeDots" color="#f9a828" height="50" width="50" />
    </div>
  )

  const renderAllSections = () => {
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return renderLoader()
      case apiStatusConstant.success:
        return renderJobsCards()
      case apiStatusConstant.failure:
        return renderJobsFailure()
      default:
        return null
    }
  }

    return (
      <div className="jobs-section-container">
        {/* <div className='filter-button-con'>
          <button className='filter-button' onClick={onToggleFilter}>
            {
              toggleFilter ? 
              (
                <IoClose className='close-icon' />
              ) : (
                <FaFilter className='filter-icon' />
              )
            }
            <span className='filter-text'>{toggleFilter ? 'Close' : 'Filter'}</span>
          </button>
        </div> */}
        {/* {
          toggleFilter ? 
          (
            <div className="jobs-section-profile-filter-con">
              <FilterJobs
              onSelectEmploymentType={onSelectEmploymentType}
              onChangeSalaryRange={onChangeSalaryRange}
              onSelectIndustryType={onSelectIndustryType}
              onSelectLocataionType={onSelectLocataionType}
              onSelectWorkPlaceType={onSelectWorkPlaceType}
              onChangeInput={onChangeInput}
              onKeyEnter={onKeyEnter}
              onClickButton={onClickButton}
            />
            </div>
          ) : (
            ""
          )
        } */}
        <div className="jobs-section-profile-filter-con">
              <FilterJobs
              onSelectArchieve={onSelectArchieve}
              archieve={archieve}
              onSelectEmploymentType={onSelectEmploymentType}
              onChangeSalaryRange={onChangeSalaryRange}
              onSelectIndustryType={onSelectIndustryType}
              onSelectLocataionType={onSelectLocataionType}
              onSelectWorkPlaceType={onSelectWorkPlaceType}
              onChangeInput={onChangeInput}
              onKeyEnter={onKeyEnter}
              onClickButton={onClickButton}
            />
        </div>
          

        
        <div className="job-section-search-card-con">
          {/* <div className="search-box-desk-con">
            <input
              type="search"
              placeholder="Search"
              className="search-box"
              onChange={onChangeInput}
              //   value={searchInput}
              onKeyDown={onKeyEnter}
            />
            <button
              type="button"
              className="search-icon-con"
              onClick={onClickButton}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div> */}

          {renderAllSections()}
        </div>
      </div>
    )
}

export default JobsSection