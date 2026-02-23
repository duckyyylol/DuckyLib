<script lang="ts">
    import { browser } from "$app/environment";
    import { getTheme } from "../../index.ts";
    import { compile } from "mdsvex";
    import { createHighlighter } from "shiki";

    let { content } = $props();

    async function getHighlighter() {
        return await createHighlighter({
            langs: ["javascript", "diff", "text", "ts", "typescript"],
            themes: ["catppuccin-mocha", "catppuccin-latte", "ayu-light"],
        });
    }

    let systemMode = browser
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        : "dark";
    let theme = $state(getTheme());
</script>

<div>
    {#await compile( content, { highlight: { optimise: false, highlighter: async (code, lang = "text") => (await getHighlighter()).codeToHtml( code, { lang: `${lang}`, theme: (theme === "system" ? systemMode : theme) === "dark" ? "catppuccin-mocha" : "catppuccin-latte" }, ) } }, )}
        <h3 class="font-semibold">Loading Content...</h3>
    {:then h}
        {@html h?.code}
    {/await}
</div>

<style>
    @import url("../../styles/globals.css");

    div {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        gap: auto;
    }
    div :global {
        * {
            font-family: "Noto Sans", sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-bottom: 0.1em;
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
        }

        hr {
            margin-left: 0;
            margin-right: auto;
            width: 100%;
            height: 3px;
            border: none;
            background-color: var(--surface-0);
            opacity: 0.7;
        }

        img {
            min-width: 200px;
            max-width: 720px;
            width: auto;
        }

        a {
            color: var(--accent) !important;
        }

        code {
            background-color: var(--mantle);
            /* background-blend-mode: lighten; */
            padding: 0em 0.66em;
            border-radius: 8px;
            border: 3px solid var(--crust);
            font-family: "Noto Sans Mono", monospace;

            font-size: 0.93em;
        }

        .shiki {
            background-color: var(--mantle) !important;
            padding: 0.66em;
            border-radius: 8px;
            border: 3px solid var(--crust);

            display: flex;
            flex-direction: column;
        }

        .shiki code {
            background-color: transparent !important;
            border: none;
            margin: 0;
        }

        .shiki .line {
            margin: 0;
            line-height: 1.66em;
        }

        .shiki span {
            font-family: "Noto Sans Mono", monospace;
        }

        .shiki span::selection {
            color: var(--text);
        }

        blockquote {
            /* min-height: 40px; */
            margin-top: 0.33em;
            height: fit-content;
            margin-left: 0.1em;
            padding-top: 0.33em;
            padding-bottom: 0.33em;
            display: flex;
            flex-direction: column;

            align-items: flex-start;
            justify-content: space-between;

            border-left: 3px solid var(--accent);
            border-radius: var(--border-sm);
            padding-left: 1em;

            gap: 0.66em;
        }

        li ul {
            margin-left: -1.33em;
        }

        sup {
            font-size: 0.8em;
        }

        ul {
            margin-left: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            gap: 0.33em;
            margin-top: 0.33em;
        }

        ol {
            margin-left: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            gap: 0.33em;
            margin-top: 0.33em;
        }

        li {
            min-height: 20px;
            margin-left: 0;
        }

        table {
            max-width: 500px;
            border-collapse: collapse;
        }

        td {
            border: 2px solid var(--crust);
            border-collapse: collapse;
            text-align: left;
            padding: 0.33em 1em;
            font-size: 1em;
            width: 100%;
            text-wrap: nowrap;
        }

        td img {
            width: 125px;
            max-width: 125px;
        }

        th {
            padding: 0.33em 1em;
            text-align: center;
            border: 2px solid var(--crust);
            border-collapse: collapse;
            font-size: 1.1em;
        }
    }
</style>
