import React,{useEffect,useState} from 'react'
import { View } from 'react-native'
import { useSelector } from "react-redux"
import CustomInput from "../components/CustomInputs"

export default function GetEmployee({tokenID}) {

    const form = useSelector((state) => state.form);
    const [employee,setEmployee] = useState(false);
    useEffect(() => {
        getEmployee('uToken')
    },[form.EmployeeID])

    async function getEmployee(key) {
        try {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(`https://api.admcloud.net/api/Employee/${form.EmployeeID}?token=${tokenID}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if(result?.data){
                        const {ID,FullName} =result.data;
                        setEmployee(FullName)
                        }
                    })
                    .catch(error => console.log('Employee error', error));
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    return (
        <View>
            <CustomInput
                label={"Vendedor"}
                value={employee ? employee : ""}
                onChangeText={null}
            />
        </View>
    )
}