import { React, useState } from 'react'
import { apis, invokeZoomAppsSdk } from '../apis'
import './ApiScrollview.css'

function ApiScrollview({ onStartRTMS, onStopRTMS }) {
  const [apiSearchText, setApiSearchText] = useState('')

  const searchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase()
    setApiSearchText(lowerCase)
  }

  const filteredApis = apis?.filter((api) => {
    if (apiSearchText === '') {
      return api
    } else {
      return api.name.toLowerCase().includes(apiSearchText)
    }
  })

  return (
    <div className='api-scrollview'>
      <input placeholder='Search for an API' onChange={searchHandler} label='Search' id='api-scrollview-input' />

      <div className='api-buttons-list'>
        <button className='api-button' onClick={onStartRTMS}>
          startRTMS
        </button>
        <button className='api-button' onClick={onStopRTMS}>
          stopRTMS
        </button>

        {filteredApis?.map((api) => (
          <button onClick={invokeZoomAppsSdk(api)} className='api-button' key={api.buttonName || api.name}>
            {' '}
            {api.buttonName || api.name}
          </button>
        ))}
      </div>
      <hr className='hr-scroll-border'></hr>
    </div>
  )
}

export default ApiScrollview
