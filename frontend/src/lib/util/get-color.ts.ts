export const colorMap: Record<string, string> = {
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#00FF00",
  Black: "#000000",
  White: "#FFFFFF",
  Beige: "#F5F5DC",
  Gray: "#808080",
  "Light Gray": "#D3D3D3",
  "Dark Gray": "#A9A9A9",
  Brown: "#8B4513",
  Pink: "#FFC0CB",
  Orange: "#FFA500",
  Yellow: "#FFFF00",
  Cyan: "#00FFFF",
  Purple: "#800080",
};

export const getColor = (colorName: string): string => {
  const normalized = colorName.trim().toLowerCase();

  const foundKey = Object.keys(colorMap).find(
    (key) => key.toLowerCase() === normalized
  );

  const color = foundKey ? colorMap[foundKey] : "#ccc";

  return color;
};
