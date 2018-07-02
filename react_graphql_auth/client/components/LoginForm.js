import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/login'
import query from '../queries/CurrentUser'
import { graphql } from 'react-apollo'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [] }
    this.onSubmit = this.onSubmit.bind(this)
    this.clearErrors = this.clearErrors.bind(this)
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    })
    .then(() => {
      if (this.state.errors) return this.clearErrors()
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  clearErrors() {
    this.setState({ errors: [] })
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          onSubmit={this.onSubmit}
          errors={this.state.errors}/>
      </div>
    )
  }
}

export default graphql(mutation)(LoginForm)