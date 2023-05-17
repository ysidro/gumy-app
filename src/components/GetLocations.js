import React from 'react'
import { View, } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import { updateFormField } from '../redux/FormSlice'
import { useFetch } from '../hooks/useFetch';

import CustomDropDown from '../components/CustomDropDown'

export default function GetLocations() {
    const dispatch = useDispatch()
    const form = useSelector((state) => state.form);

    const URL_DETAILED = `Locations`
    const URL_PARAMETER = `skip=0`
    const requestOptions = {
        method: 'GET',
        body: '',
        redirect: 'follow'
    };

    const { isLoading, error, responseJSON } = useFetch(URL_DETAILED, URL_PARAMETER, requestOptions)
    const handleInputChange = (fieldName, value) => {

        dispatch(updateFormField({ "fieldName": fieldName, "value": value }));

    };

    return (
        <View>
            <CustomDropDown
                value={form.LocationID}
                onChangeSelect={(value) => handleInputChange('LocationID', value)}
                label={"Ubicación"}
                urlDetailed={"Locations"}
                urlParameter={"sky=0"}
                data={!isLoading ? responseJSON.data : []} />
        </View>
    )
}