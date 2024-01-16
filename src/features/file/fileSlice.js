import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    fileContent: {},
  },
  reducers: {
    setFileContent: (state, action) => {
      const { format, content } = action.payload;
      state.fileContent[format] = content;
    },
  },
});
