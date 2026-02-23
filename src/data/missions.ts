import { Mission } from '@/types';

/**
 * Generate missions for a 90-day challenge. Each day has 3 core missions and optional bonus on weekends.
 */
export function getMissions(): Mission[] {
  const missions: Mission[] = [];
  for (let day = 1; day <= 90; day++) {
    for (let i = 1; i <= 3; i++) {
      missions.push({
        id: `d${day}-m${i}`,
        title: `Missão ${i}`,
        description: `Complete a missão ${i} do dia ${day}.`,
        points: 10,
        day,
      });
    }
    // Determine day of week (0 = Monday for challenge calculation)
    const dayOfWeek = ((day - 1) % 7);
    // 5 => Saturday, 6 => Sunday (0-indexed) to mark optional missions on weekend
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      missions.push({
        id: `d${day}-b`,
        title: 'Missão bônus',
        description: `Missão opcional para o dia ${day}.`,
        points: 20,
        day,
        isOptional: true,
      });
    }
  }
  return missions;
}
