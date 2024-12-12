import { ActivityIndicator } from "react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";

export function Loading() {
  return <ActivityIndicator size="large" color={colors.green.base} style={s.container} />;
}
