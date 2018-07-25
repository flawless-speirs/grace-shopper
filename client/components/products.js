import React, {Component} from 'react'
import {connect} from 'react-redux'
import {characters} from '../store/character'

/**
 * COMPONENT
 */

class Products extends Component {
  componentDidMount() {
    this.props.retrieveCharacters()
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        {this.props.characters.map(character => {
          return (
            <div key={character.id}>
              <div>Name: {character.name}</div>
              <img src={character.imageUrl} />
              <div>Price: ${character.price}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  characters: state.characters
})

const mapDispatchToProps = dispatch => ({
  retrieveCharacters: () => dispatch(characters())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
