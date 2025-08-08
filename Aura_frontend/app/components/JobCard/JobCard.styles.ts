import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";

// Define the type for the job item
interface JobItem {
  job_id: string;
}

// Define the props passed to dynamic style functions
type DynamicStyleProps = {
  selectedJob: string;
  item: JobItem;
};

const styles = {
  container: ({ selectedJob, item }: DynamicStyleProps): ViewStyle => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),

  logoContainer: ({ selectedJob, item }: DynamicStyleProps): ViewStyle => ({
    width: 50,
    height: 50,
    backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),

  logoImage: {
    width: "70%",
    height: "70%",
  } as ImageStyle,

  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  } as TextStyle,

  infoContainer: {
    marginTop: SIZES.large,
  } as ViewStyle,

  jobName: ({ selectedJob, item }: DynamicStyleProps): TextStyle => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),

  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  } as ViewStyle,

  publisher: ({ selectedJob, item }: DynamicStyleProps): TextStyle => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),

  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  } as TextStyle,
};

export default styles;
