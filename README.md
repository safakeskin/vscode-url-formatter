# URL Formatter Extension

This is a Visual Studio Code extension that formats URLs into a structured table format. It extracts components such as protocol, hostname, domain, path, and parameters from a given URL.

## Features

- Parses URLs with `http` or `https` protocols.
- Formats the parsed URL components into a readable table (in Markdown).
- Works with unsaved files in the editor.

## Working with the Extension

1. Clone the repository:

   ```
   git clone https://github.com/safakeskin/vscode-url-formatter.git
   ```

2. Navigate to the project directory:

   ```
   cd vscode-url-formatter
   ```

3. Install the dependencies:

   ```
   yarn
   ```

4. Open the project in Visual Studio Code:
   ```
   code .
   ```

## Usage

1. Open a new unsaved file in the editor.
2. Enter a URL in a single line (must start with `http` or `https`).
3. Run the command `Format URL` from the command palette (Ctrl+Shift+P).
4. The formatted URL components will be displayed as a table in Markdown in a new untitled file.
   - You can preview the Markdown content immediately in the editor and decide whether to save it.
   - You can preview the Markdown using VS Code's built-in Markdown preview (Cmd+K V on Mac).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
