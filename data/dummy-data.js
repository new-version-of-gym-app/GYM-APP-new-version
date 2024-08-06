
import Category from "../models/category";
import Information from "../models/information";

export const CATEGORIES = [
  new Category(
    "c1",
    "YOGA",
    "https://t4.ftcdn.net/jpg/02/36/24/71/360_F_236247111_5LuBqQS1netR5GqjsY8UPU0z3oTlE4H9.jpg"
  ),
  new Category(
    "c2",
    "PILATES & BARRE",
    "https://www.kiralates.com.au/uploads/5/4/5/6/54564945/__5902504_orig.jpg"
  ),
  new Category(
    "c3",
    "FITNESS",
    "https://t3.ftcdn.net/jpg/06/52/33/66/360_F_652336682_U0tRWOuRwVNzRFeIVgqk8CQgVFBKYeWP.jpg"
  ),
  new Category(
    "c4",
    "MEDITATION",
    "https://img.freepik.com/premium-photo/peaceful-man-doing-yoga-meditating-isolated-white-background_382934-3829.jpg"
  ),
];

export const DESCRIPTION = [
  new Information(
    "m1",
    "c1",
    "31 Yoga Poses for Beginners",
    "https://www.yogabreezebali.com/wp-content/uploads/yoga-poses-mosaic-800px..jpg",
    [
      "Downward Facing Dog (Adho Mukha Svanasana)",
      "Mountain Pose (Tadasana)",
      "Warrior I (Virabhadrasana I)",
      "Warrior II (Virabhadrasana II)",
      "Extended Side Angle (Utthita Parvakonasana)",
      "Triangle Pose (Utthita Trikonasana)",
      "Standing Forward Bend (Uttanasana)",
      "Reverse Warrior (Viparita Virabhadrasana)",
      "Garland Pose (Malasana)",
      "Half Forward Bend (Ardha Uttanasana)",
      "Pyramid Pose (Parsvottanasana)",
      "Raised Hands Pose (Urdhva Hastasana)",
      "Low Lunge",
      "Tree Pose (Vrksasana)",
      "Downward Facing Dog Split",
      "Plank Pose",
      "Cat-Cow Stretch (Chakravakasana)",
      "Bridge Pose (Setu Bandha Sarvangasana)",
      "Cobra Pose (Bhujangasana)",
      "Knees, Chest, and Chin (Ashtanga Namaskara)",
      "Staff Pose (Dandasana)",
      "Cobbler's Pose (Baddha Konasana)",
      "Easy Pose (Sukhasana)",
      "Half Lord of the Fishes Pose (Ardha Matsyendrasana)",
      "Head to Knee Pose (Janu Sirsasana)",
      "Seated Forward Bend (Paschimottanasana)",
      "Seated Wide Angle Straddle (Upavistha Konasana)",
      "Happy Baby Pose (Ananda Balasana)",
      "Supine Spinal Twist (Supta Matsyendrasana)",
      "Child's Pose (Balasana)",
      "Corpse Pose (Savasana)",
    ]
  ),
  new Information(
    "m2",
    "c2",
    "PILATES & BARRE in 10 DAYS",
    "https://i.pinimg.com/originals/ba/e2/47/bae2479125592368487d923131d63347.jpg",
    [
      "Day 1: 35-Minute Lower Body Dumbbell Workout",
      "Day 2: 25-Minute Pilates Barre Class At Home",
      "Day 3: 25-Minute Dumbbell Arm Workout",
      "Day 4: 30-Minute Cardio Kickboxing Barre Workout",
      "Day 5: 30-Minute Full Body Strength Workout",
      "Day 6: 35-Minute Full Body Strength and HIIT Workout",
      "Day 7: 25-Minute Pilates Class At Home",
      "Day 8: 40-Minute Booty Building Workout",
      "Day 9: 30-Minute Barre Blend",
      "Day 10: 20-Minute Upper Body Dumbbell Workout",
    ]
  ),
  new Information(
    "m3",
    "c3",
    "What is the best fitness program for beginner ?",
    "https://www.wikihow.com/images/thumb/a/ac/Do-Kegel-Exercises-for-Men-Step-9.jpg/v4-460px-Do-Kegel-Exercises-for-Men-Step-9.jpg",
    [
      "Set Realistic Goals",
      "Choose Enjoyable Activities",
      "Start Slowly",
      "Incorporate Strength Training and Cardio",
      "Warm-up (5-15 minutes)",
      "Strength Training (2-3 times per week)",
      "Cardiovascular Exercise (3-4 times per week)",
      "Flexibility and Mobility (2-3 times per week)",
      "Rest and Recovery (2-3 days per week)",
    ]
  ),
  new Information(
    "m4",
    "c4",
    "Exercises to Help with Anxiety and Stress",
    "https://cdn.sanity.io/images/0vv8moc6/curetoday/679c331fa33db422690eb85c2c5d1343b14d8ad1-740x528.png",
    [
      "Get into a comfortable position",
      "Close your eyes for a deeper practice",
      "Starting with your feet and toes",
      "Take a nice deep breath in through your nose",
      "Work your way up the body",
      "Move progressively up your body",
    ]
  ),
];

