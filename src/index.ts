import * as vscode from "vscode";
import { parseUrl } from "./utils/urlParser";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vscode-url-formatter.formatUrl",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const text = document.getText();

        // Check if the text is a single line and contains a URL
        const urlRegex = /^(https?:\/\/[^\s]+)/;
        const match = text.match(urlRegex);

        if (match) {
          const url = match[0];
          try {
            const parsedUrl = parseUrl(url);

            // Format the main URL components
            const formattedOutput = `
# URL Components

| Component   | Value                     |
|-------------|---------------------------|
| Protocol    | ${parsedUrl.protocol}     |
| Hostname    | ${parsedUrl.hostname}     |
| Domain      | ${parsedUrl.domain}       |
| Path        | ${parsedUrl.path}         |

# Query Parameters

| Key           | Value                     |
|---------------|---------------------------|
`;

            // Format the query parameters into a separate table
            let parametersTable = "";
            for (const [key, value] of Object.entries(parsedUrl.parameters)) {
              parametersTable += `| ${key} | ${value} |\n`;
            }

            const markdownContent = formattedOutput + parametersTable;

            // Create a new untitled file and populate it with the Markdown content
            const newDocument = await vscode.workspace.openTextDocument({
              content: markdownContent,
              language: "markdown",
            });
            await vscode.window.showTextDocument(newDocument);

            vscode.window.showInformationMessage(
              "URL formatted successfully! Markdown content opened in a new untitled file."
            );
          } catch (error) {
            vscode.window.showErrorMessage((error as Error).message);
          }
        } else {
          vscode.window.showErrorMessage(
            "No valid URL found in the active editor."
          );
        }
      } else {
        vscode.window.showErrorMessage("No active editor found.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
