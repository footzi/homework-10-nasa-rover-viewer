// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol
} from './actions';

const sol = handleActions(
  {
    [changeSol]: (_state, action) => ({
      current: action.payload,
      min: 1,
      max: 100
    })
  },
  {
    current: 1,
    min: 1,
    max: 100
  }
);

const photos = handleActions(
  {
    [fetchPhotosRequest]: (_state, action) => {
      const { name, sol } = action.payload;

      return {
        ..._state,
        [name]: {
          ..._state[name],
          [sol]: {
            isLoading: true,
            photos: [],
            isLoaded: false
          }
        }
      }
    },
    [fetchPhotosSuccess]: (_state, action) => {
      const { photos, name, sol } = action.payload;

      return {
        ..._state,
        [name]: {
          ..._state[name],
          [sol]: {
            isLoading: false,
            photos,
            isLoaded: true
          }
        }
      }
    },
    [fetchPhotosFailure]: (_state, action) => {
      const { name, sol } = action.payload;

      return {
        ..._state,
        [name]: {
          ..._state[name],
          [sol]: {
            isLoading: false,
            photos: [],
            isLoaded: true
          }
        }
      }
    }
  }, {
    curiosity: {},
    opportunity: {},
    spirit: {}
  }
);


export default combineReducers({
  sol,
  photos
});

export const getSol = state => state.roverPhotos.sol;
export const getPhotos = state => state.roverPhotos.photos;