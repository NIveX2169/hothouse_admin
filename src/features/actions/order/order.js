import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


// export const getAllOrders = createAsyncThunk("getDrink",    
//   async (payload, { rejectWithValue }) => {
//   try {
//     const {data} = await instance.get(`/order`, {
//       withCredentials: true,
//     });
//     return data;

//   } catch (e) {
//     return rejectWithValue(e);
//   }
// }
// );
export const getAllOrders = createAsyncThunk(
  "orders/getAll", // Renamed for clarity
  async (pageNum = 1, { rejectWithValue }) => {
    try {
      // Pass pageNum as a query parameter to match your backend logic
      const { data } = await instance.get(`/order?pageNum=${pageNum}`, {
        withCredentials: true,
      });

      // data will contain { status: true, data: [...], pagination: {...} }
      return data; 
      
    } catch (e) {
      // Improved error handling to capture the actual server message
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateOrder = createAsyncThunk("updateOrder",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.patch(`/order/${payload.id}`, payload ,{
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

export const deleteFailedOrder = createAsyncThunk(
  "deleteFailedOrder",    
  async (_, { rejectWithValue }) => {
  try {
    const {data} = await instance.delete(`/order` ,{
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);



