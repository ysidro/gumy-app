import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  DocDate: new Date().toISOString(),
  DateTo: "",
  Reference: "",
  RelationshipID: "",
  LocationID: "",
  EmployeeID: null,
  Priority: "PRIORITY_UNDEFINED",
  PaymentTermID: "",
  Notes: "",
  InternalNotes: "",
  CurrencyID: "DOP",
  ExchangeRate: "1",

  Items: [],
  Files: [],
}


const createOrderSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
    },
    addItem(state, action) {
      state.Items.push(action.payload)
    },
    removeItem(state, action) {
      state.Items.splice(action.payload, 1);
    },
    updateItemField(state, action) {
      const { index, field } = action.payload;
      state.Items[index] = field;
    },
    clearFormsFields(state) {
      // console.log('clearFormsFields',state,action, initialState)
      state = initialState;

    },
  }
});

export const { clearFormsFields, updateFormField, addItem, removeItem, updateItemField } = createOrderSlice.actions;

export default createOrderSlice.reducer;


/*

{
    "Beneficiary": "",
    "BillToAddress1": "",
    "BillToAddress2": "",
    "BillToAddressID": "",
    "BillToCity": "",
    "BillToContact": "",
    "BillToCountryID": "",
    "BillToPhone": "",
    "BillToPostalCode": "",
    "BillToState": "",
    "CurrencyID": "DOP",
    "CustomFields": [],
    "DateTo": "",
    "DepartmentID": "",
    "DocDate": "2023-05-17T14:24:36.793Z",
    "DocID": "",
    "EmployeeID": "34b99dd3-a023-4f0a-7a34-08d94853d4df",
    "ExchangeRate": "1",
    "Files": [],
    "FiscalID": "",
    "ID": "00000000-0000-0000-0000-000000000000",
    "InternalNotes": "",
    "Items": [
        {
            "AttributeOption1ID": "",
            "AttributeOption2ID": "",
            "Comments": "",
            "DiscountPercent": "0",
            "ItemID": "d14d326f-d129-4bc8-dc1d-08db3c7e103a",
            "Name": "prueba001",
            "Price": "10",
            "Quantity": "1",
            "TaxScheduleID": "915f6e47-b682-48f9-8de3-08d50bfdec1b",
            "UOMID": "35f6a090-6630-48ce-5668-08d4f945d30d"
        }
    ],
    "Lat": "0",
    "LocationID": "13231d87-4f75-47ff-a018-08d9b0dbda1f",
    "Lon": "0",
    "Notes": "",
    "PaymentMethodID": "",
    "PaymentTermID": "fd42c2ff-5df1-4d31-6f80-08d590021182",
    "Priority": "PRIORITY_UNDEFINED",
    "ProjectID": "",
    "ReceptionLocationID": "",
    "Reference": "",
    "RelationshipID": "92816df9-c1b7-4deb-afcc-08db3ce024da",
    "SalesTerritoryID": "",
    "ShipToAddress1": "",
    "ShipToAddress2": "",
    "ShipToAddressID": "",
    "ShipToCity": "",
    "ShipToContact": "",
    "ShipToCountryID": "",
    "ShipToPhone": "",
    "ShipToPostalCode": "",
    "ShipToState": "",
    "ShipmentMethodID": ""
}

*/