export const NOTIFICATIONS = [
  {
    id: '1',
    type: 'welcome',
    title: 'Welcome to the Gym App!',
    content: 'Get ready to start your fitness journey with us.',
    date: '2024-07-01 09:00',
    read: false
  },
  {
    id: '2',
    type: 'account',
    title: 'Your Account Was Created Successfully!',
    content: 'You can now access all features of the Gym App.',
    date: '2024-07-01 09:05',
    read: false
  },
  {
    id: '3',
    type: 'program',
    title: 'New workout programs available',
    content: 'Check out our latest strength training and cardio programs.',
    date: '2024-07-10 14:30',
    read: false
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Congratulations on your first workout!',
    content: "You've completed your first session. Keep up the good work!",
    date: '2024-07-15 18:45',
    read: true
  },
  {
    id: '5',
    type: 'social',
    title: 'John Doe started following you',
    content: 'You have a new follower in the Gym App community.',
    date: '2024-07-20 11:20',
    read: false
  },
  {
    id: '6',
    type: 'reminder',
    title: "Don't forget your workout today",
    content: 'You have a scheduled session in 1 hour. Get ready!',
    date: '2024-07-25 16:00',
    read: false
  }
];
const sports = [
  { id: '1', name: 'Running', icon: '🏃', details: 'Duration: 30 mins\nBest Time: Morning\nBenefits: Improves cardiovascular health, burns calories.' },
  { id: '2', name: 'Swimming', icon: '🏊', details: 'Duration: 45 mins\nBest Time: Any time\nBenefits: Full-body workout, improves flexibility.' },
  { id: '3', name: 'Cycling', icon: '🚴', details: 'Duration: 60 mins\nBest Time: Afternoon\nBenefits: Strengthens legs, burns calories.' },
  { id: '4', name: 'Weight-lifting', icon: '🏋️‍♂️', details: 'Duration: 40 mins\nBest Time: Evening\nBenefits: Builds muscle, increases strength.' },
  { id: '5', name: 'Yoga', icon: '🧘‍♀️', details: 'Duration: 60 mins\nBest Time: Morning or Evening\nBenefits: Enhances flexibility, reduces stress.' },
];

const exercises = [
  { id: '1', name: 'Cardio', bodyPart: 'Abdomen', duration: '20 mins', icon: '🔥', details: 'Involves high-intensity exercises to boost metabolism.' },
  { id: '2', name: 'Push-Ups', bodyPart: 'Arms', duration: '15 mins', icon: '💪', details: 'Strengthens upper body, including chest and triceps.' },
  { id: '3', name: 'Pull-Ups', bodyPart: 'Arms', duration: '10 mins', icon: '👉🏾', details: 'Targets back and arm muscles, improves upper body strength.' },
  { id: '4', name: 'Planks', bodyPart: 'Core', duration: '30 mins', icon: '🦴', details: 'Strengthens the core muscles and improves stability.' },
];

