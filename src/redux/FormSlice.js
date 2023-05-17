import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  ID: "00000000-0000-0000-0000-000000000000",
  DocID: "",
  DocDate: new Date().toISOString(),
  DateTo: "",
  Reference: "",
  RelationshipID: "",
  ShipmentMethodID: "",
  DepartmentID: "",
  LocationID: "",
  ReceptionLocationID: "",
  EmployeeID: null,
  Priority: "PRIORITY_UNDEFINED",
  PaymentTermID: "",
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
