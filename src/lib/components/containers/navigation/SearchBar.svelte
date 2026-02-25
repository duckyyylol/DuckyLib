<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import {
        PUBLIC_MOBILE_SIZE_PX,
        PUBLIC_TABLET_SIZE_PX,
    } from "$env/static/public";
    import Heading from "$lib/components/text/Heading.svelte";
    import Symbol from "$lib/components/text/Symbol.svelte";
    import Text from "$lib/components/text/Text.svelte";
    import { onMount } from "svelte";
    import { MediaQuery } from "svelte/reactivity";
    import Column from "../Column.svelte";
    import Row from "../Row.svelte";

    export interface SearchResult {
        query?: string | null;
        href?: string | null;

        iconUrl?: string | null;

        name: string;
        description?: string | null;

        onclick?: (e: MouseEvent) => Promise<void>;
    }

    export type QueryMapKeys = keyof SearchResult;

    interface SearchBarProps {
        queryUrl?: string;
        queryObjMap?: { [key in QueryMapKeys]: string | null };
        queryDataKey?: string;

        options: SearchResult[];
        onsearch: ((query: string) => Promise<void>) | null;
        onresult: (result: SearchResult) => Promise<void>;
    }

    let {
        onsearch,
        onresult,
        options = [],
        queryUrl,
        queryObjMap,
        queryDataKey,
    }: SearchBarProps = $props();

    let searching = $state(false);

    let showBar = $state(false);
    let showInput = $state(false);

    let showContextMenu = $state(false);

    let closing = $state(false);

    let query = $state("");
    let results: SearchResult[] = $state([]);

    const mobileQuery = new MediaQuery(`max-width: ${PUBLIC_MOBILE_SIZE_PX}px`);
    const tabletQuery = new MediaQuery(`max-width: ${PUBLIC_TABLET_SIZE_PX}px`);

    onMount(() => {
        query = "";
        searching = false;
        showBar = false;
        showInput = false;
        closeResults();
    });

    function submitSearch() {
        if (onsearch) onsearch(query);
        query = "";
        showBar = false;
        showInput = false;
        searching = false;
    }

    function searchWithQuery(q: string): SearchResult[] {
        let MAX = 3;
        let re: SearchResult[] = [];

        if (!queryUrl || !queryObjMap) {
            options.forEach((o) => {
                let pass = false;
                if (o.name.toLowerCase().includes(q.toLowerCase())) pass = true;
                if (
                    o?.description &&
                    o.description.toLowerCase().includes(q.toLowerCase())
                )
                    pass = true;

                if (pass && re.length < MAX) re.push(o);
            });

            if (re.length > 1) showContextMenu = true;

            console.log("RESULTS", re);

            results = re;
        } else if (queryUrl && queryObjMap) {
            let url = queryUrl.replace("%s", q);
            if (!queryDataKey) {
                results = [];
                return [];
            }

            if (!queryObjMap.name || queryObjMap.name === null) {
                results = [];
                return [];
            }

            console.log(new URL(url).hostname)

            fetch(url)
                .then((r) =>
                    r.json().then((r: Record<string, any>) => {
                        console.log(r)
                        let obj: any = null;

                        if (queryObjMap.name !== null) {
                            if (!queryDataKey) {
                                if (!r[queryObjMap.name as string]) {
                                    results = [];
                                    return [];
                                } else {
                                    obj = r;
                                }
                            } else if (queryDataKey) {
                                if (!r[queryDataKey]) {
                                    results = [];
                                    return [];
                                } else {
                                    obj = r[queryDataKey];
                                }
                            } else {
                                results = [];
                                return [];
                            }
                        }

                        console.log(obj)

                        if (obj !== null && queryObjMap.name) {
                            if (!obj?.length || obj?.length === undefined) {
                                console.log("obj is not array")
                                let result: SearchResult = {
                                    name: obj[queryObjMap.name],
                                    query: q,
                                };

                                if (
                                    queryObjMap.description &&
                                    obj[queryObjMap.description]
                                )
                                    result.description =
                                        obj[queryObjMap.description];
                                if (queryObjMap.href && obj[queryObjMap.href])
                                    result.href = obj[queryObjMap.href];
                                if (
                                    queryObjMap.iconUrl &&
                                    obj[queryObjMap.iconUrl]
                                )
                                    result.iconUrl = obj[queryObjMap.iconUrl];

                                if(re.length < MAX) re.push(result);
                            
                                results = re;
                                return re;
                            } else {
                                console.log("obj is array");
                                (obj as any[]).forEach((e: any) => {
                                    let result: SearchResult = {
                                        name: e[queryObjMap.name as string],
                                        query: q,
                                    };

                                    if (
                                        queryObjMap.description &&
                                        e[queryObjMap.description]
                                    )
                                        result.description =
                                            e[queryObjMap.description];
                                    if (queryObjMap.href && e[queryObjMap.href])
                                        result.href = e[queryObjMap.href];
                                    if (
                                        queryObjMap.iconUrl &&
                                        e[queryObjMap.iconUrl]
                                    )
                                        result.iconUrl = e[queryObjMap.iconUrl];

                                        if(re.length < MAX) re.push(result);
                                });

                                if (re.length > 1) showContextMenu = true;
                                results = re;
                                return re;
                            }
                        } else {
                            results = [];
                            return [];
                        }
                    }),
                )
                .catch((r) => {
                    results = [];
                    return [];
                });
        } else {
            options.forEach((o) => {
                let pass = false;
                if (o.name.toLowerCase().includes(q.toLowerCase())) pass = true;
                if (
                    o?.description &&
                    o.description.toLowerCase().includes(q.toLowerCase())
                )
                    pass = true;

                if (pass && re.length < MAX) re.push(o);
            });

            if (re.length > 1) showContextMenu = true;

            console.log("RESULTS", re);

            results = re;
        }

        return re;
    }

    function closeResults() {
        results = [];
        showContextMenu = false;
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    id="outer"
    onclick={async () => {
        console.log("click");
        if (!closing) {
            if (query !== "") {
                submitSearch();
            } else if (!showBar && !searching) {
                showBar = true;
                showInput = true;
            }
        } else {
            closing = false;
        }

        console.log(showBar);
    }}
>
    <Symbol name="search" />
    <!-- {#if showInput} -->
    <input
        data-show={showInput}
        class="font-semibold"
        type="text"
        name="query"
        id="query"
        placeholder="Search Query..."
        onclick={() => {
            showInput = true;
            showBar = true;
        }}
        onkeypress={(e) => {
            if (e.key === "Enter" && query !== "") {
                submitSearch();
            }
        }}
        bind:value={
            () => query,
            (v) => {
                query = v.trimStart();
                searching = query.length > 0;
                if (searching) searchWithQuery(query);
                if (!searching) closeResults();
            }
        }
    />
    {#if showInput}
        <div
            id="close"
            onclick={() => {
                if (showInput && !closing) {
                    closing = true;
                    query = "";
                    showBar = false;
                    showInput = false;
                    searching = false;
                    closeResults();
                }
            }}
        >
            <Symbol name="close" sizePx={18} />
        </div>
    {/if}
    <contextmenu
        style="visibility:{showContextMenu ? 'visible' : 'hidden'};"
        class={showContextMenu ? "show" : "hide"}
    >
        {#each results as result}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <contextentry
                data-disabled="false"
                onclick={async (e: any) => {
                    if (result.onclick && !result.href) {
                        await result.onclick(e);
                    } else if (result.href) {
                        if (window.location.href.startsWith("/")) {
                            if (browser) goto(result.href);
                            return;
                        } else {
                            if (browser) window.open(result.href);
                        }
                    }
                }}
            >
                <Row
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    heightPx="fit"
                >
                    {#if result.iconUrl}
                        <img src={result.iconUrl} alt="{result.name} icon" />
                    {/if}
                    <Column
                        justifyContent="flex-end"
                        alignItems="flex-start"
                        heightPx="fit"
                        textWrap={true}
                        textAlign="left"
                        gapEm={0.2}
                    >
                        <Text sizeEm={1} weight="bolder" maxLines={1}
                            >{result.name}</Text
                        >
                        {#if result.description}
                            <Text
                                classList={["italic"]}
                                sizeEm={0.8}
                                maxLines={1}
                                weight="semibold">{result.description}</Text
                            >
                        {/if}
                    </Column>
                </Row>
            </contextentry>
        {/each}
    </contextmenu>
</div>

<style>
    @import url("../../../styles/globals.css");

    @keyframes input_focus {
        0% {
            opacity: 0;
            display: none;
            width: 0%;
        }

        1% {
            opacity: 1;
            display: flex;
            width: 0%;
        }

        100% {
            width: 100%;
            opacity: 1;
            /* display: flex; */
        }
    }

    @keyframes fade_in {
        from {
            display: none;
            opacity: 0;
        }

        to {
            display: flex;
            opacity: 1;
        }
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
            top: 3.33em;
            right: 3.66em;
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

    contextmenu {
        /* display: flex; */
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 300px;

        position: absolute;
        top: 0;
        right: 0;

        user-select: none;
        background-color: var(--surface-0);
        filter: drop-shadow(0 3px 5px 1px var(--crust));

        padding: 0.33em 0.33em;

        border-radius: 8px;

        /* animation: ; */
    }

    #outer {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        gap: 0.66em;
        padding: 0.05em 0.66em;

        border: 2px solid var(--base);
        border-radius: var(--border-md);

        background-color: var(--mantle);

        cursor: pointer;
    }

    input {
        min-width: 150px;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--text);
    }

    input[data-show="false"] {
        width: 0px;
        display: none;
    }

    input[data-show="true"] {
        border-bottom: 2px solid var(--surface-0);
        animation: 0.2s linear forwards input_focus;
    }

    #close {
        animation: 0.5s fade_in forwards linear;
        z-index: 5000;
    }

    contextentry {
        transition: opacity 10s ease-out;
        display: flex;
        /* flex-direction: row;
        align-items: center;
        justify-content: flex-start; */

        gap: 0.66em;

        width: 95%;
        cursor: pointer;
        padding: 0.33em 0.33em;
        margin: 0.1em 0em;

        border-radius: 8px;
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

    img {
        width: 2.33em;
        aspect-ratio: 1/1;
        border-radius: var(--border-md);
    }
</style>
