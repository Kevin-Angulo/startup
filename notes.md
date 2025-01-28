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

PENDING

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
