/* eslint-disable react/prop-types */
const Form = ({ onSubmit, nameValue, onChangeName, numValue, onChangeNum }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input
            id="name"
            value={nameValue}
            onChange={onChangeName}
          />
        </div>
        <div>
          number: <input
          id="number" 
          value={numValue}
          onChange={onChangeNum}
          />
        </div>
        <div>
          <button type="submit" id="add_button">add</button>
        </div>
      </form>
    )
  }

  export default Form