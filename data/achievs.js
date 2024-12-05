export const Achievements = [
  {
    id: 'roaring_scholar',
    title: 'Roaring Scholar',
    description: 'Master the knowledge of the tiger kingdom.',
    condition: 'Pass your first quiz.',
    unlockCriteria: {
      type: 'quiz_completion',
      requirement: 1,
    },
    isHidden: false,
  },
  {
    id: 'tiger_tracker',
    title: 'Tiger Tracker',
    description:
      'Explore the natural habitats of tigers virtually and leave no stone unturned.',
    condition:
      'Answer 10 quiz questions correctly across all quizzes in the app.',
    unlockCriteria: {
      type: 'correct_answers_streak',
      requirement: 10,
    },
    isHidden: false,
  },
  {
    id: 'guardian_of_stripes',
    title: 'Guardian of Stripes',
    description:
      'Stand as a protector of tigers by learning their conservation stories.',
    condition: 'Read all 6 Conservation Stories.',
    unlockCriteria: {
      type: 'read_survival_stories',
      requirement: 6,
    },
    isHidden: false,
  },
  {
    id: 'red_trailblazer',
    title: 'Red Trailblazer',
    description: 'Walk the path of the Red Tiger and uncover its secrets.',
    condition: 'Read all 6 tiger subspecies in the encyclopedia.',
    unlockCriteria: {
      type: 'read_encyclopedia',
      requirement: 6,
    },
    isHidden: false,
  },
  {
    id: 'pawsitive_photographer',
    title: 'Paw-sitive Photographer',
    description: 'Capture the beauty of the tiger kingdom.',
    condition: "Upload 10 tiger-related photos in the app's gallery feature.",
    unlockCriteria: {
      type: 'photo_uploads',
      requirement: 10,
    },
    isHidden: false,
  },
  {
    id: 'striped_legend',
    title: 'Striped Legend',
    description:
      'Earn the ultimate title by proving your dedication to tiger exploration.',
    condition:
      "Collect all other achievements and reach 1,000 points in the app's quiz leaderboard.",
    unlockCriteria: {
      type: 'complete_all',
      requirements: {
        achievements: 'all',
        points: 1000,
      },
    },
    isHidden: false,
  },
];
