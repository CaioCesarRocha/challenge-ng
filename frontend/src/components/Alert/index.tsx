import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface propsSuccesAlert {
  theme: 'light' | 'dark' | 'colored'
}

const Alert = React.forwardRef((props: propsSuccesAlert, ref) => {

  return (
    <div >
      <ToastContainer
        autoClose={3000}
        theme={props.theme}
        position={'top-right'}
      />
    </div>
  )
})

export default Alert;


