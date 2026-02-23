export interface UserProfile {
  name: string;
  goal: string;
  startDate: string; // ISO date
  programDuration: number; // days
  dailyMinutesTarget: number; // minutes per day
  incomeTarget: number; // monthly target
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  day: number;
  isOptional?: boolean;
}

export interface DayLog {
  dateISO: string;
  completedMissionIds: string[];
  income: number;
  streak: number;
  pointsEarned: number;
  notes?: string;
}

export interface StorageSchema {
  userProfile?: UserProfile;
  dayLogs?: Record<string, DayLog>;
  points?: number;
}
