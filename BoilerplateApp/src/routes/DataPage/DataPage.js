import React, { Component } from 'react'
import CustomContext from '../../contexts/CustomContext';
import ApiService from '../../services/api-service';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './DataPage.css'

export default class DataPage extends Component {
  static contextType = CustomContext

  componentDidMount() {
    const { dataId } = this.props.match.params;
    this.context.clearError();
    if (dataId != null)
    {
        ApiService.getData(dataId)
          .then(data => [data])
          .then(this.context.setData)
          .catch(this.context.setError)
    }
    else
    {
        ApiService.getAllData()
          .then(this.context.setData)
          .catch(this.context.setError)
    }
  }

  renderData() {
    const { data = [] } = this.context
    return data.map(d =>
      <Link
          to={'/data/' + d.id}
          key={'/data/' + d.id}
          type='button'
          className='list-item'
        ><h3>{d.name}</h3></Link>
    )
  }

  render() {
    const { error } = this.context
    return (
      <div>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderData()}
      <Link
          to='/add'
          type='button'
          className='add-button'
        ><FontAwesomeIcon icon={faPlus} className="icon"/></Link>
      </div>
    )
  }
}