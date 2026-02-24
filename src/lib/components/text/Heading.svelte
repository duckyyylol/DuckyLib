<script lang="ts">
    import type { Snippet } from "svelte";

    interface TextProps {
        children: Snippet;

        inheritColor?: boolean;
        sizePx?: number;

        hoverEffect?: boolean;

        classList?: ("red" | "green" | "yellow" | "strike" | "italic")[];
        weight?: "lightest" | "lighter" | "light" | "normal" | "semibold" | "bold" | "bolder" | "boldest" | "black";
        monospace?: boolean;
        size?: 1 | 2 | 3 | 4 | 5 | 6;
    }

    let { children, inheritColor = false, sizePx = 24, classList = [], weight = "normal", monospace = false, size = 1 }: TextProps = $props();
</script>

{#if size === 1}
<h1 class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;">{@render children()}</h1>
{:else if size === 2}
<h2 class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;">{@render children()}</h2>
{:else if size === 3}
<h3 class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;">{@render children()}</h3>
{:else if size === 4}
<h4 class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;">{@render children()}</h4>
{:else if size === 5}
<h5 class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;">{@render children()}</h5>
{:else if size === 6}
<h6 class="{classList.join(" ")} font-{monospace ? "mono-" : ""}{weight}" style="color: {inheritColor ? "inherit" : "var(--text)"};user-select:none;">{@render children()}</h6>
{/if}

<style>
    @import url("../../styles/globals.css");
</style>