import React from 'react'
import {connect} from 'react-redux'
import {characters} from '../store'

/**
 * COMPONENT
 */

export const Products = props => {
  return (
    <div>
      <h1>Products</h1>
      {console.log(props)}
      {props.characters.map(character => {
        return <img key={character.id} src={character.imageUrl} />
      })}
    </div>
  )
}

/**
 * CONTAINER
 */

const mapStateToProps = state => ({
  characters: state.characters
})

const mapDispatchToProps = dispatch => ({
  retrieveCharacters: () => {
    dispatch(characters())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
