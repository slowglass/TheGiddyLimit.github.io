class RenderTables{static $getRenderedTable(a){return $$`
		${Renderer.utils.getBorderTr()}
		${Renderer.utils.getNameTr(a)}
		<tr><td class="divider" colspan="6"><div></div></td></tr>
		${Renderer.table.getCompactRenderedString(a)}
		${a.chapter?`<tr class="text"><td colspan="6">
		${Renderer.get().render(`{@note ${"table"===a.__prop?`This table`:"These tables"} can be found in ${Parser.sourceJsonToFull(a.source)}${Parser.bookOrdinalToAbv(a.chapter.ordinal,!0)}, {@book ${a.chapter.name}|${a.source}|${a.chapter.index}|${a.chapter.name}}.}`)}
		</td></tr>`:""}
		${Renderer.utils.getPageTr(a)}
		${Renderer.utils.getBorderTr()}`}}