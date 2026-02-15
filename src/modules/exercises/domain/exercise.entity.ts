export class Exercise {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly muscleGroup: string,
    public readonly defaultVideoUrl: string | null,
    public readonly defaultImageUrl: string | null,
    public readonly thumbnailUrl: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly createdBy: string | null,
    public readonly updatedBy: string | null,
    public readonly deletedAt: Date | null,
    public readonly deletedBy: string | null,
    public readonly muscleGroupDetails?: { id: string; name: string; imageUrl: string | null },
  ) { }

  static create(
    name: string,
    description: string,
    muscleGroup: string,
    defaultVideoUrl: string | null,
    defaultImageUrl: string | null,
    thumbnailUrl: string | null,
    userId: string,
  ): Exercise {
    return new Exercise(
      crypto.randomUUID(),
      name,
      description,
      muscleGroup,
      defaultVideoUrl,
      defaultImageUrl,
      thumbnailUrl,
      new Date(),
      new Date(),
      userId,
      null,
      null,
      null,
      undefined, // muscleGroupDetails
    );
  }
}
