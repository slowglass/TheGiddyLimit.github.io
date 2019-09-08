"use strict";function cultBoonTypeToFull(a){return"cult"===a?"Cult":"Demonic Boon"}class CultsBoonsPage extends ListPage{constructor(){const a=getSourceFilter(),b=new Filter({header:"Type",items:["boon","cult"],displayFn:cultBoonTypeToFull});super({dataSource:"data/cultsboons.json",filters:[a,b],filterSource:a,listValueNames:["name","source","type","uniqueid"],listClass:"cultsboons",sublistValueNames:["type","name","source","id"],sublistClass:"subcultsboons",dataProps:["cult","boon"]}),this._sourceFilter=a}getListItem(a,b){return this._sourceFilter.addItem(a.source),`
		<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
			<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
				<span class="type col-3 text-center pl-0">${cultBoonTypeToFull(a.__prop)}</span>
				<span class="name col-7">${a.name}</span>
				<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
				
				<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
			</a>
		</li>`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source,c.__prop)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
		<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
			<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
				<span class="name col-12 px-0">${a.name}</span>
				<span class="id hidden">${b}</span>
			</a>
		</li>
	`}doLoadHash(a){const b=this._dataList[a];$("#pagecontent").empty().append(RenderCultsBoons.$getRenderedCultBoon(b)),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const cultsBoonsPage=new CultsBoonsPage;window.addEventListener("load",()=>cultsBoonsPage.pOnLoad());