const meals = [
  { id: '1', name: 'Chicken Salad', composition: '200g chicken, 100g lettuce', icon: '🥗', details: 'Preparation: Grill chicken, mix with fresh lettuce, add dressing.' },
  { id: '2', name: 'Oatmeal', composition: '50g oats, 200ml milk', icon: '🥣', details: 'Preparation: Cook oats in milk, add fruits or nuts for taste.' },
  { id: '3', name: 'Brown Rice', composition: '100g brown rice, 200g water', icon: '🍚', details: 'Preparation: Boil rice in water until soft, serve with vegetables.' },
  { id: '4', name: 'Vegetable Stir-Fry', composition: '50g vegetables, 200g broth', icon: '🥦', details: 'Preparation: Stir-fry vegetables in broth, season with spices.' },
];

const nutritionalAdvice = [
  { id: '1', item: 'Apple', calories: '52 kcal per 100g', icon: '🍏', details: 'Rich in fiber and vitamins, great for a quick snack.' },
  { id: '2', item: 'Cucumber', calories: '16 kcal per 100g', icon: '🥒', details: 'Low in calories, high in water, good for hydration.' },
  { id: '3', item: 'Banana', calories: '105 kcal per 100g', icon: '🍌', details: 'High in potassium, ideal for pre- or post-workout energy.' },
  { id: '4', item: 'Orange', calories: '60 kcal per 100g', icon: '🍊', details: 'Excellent source of vitamin C, supports immune health.' },
];

export { sports, exercises, meals, nutritionalAdvice };

let FEED_ITEMS = [
  {
    id: '1',
    userAvatar: 'https://example.com/avatar1.jpg',
    username: 'JohnDoe',
    timestamp: '2h ago',
    title: 'Great workout today!',
    content: 'Just finished an intense HIIT session. Feeling pumped!',
    image: 'https://example.com/workout.jpg',
    likes: 15,
    liked: false,
    comments: [
      { id: 'c1', author: 'Jane', text: 'Way to go!', time: '1h ago' },
      { id: 'c2', author: 'Mike', text: 'What was your routine?', time: '30m ago' },
      { id: 'c3', author: 'John', text: 'We Should go together next time :)', time: '15m ago' }
    ]
  },
  {
    id: '2',
    userAvatar: 'https://example.com/avatar2.jpg',
    username: 'FitnessGal',
    timestamp: '1d ago',
    title: 'Yoga for flexibility',
    content: 'Spent an hour doing yoga today. My flexibility is improving!',
    image: 'https://example.com/yoga.jpg',
    likes: 25,
    liked: true,
    comments: [
      { id: 'c3', author: 'Sara', text: 'Awesome! Keep it up!', time: '12h ago' },
      { id: 'c4', author: 'Tom', text: 'Which poses did you focus on?', time: '10h ago' }
    ]
  },
  {
    id: '3',
    userAvatar: 'https://example.com/avatar3.jpg',
    username: 'GymRat',
    timestamp: '3h ago',
    title: 'New PR in bench press!',
    content: 'Hit a new personal record in bench press today. 200 lbs!',
    image: 'https://example.com/benchpress.jpg',
    likes: 30,
    liked: false,
    comments: [
      { id: 'c5', author: 'Mark', text: 'Congrats! That\'s impressive!', time: '2h ago' },
      { id: 'c6', author: 'Emily', text: 'What\'s your next goal?', time: '1h ago' }
    ]
  },
  {
    id: '4',
    userAvatar: 'https://example.com/avatar4.jpg',
    username: 'RunnerLife',
    timestamp: '5h ago',
    title: 'Morning run',
    content: 'Completed a 5k run this morning. Feeling energized!',
    image: 'https://example.com/run.jpg',
    likes: 20,
    liked: true,
    comments: [
      { id: 'c7', author: 'Lily', text: 'Great job! Keep it up!', time: '4h ago' },
      { id: 'c8', author: 'David', text: 'Any tips for beginners?', time: '3h ago' }
    ]
  },
  {
    id: '5',
    userAvatar: 'https://example.com/avatar5.jpg',
    username: 'HealthyEats',
    timestamp: '2d ago',
    title: 'Post-workout meal',
    content: 'Made a delicious protein-packed smoothie bowl after my workout!',
    image: 'https://example.com/smoothie.jpg',
    likes: 40,
    liked: false,
    comments: [
      { id: 'c9', author: 'Anna', text: 'That looks delicious!', time: '1d ago' },
      { id: 'c10', author: 'Jake', text: 'Can you share the recipe?', time: '20h ago' }
    ]
  }
];

export { FEED_ITEMS };
