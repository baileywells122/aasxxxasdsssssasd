# Quick Start Guide

## 🚀 Get Your Portfolio Running in 2 Minutes

### Step 1: Open Your Portfolio
1. Navigate to the portfolio folder
2. Double-click `index.html` 
3. Your portfolio opens in your browser!

---

## ⚙️ Customization Checklist

### Immediate Changes (5 minutes)
- [ ] **Your Name**: Replace "bailey" in `index.html` (multiple places)
- [ ] **Title**: Update browser title and hero section
- [ ] **Email**: Change contact email in footer and contact section
- [ ] **Phone**: Update phone number in contact section
- [ ] **Location**: Change city/location in contact section
- [ ] **Typing Animation**: Edit in `script.js` line ~70:
  ```javascript
  const words = ['Your Role 1', 'Your Role 2', 'Your Role 3'];
  ```

### Add Your Projects (10 minutes)
In `index.html`, find "Featured Projects" section and:
1. Replace image URLs with your project screenshots
2. Update project titles
3. Update descriptions
4. Change technology tags
5. Add your actual project links

### Add Your Testimonials (10 minutes)
In `index.html`, find "What Clients Say" section:
1. Replace client names and titles
2. Update testimonial text with real quotes
3. Change client photos
4. Add your client/colleague information

### Add Blog Posts (5 minutes each)
In `index.html`, find "Latest Articles" section:
1. Copy a blog-card block
2. Update article image
3. Change title and description
4. Update date and category
5. Add article link

### Customize Colors (2 minutes)
Open `style.css` and modify at the top:
```css
--primary-color: #6366f1;      /* Main color */
--secondary-color: #8b5cf6;    /* Gradient color */
--accent-color: #ec4899;       /* Highlight color */
```

---

## 🌙 Features to Try

1. **Dark Mode** - Click the moon icon in navigation
2. **Smooth Scrolling** - Click any nav link
3. **Responsive Design** - Resize your browser to see mobile view
4. **Typing Animation** - Watch the hero section
5. **Hover Effects** - Hover over projects, services, cards
6. **Contact Form** - Try submitting (shows success message)

---

## 🎨 File Structure

```
portfolio/
├── index.html           (Main file - edit content here)
├── style.css           (All styling - edit colors, layouts here)
├── script.js           (All interactivity - edit behaviors here)
├── assets/
│   └── images/         (Put your images here)
├── README.md           (Features documentation)
├── DEPLOYMENT_GUIDE.md (How to deploy online)
└── QUICK_START.md      (This file)
```

---

## 🔧 Common Edits

### Change a Section Title
Find in `index.html`:
```html
<h2>Featured Projects</h2>
```
Change to:
```html
<h2>My Amazing Work</h2>
```

### Add a New Social Link
Find in `index.html` hero section:
```html
<a href="#" class="social-icon" title="GitHub">
    <i class="fab fa-github"></i>
</a>
```
Replace `#` with your actual URL and change icon from `fa-github` to another icon from [Font Awesome](https://fontawesome.com/icons)

### Change Button Text
Find and replace button text:
```html
<a href="#" class="btn btn-primary">VIEW PROJECTS</a>
```

---

## 📸 Adding Images

### Option 1: Use URLs (Easiest)
Use free images from:
- **Unsplash**: `https://images.unsplash.com/...`
- **Pexels**: `https://images.pexels.com/...`

### Option 2: Upload Your Own
1. Take/collect your images
2. Resize them (use 600x400 for projects, 400x400 for profile)
3. Save to `assets/images/`
4. Use in HTML:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

---

## ✅ Testing Checklist

Before sharing your portfolio:
- [ ] All your information is correct
- [ ] No placeholder text remains
- [ ] Images load correctly
- [ ] All links work
- [ ] Contact form displays
- [ ] Mobile view looks good
- [ ] Dark mode works
- [ ] Navigation is smooth
- [ ] No console errors (F12 to check)

---

## 🚀 When Ready to Deploy

1. Read `DEPLOYMENT_GUIDE.md`
2. Choose a hosting provider (GitHub Pages is easiest)
3. Upload your files
4. Share your portfolio URL!

---

## 💡 Pro Tips

1. **Use real profile photo** - This makes a big difference!
2. **Keep content updated** - Add new projects regularly
3. **Get feedback** - Ask friends to review before launching
4. **Link from resume** - Include portfolio URL on your resume
5. **Share on social media** - Post your launch!

---

## ❓ Need Help?

### Portfolio won't load?
- Make sure all files are in the same folder
- Try opening in a different browser
- Check you're opening `index.html`

### Images not showing?
- Check the file path is correct
- Make sure image file exists
- Use web browser's developer tools (F12) to see errors

### Something not working?
- Check browser console (F12 → Console)
- Look for error messages
- Try clearing browser cache (Ctrl+Shift+Delete)

---

## 📚 Next Steps

1. ✅ Customize your portfolio
2. ✅ Test everything works
3. ✅ Deploy to the web
4. ✅ Share with your network
5. ✅ Keep updating with new projects

---

**Your portfolio is ready! Start customizing now! 🎉**
