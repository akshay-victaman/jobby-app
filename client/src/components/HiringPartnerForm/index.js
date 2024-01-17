import Stepper from 'react-stepper-horizontal';
import { IoIosClose } from "react-icons/io";
import {v4 as uuidv4} from 'uuid';
import NavBar from '../NavBar'
import './style.css'
import { useState } from 'react';

const HiringPartnerForm = () => {
    const steps = [
        {
            title: 'Personal Details'
        },
        {
            title: 'Qualification/Certification'
        },
        {
            title: 'About'
        },
        {
            title: 'References'
        },
        {
            title: 'Idenetification'
        }
    ]

    const [currentStep, setCurrentStep] = useState(0)
    const [certification, setCertification] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [personalDetails, setPersonalDetails ] = useState({
        fullName: "",
        dob: "",
        phone: "",
        wtspNum: "",
        email: "",
        currAddress: "",
        permAddress: "",
        languages: ""
    })

    const [qualification, setQualification] = useState({
        highestQualification: "",
        schoolName: "",
        certification: [],
        workExperience: []
    })

    const handleCurrentStep = (step) => {
        setCurrentStep(step)
    }

    const handleFullnameChange = (event) => {
        setPersonalDetails(prevState => ({...prevState, fullName: event.target.value}))
    }

    const handleDobChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, dob: event.target.value}))
    }

    const handlePhoneChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, phone: event.target.value}))
    }

    const handleWtspNumChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, wtspNum: event.target.value}))
    }

    const handleEmailChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, email: event.target.value}))
    }

    const handleCurrAddressChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, currAddress: event.target.value}))
    }

    const handlePermAddressChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, permAddress: event.target.value}))
    }

    const handleLanguageChange = (event) => {
        setPersonalDetails(prevState => ({ ...prevState, languages: event.target.value}))
    }

    const handleHighestQualificationChange = (event) => {
        setQualification(prevState => ({ ...prevState, highestQualification: event.target.value}))
    }

    const handleSchoolNameChange = (event) => {
        setQualification(prevState => ({ ...prevState, schoolName: event.target.value}))
    }

    const onChangeCertification = (event) => {
        setCertification(event.target.value)
    }

    const handleCertificationChange = () => {
        const certificationDetails = {
            id: uuidv4(),
            value: certification
        }
        setQualification(prevState => ({ ...prevState, certification: [...prevState.certification, certificationDetails]}))
        setCertification("")
    }

    const handleCertificationRemove = (id) => {
        setQualification(prevState => ({ ...prevState, certification: prevState.certification.filter((certification) => certification.id !== id)}))
    }

    const onChangeWorkExperience = (event) => {
        setWorkExperience(event.target.value)
    }

    const handleWorkExperienceChange = () => {
        const experience = {
            id: uuidv4(),
            value: workExperience
        }
        setQualification(prevState => ({ ...prevState, workExperience: [...prevState.workExperience, experience]}))
        setWorkExperience("")
    }

    const handleWorkExperienceRemove = (id) => {
        setQualification(prevState => ({ ...prevState, workExperience: prevState.workExperience.filter((experience) => experience.id !== id)}))
    }

    const onSubmitPersonalDetails = (e) => {
        e.preventDefault()
        console.log(personalDetails)
        handleCurrentStep(1)
    }

    const onSubmitQualification = (e) => {
        e.preventDefault()
        console.log(qualification)
        handleCurrentStep(2)
    }


    const renderPersonalDetails = () => (
        <div className='hr-form-container'>
            <h1 className='form-title'>Personal Details</h1>
            <form onSubmit={onSubmitPersonalDetails} className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='fullname' className='hr-label'>Full Name<span className='hr-form-span'> *</span></label>
                <input type='text' onChange={handleFullnameChange} value={personalDetails.fullName} required className='hr-input' id='fullname' name='fullname' />

                <label htmlFor='date-of-birth' className='hr-label'>Date of Birth<span className='hr-form-span'> *</span></label>
                <input type='date' onChange={handleDobChange} value={personalDetails.dob} required className='hr-input' id='date-of-birth' name='date-of-birth' />
                
                <label htmlFor='phone-number' className='hr-label'>Phone Number<span className='hr-form-span'> *</span></label>
                <input type='tel' onChange={handlePhoneChange} value={personalDetails.phone} required className='hr-input' id='phone-number' name='phone-number' />

                <label htmlFor='whatsapp-number' className='hr-label'>Whatsapp Number<span className='hr-form-span'> *</span></label>
                <input type='tel' onChange={handleWtspNumChange} value={personalDetails.wtspNum} required className='hr-input' id='whatsapp-number' name='whatsapp-number' />

                <label htmlFor='email' className='hr-label'>Email<span className='hr-form-span'> *</span></label>
                <input type='email' onChange={handleEmailChange} value={personalDetails.email} required className='hr-input' id='email' name='email' />
                
                <label htmlFor='current-address' className='hr-label'>Current Address<span className='hr-form-span'> *</span></label>
                <input type='text' onChange={handleCurrAddressChange} value={personalDetails.currAddress} required className='hr-input' id='current-address' name='current-address' />

                <label htmlFor='permanent-address' className='hr-label'>Permanent Address<span className='hr-form-span'> *</span></label>
                <input type='text' onChange={handlePermAddressChange} value={personalDetails.permAddress} required className='hr-input' id='permanent-address' name='permanent-address' />
                
                <label htmlFor='languages' className='hr-label'>Languages you speak<span className='hr-form-span'> *</span></label>
                <input type='text' onChange={handleLanguageChange} value={personalDetails.languages} required className='hr-input' id='languages' name='languages' />

                <button type='submit' className='hr-form-btn'>Save & Next</button>
            </form>
        </div>
    )

    const renderQualification = () => (
        <div className='hr-form-container'>
            <h1 className='form-title'>Qualification/Certification</h1>
            <form className='hr-form' onSubmit={onSubmitQualification}>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='qualification' className='hr-label'>Highest Qualification<span className='hr-form-span'> *</span></label>
                <select className='hr-input' id='qualification' name='qualification' required value={qualification.highestQualification} onChange={handleHighestQualificationChange}>
                    <option value=''>Select</option>
                    <option value='10th'>10th</option>
                    <option value='12th/Intermediate'>12th</option>
                    <option value='Graduation'>Graduation</option>
                    <option value='Post Graduation'>Post Graduation</option>
                    <option value='PhD'>PhD</option>
                </select>

                <label htmlFor='school-name' className='hr-label'>School Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='school-name' name='school-name' required value={qualification.schoolName} onChange={handleSchoolNameChange} />

                <label htmlFor='certification' className='hr-label' >Certification<span className='hr-form-span'> *</span></label>
                <div className='hr-input-list-con'>
                    {
                        qualification.certification.map((certification) => (
                            <div className='hr-input-list'>
                                <p className='hr-input-list-item'>{certification.value}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleCertificationRemove(certification.id)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <div className='hr-input-con'>
                    <input type='text' className='hr-input-sub' id='certification' name='certification' required={qualification.certification.length === 0} value={certification} onChange={onChangeCertification} />
                    <button type='button' className='hr-form-btn-add' onClick={handleCertificationChange}>Add</button>
                </div>
                <button type='button' className='hr-form-btn-more'>+ Add More</button>

                <label htmlFor='experience' className='hr-label' >Work Experience<span className='hr-form-span'> *</span></label>
                <div className='hr-input-list-con'>
                    {
                        qualification.workExperience.map((experience) => (
                            <div className='hr-input-list'>
                                <p className='hr-input-list-item'>{experience.value}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleWorkExperienceRemove(experience.id)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <div className='hr-input-con'>
                    <input type='text' className='hr-input-sub' id='experience' name='experience' required={qualification.workExperience.length === 0} value={workExperience} onChange={onChangeWorkExperience} />
                    <button type='button' className='hr-form-btn-add' onClick={handleWorkExperienceChange}>Add</button>
                </div>
                <button type='button' className='hr-form-btn-more'>+ Add More</button>

                <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn' onClick={() => handleCurrentStep(0)}>Back</button>
                    <button type='submit' className='hr-form-btn'>Save & Next</button>
                </div>
            </form>
        </div>
    )

    const renderAbout = () => (
        <div className='hr-form-container'>
            <h1 className='form-title'>About</h1>
            <div className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='about' className='hr-label'>Tell us about yourself (150-200 words)<span className='hr-form-span'> *</span></label>
                <textarea type='text' className='hr-textarea' id='about' name='about' placeholder='Minimum of 150 words' ></textarea>

                <label htmlFor='joinus' className='hr-label'>Why you want to join us as HR Recruiter (100-150 Words)<span className='hr-form-span'> *</span></label>
                <textarea type='text' className='hr-textarea' id='joinus' name='joinus' placeholder='Minimum of 100 words' ></textarea>

                <label htmlFor='contribute' className='hr-label'>How you can contribute to society as a recruiter (100-150 words)<span className='hr-form-span'> *</span></label>
                <textarea type='text' className='hr-textarea' id='contribute' name='contribute' placeholder='Minimum of 100 words' ></textarea>
                
                <label htmlFor='hours' className='hr-label'>How many hours you can contribute daily as a recruiter? (in Hours)<span className='hr-form-span'> *</span></label>
                <input type='number' className='hr-input' id='hours' name='hours' />

                <label htmlFor='hire' className='hr-label'>Which category you are interested to hire<span className='hr-form-span'> *</span></label>
                <div className='hr-input-checkbox-con'>
                    <div className='hr-checkbox-con'>
                        <input type='checkbox' className='hr-checkbox' id='bpo' />
                        <label className='hr-checkbox-label' htmlFor='bpo'>BPO</label>
                    </div>
                    <div className='hr-checkbox-con'>
                        <input type='checkbox' className='hr-checkbox' id='it' />
                        <label className='hr-checkbox-label' htmlFor='it'>IT</label>
                    </div>
                    <div className='hr-checkbox-con'>
                        <input type='checkbox' className='hr-checkbox' id='banking' />
                        <label className='hr-checkbox-label' htmlFor='banking'>Banking</label>
                    </div>
                    <div className='hr-checkbox-con'>
                        <input type='checkbox' className='hr-checkbox' id='insurance' />
                        <label className='hr-checkbox-label' htmlFor='insurance'>Insurance</label>
                    </div>
                    <div className='hr-checkbox-con'>
                        <input type='checkbox' className='hr-checkbox' id='industry' />
                        <label className='hr-checkbox-label' htmlFor='industry'>Industry</label>
                    </div>
                    <div className='hr-checkbox-con'>
                        <input type='checkbox' className='hr-checkbox' id='other' />
                        <label className='hr-checkbox-label' htmlFor='other'>Other</label>
                    </div>
                </div>
                
                <label htmlFor='joining' className='hr-label'>How soon you can join? (in Days)<span className='hr-form-span'> *</span></label>
                <input type='number' className='hr-input' id='joining' name='joining' />

                <div className='hr-submit-con'>
                    <button className='hr-form-btn' onClick={() => handleCurrentStep(1)}>Back</button>
                    <button className='hr-form-btn' onClick={() => handleCurrentStep(3)}>Save & Next</button>
                </div>
            </div>
        </div>
    )

    const renderReferences = () => (
        <div className='hr-form-container'>
            <h1 className='form-title'>References</h1>
            <div className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label className='hr-label'>List any three persons not related (Blood relation) to you, who are professionally, known to you.<span className='hr-form-span'> *</span></label>

                <p className='person-label'>Person 1</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='name' name='name' />

                <label htmlFor='phone-number' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='phone-number' name='phone-number' />

                <label htmlFor='email' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' className='hr-input' id='email' name='email' />
                
                <label htmlFor='organization' className='hr-label'>Organization<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='organization' name='organization' />

                <label htmlFor='designation' className='hr-label'>Designation<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='designation' name='designation' />
                
                <label htmlFor='know' className='hr-label'>How they know you?<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='know' name='know' />


                <p className='person-label'>Person 2</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='name' name='name' />

                <label htmlFor='phone-number' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='phone-number' name='phone-number' />

                <label htmlFor='email' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' className='hr-input' id='email' name='email' />
                
                <label htmlFor='organization' className='hr-label'>Organization<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='organization' name='organization' />

                <label htmlFor='designation' className='hr-label'>Designation<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='designation' name='designation' />
                
                <label htmlFor='know' className='hr-label'>How they know you?<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='know' name='know' />


                <p className='person-label'>Person 3</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='name' name='name' />

                <label htmlFor='phone-number' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='phone-number' name='phone-number' />

                <label htmlFor='email' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' className='hr-input' id='email' name='email' />
                
                <label htmlFor='organization' className='hr-label'>Organization<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='organization' name='organization' />

                <label htmlFor='designation' className='hr-label'>Designation<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='designation' name='designation' />
                
                <label htmlFor='know' className='hr-label'>How they know you?<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='know' name='know' />

                <div className='hr-submit-con'>
                    <button className='hr-form-btn'  onClick={() => handleCurrentStep(2)}>Back</button>
                    <button className='hr-form-btn'  onClick={() => handleCurrentStep(4)}>Save & Next</button>
                </div>
            </div>
        </div>
    )

    const renderIdentityProof = () => (
        <div className='hr-form-container'>
            <h1 className='form-title'>Idenetification</h1>
            <div className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='aadhar' className='hr-label'>Aadhar Number<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='aadhar' name='aadhar' />
                <div className='aadhar-con'>
                    <input type='file' id='aadhar-front' className='aadhar-input' />
                    <label htmlFor='aadhar-front' className='aadhar-label'>FRONT</label>

                    <input type='file' id='aadhar-back' className='aadhar-input' />
                    <label htmlFor='aadhar-back' className='aadhar-label'>BACK</label>
                </div>

                <label htmlFor='pan' className='hr-label'>PAN Number<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='pan' name='pan' />
                <div className='aadhar-con'>
                    <input type='file' id='pan-front' className='aadhar-input' />
                    <label htmlFor='pan-front' className='aadhar-label'>FRONT</label>

                    <input type='file' id='pan-back' className='aadhar-input' />
                    <label htmlFor='pan-back' className='aadhar-label'>BACK</label>
                </div>

                <label htmlFor='photo' className='hr-label'>Photo<span className='hr-form-span'> *</span></label>
                <div className='aadhar-con'>
                    <input type='file' id='photo' className='aadhar-input' />
                    <label htmlFor='photo' className='aadhar-label'>PHOTO</label>
                </div>
                
                <label htmlFor='emergency-number' className='hr-label'>Emergency Contact<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='emergency-number' name='emergency-number' />


                <label className='hr-label'>Details of 3 Family Members.<span className='hr-form-span'> *</span></label>

                <p className='person-label'>Member 1</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='name' name='name' />

                <label htmlFor='relationship' className='hr-label'>Relationship<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='relationship' name='relationship' />
                
                <label htmlFor='organization' className='hr-label'>Occupation/Organization<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='organization' name='organization' />

                <label htmlFor='age' className='hr-label'>Age<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='age' name='age' />
                
                <label htmlFor='know' className='hr-label'>Dependent on you?<span className='hr-form-span'> *</span></label>
                <div className='hr-checkbox-con'>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="depend" value="yes" />
                        Yes
                    </label>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="depend" value="no" />
                        No
                    </label>
                </div>


                <p className='person-label'>Member 2</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='name' name='name' />

                <label htmlFor='relationship' className='hr-label'>Relationship<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='relationship' name='relationship' />
                
                <label htmlFor='organization' className='hr-label'>Occupation/Organization<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='organization' name='organization' />

                <label htmlFor='age' className='hr-label'>Age<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='age' name='age' />
                
                <label htmlFor='know' className='hr-label'>Dependent on you?<span className='hr-form-span'> *</span></label>
                <div className='hr-checkbox-con'>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="depend" value="yes" />
                        Yes
                    </label>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="depend" value="no" />
                        No
                    </label>
                </div>


                <p className='person-label'>Member 3</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='name' name='name' />

                <label htmlFor='relationship' className='hr-label'>Relationship<span className='hr-form-span'> *</span></label>
                <input type='tel' className='hr-input' id='relationship' name='relationship' />
                
                <label htmlFor='organization' className='hr-label'>Occupation/Organization<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='organization' name='organization' />

                <label htmlFor='age' className='hr-label'>Age<span className='hr-form-span'> *</span></label>
                <input type='text' className='hr-input' id='age' name='age' />
                
                <label htmlFor='know' className='hr-label'>Dependent on you?<span className='hr-form-span'> *</span></label>
                <div className='hr-checkbox-con'>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="depend" value="yes" />
                        Yes
                    </label>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="depend" value="no" />
                        No
                    </label>
                </div>

                <div className='hr-submit-con'>
                    <button className='hr-form-btn' onClick={() => handleCurrentStep(3)}>Back</button>
                    <button className='hr-form-btn' >Submit</button>
                </div>
            </div>
        </div>
    )

    const renderAllSections = () => {
        switch(currentStep) {
            case 0: return renderPersonalDetails();
            case 1: return renderQualification();
            case 2: return renderAbout();
            case 3: return renderReferences();
            case 4: return renderIdentityProof();
            default: return null;
        }
    }

    return (
        <div className='homepage-container'>
            <NavBar />
            <div className='hiring-partner-container'>
                <div className='stepper-container'>
                    <Stepper 
                        activeColor="#EB6A4D" 
                        completeColor="#EB6A4D" 
                        activeTitleColor="#EB6A4D" 
                        titleFontSize={10}
                        completeBorderColor="#EB6A4D" 
                        completeBarColor="#EB6A4D"
                        steps={ steps } 
                        activeStep={ currentStep } 
                    />
                </div>
                {renderAllSections()}
            </div>
        </div>
    )
}

export default HiringPartnerForm