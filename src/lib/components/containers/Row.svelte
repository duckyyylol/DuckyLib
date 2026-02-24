<script lang="ts">
    import type { Snippet } from "svelte";

    interface RowProps {
        children: Snippet;

        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
        alignItems?: "center" | "flex-start" | "flex-end" | "space-between";
        textAlign?: "center" | "left" | "right" | "justify";
        gapEm?: number;
        textWrap?: boolean;
        flexWrap?: boolean;

        backgroundColor?: string | "transparent";

        borderRadiusPx?: number;
        widthPx?: number | "fill" | "fit";
        heightPx?: number | "fill" | "fit";
        widthPercent?: number;
        heightPercent?: number;

        marginRightPx?: number | "auto";
        marginLeftPx?: number | "auto";
        marginTopPx?: number | "auto";
        marginBottomPx?: number | "auto";
    }

    const { children, textWrap = false, flexWrap = false,justifyContent = "center", alignItems = "center", textAlign = "center", gapEm = 1, backgroundColor = "transparent", borderRadiusPx = 0, widthPx = "fill", heightPx = "fill", widthPercent = 0, heightPercent = 0, marginBottomPx = 0, marginLeftPx = 0, marginRightPx = 0, marginTopPx = 0 }: RowProps = $props();
</script>

<div style="{`
width: ${widthPercent !== 0 ? `${widthPercent}%` : widthPx === "fill" ? "100%" : widthPx === "fit" ? "auto" : `${widthPx}px`};
height: ${heightPercent !== 0 ? `${heightPercent}%` : heightPx === "fill" ? "100%" : heightPx === "fit" ? "auto" : `${heightPx}px`};
text-wrap: ${textWrap ? "wrap" : "nowrap"};
display: flex;
flex-direction: row;
flex-wrap: ${flexWrap ? "wrap" : "nowrap"};
justify-content: ${justifyContent};
align-items: ${alignItems};
gap: ${gapEm}em;
border-radius: ${borderRadiusPx}px;
text-align: ${textAlign};
margin-left: ${marginLeftPx === "auto" ? "auto" : `${marginLeftPx}px`};
margin-right: ${marginRightPx === "auto" ? "auto" : `${marginRightPx}px`};
margin-bottom: ${marginBottomPx === "auto" ? "auto" : `${marginBottomPx}px`};
margin-top: ${marginTopPx === "auto" ? "auto" : `${marginTopPx}px`};
background-color: ${backgroundColor};
`}">
    {@render children()}
</div>

<style>
    @import url("../../styles/globals.css");
</style>