import { createSlice } from "@reduxjs/toolkit";

const osSlice = createSlice({
  name: "os",
  initialState: {
    isMac: window.navigator.userAgent.toUpperCase().includes("MAC"),
    isWindows: window.navigator.userAgent.toUpperCase().includes("WINDOWS"),
  },
});

export default osSlice.reducer;
