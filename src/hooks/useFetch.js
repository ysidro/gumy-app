import { useEffect, useReducer } from "react";
import { restoreToken } from '../features/auth/auth'
//import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'

function reducer(state, {type, responseJSON, error, page}) {
   
    switch(type) {
        case 'loading':
            return {...state, isLoading: true};
        case 'success':
            return {responseJSON, isLoading: false, error: null,page};
        case 'increment_page':
                return {...state, page: state.page + 1};
        case 'error':
            return {responseJSON: null, isLoading: false, error};
        default:
            throw new Error("Unkown action type");
    }
}

export function useFetch(url, urlParam, options) {
    
    const [state, dispatch] = useReducer(reducer, {
        responseJSON: null,
        isLoading: true,
        error: null,
        page: 0,
   
    })
    useEffect(() => {
        
        let shouldCancel = false;

       const callFetch = async () => {
            let result = await SecureStore.getItemAsync('uToken');
            if (result == null) return;
            
            dispatch({type: 'loading'});
            url  = `https://api.admcloud.net/api/${url}?token=${result}&${urlParam}`
          
            try {
                const response = await fetch(url,options);
                const responseJSON = await response.json();
               
                if(shouldCancel) return;
                dispatch({type: 'success', responseJSON});                
            } catch(error) {
                if(shouldCancel) return;
                dispatch({type: 'error', error});
            }
       } 
       callFetch();

       return () => (shouldCancel = true);
    }, [])

    return state;
}