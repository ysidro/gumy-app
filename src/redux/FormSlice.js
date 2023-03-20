import { createSlice } from "@reduxjs/toolkit";


const initialState ={
            DocDate: new Date().toISOString(),
            ubicacion:"",
            LocationID:"",
            Reference:"",
            EmployeeID:"",
            CurrencyID:"",
            SalesStageID:"",
            ShipToAddressID:"",
            Relationship:"",
            PaymentTermID:"",
            ProjectID:"",
            BillToAddressID:"",
            Notes:"",
            DepartmentID:"",
            InternalNotes:"",
            SourceTransactionID:"",
            Items:[
              {
                ItemSKU:"",
                ItemName:"",
                Stock:"",
                Quantity:"",
                UMO:[],
                TaxScheduleID:"",
                Price:"",
                DiscountPercent:"",
                Total:""
              }
            ]
}


const createOrderSlice = createSlice({
    name:"form",
    initialState,
    reducers:{
        updateFormField: (state, action) => {
            const {fieldName,value} = action.payload;
            state[fieldName] = value;
        },
        addItem(state) {
          state.Items.push({
            ItemSKU: '',
            ItemName: '',
            Stock: '',
            Quantity: '',
            UMO: [],
            TaxScheduleID: '',
            Price: '',
            DiscountPercent: '',
            Total: '',
          });
        },
        removeItem(state, action) {
          state.Items.splice(action.payload, 1);
        },
        updateItemField(state, action) {
          const { index, field, value } = action.payload;
          state.Items[index][field] = value;
        },
    }
});

export const { updateFormField, addItem, removeItem, updateItemField } = createOrderSlice.actions;

export default createOrderSlice.reducer;
