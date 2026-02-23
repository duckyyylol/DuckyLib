<script lang="ts">
    interface SymbolProps {
        name: string;
        inheritColor?: boolean;
        sizePx?: number;

        hoverEffect?: boolean;
    }

    let { name, inheritColor = false, sizePx = 24, hoverEffect = true }: SymbolProps = $props();
</script>

<span class="material-symbols-outlined{hoverEffect ? " hoverable" : ""}" style="color: {inheritColor ? "inherit" : "var(--text)"};font-size:{sizePx}px;user-select:none;">{name}</span>

<style>
    @import url("../../styles/globals.css");
</style>