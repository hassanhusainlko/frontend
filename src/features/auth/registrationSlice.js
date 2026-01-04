import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    registrationStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'    
}


const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setRegistrationDetails(state, action){
            const {username, firstName, lastName, email, password, confirmPassword} = action.payload;
            state.username = username ?? state.username;
            state.firstName = firstName ?? state.firstName;
            state.lastName = lastName ?? state.lastName;
            state.email = email ?? state.email;
            state.password = password ?? state.password;
            state.confirmPassword = confirmPassword ?? state.confirmPassword;
        },
        clearRegistrationDetails(state){
            state.username = null;
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            state.password = null;
            state.confirmPassword = null;
            state.registrationStatus = "idle";
        },
        setRegistrationStatus(state, action){
            state.registrationStatus = action.payload;
        },
    },
}); 

export const { setRegistrationDetails, clearRegistrationDetails, setRegistrationStatus } = registrationSlice.actions;

export default registrationSlice.reducer;