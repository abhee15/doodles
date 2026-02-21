# Game Testing Audit Template

Use this template for each game to track testing results systematically.

---

## Game Audit: [GAME NAME]

**Game ID**: `[game-id]`
**Type**: [Phaser / DOM]
**Last Updated**: YYYY-MM-DD
**Tester**: [Your Name]

---

## Device Testing Matrix

Complete this table for each device/orientation combination:

### iPhone SE (375px) - CRITICAL

#### Portrait Mode
- [ ] **Visual**: No horizontal scroll, text readable, buttons visible
- [ ] **Touch**: All buttons >= 44px, responsive, no lag
- [ ] **Performance**: Loads < 2s, smooth gameplay
- [ ] **Orientation**: Changes handled correctly
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

#### Landscape Mode
- [ ] **Visual**: Layout fits, buttons visible, text readable
- [ ] **Touch**: All interactive elements accessible, no overlap
- [ ] **Performance**: Smooth, no stutter
- [ ] **Safe Area**: Notch/home indicator respected
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

### iPhone 12 (390px) - CRITICAL

#### Portrait Mode
- [ ] **Visual**: No issues, spacing looks good
- [ ] **Touch**: All targets >= 44px
- [ ] **Performance**: Fast load, smooth play
- [ ] **Stability**: No crashes, memory stable
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

#### Landscape Mode
- [ ] **Visual**: Proper layout
- [ ] **Touch**: No overlapping buttons
- [ ] **Performance**: Smooth
- [ ] **Safe Area**: Handled correctly
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

### Pixel 4 (412px) - HIGH PRIORITY

#### Portrait Mode
- [ ] **Visual**: Content fits, readable
- [ ] **Touch**: No issues
- [ ] **Performance**: Good
- [ ] **Android Nav**: Soft keyboard handled
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

#### Landscape Mode
- [ ] **Visual**: Proper layout
- [ ] **Touch**: All elements accessible
- [ ] **Performance**: Smooth
- [ ] **Nav Bar**: Respected
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

### iPad Air (768px) - MEDIUM PRIORITY

#### Portrait Mode
- [ ] **Visual**: Uses available space well
- [ ] **Touch**: Large touch targets
- [ ] **Performance**: Smooth
- [ ] **Layout**: Tablet-optimized
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

#### Landscape Mode
- [ ] **Visual**: Landscape layout correct
- [ ] **Touch**: Easy to use
- [ ] **Performance**: Good
- [ ] **Safe Area**: Respected
- **Issues Found**: [List any issues]
- **Status**: ⚪ Not Tested | 🟡 Issues Found | 🟢 PASS

---

## Detailed Testing Results

### Visual & Layout Testing

#### Viewport Rendering
- [ ] Game fills screen (no gray bars on mobile)
- [ ] No horizontal scrolling
- [ ] Content visible in top 80% (not hidden below fold)
- [ ] Images load and scale correctly
- [ ] Text is crisp and readable (no blurry fonts)

**Issues**:
```
[Describe any visual issues found]
```

#### Typography
- [ ] Heading fonts are readable (> 14px on mobile)
- [ ] Body text is readable (> 12px on mobile)
- [ ] No text overflow or wrapping issues
- [ ] Line spacing is comfortable (> 1.2x)
- [ ] Contrast is sufficient (> 4.5:1)

**Issues**:
```
[Describe any typography issues]
```

#### Colors & Visual Hierarchy
- [ ] Colors are vibrant (not washed out)
- [ ] Buttons stand out from background
- [ ] Active/inactive states clear
- [ ] Error/success feedback visible
- [ ] Dark colors on light backgrounds (or vice versa)

**Issues**:
```
[Describe any color/contrast issues]
```

---

### Touch & Interaction Testing

#### Button Accessibility
- [ ] Back button works, position correct
- [ ] All action buttons >= 44x44px
- [ ] Buttons have visible hover/active states
- [ ] Button spacing >= 12px minimum
- [ ] No buttons cut off by device edges

**Issues**:
```
[List any button issues]
```

**DevTools Check**:
```javascript
// Run in console to verify touch targets
document.querySelectorAll('button, a, input').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    console.warn('TOO SMALL:', el, `${rect.width}x${rect.height}`);
  }
});
```

#### Interaction Response
- [ ] Tap responds immediately (no lag)
- [ ] Long press doesn't break anything
- [ ] Swipe gestures work (if used)
- [ ] Double-tap doesn't zoom and break game
- [ ] Pull-to-refresh disabled (if applicable)

**Issues**:
```
[Describe any interaction issues]
```

#### Input & Forms
- [ ] Text inputs are >= 44px tall
- [ ] Soft keyboard appears correctly
- [ ] Keyboard doesn't hide input field
- [ ] Can submit form on mobile
- [ ] Error messages visible

**Issues**:
```
[List input/form issues]
```

---

### Performance Testing

#### Load Performance
- [ ] Page loads in < 2 seconds
- [ ] Game initializes in < 2 seconds total
- [ ] No "blank screen" delay
- [ ] CSS/JS load without blocking
- [ ] Images load without lag

**Load Time**: _____ seconds

**Issues**:
```
[Describe any load issues]
```

