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

            // Add the fragment table if a fragment exists
            const fragmentTable = parsedUrl.fragment
              ? `
# Fragment

| Fragment Value |
|----------------|
| ${parsedUrl.fragment} |
`
              : "";

            const markdownContent =
              formattedOutput + parametersTable + fragmentTable;

            // Append the Markdown content to the active editor
            const edit = new vscode.WorkspaceEdit();
            const lastLine = document.lineAt(document.lineCount - 1);
            const position = lastLine.range.end; // Position at the end of the document
            edit.insert(document.uri, position, `\n\n${markdownContent}`);

            await vscode.workspace.applyEdit(edit);

            vscode.window.showInformationMessage(
              "URL formatted successfully! Markdown content appended to the active editor."
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
