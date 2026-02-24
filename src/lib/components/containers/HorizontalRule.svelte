<script lang="ts">

    interface RowProps {
        textAlign?: "center" | "left" | "right";

        borderRadiusPx?: number;

        widthPx?: number | "fill" | "fit";
        widthPercent?: number;

        marginRightPx?: number | "auto";
        marginLeftPx?: number | "auto";
        marginTopPx?: number | "auto";
        marginBottomPx?: number | "auto";
    }

    const { textAlign = "center", borderRadiusPx = 0, widthPx = "fill", widthPercent = 0, marginBottomPx = 0, marginLeftPx = 0, marginRightPx = 0, marginTopPx = 0 }: RowProps = $props();
</script>

<hr style="{`
width: ${widthPercent !== 0 ? `${widthPercent}%` : widthPx === "fill" ? "100%" : widthPx === "fit" ? "auto" : `${widthPx}px`};
${borderRadiusPx > 0 ? `border-radius: ${borderRadiusPx}px;` : ""}
text-align: ${textAlign};
margin-left: ${marginLeftPx === "auto" ? "auto" : `${marginLeftPx}px`};
margin-right: ${marginRightPx === "auto" ? "auto" : `${marginRightPx}px`};
margin-bottom: ${marginBottomPx === "auto" ? "auto" : `${marginBottomPx}px`};
margin-top: ${marginTopPx === "auto" ? "auto" : `${marginTopPx}px`};
`}" />

<style>
    @import url("../../styles/globals.css");

    hr {
        background-color: var(--crust) !important;
        height: 3px;
        border: none;
        border-radius: var(--border-md);
    }
</style>