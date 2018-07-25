import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CHARACTERS = 'GET_CHARACTERS'

/**
 * INITIAL STATE
 */
const defaultCharacter = {
  name: 'default name',
  imageUrl: 'www.default.com',
  description: 'default description',
  price: 0
}

/**
 * ACTION CREATORS
 */
const getCharacters = characters => ({type: GET_CHARACTERS, characters})

/**
 * THUNK CREATORS
 */
export const characters = () => async dispatch => {
  try {
    console.log('WE MADE IT HOMIE')

    const res = await axios.get('/auth/characters')
    dispatch(getCharacters(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCharacter, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return action.character
    default:
      return state
  }
}
