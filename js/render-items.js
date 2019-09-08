class RenderItems{static $getRenderedItem(a){const[b,c,d]=Renderer.item.getDamageAndPropertiesText(a),e=Renderer.item.getRenderedEntries(a);return $$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a)}
			<tr><td class="typerarityattunement" colspan="6">${Renderer.item.getTypeRarityAndAttunementText(a)}</td></tr>
			<tr>
				<td colspan="2">${[Parser.itemValueToFull(a),Parser.itemWeightToFull(a)].filter(Boolean).join(", ").uppercaseFirst()}</td>
				<td class="text-right" colspan="4"><span>${b}</span> <span>${c}</span> <span>${d}</span></td>
			</tr>
			${e?`<tr><td class="divider" colspan="6"><div/></td></tr>
			<tr class="text"><td colspan="6">${e}</td></tr>`:""}
			${Renderer.utils.getPageTr(a)}
			${Renderer.utils.getBorderTr()}
		`}}