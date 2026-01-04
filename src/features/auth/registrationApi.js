import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearRegistrationDetails} from './registrationSlice';



const baseQuery = fetchBaseQuery({
    baseUrl: "/auth/users",
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    }
})


export const registrationApi = createApi({
    reducerPath: "registrationApi",
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (registrationApiData) => ({
                url: '/',
                method: 'POST',
                body: registrationApiData,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled;
                    // On successful registration, clear registration details
                    dispatch(clearRegistrationDetails());
                }catch (error) {
                    // handle error if you want to show notifications, etc.
                    dispatch(setRegistrationError(error.data?.message || 'Registration failed'));
                    console.error("Registration failed: ", error);  

            }
        }
        }),
    }),
});




export const { useRegisterMutation } = registrationApi;

export default registrationApi;