import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import mutation from '../mutations/signup'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password }
    })
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={[]}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

export default graphql(mutation)(SignUpForm)