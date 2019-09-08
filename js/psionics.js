"use strict";let psionicsBookView;function getHiddenModeList(a){const b=a.modes;if(b===void 0)return"";const c=[];for(let d=0;d<b.length;++d)if(c.push(`"${b[d].name}"`),null!=b[d].submodes){const a=b[d].submodes;for(let b=0;b<a.length;++b)c.push(`"${a[b].name}"`)}return c.join(",")}class PsionicsPage extends ListPage{constructor(){const a=getSourceFilter({deselFn:()=>!1}),b=new Filter({header:"Type",items:[Parser.PSI_ABV_TYPE_TALENT,Parser.PSI_ABV_TYPE_DISCIPLINE],displayFn:Parser.psiTypeToFull}),c=new Filter({header:"Order",items:["Avatar","Awakened","Immortal","Nomad","Wu Jen",Parser.PSI_ORDER_NONE]});super({dataSource:"data/psionics.json",filters:[a,b,c],filterSource:a,listValueNames:["name","source","type","order","mode-list","uniqueid"],listClass:"psionics",sublistValueNames:["name","type","order","id"],sublistClass:"subpsionics",dataProps:["psionic"],bookViewOptions:{$btnOpen:$(`#btn-psibook`),noneVisibleMsg:"If you wish to view multiple psionics, please first make a list",popTblGetNumShown:a=>{const b=ListUtil.getSublistedIds().map(a=>this._dataList[a]),c=[],d=a=>{c.push(`<table class="spellbook-entry"><tbody>`),c.push(Renderer.psionic.getCompactRenderedString(a)),c.push(`</tbody></table>`)},e=a=>{const e=b.filter(b=>b.type===a);e.length&&(c.push(Renderer.utils.getBorderTr(`<span class="spacer-name">${Parser.psiTypeToFull(a)}</span>`)),c.push(`<tr class="spellbook-level"><td>`),e.forEach(a=>d(a)),c.push(`</td></tr>`))};return e("T"),e("D"),b.length||null==Hist.lastLoadedId||(c.push(`<tr class="spellbook-level"><td>`),d(this._dataList[Hist.lastLoadedId]),c.push(`</td></tr>`)),a.append(c.join("")),b.length}},tableViewOptions:{title:"Psionics",colTransforms:{name:{name:"Name",transform:!0},source:{name:"Source",transform:a=>`<span class="${Parser.sourceJsonToColor(a)}" title="${Parser.sourceJsonToFull(a)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a)}</span>`},_text:{name:"Text",transform:a=>"T"===a.type?Renderer.psionic.getTalentText(a,Renderer.get()):Renderer.psionic.getDisciplineText(a,Renderer.get()),flex:3}},filter:{generator:ListUtil.basicFilterGenerator},sorter:(c,a)=>SortUtil.ascSort(c.name,a.name)||SortUtil.ascSort(c.source,a.source)}}),this._sourceFilter=a}getListItem(a,b){return a._fOrder=Parser.psiOrderToFull(a.order),this._sourceFilter.addItem(a.source),`
			<li class="row" ${FLTR_ID}="${b}" onclick="ListUtil.toggleSelected(event, this)" oncontextmenu="ListUtil.openContextMenu(event, this)">
				<a id="${b}" href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-6">${a.name}</span>
					<span class="type col-2">${Parser.psiTypeToFull(a.type)}</span>
					<span class="order col-2 ${a._fOrder===STR_NONE?"list-entry-none":""}">${a._fOrder}</span>
					<span class="source col-2 text-center" title="${Parser.sourceJsonToFull(a.source)}" ${BrewUtil.sourceJsonToStyle(a.source)}>${Parser.sourceJsonToAbv(a.source)}</span>
					
					<span class="mode-list hidden">${getHiddenModeList(a)}</span>
					<span class="uniqueid hidden">${a.uniqueId?a.uniqueId:b}</span>
				</a>
			</li>
		`}handleFilterChange(){const a=this._filterBox.getValues();this._list.filter(b=>{const c=this._dataList[$(b.elm).attr(FLTR_ID)];return this._filterBox.toDisplay(a,c.source,c.type,c._fOrder)}),FilterBox.selectFirstVisible(this._dataList)}getSublistItem(a,b){return`
			<li class="row" ${FLTR_ID}="${b}" oncontextmenu="ListUtil.openSubContextMenu(event, this)">
				<a href="#${UrlUtil.autoEncodeHash(a)}" title="${a.name}">
					<span class="name col-6 pl-0">${a.name}</span>
					<span class="type col-3">${Parser.psiTypeToFull(a.type)}</span>
					<span class="order col-3 ${a._fOrder===STR_NONE?"list-entry-none":""} pr-0">${a._fOrder}</span>
					<span class="id hidden">${b}</span>
				</a>
			</li>
		`}doLoadHash(a){const b=this._dataList[a];$(`#pagecontent`).empty().append(RenderPsionics.$getRenderedPsionic(b)),loadSubHash([]),ListUtil.updateSelected()}doLoadSubHash(a){a=this._filterBox.setFromSubHashes(a),ListUtil.setFromSubHashes(a),this._bookView.handleSub(a)}}const psionicsPage=new PsionicsPage;window.addEventListener("load",()=>psionicsPage.pOnLoad());