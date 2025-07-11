# Online Diff Checker

A modern, web-based diff checker tool built with React, Vite, and Tailwind CSS. Compare two text inputs and visualize the differences with syntax highlighting.

## Features

- **Real-time diff comparison** - Compare two text inputs instantly
- **Word-level diffing** - See exactly which words have changed
- **Syntax highlighting** - Added text is highlighted in green, removed text in red
- **Responsive design** - Works on desktop and mobile devices
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **No server required** - Runs entirely in the browser

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **jsdiff** - JavaScript diff library for text comparison

## Getting Started

### Option 1: Docker (Recommended)

#### Prerequisites
- Docker and Docker Compose installed on your system

#### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd online-diff-checker
```

2. Build and run with Docker Compose:
```bash
docker-compose up --build
```

3. Open your browser and navigate to `http://localhost:3000`

#### Docker Commands

- **Start the application**: `docker-compose up`
- **Build and start**: `docker-compose up --build`
- **Stop the application**: `docker-compose down`
- **View logs**: `docker-compose logs -f`

### Option 2: Local Development

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

#### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd online-diff-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter your original text in the left textarea
2. Enter your modified text in the right textarea
3. Click the "Compare" button to see the differences
4. Use the "Clear All" button to reset both textareas

## Project Structure

```
online-diff-checker/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── EditorPane.jsx  # Text input components
│   │   └── DiffOutput.jsx  # Diff result display
│   ├── utils/
│   │   └── diffUtils.js    # Diff generation utilities
│   ├── App.jsx             # Main application component
│   ├── index.css           # Tailwind CSS styles
│   └── main.jsx            # Application entry point
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [jsdiff](https://github.com/kpdecker/jsdiff) - JavaScript diff library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling 