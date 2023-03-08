import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    filterSalaryRange,
    filterEmploymentType,
  } = props

  const onChangeSalary = event => {
    filterSalaryRange(event.target.value)
  }

  const onChangeType = event => {
    filterEmploymentType(event.target.value)
  }

  return (
    <div className="filters-container">
      <ul className="employment-type-list-container">
        {employmentTypesList.map(type => (
          <li className="each-type" key={type.employmentTypeId}>
            <input
              onChange={onChangeType}
              id="checkbox"
              type="checkbox"
              className="input-checkbox"
              value={type.employmentTypeId}
            />
            <label htmlFor="checkbox" className="label-element">
              {type.label}
            </label>
          </li>
        ))}
      </ul>
      <ul className="salary-range-list-container">
        {salaryRangesList.map(range => (
          <li className="each-range" key={range.salaryRangeId}>
            <label htmlFor="radio" className="label-element">
              {range.label}
            </label>
            <input
              onChange={onChangeSalary}
              name="range"
              type="radio"
              className="input-radio"
              id="radio"
              value={range.salaryRangeId}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
