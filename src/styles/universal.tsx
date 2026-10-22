import { StyleSheet } from "react-native";

{/* 
  Improve styling so the inputs are easier to read and tap into.
  Everything is has the same background color so the contrast is blended.

  Widen input fields, add shaded background to each field
  
  Move styling into here so a stylesheet isn't needed at the bottom of each page and easier to update every page

*/}


export const styles = StyleSheet.create({

  main: {
    backgroundColor: "#b0c2e6",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  list: { 
    padding: 16,
    gap: 0
  },
  row: {
    padding: 12,
    backgroundColor: "#95a7ca",
    flexDirection: 'column',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
    gap: 2
  },
  rowTitle: {
    fontWeight: "600" 
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: '#95a7ca',
    borderRadius: 8,
  },
  searchButton: {
    opacity: 10,
    borderRadius: 8,
    borderWidth: 1,
    padding: 5
  },
  editButton: {
    textAlign: 'right',
    flexDirection: 'row',
  },
  alarmInfo: {
    justifyContent: "space-between",
    flexDirection: 'row',
  },
  newAlarm: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: '#95a7ca',
    borderRadius: 8,
    padding: 5
  },
  item: {
    fontSize: 30,
    textAlign: 'center',
    padding: 5
  },
  timeOfDay: {
    flex: 1,
    textAlign: "right"
  },
  input: { borderWidth: 1, borderColor: "#9ca3af", borderRadius: 8, padding: 10 },
  inputError: { borderColor: "#dc2626" },
  error: { color: "#dc2626", fontSize: 12 },
  label: { fontWeight: "600" },

  form: {
    
  }

});