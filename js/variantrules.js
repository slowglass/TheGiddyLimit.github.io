"use strict";class VariantRulesPage extends ListPage{constructor(){const a=getSourceFilter();super({dataSource:"data/variantrules.json",filters:[a],filterSource:a,listValueNames:["name","source","search"],listClass:"variantrules",sublistValueNames:["name","id"],sublistClass:"subvariantrules",dataProps:["variantrule"]}),this._sourceFilter=a}getListItem(a,b){const c=[];for(const d of a.entries)Renderer.getNames(c,d);return this._sourceFilter.addItem(a.source),`
			<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
				<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-10 pl-0">${a.name}</span>
					<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
					<span class="search hidden">${c.join(",")}</span>
				</a>
			</li>`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-12 px-0">${a.name}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){const b=this._dataList[a];$("#pagecontent").empty().append(RenderVariantRules.$getRenderedVariantRule(b)),loadSubHash([]),ListUtil.updateSelected()}doLoadSubHash(a){if(a.length){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a);const b=$(`.rd__h[data-title-index="${a[0]}"]`);b.length&&b[0].scrollIntoView()}}}const variantRulesPage=new VariantRulesPage;window.addEventListener("load",()=>variantRulesPage.pOnLoad());