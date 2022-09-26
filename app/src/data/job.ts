export type JobLevelType = "EASY" | "MEDIUM" | "HARD" | "LEGENDARY";

export type JobType = {
  level: JobLevelType;
  who: string;
  what: string;
  where: string;
  complication: string;
};

export const jobLevelName: Record<string, Record<JobLevelType, string>> = {
  pl: {
    EASY: "łatwy",
    MEDIUM: "średni",
    HARD: "ciężki",
    LEGENDARY: "legendarny",
  },
  en: {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
    LEGENDARY: "legendary",
  },
};

export const jobWho: Record<string, string[]> = {
  pl: [],
  en: [],
};

export const jobWhat: Record<string, string[]> = {
  pl: [],
  en: [],
};

export const jobWhere: Record<string, string[]> = {
  pl: [],
  en: [],
};

export const jobComplication: Record<string, string[]> = {
  pl: [],
  en: [
    "they have only thirty minutes to complete the job",
    "they get caught in an unrelated cyber-terrorist attack",
    "someone else wants their equipment",
    "security surrounding the target is unusually high",
    "they will need to acquire some special equipment first",
    "they encounter an old enemy on the same job",
    "their work will be monitored via drone for quality assurance",
    "they run into a violent street gang",
    "hey find the target already gone just before the alarms go off",
    "the target offers an attractive counter-proposal",
    "the client hires a team of assassins to eliminate them after the job",
    "security is already on alert after a failed previous attempt",
    "their electronics randomly fail at a critical moment",
    "they run into unexpected security",
    "they must stop another mercenary team hired to extract the target",
    "they find demolitions charges already placed by another mercenary team",
    "they will have to allow their memories to be wiped after the job",
    "they may have to deal with high radiation",
    "they must deal with an inquisitive media reporter",
    "they find themselves double-crossed",
    "the parcel turns out to be very different than described",
    "the target has been implanted with a GPS-triggered cortex bomb",
    "their weapons randomly fail at a critical moment",
    "they are randomly targeted by a mischievous hacker",
    "the job is a trap",
    "they find the hand-off location under military lockdown",
    "they find the target already dead just before the alarms go off",
    "they encounter an old ally now working against them",
    "several other mercenary teams are expected to try to steal it",
    "the target turns out to be very different than described",
    "they get caught in an unrelated firefight",
    "every street gang in the sprawl seems to want to steal it",
  ],
};
