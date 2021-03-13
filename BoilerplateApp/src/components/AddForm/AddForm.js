import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import ApiService from '../../services/api-service'

export default class AddForm extends Component {
  static defaultProps = {
    onAddSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { name } = ev.target

    ApiService.postData({
      name: name.value,
    })
      .then(res => {
        name.value = ''
        this.props.onAddSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='AddForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='name'>
          <label htmlFor='AddForm__name'>
            Name <Required />
          </label>
          <Input
            name='name'
            type='text'
            required
            id='AddForm__name'>
          </Input>
        </div>
        <Button type='submit'>
          Add
        </Button>
      </form>
    )
  }
}
