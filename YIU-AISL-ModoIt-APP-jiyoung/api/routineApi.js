// routineApi.js
import axios from 'axios';
import { format } from 'date-fns';
import Constants from 'expo-constants';
const BASE_URL = Constants.expoConfig.extra.BASE_URL;

axios.defaults.withCredentials = true;

// 날짜별 루틴 조회
export const fetchRoutinesByDate = async (date) => {
  return axios.get(`${BASE_URL}/main`, {
    params: { date: format(date, 'yyyy-MM-dd') },
    withCredentials: true,
  });
};

// 루틴 체크 토글
export const toggleRoutineCheck = async (routineId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/check-routine`,
      { id: routineId },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error('루틴 체크 실패:', error);
    throw error;
  }
};


export const addRoutine = ({ timeSlot, content }) => {
  return axios.post(`${BASE_URL}/add-routine`, {
    timeSlot,
    content,
  });
};

export const getRoutineDetail = (id) => {
  return axios.get(`${BASE_URL}/edit-routine-detail/${id}`);
};

export const editRoutine = ({ id, timeSlot, content }) => {
  return axios.patch(`${BASE_URL}/edit-routine-detail`, {
    id,
    timeSlot,
    content,
  });
};

export const getRoutinesByDate = (date) => {
  return axios.get(`${BASE_URL}/main`, {
    params: { date }, // 예: '2025-06-11'
    withCredentials: true,
  });
};

export const finishRoutine = (routineStatusList) => {
  return axios.post(`${BASE_URL}/finish`, routineStatusList, {
    withCredentials: true,
  });
};

// 삭제 가능한 루틴 리스트 조회
export const fetchRoutinesForEdit = () => {
  return axios.get(`${BASE_URL}/edit-routine`);
};

// 루틴 삭제 요청
export const deleteRoutines = async (routineIds) => {
  return axios.post(`${BASE_URL}/edit-routine`, routineIds);
};