"use strict";class RewardsPage extends ListPage{constructor(){const a=getSourceFilter(),b=new Filter({header:"Type",items:["Blessing","Boon","Charm"]});super({dataSource:"data/rewards.json",filters:[a,b],filterSource:a,listValueNames:["name","source","uniqueid"],listClass:"rewards",sublistValueNames:["name","id"],sublistClass:"subrewards",dataProps:["reward"]}),this._sourceFilter=a,this._typeFilter=b}getListItem(a,b){return this._sourceFilter.addItem(a.source),this._typeFilter.addItem(a.type),`
		<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
			<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
				<span class="name col-10 pl-0">${a.name}</span>
				<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
				
				<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
			</a>
		</li>`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source,c.type)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-12 px-0">${a.name}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){Renderer.get().setFirstSection(!0);const b=this._dataList[a];$("#pagecontent").empty().append(RenderRewards.$getRenderedReward(b)),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const rewardsPage=new RewardsPage;window.addEventListener("load",()=>rewardsPage.pOnLoad());