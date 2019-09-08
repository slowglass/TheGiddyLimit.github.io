"use strict";class VehiclesPage extends ListPage{constructor(){const a=getSourceFilter();super({dataSource:"data/vehicles.json",dataSourceFluff:"data/fluff-vehicles.json",filters:[a],filterSource:a,listValueNames:["name","source","uniqueid"],listClass:"vehicles",sublistValueNames:["name","id"],sublistClass:"subvehicles",dataProps:["vehicle"]}),this._sourceFilter=a}getListItem(a,b){return this._sourceFilter.addItem(a.source),`
			<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
				<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-10 pl-0">${a.name}</span>
					<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
					
					<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
				</a>
			</li>
		`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-12 px-0">${a.name}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){function b(a){return Renderer.utils.pBuildFluffTab(a,d,c,a=>c.fluff||a.vehicle.find(a=>a.name===c.name&&a.source===c.source),`data/fluff-vehicles.json`,()=>!0)}Renderer.get().setFirstSection(!0);const c=this._dataList[a],d=$(`#pagecontent`).empty(),e=Renderer.utils.tabButton("Item",()=>{},function(){d.append(RenderVehicles.$getRenderedVehicle(c))}),f=Renderer.utils.tabButton("Info",()=>{},b),g=Renderer.utils.tabButton("Images",()=>{},()=>b(!0));Renderer.utils.bindTabButtons(e,f,g),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const vehiclesPage=new VehiclesPage;window.addEventListener("load",()=>vehiclesPage.pOnLoad());