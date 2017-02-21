import { h, Component } from 'preact' /** @jsx h */

export default class Status extends Component {
  state = {
    bump: false
  }

  componentWillReceiveProps ({ length }) {
    const hasChanged = length !== this.props.length
    if (hasChanged) {
      // Force the region to update by rendering a space at the end.
      this.setState({ bump: !this.state.bump })
    }
  }

  render () {
    const { length, queryLength, minQueryLength } = this.props
    const { bump } = this.state

    const words = {
      result: (length === 1) ? 'result' : 'results',
      is: (length === 1) ? 'is' : 'are'
    }

    const queryTooShort = queryLength < minQueryLength
    const noResults = length === 0

    return <div
      aria-live='polite'
      style={{
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        marginBottom: '-1px',
        marginRight: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px'
      }}
    >
      {(queryTooShort)
        ? <span>Type in {minQueryLength} or more characters for results.</span>
        : (noResults)
          ? <span>No search results.</span>
          : <span>
            {length} {words.result} {words.is} available.
          </span>
      }
      {(bump) ? <span>&nbsp;</span> : <span />}
    </div>
  }
}
