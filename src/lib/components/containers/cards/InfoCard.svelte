<script lang="ts">
    import type { Snippet } from "svelte";
    import Column from "../Column.svelte";
    import Symbol from "$lib/components/text/Symbol.svelte";
    import Row from "../Row.svelte";


    interface InfoCardProps {
        text: string;
        title?: string;

        symbol?: string | null;
    }

    let { text, symbol = null, title = "" }: InfoCardProps = $props();
</script>

<div>
    <Column justifyContent="flex-start" alignItems="flex-start">
        <Column justifyContent="flex-start" alignItems="flex-start" gapEm={0.33}>
            {#if symbol !== null}
                <Symbol name={symbol} sizePx={36} hoverEffect={false} />
            {/if}
            {#if title !== ""}
                <h5 class="font-bolder">{title}</h5>
            {/if}
        </Column>
        <p class="font-semibold">{text}</p>
    </Column>
</div>

<style>
    @import url("../../../styles/globals.css");

    div {
        max-width: fit-content;
        height: fit-content;
        max-height: 230px;
        min-width: 300px;

        aspect-ratio: 1/0.8;
        /* aspect-ratio: 2/1.3; */

        padding: 1em;
        border-radius: var(--border-lg);

        background-color: var(--surface-0);

        font-size: 1.2em;

        filter: drop-shadow(0 3px 3px var(--crust));
    }

    p {
        height: 100%;
        text-align: left;
        max-width: 300px;
        text-wrap: wrap;
        /* text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 7;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden; */
    }

    div:not(:hover) {
        transition: transform 0.2s;
        transform: scale(1) translate3d(0, 0, 0);
    }

    div:hover {
        transition: transform 0.2s;
        cursor: pointer;
        user-select: none;
        transform: scale(1.02) translate3d(0, 1px, 0);
    }
</style>
