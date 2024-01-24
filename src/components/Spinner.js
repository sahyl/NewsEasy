import React, { Component } from 'react'
import loading  from './loading.gif'
export default class Spinner extends Component {
  render() {
    return (
<div className="d-flex align-items-center justify-content-center">

        <img className='my-3 mx-3' src={loading} alt="loading" />
      </div>
    )
  }
}
//<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
  
