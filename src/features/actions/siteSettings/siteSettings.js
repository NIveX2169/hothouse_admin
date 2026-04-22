// src/features/actions/siteSettings/siteSettings.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instanceV2 } from "../../../services/axiosInterceptor";

export const getSiteSettings = createAsyncThunk(
  "siteSettings/getSiteSettings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instanceV2.get("/site-settings/admin");
      return data; // returns {status, message, data: [...]}
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch site settings.");
    }
  }
);

export const updateSiteSettings = createAsyncThunk(
  "siteSettings/updateSiteSettings",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instanceV2.patch(`/site-settings/${id}`, payload);
      return data; // {status, message, data: {...}}
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update site settings.");
    }
  }
);
