import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../mutations/login'
import query from '../queries/CurrentUser'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [] }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillUpdate(nextProps) {
    // user was not signed in but now is
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard')
    } 
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    })
    .then(() => {
      if (this.state.errors) return this.setState({ errors: [] })
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
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

export default graphql(query)(
  graphql(mutation)(LoginForm)
)