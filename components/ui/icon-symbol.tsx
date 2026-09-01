// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

export const MAPPING: Record<string, ComponentProps<typeof MaterialIcons>["name"]> = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.left": "chevron-left",
  "chevron.right": "chevron-right",
  "leaf.fill": "eco",
  "gearshape": "settings",
  "apple.meditate": "self-improvement",
  "ellipsis.message": "chat",
  "plus": "add",
  "heart.fill": "favorite",
  "heart": "favorite-border",
  "person": "person",
  "envelope": "mail",
  "magnifyingglass": "search",
  "xmark.circle": "cancel",
  "trash": "delete",
  "stroller.fill": "child-care",
  "stroller": "child-care",
  "mappin": "place",
  "star.circle.fill": "star",
  "square.grid.2x2.fill": "grid-view",
  "square.grid.2x2": "grid-on",
  "checkmark": "check",
};

type IconSymbolName = string;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName =
    (MAPPING[name] as ComponentProps<typeof MaterialIcons>["name"] | undefined) ??
    (name as ComponentProps<typeof MaterialIcons>["name"]);

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={mappedName}
      style={style}
    />
  );
}
