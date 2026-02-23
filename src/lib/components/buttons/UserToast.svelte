<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { PUBLIC_TABLET_SIZE_PX } from "$env/static/public";
    import type { Auth } from "../../types.ts";
    import { onMount } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import Symbol from "../text/Symbol.svelte";
    import Row from "../containers/Row.svelte";

    interface UserToastProps {
        user: Auth.User;
    }

    let { user }: UserToastProps = $props();

    let showContextMenu = $state(false);

    let switchingAccounts = $state(false);

    let tabletQuery = new MediaQuery(`max-width:${PUBLIC_TABLET_SIZE_PX}px`);

    let copystate: "copying" | "failed" | "success" | null = $state(null);

    onMount(() => {
        if (!user && browser) goto(`/login?from=${page.url.pathname}`);
    });
</script>

<div>
    {#if !tabletQuery.current}
        <p class="font-bold">{user.username}</p>
    {/if}
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
        href="#"
        onclick={() => {
            showContextMenu = !showContextMenu;
        }}
        oncontextmenu={(ev) => {
            ev.preventDefault();
            showContextMenu = !showContextMenu;
        }}
        ><img
            src={user.avatarUrl}
            alt="avatar"
            draggable="false"
            title={user.username}
        /></a
    >
</div>

<contextmenu
    style="visibility:{showContextMenu ? 'visible' : 'hidden'};"
    class={showContextMenu ? "show" : "hide"}
>
    {#if !switchingAccounts}
        {#if tabletQuery.current}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <contextentry data-disabled="true" id="informative-username">
                <span class="material-symbols-outlined">account_circle</span>
                {user.username}
            </contextentry>
        {/if}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <contextentry
            data-disabled="false"
            id="log-out"
            onclick={(e: any) => {}}
        >
            <span class="material-symbols-outlined">logout</span>
            <red>Log Out</red>
        </contextentry>
        <hr />
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <contextentry
            data-disabled={copystate === "copying"}
            id="informative-id"
            title="Click to Copy"
            onclick={async (e: CustomEvent) => {
                let copied = false;
                copystate = "copying";

                if (browser) {
                    window.navigator.clipboard
                        .writeText(user.id)
                        .then(() => {
                            setTimeout(() => {
                                copied = true;
                                copystate = "success";
                            }, 2e2);
                        })
                        .catch((e) => {
                            copied = false;
                            copystate = "failed";
                        })
                        .finally(() => {
                            setTimeout(() => {
                                copystate = null;
                            }, 1e3);
                        });
                }
            }}
        >
            <!-- <span class="material-symbols-outlined">logout</span> -->
            <Row widthPx="fit" gapEm={0.33}>
                <p class="font-bold">ID:</p>
                {#if copystate === null}
                    <p class="font-normal">(Click to Copy)</p>
                {:else if copystate === "copying"}
                    <p class="font-bold yellow">Copying...</p>
                {:else if copystate === "failed"}
                    <p class="font-bold red">Copy Failed</p>
                {:else if copystate === "success"}
                    <p class="font-bold green">Copied!</p>
                {/if}
                <p class="font-normal" id="copy"></p>
            </Row>
        </contextentry>
    {/if}
</contextmenu>

<style>
    @import url("../../styles/globals.css");

    red {
        color: var(--red);
    }

    div {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        gap: 0.33em;
    }

    p {
        font-size: 1em;
    }

    img {
        width: 2em;
        aspect-ratio: 1/1;
        border-radius: 100px;
        cursor: pointer;
        user-select: none;
    }

    @keyframes show {
        from {
            display: none;
            opacity: 0;
            top: 3em;
            right: 0.33em;
        }
        to {
            display: flex;
            opacity: 1;
            top: 3.66em;
            right: 0.66em;
        }
    }

    @keyframes hide {
        from {
            display: flex;
            opacity: 1;
            top: 3.66em;
            right: 0.66em;
        }
        to {
            display: none;
            opacity: 0;
            top: 3em;
            right: 0.33em;
        }
    }

    .show {
        animation: show 0.1s ease-in forwards;
    }

    .hide {
        animation: hide 0.1s ease-in forwards;
    }

    contextmenu hr {
        height: 2px;
        border-radius: 8px;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--overlay-0);
        opacity: 0.6;
        margin: 0.66em 0;
        margin-left: 0.33em;
        width: 92%;
        border: none;
    }

    contextmenu {
        /* display: flex; */
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 250px;

        position: absolute;
        top: 3.66em;
        right: 0.66em;

        user-select: none;
        background-color: var(--surface-0);
        filter: drop-shadow(0 3px 5px 1px var(--crust));

        padding: 0.33em 0.33em;

        border-radius: 8px;

        /* animation: ; */
    }

    contextentry {
        transition: opacity 10s ease-out;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        gap: 0.66em;

        width: 95%;
        cursor: pointer;
        padding: 0.1em 0.33em;
        margin: 0.1em 0em;

        border-radius: 8px;

        font-family: "Noto Sans", sans-serif;
        font-weight: 600;
        font-size: 0.9em;
    }

    contextentry[data-disabled="true"]:not(:hover) {
        transition: all 0.5s;
        opacity: 0.5;
    }

    contextentry[data-disabled="true"]:hover {
        transition: all 0.5s;
        background: var(--overlay-0);
        cursor: not-allowed;
        opacity: 0.3;
    }

    contextentry:not([data-disabled="true"]):hover {
        transition: all 0.5s;
        background: var(--overlay-0);
    }

    contextentry:not([data-disabled="true"]):not(:hover) {
        transition: all 0.5s;
        background: transparent;
    }
</style>
