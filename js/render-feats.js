class RenderFeats{static $getRenderedFeat(a){const b=Renderer.feat.getPrerequisiteText(a.prerequisite);Renderer.feat.mergeAbilityIncrease(a);const c=[];return Renderer.get().setFirstSection(!0).recursiveRender({entries:a.entries},c,{depth:2}),$$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a)}
			${b?`<tr><td colspan="6"><span class="prerequisite">Prerequisite: ${b}</span></td></tr>`:""}
			<tr><td class="divider" colspan="6"><div></div></td></tr>
			<tr class='text'><td colspan='6'>${c.join("")}</td></tr>
			${Renderer.utils.getPageTr(a)}
			${Renderer.utils.getBorderTr()}
		`}}