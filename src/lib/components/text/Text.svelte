<script lang="ts">
    import type { Snippet } from "svelte";

    export interface TextProps {
        children: Snippet;

        inheritColor?: boolean;
        sizePx?: number;

        hoverEffect?: boolean;

        classList?: ("red" | "green" | "yellow" | "strike" | "italic")[];
        weight?: "lightest" | "lighter" | "light" | "normal" | "semibold" | "bold" | "bolder" | "boldest" | "black";
        monospace?: boolean;
        sizeEm?: number;

        maxLines?: number;
    }

    let { children, inheritColor = false, sizePx = 24, classList = [], weight = "normal", monospace = false, sizeEm = 0, maxLines = 0 }: TextProps = $props();

    function lineClamp(lines: number): string {
        return `
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: ${lines};
        -webkit-line-clamp: ${lines};
        -webkit-box-orient: vertical;
        overflow: hidden;
        `
    }
</script>


<p class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;{sizeEm > 0 ? `font-size: ${sizeEm}em;` : ""}{maxLines > 0 ? lineClamp(maxLines) : ""}">{@render children()}</p>


<style>
    @import url("../../styles/globals.css");
</style>