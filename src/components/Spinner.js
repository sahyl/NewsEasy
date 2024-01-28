import React  from 'react'
import loading from './loading.gif'
const Spinner = () => {
  
    return (
      <div className="d-flex align-items-center justify-content-center">
        <img className='my-3 mx-3' src={loading} alt="loading" />
      </div>
    )
}
export default Spinner
