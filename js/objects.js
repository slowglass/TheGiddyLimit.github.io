"use strict";function imgError(a){a&&$(a).parent().remove(),$(`.rnd-name`).find(`span.stats-source`).css("margin-right","0")}function handleStatblockScroll(a,b){$(`#token_image`).toggle(32>b.scrollTop).css({opacity:(32-b.scrollTop)/32,top:-b.scrollTop})}class ObjectsPage extends ListPage{constructor(){const a=getSourceFilter();super({dataSource:"data/objects.json",filters:[a],filterSource:a,listValueNames:["name","size","source","uniqueid"],listClass:"objects",sublistValueNames:["name","size","id"],sublistClass:"subobjects",dataProps:["object"]}),this._sourceFilter=a}getListItem(a,b){return this._sourceFilter.addItem(a.source),`
			<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
				<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-8 pl-0">${a.name}</span>
					<span class="size col-2">${Parser.sizeAbvToFull(a.size)}</span>
					<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
					
					<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
				</a>
			</li>
		`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-9 pl-0">${a.name}</span>
					<span class="ability col-3 pr-0">${Parser.sizeAbvToFull(a.size)}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){const b=this._dataList[a],c=[];b.entries&&this._renderer.recursiveRender({entries:b.entries},c,{depth:2}),b.actionEntries&&this._renderer.recursiveRender({entries:b.actionEntries},c,{depth:2}),$(`#pagecontent`).empty().append(RenderObjects.$getRenderedObject(b));const d=$(`#float-token`).empty();if(b.tokenUrl||!b.uniqueId){const a=b.tokenUrl||UrlUtil.link(`img/objects/${b.name.replace(/"/g,"")}.png`);d.append(`
			<a href="${a}" target="_blank" rel="noopener">
				<img src="${a}" id="token_image" class="token" onerror="imgError(this)" alt="${b.name}">
			</a>`)}else imgError();ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const objectsPage=new ObjectsPage;window.addEventListener("load",()=>objectsPage.pOnLoad());