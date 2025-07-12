// src/data/demoContent.ts
import type { DemoContent } from './types';

export const demoContent: DemoContent[] = [
  {
    id: 'water-cycle',
    title: 'Water Cycle Steps',
    description: 'Learn the correct sequence of the water cycle',
    subject: 'Science',
    difficulty: 'beginner',
    template: 'drag_order',
    data: {
      id: 'water-cycle',
      title: 'Arrange the Water Cycle Steps',
      instruction: 'Drag the stages of the water cycle in the correct order, from start to finish.',
      items: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
      correctOrder: [0, 1, 2, 3],
      feedback: {
        correct: 'Excellent! You understand how water moves through its cycle in nature.',
        incorrect: 'Not quite right. Remember: water evaporates, forms clouds, falls as rain, and collects again.',
        partial: 'You got some steps right! Think about how water moves from oceans to clouds to ground.',
      },
      allowPartialCredit: true,
      maxAttempts: 3,
      onComplete: () => {},
    },
  },
  {
    id: 'planets-order',
    title: 'Planets from the Sun',
    description: 'Order the planets by distance from the sun',
    subject: 'Astronomy',
    difficulty: 'intermediate',
    template: 'drag_order',
    data: {
      id: 'planets-order',
      title: 'Order Planets by Distance from Sun',
      instruction: 'Arrange these planets from closest to farthest from the Sun.',
      items: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctOrder: [0, 1, 2, 3, 4, 5],
      feedback: {
        correct: 'Perfect! You know the order of planets in our solar system.',
        incorrect: 'Try again! Hint: My Very Educated Mother Just Served Us Nachos.',
        partial: 'Good start! Remember the mnemonic to help with the order.',
      },
      allowPartialCredit: true,
      maxAttempts: 3,
      onComplete: () => {},
    },
  },
  {
    id: 'scientific-method',
    title: 'Scientific Method Steps',
    description: 'Learn the proper sequence of scientific investigation',
    subject: 'Science',
    difficulty: 'intermediate',
    template: 'drag_order',
    data: {
      id: 'scientific-method',
      title: 'Steps of the Scientific Method',
      instruction: 'Put these steps of the scientific method in the correct order.',
      items: [
        'Ask a Question',
        'Form a Hypothesis', 
        'Design an Experiment',
        'Collect Data',
        'Analyze Results',
        'Draw Conclusions'
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      feedback: {
        correct: 'Outstanding! You understand how scientists approach problems systematically.',
        incorrect: 'Science is about following a logical process. Start with curiosity and end with conclusions.',
        partial: 'You\'re on the right track! Think about the logical flow from question to answer.',
      },
      allowPartialCredit: true,
      maxAttempts: 3,
      onComplete: () => {},
    },
  },
  {
    id: 'math-operations',
    title: 'Order of Operations',
    description: 'Solve math problems using the correct sequence',
    subject: 'Mathematics',
    difficulty: 'beginner',
    template: 'drag_order',
    data: {
      id: 'math-operations',
      title: 'Mathematical Order of Operations',
      instruction: 'Arrange these operations in the order they should be performed (PEMDAS).',
      items: [
        'Parentheses',
        'Exponents', 
        'Multiplication',
        'Division',
        'Addition',
        'Subtraction'
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      feedback: {
        correct: 'Excellent! PEMDAS helps us solve math problems correctly every time.',
        incorrect: 'Remember PEMDAS: Please Excuse My Dear Aunt Sally.',
        partial: 'You know some of the order! PEMDAS is the key to remember.',
      },
      allowPartialCredit: true,
      maxAttempts: 3,
      onComplete: () => {},
    },
  },
];


