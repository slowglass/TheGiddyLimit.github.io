class RenderVariantRules{static $getRenderedVariantRule(a){Renderer.get().setFirstSection(!0);const b=[];return Renderer.get().resetHeaderIndex(),Renderer.get().recursiveRender(a,b),$$`
		${Renderer.utils.getBorderTr()}
		<tr class="text"><td colspan="6">${b.join("")}</td></tr>
		${Renderer.utils.getPageTr(a)}
		${Renderer.utils.getBorderTr()}`}}