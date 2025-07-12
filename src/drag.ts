 const games = [
  {
    id: "capitals-game",
    type: "match",
    title: "Match the Capitals to their Countries",
    description: "Drag the capital cities to their correct countries.",
    draggableElements: [
      { id: "paris", label: "Paris" },
      { id: "london", label: "London" },
      { id: "berlin", label: "Berlin" },
      { id: "rome", label: "Rome" },
      { id: "madrid", label: "Madrid" },
      { id: "tokyo", label: "Tokyo" },
    ],
    droppableBlanks: [
      { id: "france", label: "France", correctElementId: "paris" },
      { id: "uk", label: "United Kingdom", correctElementId: "london" },
      { id: "germany", label: "Germany", correctElementId: "berlin" },
      { id: "italy", label: "Italy", correctElementId: "rome" },
      { id: "spain", label: "Spain", correctElementId: "madrid" },
      { id: "japan", label: "Japan", correctElementId: "tokyo" },
    ],
  },
  {
    id: "solar-system-game",
    type: "fill-in-blanks",
    title: "Solar System: Orbital Positions",
    description: "Drag the planets to their correct orbital positions.",
    draggableElements: [
      { id: "mercury", label: "Mercury" },
      { id: "venus", label: "Venus" },
      { id: "earth", label: "Earth" },
      { id: "mars", label: "Mars" },
      { id: "jupiter", label: "Jupiter" },
      { id: "saturn", label: "Saturn" },
      { id: "uranus", label: "Uranus" },
      { id: "neptune", label: "Neptune" },
    ],
    droppableBlanks: [
      { id: "pos-1", label: "1st Planet", correctElementId: "mercury" },
      { id: "pos-2", label: "2nd Planet", correctElementId: "venus" },
      { id: "pos-3", label: "3rd Planet", correctElementId: "earth" },
      { id: "pos-4", label: "4th Planet", correctElementId: "mars" },
      { id: "pos-5", label: "5th Planet", correctElementId: "jupiter" },
      { id: "pos-6", label: "6th Planet", correctElementId: "saturn" },
      { id: "pos-7", label: "7th Planet", correctElementId: "uranus" },
      { id: "pos-8", label: "8th Planet", correctElementId: "neptune" },
    ],
  },
  {
    id: "math-equation-game",
    type: "math-fill",
    title: "Complete the Math Equations",
    description: "Drag the correct number to complete the equation.",
    draggableElements: [
      { id: "num-5", label: "5" },
      { id: "num-7", label: "7" },
      { id: "num-12", label: "12" },
      { id: "num-15", label: "15" },
      { id: "num-20", label: "20" },
    ],
    droppableBlanks: [
      { id: "eq-1", label: "2 + 3 = ?", displayPrefix: "2 + 3 = ", correctElementId: "num-5" },
      { id: "eq-2", label: "10 - 3 = ?", displayPrefix: "10 - 3 = ", correctElementId: "num-7" },
      { id: "eq-3", label: "6 + 6 = ?", displayPrefix: "6 + 6 = ", correctElementId: "num-12" },
      { id: "eq-4", label: "5 * 3 = ?", displayPrefix: "5 * 3 = ", correctElementId: "num-15" },
      { id: "eq-5", label: "40 / 2 = ?", displayPrefix: "40 / 2 = ", correctElementId: "num-20" },
    ],
  },
]


export default games;