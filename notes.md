# CS 260 Notes

[My startup - Simon](https://startup.pro-dash-link.click)

## AWS

My IP address is: 3.223.76.217

# HTML Notes

## Basic Structure
```html
<!DOCTYPE html>
<html>
<head>
    <title>My HTML Page</title>
</head>
<body>

    <header>
        <h1>Welcome to My Page</h1>
    </header>

    <nav>
        <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section id="about">
            <h2>About Us</h2>
            <p>This is the about section of our website.</p>
        </section>

        <hr>

        <section id="services">
            <h2>Our Services</h2>
            <ul>
                <li>Web Development</li>
                <li>SEO Optimization</li>
                <li>Graphic Design</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 My Website. All Rights Reserved.</p>
    </footer>

</body>
</html>
```

## Tag Overview

- **`<head>`** → Metadata (title, styles, scripts, etc.).
- **`<body>`** → Contains all the visible content.
- **`<header>`** → Main top section
- **`<nav>`** → Navigation bar (menu items)
- **`<main>`** → Main content after **`<body>`**
- **`<section>`** → A section (easy)
- **`<ul>`** → Unordered list
- **`<li>`** → List item (inside of `<ul>` or `<ol>`).
- **`<a>`** →  Hyperlinks (`href="URL"`).
- **`<hr>`** → Horizantal Line
- **`<footer>`** → Bottom section of website
- **`<p>`** → Paragraph Text (small text)
- **`<h1>` to `<h6>`** → Heading tags, `<h1>` is the largest, `<h6>` is the smallest.
- **`<dvi>`** → Sort of like a section.

## CSS

1. **Tailwind & DaisyUI Setup**  
   - Included Tailwind CDN and DaisyUI for additional pre-styled components.

2. **Responsive Layouts**  
   - Used `max-sm`, `max-md` for mobile-friendly adjustments.

3. **Theming with DaisyUI**  
   - Applied `data-theme="cupcake"` for a predefined color scheme.

4. **Navigation Bar Styling**  
   - Used `flex justify-between items-center bg-base-300 px-10 py-5` for structured spacing.

5. **Cards & UI Components**  
   - Implemented DaisyUI’s `card` component for feedback posts and dashboards.

6. **Form Styling**  
   - Used `input input-bordered` for uniform input fields.

7. **Buttons & Interactive Elements**  
   - Styled with `btn btn-primary`, `btn-outline`, and `btn-sm` for user actions.

8. **Typography Adjustments**  
   - Applied `text-4xl font-bold` for titles and `text-sm font-light` for minor text.

9. **Grid & Flexbox Layouts**  
   - Used `grid grid-cols-3` and `flex justify-between` for consistent positioning.

10. **Hover & Interactive Effects**  
   - Implemented `hover:text-primary` for smooth transitions on links/buttons.

---

## React Part 1: Routing

PENDING

## React Part 2: Reactivity

PENDING

### Important Commands:
Deploy to simon (SubDomain)
```sh
./deployFiles.sh -k ~/Documents/kevin/byu/2025/CS-260/production.pem -h pro-dash-link.click -s simon
```

Deploy to startup (SubDomain)
```sh
./deployFiles.sh -k ~/Documents/kevin/byu/2025/CS-260/production.pem -h pro-dash-link.click -s startup
```
