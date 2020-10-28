import React from 'react'

const Person = ({ person, handleDelete }) => (
    <div>
        <div>Name: {person.name}</div>
        <div>Number: {person.number}</div>
        <button onClick={handleDelete}>Delete Person</button> 
        <br /><br />
    </div>
)

export default Person