<script lang="ts">
    import { getAgeVerified } from "../../index.ts";
    import Heading from "../text/Heading.svelte";
    import Column from "./Column.svelte";
    import Text from "../text/Text.svelte"
    import Row from "./Row.svelte";
    import { onMount } from "svelte";
    import Button from "../buttons/Button.svelte";
    import { browser } from "$app/environment";
    import Symbol from "../text/Symbol.svelte";
    import { goto } from "$app/navigation";

    interface AgeConfirmProps {
        age?: number;
        references?: ("substances" | "sexual" | "death" | "sh")[];
    }

    let {age = 18, references = []}: AgeConfirmProps = $props();

    const referenceMap = {
        "substances": "Alcohol, Drugs, and Substance Abuse",
        "sexual": "Sexual Content",
        "death": "Death or Dying",
        "sh": "Suicide, self-harm, or suicidal ideation"
    }

    let ageVerified = $state(getAgeVerified());

    let loaded = $state(false);

    onMount(() => {
        window.onscroll = (e) => {
            if(!ageVerified) {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: "instant"})
            }
        }

        setTimeout(() => {
            loaded = true;
        }, 5e2)
    })

    function setAgeVerified(v: boolean) {
        if(browser) {
            window.localStorage.setItem("av", `${v}`)

            window.location.reload();
        }
    }
</script>

{#if !ageVerified}
<div>
<Column marginLeftPx="auto" marginRightPx="auto" textWrap={true}>
    <Column heightPx="fit" textWrap={true} widthPercent={95}>
        {#if loaded}
        <Symbol name="no_adult_content" sizePx={64} />
        <Heading size={2} weight="boldest">{loaded ? `Are you ${age}+?` : ""}</Heading>
        {#if references.length > 0}
        <Heading size={4} weight="boldest">This site contains references to</Heading>
            <ul style="text-align: left;">
                {#each references.map(r => referenceMap[r]) as ref}
                    <Text><li>{loaded ? ref : ""}</li></Text>
                {/each}
            </ul>
        {/if}
        <Text weight="normal" classList={["italic"]}>{loaded ? `You must be at least ${age} years old to access this website.` : ""}</Text>
        <Row>
            <Button label="I am {age} or older" size="large" type="success" onclick={(e) => {setAgeVerified(true)}} />
            <Button label="I am younger than {age}" size="large" type="danger" onclick={(e) => {setAgeVerified(false)}} />
        </Row>
        {/if}
    </Column>
</Column>
</div>
{/if}

<style>
    @import url("../../styles/globals.css");

    div {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 110%; 


        padding: 0.33em;
        margin: 0;
        box-sizing: border-box;

        background-color: var(--base);
        color: var(--text);

        z-index: 1000;
    }
</style>