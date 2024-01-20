

const AboutForm = (props) => {
    const { 
        handleAboutInputChange,
        about,
        hiringDept,
        handleHiringDeptChange,
        onSubmitAbout,
        handleCurrentStep,
        error
    } = props;
    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>About</h1>
            <form className='hr-form' onSubmit={onSubmitAbout}>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='about' className='hr-label'>Tell us about yourself (150-200 words)<span className='hr-form-span'> *</span></label>
                <textarea type='text' className='hr-textarea' required value={about.aboutYou} onChange={handleAboutInputChange} id='about' name='aboutYou' placeholder='Minimum of 150 words' ></textarea>

                <label htmlFor='joinus' className='hr-label'>Why you want to join us as HR Recruiter (100-150 Words)<span className='hr-form-span'> *</span></label>
                <textarea type='text' className='hr-textarea' required value={about.WhyJoinUs} onChange={handleAboutInputChange} id='joinus' name='WhyJoinUs' placeholder='Minimum of 100 words' ></textarea>

                <label htmlFor='contribute' className='hr-label'>How you can contribute to society as a recruiter (100-150 words)<span className='hr-form-span'> *</span></label>
                <textarea type='text' className='hr-textarea' required value={about.YourContribution} onChange={handleAboutInputChange} id='contribute' name='YourContribution' placeholder='Minimum of 100 words' ></textarea>
                
                <label htmlFor='hours' className='hr-label'>How many hours you can contribute daily as a recruiter? (in Hours)<span className='hr-form-span'> *</span></label>
                <input type='number' className='hr-input' placeholder="Ex: 8" required id='hours' value={about.hours} onChange={handleAboutInputChange} name='hours' />

                <label htmlFor='hire' className='hr-label'>Which category you are interested to hire<span className='hr-form-span'> *</span></label>
                <div className='hr-input-checkbox-con'>
                    {
                        hiringDept.map((dept) => (
                            <div className='hr-checkbox-con'>
                                <input 
                                    type='checkbox' 
                                    className='hr-checkbox' 
                                    id={dept.value} value={dept.value} 
                                    checked={about.hiringDept.includes(dept.value)} 
                                    onChange={handleHiringDeptChange} 
                                />
                                <label className='hr-checkbox-label' htmlFor={dept.value}>{dept.value}</label>
                            </div>
                        ))
                    }
                </div>
                
                <label htmlFor='joining' className='hr-label'>How soon you can join? (in Days)<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 30" className='hr-input' required value={about.joiningDate} onChange={handleAboutInputChange} id='joining' name='joiningDate' />

                <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn' onClick={() => handleCurrentStep(1)}>Back</button>
                    <button type='submit' className='hr-form-btn'>Save & Next</button>
                </div>
                <p className='hr-error'>{error}</p>
            </form>
        </div>
    )
}

export default AboutForm;