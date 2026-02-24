<script lang="ts">
    import Markdown from "./Markdown.svelte";

    interface CodeBlockProps {
        content: string[];
        language: "ts" | "js" | "diff" | "txt" | "svelte";

        widthPx?: number | "fill" | "fit";
        heightPx?: number | "fill" | "fit";
        widthPercent?: number;
        heightPercent?: number;
    }

    let { language, content, widthPx = "fill", heightPx = "fill", widthPercent = 0, heightPercent = 0 }: CodeBlockProps = $props();
</script>

<Markdown {widthPx} {widthPercent} {heightPx} {heightPercent} content={`\`\`\`${language}
${content.map(c => c.trimEnd()).join('\n').trimEnd()}
\`\`\``} />