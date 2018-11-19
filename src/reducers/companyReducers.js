import {
  GET_COMPANIES,
  DEL_COMPANIES,
  ADD_COMPANIES,
  PUT_COMPANIES
} from "../actions/types"; //CREATE_COMPANIES, DELETE_COMPANIES

const initialState = {
  compan: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        compan: action.payload,
        statusGET: action.status
      };

    case DEL_COMPANIES:
      return {
        ...state,
        compan: state.compan.filter(compan => compan.code !== action.payload),
        statusDEL: action.status
      };

    case ADD_COMPANIES:
      return {
        ...state,
        compan: state.compan.concat(action.payload), //alert(state.compan[state.compan.length - 1].code), //
        statusADD: action.status
      };

    case PUT_COMPANIES:
      return {
        ...state,
        // compan: state.compan.filter(compan => compan._id !== action.payload._id),
        statusPUT: action.status
      };

    default:
      return state;
  }
}
