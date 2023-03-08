import {Component} from 'react'
import Cookie from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    employmentTypes: [],
    salaryRange: '',
    responseStatus: apiStatus.initial,
    searchJob: '',
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({responseStatus: apiStatus.loading})
    const {salaryRange, employmentTypes, searchJob} = this.state
    const employmentTypesString = employmentTypes.join(',')
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesString}&minimum_package=${salaryRange}&search=${searchJob}`
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  filterEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentTypes: [...prevState.employmentTypes, id],
      }),
      this.getJobDetails,
    )
  }

  filterSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobDetails)
  }

  render() {
    return (
      <>
        <Header />
        <div className="profile-filter-container">
          <div className="jobs-input-container">
            <input
              type="text"
              placeholder="Search"
              className="jobs-input-element"
            />
            <button type="button" className="search-button">
              <AiOutlineSearch />
            </button>
          </div>

          <Profile />
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            filterEmploymentType={this.filterEmploymentType}
            filterSalaryRange={this.filterSalaryRange}
          />
        </div>
      </>
    )
  }
}

export default Jobs
