import { v4 as uuidv4 } from "uuid";


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.id)
            }
        case 'HEROES_ADD':
            console.log(action.payload)
            return {
                ...state,
                heroes: state.heroes.concat({
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description,
                    element: action.payload.element
                })
            }

        case 'FILTERS_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: 'idle'
            }

        default:
            return state
    }
}

export default reducer;