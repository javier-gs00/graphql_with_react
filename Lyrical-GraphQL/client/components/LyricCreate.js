import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor(props) {
    super(props)
    this.state = { content: '' }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    })
    .then(() => this.setState({ content: '' }))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID) {
  addLyricToSong(content: $content, songId: $songId) {
    id
    lyrics {
      content
    }
  }
}
`

export default graphql(mutation)(LyricCreate)