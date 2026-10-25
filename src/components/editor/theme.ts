import type { editor } from "monaco-editor";

export const wasTheme: editor.IStandaloneThemeData = {
  base: "vs",
  colors: {
    "editor.background": "#F5EEDC",
    "editor.findMatchBackground": "#FF790066",
    "editor.findMatchHighlightBackground": "#E8B75D55",
    "editor.foreground": "#40352F",
    "editor.inactiveSelectionBackground": "#E8B75D33",
    "editor.lineHighlightBackground": "#EDE2CC",
    "editor.lineHighlightBorder": "#00000000",
    "editor.selectionBackground": "#E8B75D66",
    "editor.selectionHighlightBackground": "#FF790026",
    "editorBracketMatch.background": "#FF790022",
    "editorBracketMatch.border": "#FF7900",
    "editorCursor.foreground": "#FF7900",
    "editorError.foreground": "#C43E35",
    "editorHoverWidget.background": "#F5EEDC",
    "editorHoverWidget.border": "#D9CAB2",
    "editorHoverWidget.foreground": "#40352F",
    "editorIndentGuide.activeBackground1": "#FF7900",
    "editorIndentGuide.background1": "#D9CAB2",
    "editorInfo.foreground": "#397C89",
    "editorLineNumber.activeForeground": "#C75D00",
    "editorLineNumber.foreground": "#A99B88",
    "editorSuggestWidget.background": "#F5EEDC",
    "editorSuggestWidget.border": "#D9CAB2",
    "editorSuggestWidget.foreground": "#40352F",
    "editorSuggestWidget.highlightForeground": "#C75D00",
    "editorSuggestWidget.selectedBackground": "#EDE2CC",
    "editorWarning.foreground": "#B77B16",
    "editorWidget.background": "#F5EEDC",
    "editorWidget.border": "#D9CAB2",
    "editorWidget.foreground": "#40352F",
    "minimap.background": "#F5EEDC",
    "scrollbarSlider.activeBackground": "#A99B88AA",
    "scrollbarSlider.background": "#A99B8855",
    "scrollbarSlider.hoverBackground": "#A99B8888",
  },
  inherit: true,
  rules: [
    { foreground: "40352F", token: "" },

    { fontStyle: "bold", foreground: "C75D00", token: "keyword" },
    { fontStyle: "bold", foreground: "B54D00", token: "keyword.control" },
    { foreground: "9A551B", token: "keyword.operator" },

    { foreground: "397C89", token: "type" },
    { foreground: "397C89", token: "type.identifier" },

    { foreground: "A14C13", token: "function" },
    { foreground: "A14C13", token: "function.call" },

    { foreground: "40352F", token: "variable" },
    { foreground: "755C49", token: "parameter" },

    { foreground: "397A51", token: "string" },
    { foreground: "277F7B", token: "string.escape" },

    { foreground: "8963A9", token: "number" },
    { foreground: "8963A9", token: "number.float" },

    { foreground: "8963A9", token: "constant" },
    { foreground: "8963A9", token: "constant.language" },

    { fontStyle: "italic", foreground: "948779", token: "comment" },

    { foreground: "9A551B", token: "operator" },
    { foreground: "806A56", token: "delimiter" },
    { foreground: "806A56", token: "delimiter.bracket" },

    { fontStyle: "underline", foreground: "C43E35", token: "invalid" },
  ],
};
