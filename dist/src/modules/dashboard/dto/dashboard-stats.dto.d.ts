export declare class DashboardStatsDto {
    role: 'TRAINER' | 'CLIENT';
    data: TrainerStats | ClientStats;
}
export interface TrainerStats {
    totalClients: number;
    totalExercises: number;
    totalPlans: number;
    sessionsToday: number;
}
export interface ClientStats {
    completedWorkoutsThisMonth: number;
    activePlan: {
        id: string;
        name: string;
        description: string | null;
    } | null;
    nextSession?: {
        id: string;
        date: Date;
    };
}
