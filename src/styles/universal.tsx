import { StyleSheet } from "react-native";

{/* 
  Improve styling so the inputs are easier to read and tap into.
  Everything is has the same background color so the contrast is blended.

  Widen input fields, add shaded background to each field
  
  Move styling into here so a stylesheet isn't needed at the bottom of each page and easier to update every page

*/}

// Default colors
export const colors = {
  bg: "#b0c2e6",
  border: "#475569",
  error: "#b91c1c",
  surface: "#c9d3e7",
  text: "#111827",
  primary: "#9cadd8"
  
};



export const styles = StyleSheet.create({

  main: {
    backgroundColor: colors.bg,
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
    backgroundColor: colors.bg,
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
    backgroundColor: colors.bg,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  editButton: {
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 4
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
    backgroundColor: colors.bg,
    borderRadius: 8,
    padding: 5
  },
  item: {
    fontSize: 30,
    textAlign: 'center',
    padding: 5
  },
  timeOfDay: {
    width: 130,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
  },

  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    alignSelf: "stretch",
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 20,
  },

  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 12 },
  label: { fontWeight: "600" },

  form: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
    backgroundColor: colors.bg
  },
  timeInput: { flex: 1 },

  fieldRow: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    fontSize: 22,
    color: colors.text
  },

  dataDisplay: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },

  alarmData: {
    fontWeight: "600"
  }

});