"use strict";class ConditionsDiseasesPage extends ListPage{constructor(){const a=getSourceFilter(),b=new Filter({header:"Type",items:["condition","disease"],displayFn:StrUtil.uppercaseFirst,deselFn:a=>"disease"===a});super({dataSource:"data/conditionsdiseases.json",filters:[a,b],filterSource:a,listValueNames:["name","source","type","uniqueid"],listClass:"conditions",sublistValueNames:["name","skills","id"],sublistClass:"subconditions",dataProps:["condition","disease"]}),this._sourceFilter=a}getListItem(a,b){return this._sourceFilter.addItem(a.source),`
		<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
			<a id='${b}' href='#${UrlUtil.autoEncodeHash(a)}' title="${a.name}">
				<span class="type col-3 text-center pl-0">${StrUtil.uppercaseFirst(a.__prop)}</span>
				<span class="name col-7">${a.name}</span>
				<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
				
				<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
			</a>
		</li>`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source,c.__prop)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
		<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
			<a href="#${UrlUtil.autoEncodeHash(a)}">
				<span class="name col-12 px-0">${a.name}</span>
				<span class="id hidden">${b}</span>
			</a>
		</li>
	`}doLoadHash(a){const b=$("#pagecontent").empty(),c=this._dataList[a];b.append(RenderConditionDiseases.$getRenderedConditionDisease(c)),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const conditionsDiseasesPage=new ConditionsDiseasesPage;window.addEventListener("load",()=>conditionsDiseasesPage.pOnLoad());