<script lang="ts">
    import type { Snippet } from "svelte";
    import Column from "../Column.svelte";
    import Symbol from "$lib/components/text/Symbol.svelte";
    import Row from "../Row.svelte";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";

    interface LinkCardButton {
        text: string;
        href: string;
        type: "success" | "danger" | "primary" | "secondary";
    }

    interface LinkCardProps {
        text: string;
        title?: string;

        buttons: LinkCardButton[];

        symbol?: string | null;
    }

    let { text, symbol = null, title = "", buttons }: LinkCardProps = $props();
</script>

<div>
    <Column justifyContent="flex-start" alignItems="flex-start" gapEm={1}>
        <Column justifyContent="flex-start" alignItems="flex-start" gapEm={0.33}>
            {#if symbol !== null}
                <Symbol name={symbol} sizePx={36} hoverEffect={false} />
            {/if}
            {#if title !== ""}
                <h5 class="font-bolder">{title}</h5>
            {/if}
        </Column>
        <p class="font-semibold">{text}</p>
        <Row gapEm={0.33} justifyContent="flex-start">
            {#each buttons as button}
                <button class={button.type} onclick={() => {
                    if(browser) goto(button.href)
                }}>{button.text}</button>
            {/each}
        </Row>
    </Column>
</div>

<style>
    @import url("../../../styles/globals.css");

    div {
        max-width: fit-content;
        height: fit-content;
        min-height: 230px;
        min-width: 300px;
        /* aspect-ratio: 1/0.9; */

        /* aspect-ratio: 2/1.3; */

        padding: 1em;
        border-radius: var(--border-lg);

        background-color: var(--surface-0);

        font-size: 1.2em;

        filter: drop-shadow(0 3px 3px var(--crust));
    }

    p {
        text-align: left;
        max-width: 300px;
        text-wrap: wrap;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    div:not(:hover) {
        transition: transform 0.2s;
        transform: scale(1);
    }

    div:hover {
        transition: transform 0.2s;
        cursor: pointer;
        user-select: none;
        transform: scale(1.05);
    }

    button {
        cursor: pointer;

        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: center;

        outline: none;
        border: none;

        padding: 0.66em 1.33em;
        border-radius: var(--border-md);
        background-color: var(--overlay-2);
        color: var(--base);

        font-size: 0.7em;
        font-weight: 700;
    }

    button:hover {
        transition: all 0.2s;
        transform: scale(1.02) translateY(1px);
        filter: brightness(1.1);
    }

    button:not(:hover) {
        transition: all 0.2s;
        transform: scale(1) translateY(0);
        filter: brightness(1);
    }

    .danger {
        background-color: var(--maroon);
    }

    .primary {
        background-color: var(--accent);
    }

    .secondary {
        background-color: var(--overlay-0);
        color: var(--text);
    }

    .success {
        background-color: var(--green);
    }
</style>
