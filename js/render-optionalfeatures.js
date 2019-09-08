class RenderOptionalFeatures{static $getRenderedOptionalFeature(a){return $$`${Renderer.utils.getBorderTr()}
		${Renderer.utils.getNameTr(a)}
		${a.prerequisite?`<tr><td colspan="6"><i>${Renderer.optionalfeature.getPrerequisiteText(a.prerequisite)}</i></td></tr>`:""}
		<tr><td class="divider" colspan="6"><div></div></td></tr>
		<tr><td colspan="6">${Renderer.get().render({entries:a.entries},1)}</td></tr>
		${Renderer.optionalfeature.getPreviouslyPrintedText(a)}
		${Renderer.utils.getPageTr(a)}
		${Renderer.utils.getBorderTr()}`}}