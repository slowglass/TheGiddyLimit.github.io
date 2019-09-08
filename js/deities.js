"use strict";const STR_REPRINTED="reprinted";function unpackAlignment(a){if(a.alignment.sort(SortUtil.alignmentSort),2===a.alignment.length&&a.alignment.includes("N")){const b=[...a.alignment];return"N"===b[0]?b[0]="NX":b[1]="NY",b}return MiscUtil.copy(a.alignment)}class DeitiesPage extends ListPage{constructor(){const a=getSourceFilter(),b=new Filter({header:"Pantheon",items:["Celtic","Dawn War","Dragonlance","Drow","Dwarven","Eberron","Egyptian","Elven","Faer\xFBnian","Forgotten Realms","Gnomish","Greek","Greyhawk","Halfling","Nonhuman","Norse","Orc"]}),c=new Filter({header:"Category",items:[STR_NONE,"Other Faiths of Eberron","The Dark Six","The Gods of Evil","The Gods of Good","The Gods of Neutrality","The Sovereign Host"],itemSortFn:null}),d=new Filter({header:"Alignment",items:["L","NX","C","G","NY","E","N"],displayFn:Parser.alignmentAbvToFull,itemSortFn:null}),e=new Filter({header:"Domain",items:["Arcana","Death","Forge","Grave","Knowledge","Life","Light","Nature",STR_NONE,"Order","Tempest","Trickery","War"]}),f=new Filter({header:"Miscellaneous",items:[STR_REPRINTED],displayFn:StrUtil.uppercaseFirst,deselFn:a=>a===STR_REPRINTED});super({dataSource:DataUtil.deity.loadJSON,filters:[a,d,b,c,e,f],filterSource:a,listValueNames:["name","pantheon","alignment","domains","symbol","source","uniqueid"],listClass:"deities",sublistValueNames:["name","pantheon","alignment","domains","id"],sublistClass:"subdeities",dataProps:["deity"]}),this._sourceFilter=a,this._pantheonFilter=b,this._categoryFilter=c}getListItem(a,b){return a._fAlign=unpackAlignment(a),a.category||(a.category=STR_NONE),a.domains||(a.domains=[STR_NONE]),a.domains.sort(SortUtil.ascSort),a._fReprinted=a.reprinted?STR_REPRINTED:"",this._sourceFilter.addItem(a.source),this._pantheonFilter.addItem(a.pantheon),this._categoryFilter.addItem(a.category),`
			<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
				<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-3 pl-0">${a.name}</span>
					<span class="pantheon col-2 text-center">${a.pantheon}</span>
					<span class="alignment col-2 text-center">${a.alignment.join("")}</span>
					<span class="domains col-3 ${a.domains[0]===STR_NONE?`list-entry-none`:""}">${a.domains.join(", ")}</span>
					<span class="source col-2 text-center ${Parser.sourceJsonToColor(a.source)} pr-0" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
					
					<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
				</a>
			</li>
		`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source,c._fAlign,c.pantheon,c.category,c.domains,c._fReprinted)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-4 pl-0">${a.name}</span>
					<span class="pantheon col-2">${a.pantheon}</span>
					<span class="alignment col-2">${a.alignment.join("")}</span>
					<span class="domains col-4 ${a.domains[0]===STR_NONE?`list-entry-none`:""} pr-0">${a.domains.join(", ")}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){const b=this._dataList[a];$(`#pagecontent`).empty().append(RenderDeities.$getRenderedDeity(b)),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a)}}const deitiesPage=new DeitiesPage;window.addEventListener("load",()=>deitiesPage.pOnLoad());