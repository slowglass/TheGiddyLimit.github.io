class RenderDeities{static $getRenderedDeity(a){return $$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getNameTr(a,{suffix:a.title?`, ${a.title.toTitleCase()}`:""})}
			${RenderDeities._getDeityBody(a)}
			${a.reprinted?`<tr class="text"><td colspan="6"><i class="text-muted">Note: this deity has been reprinted in a newer publication.</i></td></tr>`:""}
			${Renderer.utils.getPageTr(a)}
			${a.previousVersions?`
			${Renderer.utils.getDividerTr()}
			${a.previousVersions.map((a,b)=>RenderDeities._getDeityBody(a,b+1)).join(Renderer.utils.getDividerTr())}
			`:""}
			${Renderer.utils.getBorderTr()}
		`}static _getDeityBody(a,b){const c=Renderer.get(),d=[];return a.entries&&c.recursiveRender({entries:a.entries},d),`
			${b?`
				<tr><td colspan="6">
				<i class="text-muted">
				${1===b?`This deity is a reprint.`:""} The version below was printed in an older publication (${Parser.sourceJsonToFull(a.source)}${0<a.page?`, page ${a.page}`:""}).
				</i>
				</td></tr>
			`:""}
	
			${Renderer.deity.getOrderedParts(a,`<tr><td colspan="6">`,`</td></tr>`)}
			
			${a.symbolImg?`<tr><td colspan="6">${c.render({entries:[a.symbolImg]})}</td></tr>`:""}
			${d.length?`<tr class="text"><td colspan="6">${d.join("")}</td></tr>`:""}
			`}}