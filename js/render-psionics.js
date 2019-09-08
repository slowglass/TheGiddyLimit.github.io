class RenderPsionics{static $getRenderedPsionic(a){const b=Renderer.get().setFirstSection(!0);return $$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a)}
			<tr>
				<td colspan="6"><i>${"T"===a.type?Parser.psiTypeToFull(a.type):`${a._fOrder} ${Parser.psiTypeToFull(a.type)}`}</i><span id="order"></span> <span id="type"></span></td>
			</tr>
			<tr><td class="divider" colspan="6"><div></div></td></tr>
			<tr class="text"><td colspan="6" id="text">${"T"===a.type?Renderer.psionic.getTalentText(a,b):Renderer.psionic.getDisciplineText(a,b)}</td></tr>
			${Renderer.utils.getPageTr(a)}
			${Renderer.utils.getBorderTr()}
		`}}