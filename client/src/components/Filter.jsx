/* eslint-disable react/prop-types */
const Filter = ({ value, onChange, person }) => {
    return (
      <div>
        filter shown with <input 
        value={value}
        onChange={onChange}
        />
        <p>{person}</p>
      </div>
    )
  }

  export default Filter