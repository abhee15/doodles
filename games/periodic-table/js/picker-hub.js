// Chunk definitions with recommended techniques and explanations
const CHUNKS = {
  1: {
    id: 1,
    range: "1-20",
    title: "Elements 1-20",
    fullTitle: "Hydrogen to Calcium",
    recommended: "story_chain",
    description: "The foundations - elements that appear most in everyday life",
    why: "Elements 1-20 have a natural order and connect beautifully in a single story. You'll remember the whole sequence together! 📚"
  },
  2: {
    id: 2,
    range: "21-40",
    title: "Elements 21-40",
    fullTitle: "Scandium to Krypton",
    recommended: "memory_palace",
    description: "Transition metals and the first heavier elements",
    why: "Elements 21-40 benefit from spatial organization. Place them in rooms as you move through your memory palace! 🏠"
  },
  3: {
    id: 3,
    range: "41-60",
    title: "Elements 41-60",
    fullTitle: "Yttrium to Neodymium",
    recommended: "body_map",
    description: "More transition metals and rare earth beginnings",
    why: "Use physical anchoring with extended body landmarks. This works great for medium-size element groups! 🧍"
  },
  4: {
    id: 4,
    range: "61-80",
    title: "Elements 61-80",
    fullTitle: "Promethium to Mercury",
    recommended: "rhyme_pegs",
    description: "Lanthanides and heavy elements",
    why: "The rhyme peg system (One=Bun, Two=Shoe) works perfectly for numbered sequences like this! 🎵"
  },
  5: {
    id: 5,
    range: "81-101",
    title: "Elements 81-101",
    fullTitle: "Thallium to Oganesson",
    recommended: "keyword_image",
    description: "The heavyweights and synthetic elements",
    why: "Complex element names need creative sound-alike associations. Perfect for keyword image technique! 🎨"
  }
};

// Technique metadata
const TECHNIQUES = {
  story_chain: {
    name: "Story Chain",
    icon: "📚",
    description: "Link elements as a narrative story"
  },
  memory_palace: {
    name: "Memory Palace",
    icon: "🏠",
    description: "Place elements in rooms or locations"
  },
  body_map: {
    name: "Body Map",
    icon: "🧍",
    description: "Anchor elements to your body"
  },
  keyword_image: {
    name: "Keyword Image",
    icon: "🎨",
    description: "Sound-alike word associations"
  },
  rhyme_pegs: {
    name: "Rhyme Pegs",
    icon: "🎵",
    description: "Link to rhyming numbers"
  }
};

// State
let currentChunk = null;
let currentTechnique = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  console.log("Picker Hub initialized");
});

/**
 * User clicked a chunk button
 */
function selectChunk(chunkId) {
  currentChunk = chunkId;
  const chunk = CHUNKS[chunkId];
  
  // Update recommended technique display
  const recommendedTech = chunk.recommended;
  const techData = TECHNIQUES[recommendedTech];
  
  document.getElementById('rec-technique-name').textContent = techData.name;
  document.getElementById('rec-technique-short').textContent = techData.name;
  document.getElementById('rec-technique-why').textContent = chunk.why;
  
  // Switch screens
  document.getElementById('chunk-selector').classList.remove('active');
  document.getElementById('technique-selector').classList.add('active');
  
  // Hide alternatives section
  document.getElementById('alternatives-section').style.display = 'none';
  
  // Highlight the recommended button in alternatives
  updateTechniqueButtonStates(recommendedTech);
}

/**
 * User toggled alternatives section
 */
function toggleAlternatives() {
  const section = document.getElementById('alternatives-section');
  if (section.style.display === 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}

/**
 * Get the recommended technique for current chunk
 */
function getTechnique() {
  if (!currentChunk) return 'story_chain';
  return CHUNKS[currentChunk].recommended;
}

/**
 * Update button states (highlight recommended)
 */
function updateTechniqueButtonStates(recommendedTech) {
  document.querySelectorAll('.technique-option').forEach(btn => {
    const tech = btn.getAttribute('data-technique');
    if (tech === recommendedTech) {
      btn.classList.add('recommended');
    } else {
      btn.classList.remove('recommended');
    }
  });
}

/**
 * User selected a technique (recommended or alternative)
 */
function selectTechnique(techniqueType, isRecommended = false) {
  if (!currentChunk) {
    alert('Please select a chunk first');
    return;
  }
  
  currentTechnique = techniqueType;
  
  // Route to game with parameters
  const gameUrl = `game.html?chunk=${currentChunk}&technique=${techniqueType}`;
  
  console.log(`Launching: Chunk ${currentChunk} with ${techniqueType} technique`);
  console.log(`Redirecting to: ${gameUrl}`);
  
  window.location.href = gameUrl;
}

/**
 * Go back to chunk selection
 */
function goBack() {
  currentChunk = null;
  currentTechnique = null;
  document.getElementById('chunk-selector').classList.add('active');
  document.getElementById('technique-selector').classList.remove('active');
}
