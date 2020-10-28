import React from 'react'

const Notification = ({ message, color }) => {

    const style = { 
        color: color,
        background: 'lightgrey',
        fontSize: 26,
        borderStyle: 'solid',
        borderRadius: 5,
        margin: 20,
        padding: 20
    }

    if (message === null) {
        return null
    }

    return (
        <div style={style} >
            {message}
        </div>
    )

}

export default Notification