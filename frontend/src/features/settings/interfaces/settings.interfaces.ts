export type SettingsTab = "profile" | "appearance";

export interface ProfileSettingsProps {
  email: string;
  createdAt: string;
}

export interface AppearanceSettingsProps {
  mode: "light" | "dark";
  onToggle: () => void;
}
