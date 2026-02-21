# Doodles - Educational Learning Games

A collection of fun, educational browser games for kids.

## 🎮 Games

### Math Ladder ✅ (Live)
Help a kid climb a ladder by solving math problems! Wrong answers or timeout makes you fall down.
- **Target Age:** 7+
- **Skills:** Addition, Subtraction
- **Timer:** 15 seconds per question

### Coming Soon
- Number Ninja
- Word Race

---

## 🚀 Getting Started

### Local Development
1. Clone this repository
2. Open `index.html` in a browser
3. Play games directly - no build step needed!

### Project Structure
```
doodles/
├── index.html              # Landing page (game portal)
├── css/
│   └── portal.css         # Landing page styles
├── games/
│   ├── math-ladder/       # Math climbing game
│   │   ├── index.html
│   │   ├── game.js
│   │   └── assets/        # Future: sprites, sounds
│   └── [future games]/
├── shared/
│   ├── analytics.js       # Google Analytics integration
│   └── ads.js            # Monetization (AdSense)
└── README.md
```

---

## 📊 Analytics Setup

### Step 1: Get Google Analytics ID
1. Go to https://analytics.google.com/
2. Create property: "Doodles Games"
3. Add data stream (Web)
4. Copy Measurement ID (looks like `G-XXXXXXXXXX`)

### Step 2: Add to Code
Open `shared/analytics.js` and replace:
```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```
with your real ID.

### What Gets Tracked
- Page views (which games are popular)
- Game starts/completions
- Scores and play time
- User demographics

---

## 💰 Monetization Plan

### Phase 1: Build Audience (Now)
- Create 3-5 quality games
- Get organic traffic
- Build social media presence

### Phase 2: Enable Ads (Later)
1. Apply for Google AdSense
2. Get approved (need consistent traffic)
3. Update `shared/ads.js` with AdSense ID
4. Set `ADS_ENABLED = true`

### Ad Placement Strategy
- Banner at bottom of landing page
- Interstitial between game levels (non-intrusive)
- No ads during active gameplay

### Revenue Estimates
- **Low traffic** (1,000 plays/month): $5-10/month
- **Medium traffic** (10,000 plays/month): $50-100/month
- **High traffic** (100,000 plays/month): $500-1,000/month

*Actual revenue depends on geography, engagement, niche*

---

## 🌍 Deployment to GitHub Pages

### Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: Math Ladder game"
git branch -M main
git remote add origin https://github.com/yourusername/doodles.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Pages → Source → `main` branch
3. Save

Your site will be live at:
```
https://yourusername.github.io/doodles
```

### Step 3: Update Analytics
Now go back to Google Analytics and add the real URL to your data stream.

---

## 🎨 Customization

### Add More Math Operations
Edit `games/math-ladder/game.js`:
```javascript
const operation = Phaser.Math.Between(0, 3);
// 0: addition, 1: subtraction, 2: multiplication, 3: division
```

### Change Difficulty
```javascript
const num1 = Phaser.Math.Between(1, 50); // Harder numbers
const timeLeft = 10; // Less time
```

### Add Levels
Create difficulty progression based on `currentRung`.

---

## 📱 Future Features

- [ ] Mobile touch optimization
- [ ] Sound effects and music
- [ ] Character customization
- [ ] Leaderboards (Firebase)
- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Progress saving (localStorage)
- [ ] Multiplayer mode
- [ ] PWA (installable app)
- [ ] Premium version (ad-free)

---

## 🛠 Tech Stack

- **Framework:** Phaser 3 (game engine)
- **Frontend:** HTML5, CSS3, JavaScript
- **Hosting:** GitHub Pages (free)
- **Analytics:** Google Analytics 4 (free)
- **Monetization:** Google AdSense (when ready)

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 🛠 Development Setup

### Prerequisites
- Node.js 18+ (for development tools only - games run in browser)
- Git

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/abhee15/doodles.git
cd doodles

# Install development dependencies
npm install

# Set up pre-commit hooks
npm run prepare
```

### Development Commands

```bash
# Lint JavaScript files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format all code (JS, JSON, HTML, CSS, Markdown)
npm run format

# Check formatting without modifying files
npm run format:check

# Run both format check and lint
npm run validate
```

### Code Style

This project uses **ESLint** and **Prettier** for consistent code quality:

- **ESLint** enforces code correctness (no undefined variables, proper syntax, etc.)
- **Prettier** enforces code formatting (indentation, quotes, line length, etc.)
- **Pre-commit hooks** automatically lint and format staged files

**Important:** All commits trigger automatic code quality checks. Fix any issues before committing:
```bash
# Before committing, run this
npm run lint:fix
npm run format
```

### Code Conventions

**Variable & Function Names:**
```javascript
// Use camelCase for variables and functions
const playerScore = 0;
function calculateScore() { }

// Use UPPERCASE for constants
const MAX_PLAYERS = 10;

// Use leading underscore for unused parameters
function handler(_event) { }
```

**Spacing & Formatting:**
- 2 spaces for indentation
- Single quotes for strings (except HTML attributes)
- Semicolons required
- Max line length: 100 characters
- No trailing whitespace

**Comments:**
```javascript
// Single line comments for quick notes

/**
 * Multi-line comments for complex logic
 * explaining why something is done this way
 */
```

### Commit Message Convention

Commits follow a structured format:

```
type(scope): description

Optional: longer explanation here

Co-Authored-By: Name <email> (for collaborative commits)
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`

**Examples:**
```
feat(quick-math): add landscape mode responsiveness
fix(measure-master): resolve mobile touch target sizing
docs(CLAUDE.md): update design system documentation
chore: update ESLint configuration
```

### Testing Games Locally

**No build process needed!** Just open in a browser:

```bash
# Using Python 3 (recommended for CORS compatibility)
python -m http.server 8000

# Or using Node.js http-server
npx http-server

# Then visit: http://localhost:8000
```

### Mobile Testing

Test on actual devices for best results:

```bash
# Find your machine's IP
ipconfig getifaddr en0  # macOS/Linux
ipconfig | findstr IPv4  # Windows

# Access from mobile browser
http://YOUR_IP:8000
```

Test both portrait and landscape modes, especially on:
- Small phones (320px width)
- Tablets (768px width)
- Large phones (414px width)

### Design System

All games should use the unified design system:

**Token Files:**
- `shared/tokens.css` - Primitive color variables (--tok-*)
- `shared/design-system.js` - Phaser game tokens (COLORS, TYPOGRAPHY, LAYOUT)
- `shared/game-dom.css` - DOM game shell (Archetype B games)

**Color Palette:**
```
Primary:   #1CB0F6 (Dodger Blue)
Secondary: #FF7D00 (Orange)
Success:   #58CC02 (Green)
Error:     #FF4444 (Red)
```

See `CLAUDE.md` for full design system documentation.

---

## 🤝 Contributing

This is a personal project, but suggestions welcome!

**Before submitting changes:**
1. Run `npm run validate` to check formatting
2. Follow code conventions above
3. Test on mobile (both portrait and landscape)
4. Update CLAUDE.md if adding new conventions

---

**Built with ❤️ for kids' education**
