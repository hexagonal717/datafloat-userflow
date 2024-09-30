import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  authError: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (!state.users) {
        state.users = [];
      }
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(user => user.email === email && user.password === password);

      if (user) {
        const currentDateTime = new Date().toISOString(); // Capture current date and time

        if (!user.loginHistory) {
          user.loginHistory = []; // Initialize loginHistory array if it doesn't exist
        }

        user.loginHistory.push(currentDateTime); // Add the current login time to loginHistory

        state.currentUser = { ...user, loginHistory: user.loginHistory }; // Update current user with the login history
        state.isAuthenticated = true;
        state.authError = null;
      } else {
        state.authError = 'Invalid credentials';
      }
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.authError = null;
    },
    blockUser: (state, action) => {
      const userIndex = state.users.findIndex((user) => user.email === action.payload);
      if (userIndex !== -1) {
        state.users[userIndex].isBlocked = true;
      }
    },
    unblockUser: (state, action) => {
      const userIndex = state.users.findIndex((user) => user.email === action.payload);
      if (userIndex !== -1) {
        state.users[userIndex].isBlocked = false;
      }
    },
    updateUser: (state, action) => {
      const userIndex = state.users.findIndex((user) => user.email === action.payload.email);
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
  },
});

export const {
  addUser,
  loginUser,
  logoutUser,
  blockUser,
  unblockUser,
  updateUser,
  removeUser,
  clearAuthError
} = userSlice.actions;

export default userSlice.reducer;