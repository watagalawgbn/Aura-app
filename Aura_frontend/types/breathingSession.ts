export type BreathingSession = {
  userId: string;
  duration: number; // in seconds
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
  };
};