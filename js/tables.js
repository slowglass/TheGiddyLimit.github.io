"use strict";class TablesPage extends ListPage{constructor(){const a=getSourceFilter();super({dataSource:async()=>{const a=await Promise.all(["data/generated/gendata-tables.json","data/tables.json"].map(a=>DataUtil.loadJSON(a))),b={};return a.forEach(a=>{Object.entries(a).forEach(([a,c])=>{if(b[a]&&b[a]instanceof Array&&c instanceof Array)b[a]=b[a].concat(c);else if(null==b[a])b[a]=c;else throw new Error(`Could not merge keys for key "${a}"`)})}),b},filters:[a],filterSource:a,listValueNames:["name","source","sort-name"],listClass:"tablesdata",sublistValueNames:["name","id"],sublistClass:"subtablesdata",dataProps:["table","tableGroup"]}),this._sourceFilter=a}getListItem(a,b){const c=a.name.replace(/^([\d,.]+)gp/,(...a)=>a[1].replace(Parser._numberCleanRegexp,"").padStart(9,"0"));return this._sourceFilter.addItem(a.source),`
		<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
			<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
				<span class="name col-10 pl-0">${a.name}</span>
				<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
				<span class="hidden sort-name">${c}</span>
			</a>
		</li>`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
		<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
			<a href="#${UrlUtil.autoEncodeHash(a)}">
				<span class="name col-12 px-0">${a.name}</span>		
				<span class="id hidden">${b}</span>				
			</a>
		</li>`}doLoadHash(a){Renderer.get().setFirstSection(!0);const b=this._dataList[a];$("#pagecontent").empty().append(RenderTables.$getRenderedTable(b)),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const tablesPage=new TablesPage;window.addEventListener("load",()=>tablesPage.pOnLoad());