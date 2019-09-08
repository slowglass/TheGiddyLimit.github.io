class RenderCultsBoons{static $getRenderedCultBoon(a){return"cult"===a.__prop?RenderCultsBoons._$getRenderedCult(a):RenderCultsBoons._$getRenderedBoon(a)}static _$getRenderedCult(a){const b=Renderer.get().setFirstSection(!0),c=[];return Renderer.cultboon.doRenderCultParts(a,b,c),b.recursiveRender({entries:a.entries},c,{depth:2}),$$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a)}
			<tr id="text"><td class="divider" colspan="6"><div></div></td></tr>
			<tr class="text"><td colspan="6" class="text">${c.join("")}</td></tr>
			${Renderer.utils.getPageTr(a)}
			${Renderer.utils.getBorderTr()}
		`}static _$getRenderedBoon(a){const b=Renderer.get().setFirstSection(!0),c=[];return a._displayName=a._displayName||`Demonic Boon: ${a.name}`,Renderer.cultboon.doRenderBoonParts(a,b,c),b.recursiveRender({entries:a.entries},c,{depth:1}),$$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a)}
			<tr class="text"><td colspan="6">${c.join("")}</td></tr>
			${Renderer.utils.getPageTr(a)}
			${Renderer.utils.getBorderTr()}
		`}}