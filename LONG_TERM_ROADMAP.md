# Long-Term Framework Roadmap

Strategic plan to transform Doodles from ad-hoc game development to systematic, scalable framework.

---

## Vision

**Goal**: Create a framework that allows developers to build high-quality, mobile-first games in **1-2 hours** instead of 5-6 hours, with guaranteed consistency and quality.

**Current State**:
- 11 games with varying quality
- No standardized testing process
- Mobile experience inconsistent
- Manual quality checks
- New games take 5-6 hours

**Target State**:
- All games meet quality baseline
- Systematic testing (45 min per game)
- Mobile-first by default
- Automated quality enforcement
- New games: 1-2 hours

---

## Timeline Overview

| Phase | Duration | Outcome | Status |
|-------|----------|---------|--------|
| **Phase 1** | 4 hours | Mobile Testing Framework | ✅ COMPLETE |
| **Phase 2** | 3-4 hours | Game Audit Report | ⏳ Next |
| **Phase 3** | 2-3 hours | Game Development Template | 📋 Planned |
| **Phase 4** | 2-3 hours | Fix Critical Issues | 📋 Planned |
| **Phase 5** | 2 hours | Accessibility & Performance Docs | 📋 Planned |
| **Total** | ~13-15 hours | Complete Framework | 📅 2-3 days of work |

---

## Phase 1: ✅ COMPLETE — Mobile Testing Framework

**What was created:**
- `MOBILE_TESTING_FRAMEWORK.md` (22KB comprehensive guide)
- `GAME_TESTING_AUDIT_TEMPLATE.md` (10KB practical template)

**Deliverables:**
- ✅ Device & viewport size guide
- ✅ Touch target standards
- ✅ Testing checklist (visual, interaction, performance, accessibility)
- ✅ Responsive design patterns (Phaser + DOM)
- ✅ Device-specific handling (notches, safe areas, nav bars)
- ✅ Performance benchmarks (Core Web Vitals)
- ✅ Debugging tools guide
- ✅ 10 common issues with fixes
- ✅ Reusable testing template

**Impact:**
- Framework for testing ALL games consistently
- Clear quality standards
- Repeatable testing methodology

---

## Phase 2: Audit All 11 Games → `GAME_AUDIT_REPORT.md`

**Objective**: Use Phase 1 framework to test all 11 existing games

**Scope**:
1. Math Ladder
2. Number Ninja
3. Quick Math
4. Measure Master
5. Body Map
6. Doodle School
7. World Explorer
8. Earth Explorer
9. Solar System
10. Dino Hunter
11. Planet Quest

**Methodology**:
- Use `GAME_TESTING_AUDIT_TEMPLATE.md` for each game
- Test on minimum 3 devices: iPhone 375px, Pixel 412px, iPad 768px
- Both portrait and landscape
- 45 minutes per game average
- Document findings

**Output**:
`GAME_AUDIT_REPORT.md` with:
- Summary table (all 11 games × critical/high/medium/low issues)
- Per-game audit results (copy of each template)
- Common issues across games
- Priority fixes (what blocks release)
- Risk assessment

**Expected Issues** (from analysis):
- Touch targets may be < 44px on some games
- Text may be too small on mobile
- Landscape mode might not be tested
- Meta tags incomplete on some games
- Color system not unified (Quick Math, Measure Master)
- Performance issues on slow networks

**Timeline**: ~2.5-3 hours (11 games × 15 min average)

---

## Phase 3: Create Game Development Template

**Objective**: Build a boilerplate that removes friction from creating new games

**What the template will include**:

### Code Quality (Already configured)
- ✅ ESLint setup
- ✅ Prettier formatting
- ✅ Pre-commit hooks
- ✅ Git conventions

### Design System Integration
- ✅ tokens.css linked
- ✅ design-system.js ready
- ✅ game-page-v2.css (for Phaser) or game-dom.css (for DOM)
- ✅ Default colors from design system
- ✅ Responsive utilities imported

### Mobile-First Structure

#### For Phaser Games:
```javascript
// game.js template includes:
- createGameConfig() with responsive settings
- getResponsiveFontSize() utility
- Touch target sizing guidelines
- Orientation change handler
- Safe area handling
- Performance monitoring setup
```

#### For DOM Games:
```html
<!-- index.html template includes:
- Complete meta tags (SEO, social, viewport)
- Preconnect directives
- Design system CSS linked
- Responsive CSS setup
- Safe area variables
```

### Responsive Design Built-In
- Mobile-first approach (320px baseline)
- Tablet considerations (768px)
- Desktop support (1024px)
- Orientation handling (portrait + landscape)
- Touch target defaults (44px min)

### Accessibility Baseline
- WCAG 2.1 AA compliant colors
- Touch-friendly by default
- Focus indicators
- Semantic HTML
- Alt text guidelines

### Testing & QA
- Checklist for manual testing
- Performance profiling setup
- Accessibility audit link
- Browser compatibility matrix

**Template Structure**:
```
games/TEMPLATE-GAME/
├── index.html          (Pre-configured with all meta tags, CSS links)
├── game.js            (Phaser or DOM with responsive patterns)
├── TESTING_CHECKLIST  (Copy of GAME_TESTING_AUDIT_TEMPLATE.md)
└── README.md          (Game-specific instructions)
```

**Timeline**: ~2.5-3 hours

---

## Phase 4: Fix Critical Issues

**Objective**: Address mobile-breaking issues identified in Phase 2

**Scope**: Fix only CRITICAL and HIGH priority issues

