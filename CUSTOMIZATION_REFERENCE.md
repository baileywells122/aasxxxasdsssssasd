# Portfolio Customization Reference

## 🎯 Quick Find & Replace Guide

Use Ctrl+H in VS Code to find and replace all instances:

### Your Information

| Find | Replace With |
|------|--------------|
| `John Doe` | Your Name |
| `john@example.com` | Your Email |
| `+1 (234) 567-890` | Your Phone |
| `San Francisco, CA` | Your Location |
| `Software Developer` | Your Title |

### Hero Section Customizations

**Typing Animation Words** (in `script.js`, line ~70):
```javascript
const words = [
    'Full-Stack Developer',
    'UI/UX Designer', 
    'Problem Solver',
    'Tech Enthusiast'
];
```
Replace with your own roles/titles.

**Buttons**:
```html
<a href="#projects" class="btn btn-primary">View My Work</a>
<a href="#contact" class="btn btn-secondary">Get In Touch</a>
```
Customize button text as needed.

**Social Links**:
```html
<a href="#" class="social-icon" title="GitHub"><i class="fab fa-github"></i></a>
<a href="#" class="social-icon" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
<a href="#" class="social-icon" title="Twitter"><i class="fab fa-twitter"></i></a>
<a href="#" class="social-icon" title="Email"><i class="fas fa-envelope"></i></a>
```
Update `href="#"` with your actual social media URLs.

---

## 🎨 Color Customization

All colors are in `style.css` at the top:

```css
:root {
    --primary-color: #6366f1;        /* Main brand color */
    --secondary-color: #8b5cf6;      /* Gradient/accent */
    --accent-color: #ec4899;         /* Special highlights */
    --text-primary: #1e293b;         /* Main text color */
    --text-secondary: #64748b;       /* Secondary text */
}
```

**For Dark Mode**, modify:
```css
body.dark-mode {
    --text-primary: #f1f5f9;         /* Light text for dark bg */
    --text-secondary: #cbd5e1;       /* Light secondary text */
}
```

---

## 📝 Content Sections

### About Section
File: `index.html` (Search for "About Me")
- Update description paragraphs
- Modify skill items in the grid
- Change skill icons (use Font Awesome)

**Icon Codes** (replace the icon):
- `fa-code` → Code
- `fa-paint-brush` → Design
- `fa-database` → Databases
- `fa-mobile-alt` → Mobile
- `fa-cloud` → Cloud
- `fa-bug` → Debugging

### Services Section
File: `index.html` (Search for "Services")
- Change service titles
- Update descriptions
- Modify icons

### Projects Section
File: `index.html` (Search for "Featured Projects")

For each project, update:
```html
<div class="project-card">
    <div class="project-image">
        <img src="IMAGE_URL" alt="Project Name">
        <!-- Project overlay with links -->
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Description of your project...</p>
        <div class="project-tags">
            <span class="tag">Technology1</span>
            <span class="tag">Technology2</span>
        </div>
    </div>
</div>
```

### Testimonials Section
File: `index.html` (Search for "What Clients Say")

Update per testimonial:
```html
<div class="testimonial-card">
    <div class="stars">
        <i class="fas fa-star"></i> <!-- Repeat 5 times -->
    </div>
    <p class="testimonial-text">"Your testimonial text here..."</p>
    <div class="testimonial-author">
        <img src="CLIENT_PHOTO_URL" alt="Name">
        <div>
            <h4>Client Name</h4>
            <p>Client Title, Company</p>
        </div>
    </div>
</div>
```

### Blog Section
File: `index.html` (Search for "Latest Articles")

For each blog post:
```html
<article class="blog-card">
    <div class="blog-image">
        <img src="ARTICLE_IMAGE_URL" alt="Article Title">
        <div class="blog-category">Category</div>
    </div>
    <div class="blog-content">
        <div class="blog-meta">
            <span class="blog-date"><i class="fas fa-calendar"></i> Mon DD, YYYY</span>
            <span class="blog-author"><i class="fas fa-user"></i> Your Name</span>
        </div>
        <h3>Article Title</h3>
        <p>Article description/excerpt...</p>
        <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
    </div>
</article>
```

### Contact Section
File: `index.html` (Search for "Get In Touch")

