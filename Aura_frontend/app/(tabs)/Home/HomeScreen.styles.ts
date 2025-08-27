import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    // marginRight: 20,
  },
  greetingContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    marginVertical: 5,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  curvedContentContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 16,
    color: "#52AE77",
  },
  insightsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  insightCard: {
  width: 200, // fixed width for better horizontal scrolling
  backgroundColor: "white",
  borderRadius: 25,
  padding: 15,
  marginRight: 15, // adds space between cards
  borderWidth: 1,
  borderColor: "#eee",
  justifyContent: "space-between",
  height: 250,
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
insightsContent: {
  paddingLeft: 10,
  paddingRight: 10,
}
,
  insightCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  insightCardImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  quickAccessContainer: {
    marginBottom: 20,
  },
  quickAccessItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 120,
  },
  imageContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  quickAccessImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  quickAccessContent: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: "#5FB21F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  exploreButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 5,
  },
  buttonIcon: {
    marginLeft: 3,
  },
});

export default styles;