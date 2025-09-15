export type timeOfDay = "Night" | "Daytime";

export const time = {
  timeOfDay(): timeOfDay {
    const minute = new Date().getMinutes();
    return minute > 30 ? "Night" : "Daytime";
  },
  timeUntilChange(): number {
    return 60 - new Date().getMinutes();
  },
};
