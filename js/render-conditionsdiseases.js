class RenderConditionDiseases{static $getRenderedConditionDisease(a){const b={type:"entries",entries:a.entries},c=[];return Renderer.get().setFirstSection(!0).recursiveRender(b,c),$$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a)}
			<tr><td class="divider" colspan="6"><div></div></td></tr>
			<tr class="text"><td colspan="6">${c.join("")}</td></tr>
			${Renderer.utils.getPageTr(a)}
			${Renderer.utils.getBorderTr()}
		`}}