class RenderTrapsHazards{static $getRenderedTrapHazard(a){const b=[];Renderer.get().recursiveRender({entries:a.entries},b,{depth:2});const c=Renderer.traphazard.getSimplePart(Renderer.get(),a),d=Renderer.traphazard.getComplexPart(Renderer.get(),a),e=Renderer.traphazard.getSubtitle(a);return $$`
		${Renderer.utils.getBorderTr()}
		${Renderer.utils.getNameTr(a)}
		${e?`<tr class="text"><td colspan="6"><i>${Renderer.traphazard.getSubtitle(a)}</i></td>`:""}
		<tr class="text"><td colspan="6">${b.join("")}${c||""}${d||""}</td></tr>
		${Renderer.utils.getPageTr(a)}
		${Renderer.utils.getBorderTr()}`}}