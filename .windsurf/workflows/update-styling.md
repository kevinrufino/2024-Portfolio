---
description: Update component styling while maintaining design system consistency
---

# Update Styling Workflow

This workflow helps AI agents update component styling while maintaining design system consistency and best practices.

## When to Use

Use this workflow when you need to:
- Update existing component styles
- Fix responsive design issues
- Improve visual appearance
- Add new interactive states
- Optimize styling performance

## Steps

1. **Analyze Current Styling**
   - Review existing Tailwind classes
   - Identify design system patterns
   - Check responsive breakpoints
   - Note any custom CSS or inline styles

2. **Understand Design Requirements**
   - Review design mockups or requirements
   - Identify color scheme changes
   - Determine spacing and layout needs
   - Consider accessibility implications

3. **Plan Styling Changes**
   - Choose appropriate Tailwind utilities
   - Plan responsive design approach
   - Consider animation and transitions
   - Plan hover and interactive states

4. **Implement Styling Updates**
   - Apply Tailwind utility classes
   - Maintain consistent spacing patterns
   - Use established color variables
   - Add smooth transitions

5. **Test Responsive Design**
   - Test on mobile devices
   - Test on tablet screens
   - Test on desktop screens
   - Verify accessibility

6. **Validate Changes**
   - Ensure no visual regressions
   - Check performance impact
   - Verify accessibility compliance
   - Test cross-browser compatibility

## Design System Guidelines

### Color Palette
```javascript
const colors = {
  primary: '#F1F43B',    // Yellow
  secondary: '#3e3bf4',  // Blue
  background: '#F1F43B',  // Yellow background
  text: '#3e3bf4',       // Blue text
};
```

### Spacing Scale
- Use Tailwind's default spacing scale (4px base unit)
- Maintain consistent padding and margins
- Use responsive spacing utilities

### Typography
- Follow established font hierarchy
- Use responsive text sizing
- Maintain consistent line heights

## Common Styling Patterns

### Component Container
```javascript
<div className="
  w-full 
  max-w-7xl 
  mx-auto 
  px-4 
  sm:px-6 
  lg:px-8
">
  {/* Content */}
</div>
```

### Button Styles
```javascript
<button className="
  px-6 
  py-3 
  bg-blue-500 
  text-white 
  rounded-lg 
  font-semibold
  transition-colors
  duration-200
  hover:bg-blue-600
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
">
  Button Text
</button>
```

### Card Component
```javascript
<div className="
  bg-white 
  rounded-lg 
  shadow-lg 
  p-6 
  border 
  border-gray-200
  hover:shadow-xl
  transition-shadow
  duration-200
">
  {/* Card content */}
</div>
```

## Responsive Design Patterns

### Mobile-First Approach
```javascript
<div className="
  w-full           // Mobile: full width
  md:w-1/2        // Tablet: half width
  lg:w-1/3        // Desktop: third width
">
  Content
</div>
```

### Responsive Typography
```javascript
<h1 className="
  text-2xl         // Mobile: 1.5rem
  md:text-3xl      // Tablet: 1.875rem
  lg:text-4xl      // Desktop: 2.25rem
  font-bold
">
  Heading
</h1>
```

### Responsive Spacing
```javascript
<div className="
  p-4             // Mobile: 1rem
  md:p-6          // Tablet: 1.5rem
  lg:p-8          // Desktop: 2rem
">
  Content
</div>
```

## Animation and Transitions

### Hover Effects
```javascript
<div className="
  transform
  transition-transform
  duration-200
  hover:scale-105
">
  Content
</div>
```

### Color Transitions
```javascript
<button className="
  bg-blue-500
  text-white
  transition-colors
  duration-300
  hover:bg-blue-600
  focus:bg-blue-700
">
  Button
</button>
```

### Fade In Animation
```javascript
<div className="
  opacity-0
  animate-fade-in
  transition-opacity
  duration-500
">
  Content
</div>
```

## Accessibility Styling

### Focus States
```javascript
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
">
  Accessible Button
</button>
```

### Screen Reader Support
```javascript
<div className="sr-only">
  Content only for screen readers
</div>
```

### High Contrast Support
```javascript
<div className="
  text-gray-900
  bg-white
  dark:text-white
  dark:bg-gray-900
">
  Content
</div>
```

## Performance Optimization

### CSS Optimization
- Use Tailwind's JIT compiler
- Purge unused CSS classes
- Minimize custom CSS
- Use efficient selectors

### Animation Performance
```javascript
// Use transform and opacity for better performance
<div className="
  transform
  opacity-100
  transition-all
  duration-200
  ease-out
">
  Content
</div>
```

## Quality Checklist

### Visual Design
- [ ] Consistent with design system
- [ ] Proper color usage
- [ ] Appropriate spacing
- [ ] Good visual hierarchy
- [ ] Consistent typography

### Responsive Design
- [ ] Works on mobile devices
- [ ] Works on tablet screens
- [ ] Works on desktop screens
- [ ] Proper breakpoints
- [ ] Flexible layouts

### Interactivity
- [ ] Hover states defined
- [ ] Focus states accessible
- [ ] Smooth transitions
- [ ] Loading states
- [ ] Error states

### Accessibility
- [ ] Sufficient color contrast
- [ ] Focus indicators visible
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] ARIA attributes correct

### Performance
- [ ] Efficient CSS usage
- [ ] Optimized animations
- [ ] Minimal layout shifts
- [ ] Fast rendering
- [ ] Small bundle impact

## Common Issues and Solutions

### Layout Shifts
```javascript
// Use aspect ratio to prevent layout shifts
<div className="aspect-w-16 aspect-h-9">
  <img src="image.jpg" alt="Description" />
</div>
```

### Z-index Management
```javascript
// Use consistent z-index scale
<div className="z-10">  // Low priority
<div className="z-20">  // Medium priority
<div className="z-30">  // High priority
<div className="z-50">  // Modals and overlays
```

### Overflow Handling
```javascript
<div className="
  overflow-hidden
  truncate
">
  Long text that might overflow
</div>
```

## Testing Guidelines

### Visual Testing
- Test in different browsers
- Test on various devices
- Check color accuracy
- Verify font rendering

### Responsive Testing
- Use browser dev tools
- Test actual devices
- Check orientation changes
- Verify touch interactions

### Accessibility Testing
- Use screen readers
- Test keyboard navigation
- Check color contrast
- Verify focus management

## Integration with Components

### Updating Existing Components
1. Review current implementation
2. Identify styling conflicts
3. Apply changes incrementally
4. Test thoroughly
5. Update documentation

### Creating New Components
1. Follow design system patterns
2. Use established utilities
3. Include responsive design
4. Add accessibility features
5. Document usage examples
