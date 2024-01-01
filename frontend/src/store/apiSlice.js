import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    start: (state, action) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    ok: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    bad: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { start, ok, bad } = apiSlice.actions;

export function request({
  method,
  url,
  options,
  callback,
  isLoader = false,
  isOk = false,
}) {
  return async function (dispatch) {
    try {
      if (isLoader) {
        document.querySelector("dialog").showModal();
      }
      dispatch(start());
      const res = await axios({
        method,
        url,
        ...options,
        data: options && options.data,
      });
      document.querySelector("dialog").close();
      dispatch(ok(res.data));
      if (callback) {
        callback(res.data);
      }
      if (isOk) {
        document.querySelector("dialog").showModal();
      }
    } catch (error) {
      console.log(error);
      if (error.response === undefined) {
        dispatch(bad("error"));
      } else {
        dispatch(bad(error.response.data.message));
      }
      document.querySelector("dialog").showModal();
    }
  };
}

export default apiSlice.reducer;
