import {
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_FAIL,
  CONTACT_UPDATE_REQUEST,
  CONTACT_UPDATE_SUCCESS,
  CONTACT_UPDATE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  CONTACT_DETAILS_FAIL
} from '../constants/contactConstants';

const initialState = {
  contacts: [],
  contact: null,
  loading: false,
  error: null
};

export const contactListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case CONTACT_LIST_SUCCESS:
      return { ...state, loading: false, contacts: action.payload };
    case CONTACT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactCreateReducer = (state = { loading: false, success: false, error: null }, action: any) => {
  switch (action.type) {
    case CONTACT_CREATE_REQUEST:
      return { loading: true, success: false, error: null };
    case CONTACT_CREATE_SUCCESS:
      return { loading: false, success: true, error: null };
    case CONTACT_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const contactUpdateReducer = (state = { loading: false, success: false, error: null }, action: any) => {
  switch (action.type) {
    case CONTACT_UPDATE_REQUEST:
      return { loading: true, success: false, error: null };
    case CONTACT_UPDATE_SUCCESS:
      return { loading: false, success: true, error: null };
    case CONTACT_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const contactDeleteReducer = (state = { loading: false, success: false, error: null }, action: any) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true, success: false, error: null };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true, error: null };
    case CONTACT_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const contactDetailsReducer = (state = { contact: null, loading: false, error: null }, action: any) => {
  switch (action.type) {
    case CONTACT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case CONTACT_DETAILS_SUCCESS:
      return { loading: false, contact: action.payload, error: null };
    case CONTACT_DETAILS_FAIL:
      return { loading: false, error: action.payload, contact: null };
    default:
      return state;
  }
};
