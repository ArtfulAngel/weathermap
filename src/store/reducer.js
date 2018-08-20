import * as actions from 'store/actions.js';

const initialState = {
    listCity: [],
    forecastFiveDays: null,
    favorites: [
        {
            clouds: { all: 20 },
            coord: { lat: 55.3551, lon: 86.0872 },
            dt: 1534579200,
            id: 1503901,
            main: { temp: 298.15, pressure: 1010, humidity: 53, temp_min: 298.15, temp_max: 298.15 },
            name: 'Kemerovo',
            rain: null,
            snow: null,
            sys: { country: 'RU' },
            weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
            wind: { speed: 3, deg: 250 },
        },
        {
            clouds: { all: 0 },
            coord: { lat: 56.0091, lon: 92.8725 },
            dt: 1534690800,
            id: 1502026,
            main: { temp: 291.15, pressure: 1009, humidity: 77, temp_min: 291.15, temp_max: 291.15 },
            name: 'Krasnoyarsk',
            rain: null,
            snow: null,
            sys: { country: 'RU' },
            weather: [{ id: 800, main: 'Clear', description: 'Sky is Clear', icon: '01n' }],
            wind: { speed: 0.51, deg: 184.502 },
        },
        {
            clouds: { all: 0 },
            coord: { lat: 55.0282, lon: 82.9235 },
            dt: 1534690800,
            id: 1496747,
            main: { temp: 291.15, pressure: 1009, humidity: 77, temp_min: 291.15, temp_max: 291.15 },
            name: 'Novosibirsk',
            rain: null,
            snow: null,
            sys: { country: 'RU' },
            weather: [{ id: 800, main: 'Clear', description: 'Sky is Clear', icon: '01n' }],
            wind: { speed: 2, deg: 350 },
        },
    ],
    // currentCity: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CITY:
            return { ...state, listCity: action.payload };

        case actions.SET_FAVORITES:
            return { ...state, favorites: [...state.favorites, ...action.payload] };

        case actions.DELETE_FAVORITES:
            return { ...state, favorites: action.payload };

        case actions.GET_CURRENT_CITY:
            return { ...state, forecastFiveDays: action.payload };

        default:
            break;
    }
    return state;
};

export default reducer;
