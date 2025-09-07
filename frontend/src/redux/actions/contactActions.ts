import axios from 'axios';
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

const API_URL = 'http://localhost:5000/api/contacts';

const getAuthConfig = () => {
  const userInfo = localStorage.getItem('userInfo');
  let token = '';
  if (userInfo) {
    token = JSON.parse(userInfo).accessToken;
  }
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const listContacts = () => async (dispatch: any) => {
  try {
    dispatch({ type: CONTACT_LIST_REQUEST });
    const { data } = await axios.get(API_URL, getAuthConfig());
    dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createContact = (contact: any) => async (dispatch: any) => {
  try {
    dispatch({ type: CONTACT_CREATE_REQUEST });
    await axios.post(API_URL, contact, getAuthConfig());
    dispatch({ type: CONTACT_CREATE_SUCCESS });
    dispatch(listContacts());
  } catch (error: any) {
    dispatch({
      type: CONTACT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateContact = (id: string, contact: any) => async (dispatch: any) => {
  try {
    dispatch({ type: CONTACT_UPDATE_REQUEST });
    await axios.put(`${API_URL}/${id}`, contact, getAuthConfig());
    dispatch({ type: CONTACT_UPDATE_SUCCESS });
    dispatch(listContacts());
  } catch (error: any) {
    dispatch({
      type: CONTACT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteContact = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: CONTACT_DELETE_REQUEST });
    await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    dispatch({ type: CONTACT_DELETE_SUCCESS });
    dispatch(listContacts());
  } catch (error: any) {
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getContactDetails = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: CONTACT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/${id}`, getAuthConfig());
    dispatch({ type: CONTACT_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: CONTACT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
