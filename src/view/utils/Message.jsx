import React from 'react'

const Message = ({messageClass, children, ...props}) => {
  return (
    <React.Fragment>
      <p className={messageClass}>
        {children}
      </p>
    </React.Fragment>
  )
}

export default Message