Update contact info:
```html
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-map-marker-alt"></i>
    </div>
    <div class="contact-details">
        <h3>Location</h3>
        <p>Your City, State</p>
    </div>
</div>
```

---

## 🔗 Navigation Menu

In `index.html`, update the navigation:
```html
<li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
<li class="nav-item"><a href="#about" class="nav-link">About</a></li>
<li class="nav-item"><a href="#services" class="nav-link">Services</a></li>
<li class="nav-item"><a href="#projects" class="nav-link">Projects</a></li>
<li class="nav-item"><a href="#testimonials" class="nav-link">Testimonials</a></li>
<li class="nav-item"><a href="#blog" class="nav-link">Blog</a></li>
<li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>
```

The `href` must match the section `id` attributes.

---

## 📱 Responsive Breakpoints

In `style.css`, media queries are set at:
- **Tablet/Mobile**: `@media (max-width: 768px)`
- **Small Mobile**: `@media (max-width: 480px)`

Adjust these values to match your design needs.

---

## 🎬 Animation Classes

In CSS, available animations:
- `fadeIn` - Fades in element
- `fadeInDown` - Fades in from top
- `fadeInUp` - Fades in from bottom
- `slideInLeft` - Slides in from left
- `slideInRight` - Slides in from right
- `float` - Floating animation
- `glow` - Glowing effect
- `pulse` - Pulsing effect
- `typing` - Typing animation
- `scrollDown` - Scroll indicator

Usage in HTML:
```html
<div class="fade-in">This fades in</div>
<div class="slide-in-left">This slides in from left</div>
```

---

## 🎯 Footer Customization

File: `index.html`, search for "Footer"

```html
<footer class="footer">
    <div class="footer-content">
        <p>&copy; 2024 Your Name. All rights reserved.</p>
        <div class="footer-social">
            <a href="https://github.com/yourname" class="footer-social-link">
                <i class="fab fa-github"></i>
            </a>
            <!-- Add more social links -->
        </div>
    </div>
</footer>
```

---

## 🔤 Font & Typography

Default font stack in `style.css`:
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

To use Google Fonts, add to HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Then in CSS:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

---

## 🖼️ Image Size Recommendations

| Image Type | Recommended Size |
|-----------|-----------------|
| Hero Profile | 400x400 px |
| About Section | 500x500 px |
| Project Card | 600x400 px |
| Blog Featured | 600x400 px |
| Testimonial Avatar | 100x100 px |
| Service Icon | Any (icon font) |

---

## 🔗 Icon Resources

Use Font Awesome icons (already included):

Common icons:
- `fa-code` - Code
- `fa-pencil` - Writing
- `fa-palette` - Design
- `fa-rocket` - Launch
- `fa-star` - Star
- `fa-heart` - Like
- `fa-github` - GitHub
- `fa-linkedin` - LinkedIn
- `fa-twitter` - Twitter
- `fa-envelope` - Email
- `fa-phone` - Phone
- `fa-map-marker-alt` - Location

Find more at: https://fontawesome.com/icons

---

## 📊 CSS Variables Quick Reference

```css
/* All customizable CSS variables */
--primary-color: #6366f1;           /* Main accent color */
--secondary-color: #8b5cf6;         /* Gradient secondary */
--accent-color: #ec4899;            /* Highlight color */
--dark-bg: #0f172a;                 /* Dark mode background */
--light-bg: #f8fafc;                /* Light mode background */
--text-primary: #1e293b;            /* Main text color */
--text-secondary: #64748b;          /* Secondary text color */
--border-color: #e2e8f0;            /* Border color */
--transition: all 0.3s ease;        /* Animation duration */
--shadow: 0 10px 40px ...;          /* Light shadow */
--shadow-lg: 0 20px 60px ...;       /* Heavy shadow */
```

---

## 🎉 Last Reminders

1. **Always backup** your work before making changes
2. **Test responsively** - Check mobile view
3. **Use browser DevTools** (F12) to debug
4. **Clear cache** if changes don't appear (Ctrl+Shift+Delete)
5. **Keep it updated** - Add new projects regularly
6. **Get feedback** - Show it to others before launching

---

**Happy customizing! Make it uniquely yours! 🚀**
