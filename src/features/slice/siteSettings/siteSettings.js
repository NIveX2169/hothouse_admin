// src/features/slices/siteSettingsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getSiteSettings, updateSiteSettings } from "../../actions/siteSettings/siteSettings";

const initialState = {
  isLoading: false,
  isSuccess: false,
  siteSettingsData: [],
  isDeleted: false,
  errorMessage: "",
};

export const siteSettingsSlice = createSlice({
  name: "siteSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Get Site Settings
      .addCase(getSiteSettings.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getSiteSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        // ✅ backend returns { status, message, data: [...] }
        state.siteSettingsData = action.payload.data || [];
      })
      .addCase(getSiteSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch site settings.";
      })

      // Handle update Site Settings
      .addCase(updateSiteSettings.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateSiteSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";

        const updated = action.payload.data;
        // ✅ update locally if needed
        state.siteSettingsData = state.siteSettingsData.map((item) =>
          item._id === updated._id ? updated : item
        );
      })
      .addCase(updateSiteSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to update site settings.";
      });
  },
});

export default siteSettingsSlice.reducer;