#### Runtime Performance
- [ ] Gameplay smooth (target 60 FPS)
- [ ] No stutter when moving/clicking
- [ ] Animations are fluid
- [ ] Audio synced with action
- [ ] No slowdown after 5 minutes

**FPS Observation**: _____ (smooth/choppy/etc)

**Issues**:
```
[Describe any performance issues]
```

#### Memory Stability
- [ ] No memory growth during gameplay
- [ ] Can play 10+ minutes without slowdown
- [ ] No random crashes
- [ ] Proper cleanup on exit
- [ ] No "Out of Memory" errors

**Memory Check**:
```
Initial: _____ MB
After 5 min: _____ MB
After 10 min: _____ MB
```

**Issues**:
```
[Describe any memory/stability issues]
```

---

### Orientation & Device Testing

#### Portrait Mode
- [ ] Layout makes sense vertically
- [ ] Content doesn't exceed width
- [ ] Buttons don't overlap
- [ ] Text is readable without zoom
- [ ] Navigation is accessible

**Issues**:
```
[List portrait issues]
```

#### Landscape Mode
- [ ] Layout adjusts for wide screen
- [ ] Buttons don't overlap horizontally
- [ ] Text remains readable
- [ ] Game doesn't feel stretched
- [ ] Status/notch respected

**Issues**:
```
[List landscape issues]
```

#### Orientation Changes
- [ ] Rotating device doesn't crash game
- [ ] Layout updates correctly on rotation
- [ ] Touch targets remain valid after rotation
- [ ] State is preserved (score, progress, etc)
- [ ] Game doesn't pause unnecessarily

**Issues**:
```
[List orientation change issues]
```

---

### Accessibility Testing

#### Visual Accessibility
- [ ] Color contrast >= 4.5:1 for text
- [ ] Not relying on color alone (use icons/text too)
- [ ] Text alternatives for images
- [ ] Focus indicators visible
- [ ] Readable without CSS (if applicable)

**Issues**:
```
[List accessibility issues]
```

#### Interaction Accessibility
- [ ] All buttons/links keyboard accessible
- [ ] Tab order makes sense
- [ ] Focus isn't lost
- [ ] Modal/popup closes with Escape key
- [ ] Can navigate without mouse

**Issues**:
```
[List keyboard/interaction issues]
```

#### Screen Reader Testing
- [ ] Page structure makes sense (h1, h2, etc)
- [ ] Links/buttons are labeled
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Live regions announce changes

**Issues**:
```
[List screen reader issues]
```

---

### Meta & SEO Testing

#### Meta Tags
- [ ] Page title is descriptive
- [ ] Meta description present
- [ ] Viewport meta tag correct
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL set

**Issues**:
```
[List meta tag issues]
```

#### Shareability
- [ ] Social preview looks good (use opengraph.xyz)
- [ ] Image loads for preview
- [ ] Description is compelling
- [ ] URL is correct in preview

**Issues**:
```
[List sharing issues]
```

---

### Browser Compatibility

#### Chrome (Latest)
- [ ] ✅ Tested
- [ ] ❌ Issues Found
- [ ] ⚪ Not Tested

**Issues**:
```
[List Chrome-specific issues]
```

#### Safari (Latest)
- [ ] ✅ Tested
- [ ] ❌ Issues Found
- [ ] ⚪ Not Tested

**Issues**:
```
[List Safari-specific issues]
```

#### Firefox (Latest)
- [ ] ✅ Tested
- [ ] ❌ Issues Found
- [ ] ⚪ Not Tested

**Issues**:
```
[List Firefox-specific issues]
```

#### Samsung Internet (Android)
- [ ] ✅ Tested
- [ ] ❌ Issues Found
- [ ] ⚪ Not Tested

**Issues**:
```
[List Samsung Internet issues]
```

---

## Summary

### Overall Assessment
- **Status**: 🟢 PASS | 🟡 ISSUES FOUND | 🔴 BROKEN

### Critical Issues (Blocks Release)
```
- Issue 1: [Description]
  Priority: 🔴 CRITICAL
  Fix: [How to fix]

- Issue 2: [Description]
  Priority: 🔴 CRITICAL
  Fix: [How to fix]
```

### High Priority Issues (Should fix soon)
```
- Issue 1: [Description]
  Priority: 🟠 HIGH
  Fix: [How to fix]
```

### Medium Priority Issues (Fix when possible)
```
- Issue 1: [Description]
  Priority: 🟡 MEDIUM
  Fix: [How to fix]
```

### Low Priority Issues (Nice to have)
```
- Issue 1: [Description]
  Priority: 🟢 LOW
  Fix: [How to fix]
```

---

## Action Items

**Critical (Fix before launch):**
- [ ] Issue 1
- [ ] Issue 2

**High Priority (Fix within 1 week):**
- [ ] Issue 3
- [ ] Issue 4

**Medium Priority (Backlog):**
- [ ] Issue 5

---

## Tester Sign-Off

**Tester Name**: ________________________
**Date**: ________________________
**Time Spent**: ________________________
**Overall Assessment**: 🟢 PASS | 🟡 ISSUES | 🔴 BROKEN

**Notes**:
```
[Any additional observations or recommendations]
```

---

## Version History

| Date | Tester | Status | Notes |
|------|--------|--------|-------|
| YYYY-MM-DD | Name | 🟢 PASS | Initial test |
| | | | |

