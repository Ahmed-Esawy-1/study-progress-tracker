# StudyProgressTracker

An Angular application for tracking study progress.

This project was generated using [Angular CLI](https://angular.dev/tools/cli) version **21.2.21**.

## Prerequisites

Make sure you have **Node.js** and **npm** installed.

## Installation

After cloning the project, install the required dependencies:

```bash
npm install
```

## Groq API Key

Before running the application, add your **Groq API key** to:

```text
src/app/services/chat-widget.ts
```

Find the API key configuration and add your key:

```ts
const apiValue = 'your_groq_api_key_here';
```

> **Important:** Do not commit or push your API key to GitHub. The key is sensitive and should remain private.

## Development Server

After installing the dependencies and configuring your Groq API key, start the development server:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

```text
http://localhost:4200/
```

The application automatically reloads whenever you modify the source files.

## Additional Resources

* [Angular Documentation](https://angular.dev/)
* [Angular CLI Documentation](https://angular.dev/tools/cli)
* [Groq Documentation](https://console.groq.com/docs)
