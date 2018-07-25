import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CHARACTERS = 'GET_CHARACTERS'

/**
 * INITIAL STATE
 */
const defaultCharacters = [
  {
    id: 0,
    name: 'default name',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqeFAYIE3hTj9Gs1j3v7o-oBadM5uDkuPBuXMPtXS85LufL7UVA',
    description: 'default description',
    price: 0
  }
]

/**
 * ACTION CREATORS
 */
const getCharacters = characters => ({type: GET_CHARACTERS, characters})

/**
 * THUNK CREATORS
 */
export const characters = () => async dispatch => {
  try {
    const res = await axios.get('/api/characters')
    dispatch(getCharacters(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCharacters, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return action.characters
    default:
      return state
  }
}
