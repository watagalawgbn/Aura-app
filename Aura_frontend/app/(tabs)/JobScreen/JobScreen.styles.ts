import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 120,
    paddingHorizontal: 15,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
  skillStyles: {
    marginTop: 15,
    borderColor: "#D5D5D5",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
  },
  skillTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  skillTextStyle: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
  },
  skillInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  skillInput: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  findJobsBtn: {
    backgroundColor: "#5FB21F",
    padding: 12,
    marginTop: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  findJobsText: {
    color: "white",
    fontWeight: "bold",
  },
  infoBoxes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: "#5FB21F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
  infoLabel: {
    color: "white",
    fontSize: 12,
  },
  jobCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderColor: "#D5D5D5",
    borderWidth: 1,
    elevation: 4,
  },
  jobCardwithId: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderColor: "#edededff",
    borderWidth: 1,
  },
  jobTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  jobTitlewithId: {
    fontWeight: "500",
    fontSize: 20,
  },
  companyName: {
    color: "#224831",
    fontWeight: "bold",
    marginBottom: 5,
    // paddingHorizontal: 8
  },
  companyNamewithId: {
    fontSize: 18,
    color: "#224831",
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#D0D0D0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    fontSize: 12,
  },
  jobDesc: {
    fontSize: 13,
    color: "black",
    marginBottom: 10,
    height: 60,
    overflow: "hidden",
  },
  jobDescriptionwithId: {
    fontWeight: "500",
    fontSize: 18,
  },
  jobInforStyles: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  jobInforTextStyles: {
    paddingRight: 10,
  },
  tagWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 5,
  },
  tagwithIconwithIt: {
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#224831",
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  tagText: {
    fontSize: 14,
    marginLeft: 4,
    // fontWeight: "400",
    color: "#224831",
  },
  tagTextwithId: {
    fontSize: 14,
    marginLeft: 4,
    // fontWeight: "400",
    color: "#224831",
  },

  applyButton: {
    backgroundColor: "#5FB21F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  applyButton2: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 10,
    borderColor: "#5FB21F",
    borderWidth: 1,
  },
  applyBtnFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  applyBtnFlex2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  applyButtonText2: {
    color: "black",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  navItem: {
    alignItems: "center",
  },
  skillChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: "#5FB21F",
    borderRadius: 20,
    margin: 5,
  },
  skillChipText: {
    color: "black",
    marginRight: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  infoIcon: {
    marginRight: 10,
  },

  infoLabel2: {
    fontWeight: "bold",
    color: "#224831",
    marginBottom: 2,
  },
});

export default styles;
