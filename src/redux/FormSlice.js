import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  ID: "00000000-0000-0000-0000-000000000000",
  DocID: "",
  DocDate: new Date().toISOString(),
  DateTo: "",
  Reference: "",
  RelationshipID: "92816df9-c1b7-4deb-afcc-08db3ce024da",
  ShipmentMethodID: "",
  DepartmentID: "",
  LocationID: "48953d27-e203-45b3-037d-08d9a1684f6e",
  ReceptionLocationID: "",
  EmployeeID: "34b99dd3-a023-4f0a-7a34-08d94853d4df",
  Priority: "PRIORITY_UNDEFINED",
  PaymentTermID: "fd42c2ff-5df1-4d31-6f80-08d590021182",
  Beneficiary: "",
  Notes: "",
  InternalNotes: "",
  CurrencyID: "DOP",
  ExchangeRate: "1",
  ProjectID: "",
  PaymentMethodID: "",
  ShipToAddressID: "",
  BillToAddressID: "",
  FiscalID: "",
  SalesTerritoryID: "",
  CustomFields: [],
  Lat: "0",
  Lon: "0",
  ShipToAddress1: "",
  ShipToAddress2: "",
  ShipToCity: "",
  ShipToState: "",
  ShipToPostalCode: "",
  ShipToPhone: "",
  ShipToContact: "",
  ShipToCountryID: "",
  BillToAddress1: "",
  BillToAddress2: "",
  BillToCity: "",
  BillToState: "",
  BillToPostalCode: "",
  BillToPhone: "",
  BillToContact: "",
  BillToCountryID: "",
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
      const { index, field, value } = action.payload;
      state.Items[index][field] = value;
    },
    clearFormsFields(state) {
      // console.log('clearFormsFields',state,action, initialState)
      state = initialState;

    },
  }
});

export const { clearFormsFields, updateFormField, addItem, removeItem, updateItemField } = createOrderSlice.actions;

export default createOrderSlice.reducer;
