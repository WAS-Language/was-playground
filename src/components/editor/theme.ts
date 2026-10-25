import type { editor } from "monaco-editor";

export const wasTheme: editor.IStandaloneThemeData = {
  base: "vs",
  inherit: true,

  rules: [
    { token: "", foreground: "40352F" },

    { token: "keyword", foreground: "C75D00", fontStyle: "bold" },
    { token: "keyword.control", foreground: "B54D00", fontStyle: "bold" },
    { token: "keyword.operator", foreground: "9A551B" },

    { token: "type", foreground: "397C89" },
    { token: "type.identifier", foreground: "397C89" },

    { token: "function", foreground: "A14C13" },
    { token: "function.call", foreground: "A14C13" },

    { token: "variable", foreground: "40352F" },
    { token: "parameter", foreground: "755C49" },

    { token: "string", foreground: "397A51" },
    { token: "string.escape", foreground: "277F7B" },

    { token: "number", foreground: "8963A9" },
    { token: "number.float", foreground: "8963A9" },

    { token: "constant", foreground: "8963A9" },
    { token: "constant.language", foreground: "8963A9" },

    { token: "comment", foreground: "948779", fontStyle: "italic" },

    { token: "operator", foreground: "9A551B" },
    { token: "delimiter", foreground: "806A56" },
    { token: "delimiter.bracket", foreground: "806A56" },

    { token: "invalid", foreground: "C43E35", fontStyle: "underline" },
  ],

  colors: {
    "editor.background": "#F5EEDC",
    "editor.foreground": "#40352F",

    "editorCursor.foreground": "#FF7900",
    "editor.selectionBackground": "#E8B75D66",
    "editor.inactiveSelectionBackground": "#E8B75D33",
    "editor.selectionHighlightBackground": "#FF790026",

    "editor.lineHighlightBackground": "#EDE2CC",
    "editor.lineHighlightBorder": "#00000000",
    "editorLineNumber.foreground": "#A99B88",
    "editorLineNumber.activeForeground": "#C75D00",

    "editorIndentGuide.background1": "#D9CAB2",
    "editorIndentGuide.activeBackground1": "#FF7900",

    "editorBracketMatch.background": "#FF790022",
    "editorBracketMatch.border": "#FF7900",

    "editor.findMatchBackground": "#FF790066",
    "editor.findMatchHighlightBackground": "#E8B75D55",

    "editorWidget.background": "#F5EEDC",
    "editorWidget.foreground": "#40352F",
    "editorWidget.border": "#D9CAB2",

    "editorSuggestWidget.background": "#F5EEDC",
    "editorSuggestWidget.foreground": "#40352F",
    "editorSuggestWidget.border": "#D9CAB2",
    "editorSuggestWidget.selectedBackground": "#EDE2CC",
    "editorSuggestWidget.highlightForeground": "#C75D00",

    "editorHoverWidget.background": "#F5EEDC",
    "editorHoverWidget.foreground": "#40352F",
    "editorHoverWidget.border": "#D9CAB2",

    "scrollbarSlider.background": "#A99B8855",
    "scrollbarSlider.hoverBackground": "#A99B8888",
    "scrollbarSlider.activeBackground": "#A99B88AA",

    "minimap.background": "#F5EEDC",

    "editorError.foreground": "#C43E35",
    "editorWarning.foreground": "#B77B16",
    "editorInfo.foreground": "#397C89",
  },
};