**Prioritization**:
- 🔴 CRITICAL: Blocks gameplay on mobile (must fix)
- 🟠 HIGH: Significantly impacts experience (should fix)
- 🟡 MEDIUM: Minor UX issue (backlog)
- 🟢 LOW: Polish (future enhancement)

**Example Critical Issues**:
- Touch targets < 44px (can't tap reliably)
- Text unreadable without zoom (< 12px)
- Game doesn't fill screen
- Soft keyboard hides input
- Horizontal scrolling present

**Process**:
1. Sort issues by priority
2. Group by game
3. Fix in order of impact
4. Retest after fix
5. Update audit report

**Timeline**: ~2-3 hours (assuming 5-8 critical issues across all games)

---

## Phase 5: Accessibility & Performance Standards

**Objective**: Document standards for all future games

**Deliverables**:

### 1. `ACCESSIBILITY_CHECKLIST.md`
- WCAG 2.1 AA compliance checklist
- Color contrast standards (4.5:1 minimum)
- Touch & keyboard navigation
- Screen reader compatibility
- Examples from existing games

### 2. `PERFORMANCE_STANDARDS.md`
- Core Web Vitals targets (LCP, FID, CLS)
- Asset size guidelines
- Load time budgets
- Memory limits
- Optimization techniques

### 3. `SEO_CHECKLIST.md`
- Meta tag requirements
- Open Graph setup
- Twitter Card setup
- Canonical URLs
- Sitemap updates

### 4. `TESTING_CHECKLIST.md`
- Final pre-launch checklist
- Device matrix
- Browser compatibility
- Performance validation
- Accessibility scan

**Timeline**: ~2 hours

---

## Phase 2 Detailed Plan (Next)

Since Phase 2 is next, here's the detailed approach:

### Setup (15 min)
1. Prepare testing environment
   - Python HTTP server or similar
   - Phone ready (iOS or Android)
   - Chrome DevTools open
2. Copy `GAME_TESTING_AUDIT_TEMPLATE.md`
3. Prepare issue tracking spreadsheet

### Per-Game Testing (45 min each)

**Game 1: Math Ladder** (Phaser)
- 10 min: Visual & layout testing (portrait + landscape)
- 10 min: Touch & interaction testing
- 10 min: Performance testing
- 10 min: DevTools checks & accessibility
- 5 min: Document findings

**Game 2-11**: Repeat pattern

### Documentation (30 min)
- Consolidate findings
- Identify common patterns
- Categorize issues
- Prioritize fixes

### Expected Findings

| Category | Likely Issues |
|----------|--------------|
| **Touch Targets** | Quick Math, Measure Master buttons may be < 44px |
| **Responsive** | Some games may not handle landscape well |
| **Text Size** | Mobile text may need scaling |
| **Meta Tags** | Measure Master, potentially others incomplete |
| **Color System** | Quick Math, Measure Master not using design-system.js |
| **Performance** | Check audio loading on mobile |

---

## Success Metrics

After all 5 phases complete:

### Framework Maturity
- ✅ Testing framework covers all scenarios
- ✅ All 11 games audited
- ✅ Critical issues fixed
- ✅ New game template ready
- ✅ Accessibility standards documented
- ✅ Performance budgets defined

### Quality Improvement
- Before: Ad-hoc testing, 60% mobile quality
- After: Systematic testing, 95%+ mobile quality

### Development Speed
- Before: New game = 5-6 hours
- After: New game = 1-2 hours (using template)

### Consistency
- Before: Games vary widely in mobile support
- After: All games meet baseline standards

---

## Effort Summary

| Phase | Hours | Outcome |
|-------|-------|---------|
| Phase 1 | 4 | Framework & Templates |
| Phase 2 | 3 | Audit Report |
| Phase 3 | 3 | Template Repository |
| Phase 4 | 2.5 | Critical Fixes |
| Phase 5 | 2 | Standards Documentation |
| **Total** | **14.5** | **Complete Framework** |

---

## Quick Start: Phase 2

Ready to begin Phase 2 (Game Audit)?

### What you need:
1. MOBILE_TESTING_FRAMEWORK.md (reference)
2. GAME_TESTING_AUDIT_TEMPLATE.md (copy for each game)
3. A phone or Android emulator
4. 45 minutes per game
5. Spreadsheet to track issues

### Timeline:
- 11 games × 45 min = 8.25 hours
- Plus 1 hour documentation
- **Total: ~9 hours** (can be done in ~1.5 days)

### Next Steps:
1. Set up testing environment
2. Pick first game (recommend starting with body-map as reference)
3. Work through audit template
4. Document findings
5. Repeat for each game
6. Consolidate into GAME_AUDIT_REPORT.md

---

## Long-term Vision (12+ months)

With framework in place:
- ✅ Add 5-10 new games annually
- ✅ Each new game guaranteed mobile quality
- ✅ Community contributions follow standards
- ✅ Games are scalable to 1000+ users without quality degradation
- ✅ Mobile-first becomes competitive advantage
- ✅ Maintenance overhead stays low (standardized approach)

---

## Contact & Questions

For questions about:
- **Testing methodology**: See MOBILE_TESTING_FRAMEWORK.md
- **Template structure**: See Phase 3 description above
- **Issue prioritization**: See Phase 4 prioritization guide
- **Accessibility**: See Phase 5 description

---

**Last Updated**: 2026-02-21
**Status**: Phase 1 Complete ✅, Phase 2 Ready to Start ▶️
