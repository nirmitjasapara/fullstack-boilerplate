import React, { Component } from 'react'

const CustomContext = React.createContext({
  data: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setData: () => {},
  clearData: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    data: [],
    error: null
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }
  setData = data => {
    this.setState({ data })
  }
  clearData = () => {
    this.setState({ data: [] })
  }
  render() {
    const value = {
      data: this.state.data,
      setData: this.setData,
      clearData: this.clearError,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
    }
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    )
  }
}