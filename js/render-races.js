class RenderRaces{static $getRenderedRace(a){const b=Renderer.get().setFirstSection(!0);return $$`
		${Renderer.utils.getBorderTr()}
		${Renderer.utils.getNameTr(a,{pronouncePart:a.soundClip?RenderRaces._getPronunciationButton(a):""})}
		<tr><td colspan="6"><b>Ability Scores:</b> ${(a.ability?Renderer.getAbilityData(a.ability):{asText:"None"}).asText}</td></tr>
		<tr><td colspan="6"><b>Size:</b> ${Parser.sizeAbvToFull(a.size)}</td></tr>
		<tr><td colspan="6"><b>Speed:</b> ${Parser.getSpeedString(a)}</td></tr>
		<tr><td class="divider" colspan="6"><div></div></td></tr>
		<tr class="text"><td colspan="6">${b.render({type:"entries",entries:a.entries},1)}</td></tr>
		${a.traitTags&&a.traitTags.includes("NPC Race")?`<tr class="text"><td colspan="6"><section class="text-muted">
			${b.render(`{@i Note: This race is listed in the {@i Dungeon Master's Guide} as an option for creating NPCs. It is not designed for use as a playable race.}`,2)}
		 </section></td></tr>`:""}
		${Renderer.utils.getPageTr(a)}
		${Renderer.utils.getBorderTr()}`}static _getPronunciationButton(a){return`<button class="btn btn-xs btn-default btn-name-pronounce">
			<span class="glyphicon glyphicon-volume-up name-pronounce-icon"></span>
			<audio class="name-pronounce">
			   <source src="${a.soundClip}" type="audio/mpeg">
			   <source src="${Renderer.get().baseUrl}audio/races/${/^(.*?)(\(.*?\))?$/.exec(a._baseName||a.name)[1].trim().toLowerCase()}.mp3" type="audio/mpeg">
			</audio>
		</button>`}}