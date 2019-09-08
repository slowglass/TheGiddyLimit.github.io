"use strict";function filterTypeSort(c,d){return c=c.item,d=d.item,SortUtil.ascSortLower(Parser.trapHazTypeToFull(c),Parser.trapHazTypeToFull(d))}class TrapsHazardsPage extends ListPage{constructor(){const a=getSourceFilter(),b=new Filter({header:"Type",items:["MECH","MAG","SMPL","CMPX","HAZ","WTH","ENV","WLD","GEN"],displayFn:Parser.trapHazTypeToFull,itemSortFn:filterTypeSort});super({dataSource:"data/trapshazards.json",filters:[a,b],filterSource:a,listValueNames:["name","trapType","source","uniqueid"],listClass:"trapshazards",sublistValueNames:["name","type","id"],sublistClass:"subtrapshazards",dataProps:["trap","hazard"]}),this._sourceFilter=a}getListItem(a,b){return a.trapHazType=a.trapHazType||"HAZ",this._sourceFilter.addItem(a.source),`
			<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
				<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-6 pl-0">${a.name}</span>
					<span class="trapType col-4">${Parser.trapHazTypeToFull(a.trapHazType)}</span>
					<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
					
					<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
				</a>
			</li>
		`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source,c.trapHazType)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-8 pl-0">${a.name}</span>
					<span class="type col-4 pr-0">${Parser.trapHazTypeToFull(a.trapHazType)}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){Renderer.get().setFirstSection(!0);const b=this._dataList[a];$(`#pagecontent`).empty().append(RenderTrapsHazards.$getRenderedTrapHazard(b)),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const trapsHazardsPage=new TrapsHazardsPage;window.addEventListener("load",()=>trapsHazardsPage.pOnLoad());