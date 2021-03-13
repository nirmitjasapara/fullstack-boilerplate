import React, { Component } from 'react'
import AddForm from '../../components/AddForm/AddForm'
import { Section } from '../../components/Utils/Utils'
import './AddPage.css'

export default class AddPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleAddSuccess = user => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    return (
      <Section className='AddPage'>
        <h2>Add Item</h2>
        <AddForm
          onAddSuccess={this.handleAddSuccess}
        />
      </Section>
    )
  }
}