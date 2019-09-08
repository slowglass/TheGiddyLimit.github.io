"use strict";window.onload=doPageInit,String.prototype.split_handleColon=String.prototype.split_handleColon||function(a,b=Number.MAX_SAFE_INTEGER){if(""===a)return this.split("");const c=`${a.trim()}:`,d=this.toLowerCase().startsWith(c.toLowerCase()),e=d?new RegExp(c,"ig"):new RegExp(a,"ig"),f=d?c:a;let g=e.exec(this),h=0;const j=[],k=[];for(;g&&h<b;)k.push(g.index),h++,g=e.exec(this);if(1===k.length)j.push(this.substring(0,k[0])),j.push(this.substring(k[0]+f.length,this.length));else for(let a=0;a<k.length-1;++a){const b=k[a];0==a&&j.push(this.substring(0,b));const c=k[a+1];j.push(this.substring(b+f.length,c)),a==k.length-2&&j.push(this.substring(c+f.length,this.length))}return j.map(a=>a.trim())},String.prototype.indexOf_handleColon=String.prototype.indexOf_handleColon||function(a){const b=`${a.trim()}:`,c=this.toLowerCase().indexOf(b.toLowerCase());return~c?c:this.toLowerCase().indexOf(a.toLowerCase())};class ConverterUi{constructor(){this._editorIn=null,this._editorOut=null,this._hasAppended=!1,this._statblockConverter=null,this._tableConverter=null,this._menuAccess=null,this._saveInputDebounced=MiscUtil.debounce(()=>StorageUtil.pSetForPage(ConverterUi.STORAGE_INPUT,this._editorIn.getValue()),50),this._storedSettings=StorageUtil.syncGetForPage(ConverterUi.STORAGE_SETTINGS)||{},this._saveSettingsDebounced=MiscUtil.debounce(()=>StorageUtil.syncSetForPage(ConverterUi.STORAGE_SETTINGS,this._storedSettings),50),this._$selSource=null}set statblockConverter(a){this._statblockConverter=a}set tableConverter(a){this._tableConverter=a}async init(){this._editorIn=ace.edit("converter_input"),this._editorIn.setOptions({wrap:!0,showPrintMargin:!1});try{const a=await StorageUtil.pGetForPage(ConverterUi.STORAGE_INPUT);a&&this._editorIn.setValue(a,-1)}catch(a){setTimeout(()=>{throw a})}this._editorIn.on("change",()=>this._saveInputDebounced()),this._editorOut=ace.edit("converter_output"),this._editorOut.setOptions({wrap:!0,showPrintMargin:!1,readOnly:!0}),$(`#editable`).click(()=>{confirm(`Edits will be overwritten as you parse new statblocks. Enable anyway?`)&&(this.outReadOnly=!1)}),$(`#save_local`).click(async()=>{const a=this.outText;if(a&&a.trim())try{const b="Statblock"===this._storedSettings.parser?"monster":"table",c=JSON.parse(`[${a}]`),d=c.map(a=>!(a.source&&BrewUtil.hasSourceJson(a.source))&&(a.name||a.caption||"(Unnamed)").trim()).filter(Boolean);if(d.length)return void JqueryUtil.doToast({content:`One or more entries have missing or unknown sources: ${d.join(", ")}`,type:"danger"});const e={},f=[],g=c.map(a=>{const b=a.source.toLowerCase(),c=a.name.toLowerCase();return e[b]=e[b]||{},e[b][c]?(f.push(a.name),null):(e[b][c]=!0,a)}).filter(Boolean);f.length&&JqueryUtil.doToast({type:"warning",content:`Ignored ${f.length} duplicate entr${1===f.length?"y":"ies"}`});const h=g.map(a=>{const c=(BrewUtil.homebrew[b]||[]).findIndex(b=>b.name.toLowerCase()===a.name.toLowerCase()&&b.source.toLowerCase()===a.source.toLowerCase());return~c?{isOverwrite:!0,ix:c,entry:a}:{entry:a,isOverwrite:!1}}).filter(Boolean),i=h.map(a=>a.isOverwrite).filter(Boolean);if(i.length&&!confirm(`This will overwrite ${i.length} entr${1===i.length?"y":"ies"}. Are you sure?`))return;await Promise.all(h.map(a=>a.isOverwrite?BrewUtil.pUpdateEntryByIx(b,a.ix,MiscUtil.copy(a.entry)):BrewUtil.pAddEntry(b,MiscUtil.copy(a.entry)))),JqueryUtil.doToast({type:"success",content:`Saved!`}),Omnisearch.pAddToIndex("monster",h.filter(a=>!a.isOverwrite).map(a=>a.entry))}catch(a){JqueryUtil.doToast({content:`Current output was not valid JSON!`,type:"danger"}),setTimeout(()=>{throw a})}else JqueryUtil.doToast({content:"Nothing to save!",type:"danger"})}),$(`#download`).click(()=>{const a=this.outText;if(a&&a.trim())try{const b="Statblock"===this._storedSettings.parser?"monster":"table",c={[b]:JSON.parse(`[${a}]`)};DataUtil.userDownload(`converter-output`,c)}catch(b){JqueryUtil.doToast({content:`Current output was not valid JSON. Downloading as <span class="code">.txt</span> instead.`,type:"warning"}),DataUtil.userDownloadText(`converter-output.txt`,a),setTimeout(()=>{throw b})}else JqueryUtil.doToast({content:"Nothing to download!",type:"danger"})});const a=a=>{try{$(`#lastWarnings`).hide().html(""),$(`#lastError`).hide().html(""),this._editorOut.resize(),a()}catch(a){const b=a.stack.split("\n"),c=1<b.length?b[1].trim():"(Unknown location)",d=`[Error] ${a.message} ${c}`;$(`#lastError`).show().html(d),this._editorOut.resize(),setTimeout(()=>{throw a})}};$("#parsestatblock").on("click",()=>{a(()=>{(!this._hasAppended||confirm("You're about to overwrite multiple entries. Are you sure?"))&&this._menuAccess.handleParse()})}),$(`#parsestatblockadd`).on("click",()=>{a(()=>this._menuAccess.handleParseAndAdd())}),this.initSideMenu()}initSideMenu(){const a=$(`.sidemenu`),b=(a,b)=>a.append(`<hr class="sidemenu__row__divider ${b?"sidemenu__row__divider--heavy":""}">`),c=this._storedSettings.parser,d=$(`<div class="sidemenu__row split-v-center"><div class="sidemenu__row__label">Mode</div></div>`).appendTo(a),e=$(`
			<select class="form-control input-sm">
				<option>Statblock</option>
				<option>Table</option>
			</select>
		`).appendTo(d).change(()=>{switch(this._storedSettings.parser=e.val(),this._saveSettingsDebounced(),e.val()){case"Statblock":g();break;case"Table":h();}});b(a,!0);const f=$(`<div/>`).appendTo(a),g=()=>{$(`#save_local`).show(),this._menuAccess={},f.empty(),$(`<div class="sidemenu__row split-v-center">
				<small>This parser is <span class="help" title="Notably poor at handling text split across multiple lines, as Carriage Return is used to separate blocks of text.">very particular</span> about its input. Use at your own risk.</small>
			</div>`).appendTo(f),b(f);const a=$(`<div class="sidemenu__row flex-vh-center-around"/>`).appendTo(f),c=$(`
					<select class="form-control input-sm select-inline">
							<option value="txt">Parse as Text</option>
							<option value="md" selected>Parse as Markdown</option>
					</select>
				`).appendTo(a).change(()=>{this._storedSettings.statblockMode=c.val(),this._saveSettingsDebounced()}),d=this._storedSettings.statblockMode;d&&c.val(d);const e=$(`<div class="sidemenu__row split-v-center"><label class="sidemenu__row__label sidemenu__row__label--cb-label" title="Should the creature's name be converted to title-case? Useful when pasting a name which is all-caps."><span>Title-Case Name</span></label></div>`).appendTo(f),g=$(`<input type="checkbox" class="sidemenu__row__label__cb">`).change(()=>{this._storedSettings.statblockTitleCase=g.prop("checked"),this._saveSettingsDebounced()}).appendTo(e.find(`label`)).prop("checked",!!this._storedSettings.statblockTitleCase);this._menuAccess.isTitleCase=()=>!!g.prop("checked"),b(f);const h=$(`<div class="sidemenu__row split-v-center"><div class="sidemenu__row__label">Page</div></div>`).appendTo(f),i=$(`<input class="form-control input-sm" type="number" style="max-width: 9rem;">`).change(()=>{this._storedSettings.statblockPage=i.val(),this._saveSettingsDebounced()}).appendTo(h).val(this._storedSettings.statblockPage||"0");this._menuAccess.getPage=()=>+i.val(),b(f);const j=$(`<div class="sidemenu__row split-v-center"><div class="sidemenu__row__label">Source</div></div>`).appendTo(f);this._menuAccess.getSource=()=>this._$selSource.val();const k=$(`<div class="h-100 w-100"/>`);let l=null;const m=a=>{SourceUiUtil.render({...a,$parent:k,cbConfirm:b=>{const c="edit"!==a.mode;c?BrewUtil.addSource(b):BrewUtil.updateSource(b),c&&this._$selSource.append(`<option value="${b.json.escapeQuotes()}">${b.full.escapeQuotes()}</option>`),this._$selSource.val(b.json),l&&l.doClose()},cbConfirmExisting:a=>{this._$selSource.val(a.json),l&&l.doClose()},cbCancel:()=>{l&&l.doClose()}})};this._allSources=(BrewUtil.homebrewMeta.sources||[]).sort((c,a)=>SortUtil.ascSortLower(c.full,a.full)).map(a=>a.json),this._$selSource=$$`
			<select class="form-control input-sm">
				<option value="">(None)</option>
				${this._allSources.map(a=>`<option value="${a.escapeQuotes()}">${Parser.sourceJsonToFull(a).escapeQuotes()}</option>`)}
			</select>`.appendTo(j).change(()=>{this._$selSource.val()?this._storedSettings.sourceJson=this._$selSource.val():delete this._storedSettings.sourceJson,this._saveSettingsDebounced()}),this._storedSettings.sourceJson?this._$selSource.val(this._storedSettings.sourceJson):this._$selSource[0].selectedIndex=0;const n=$(`<button class="btn btn-default btn-sm mr-2">Edit Selected Source</button>`).click(()=>{const a=this._storedSettings.sourceJson;if(!a)return void JqueryUtil.doToast({type:"warning",content:"No source selected!"});const b=BrewUtil.sourceJsonToSource(a);b&&(m({mode:"edit",source:MiscUtil.copy(b)}),l=UiUtil.getShowModal({fullHeight:!0,isLarge:!0,cbClose:()=>k.detach()}),k.appendTo(l.$modalInner))});$$`<div class="sidemenu__row">${n}</div>`.appendTo(f);const o=$(`<button class="btn btn-default btn-sm">Add New Source</button>`).click(()=>{m({mode:"add"}),l=UiUtil.getShowModal({fullHeight:!0,isLarge:!0,cbClose:()=>k.detach()}),k.appendTo(l.$modalInner)});$$`<div class="sidemenu__row">${o}</div>`.appendTo(f),b(f);const p=$(`<div class="sidemenu__row flex-vh-center-around"/>`).appendTo(f);$(`<button class="btn btn-sm btn-default">Sample Text</button>`).appendTo(p).click(()=>{this.inText=statblockConverter.getSample("txt"),c.val("txt").change()}),$(`<button class="btn btn-sm btn-default">Sample Markdown</button>`).appendTo(p).click(()=>{this.inText=statblockConverter.getSample("md"),c.val("md").change()});const q=a=>({cbWarning:this.showWarning.bind(this),cbOutput:(a,b)=>{this.doCleanAndOutput(a,b)},source:this.source,pageNumber:this.pageNumber,isAppend:a,isTitleCaseName:this.menuAccess.isTitleCase()});this._menuAccess.handleParse=()=>{const a=q(!1);"txt"===c.val()?this._statblockConverter.doParseText(this.inText,a):this._statblockConverter.doParseMarkdown(this.inText,a)},this._menuAccess.handleParseAndAdd=()=>{const a=q(!0);"txt"===c.val()?this._statblockConverter.doParseText(this.inText,a):this._statblockConverter.doParseMarkdown(this.inText,a)}},h=()=>{$(`#save_local`).hide(),this._menuAccess={},f.empty();const a=$(`<div class="sidemenu__row flex-vh-center-around"/>`).appendTo(f),c=$(`
					<select class="form-control input-sm select-inline">
							<option value="html" selected>Parse as HTML</option>
							<option value="md">Parse as Markdown</option>
					</select>
				`).appendTo(a).change(()=>{this._storedSettings.tableMode=c.val(),this._saveSettingsDebounced()}),d=this._storedSettings.tableMode;d&&c.val(d),b(f);const e=$(`<div class="sidemenu__row split-v-center"/>`).appendTo(f);$(`<button class="btn btn-sm btn-default">Sample HTML</button>`).appendTo(e).click(()=>{this.inText=tableConverter.showSample("html"),c.val("html").change()}),$(`<button class="btn btn-sm btn-default">Sample Markdown</button>`).appendTo(e).click(()=>{this.inText=tableConverter.showSample("md"),c.val("md").change()});const g=a=>({cbWarning:this.showWarning.bind(this),cbOutput:(a,b)=>{this.doCleanAndOutput(a,b)},isAppend:a});this._menuAccess.handleParse=()=>{const a=g(!1);"html"===c.val()?this._tableConverter.doParseHtml(this.inText,a):this._tableConverter.doParseMarkdown(this.inText,a)},this._menuAccess.handleParseAndAdd=()=>{const a=g(!0);"html"===c.val()?this._tableConverter.doParseHtml(this.inText,a):this._tableConverter.doParseMarkdown(this.inText,a)}};c?e.val(c).change():g()}get menuAccess(){return this._menuAccess}showWarning(a){$(`#lastWarnings`).show().append(`<div>[Warning] ${a}</div>`),this._editorOut.resize()}doCleanAndOutput(a,b){const c=JSON.stringify(a,null,"\t"),d=TextClean.getCleanedJson(c);b?(this.outText=`${d},\n${ui.outText}`,this._hasAppended=!0):(this.outText=d,this._hasAppended=!1)}set outReadOnly(a){this._editorOut.setOptions({readOnly:a})}get outText(){return this._editorOut.getValue()}set outText(a){return this._editorOut.setValue(a,-1)}get inText(){return TextClean.getReplacedQuotesText((this._editorIn.getValue()||"").trim())}set inText(a){return this._editorIn.setValue(a,-1)}get pageNumber(){return this._menuAccess.getPage()?+this._menuAccess.getPage():void 0}get source(){return this._menuAccess.getSource()}}ConverterUi.STORAGE_INPUT="converterInput",ConverterUi.STORAGE_SETTINGS="converterSettings";class StatblockConverter{static _getValidOptions(a){if(a=a||{},a.isAppend=a.isAppend||!1,!a.cbWarning||!a.cbOutput)throw new Error(`Missing required callback options!`);return a}doParseText(a,b){function c(a){return!a.toUpperCase().indexOf("ACTIONS")||!a.toUpperCase().indexOf("LEGENDARY ACTIONS")||!a.toUpperCase().indexOf("REACTIONS")}if(b=StatblockConverter._getValidOptions(b),!a||!a.trim())return b.cbWarning("No input!");const d=(()=>{const b=StatblockConverter._getCleanInput(a),c=b.split(/(Challenge)/i);return c[0]=c[0].replace(/(\d\d?\s+\([-—+]\d\)\s*)+/gi,(...a)=>`${a[0].replace(/\n/g," ").replace(/\s+/g," ")}\n`),c.join("").split("\n").filter(a=>a&&a.trim())})(),e={};e.source=b.source||"",e.page=b.pageNumber;let f=null,g=null;for(let h=0;h<d.length;h++){if(f=g,g=d[h].trim(),""===g)continue;if(0==h){e.name=this._getCleanName(g,b);continue}if(1==h){StatblockConverter._setCleanSizeTypeAlignment(e,g,b);continue}if(2==h){e.ac=g.split_handleColon("Armor Class ",1)[1];continue}if(3==h){StatblockConverter._setCleanHp(e,g);continue}if(4==h){this._setCleanSpeed(e,g,b);continue}if(/STR\s*DEX\s*CON\s*INT\s*WIS\s*CHA/i.test(g)){++h;const a=d[h].trim().split(/ ?\(([+\-—])?[0-9]*\) ?/g);e.str=StatblockConverter._tryConvertNumber(a[0]),e.dex=StatblockConverter._tryConvertNumber(a[2]),e.con=StatblockConverter._tryConvertNumber(a[4]),e.int=StatblockConverter._tryConvertNumber(a[6]),e.wis=StatblockConverter._tryConvertNumber(a[8]),e.cha=StatblockConverter._tryConvertNumber(a[10]);continue}if(Parser.ABIL_ABVS.includes(g.toLowerCase()))switch(++h,g.toLowerCase()){case"str":e.str=StatblockConverter._tryGetStat(d[h]);continue;case"dex":e.dex=StatblockConverter._tryGetStat(d[h]);continue;case"con":e.con=StatblockConverter._tryGetStat(d[h]);continue;case"int":e.int=StatblockConverter._tryGetStat(d[h]);continue;case"wis":e.wis=StatblockConverter._tryGetStat(d[h]);continue;case"cha":e.cha=StatblockConverter._tryGetStat(d[h]);continue;}if(!g.indexOf_handleColon("Saving Throws ")){StatblockConverter._setCleanSaves(e,g,b);continue}if(!g.indexOf_handleColon("Skills ")){StatblockConverter._setCleanSkills(e,g);continue}if(!g.indexOf_handleColon("Damage Vulnerabilities ")){StatblockConverter._setCleanDamageVuln(e,g);continue}if(!g.indexOf_handleColon("Damage Resistance")){StatblockConverter._setCleanDamageRes(e,g);continue}if(!g.indexOf_handleColon("Damage Immunities ")){StatblockConverter._setCleanDamageImm(e,g);continue}if(!g.indexOf_handleColon("Condition Immunities ")){StatblockConverter._setCleanConditionImm(e,g);continue}if(!g.indexOf_handleColon("Senses ")){StatblockConverter._setCleanSenses(e,g);continue}if(!g.indexOf_handleColon("Languages ")){StatblockConverter._setCleanLanguages(e,g);continue}if(!g.indexOf_handleColon("Challenge ")){StatblockConverter._setCleanCr(e,g);continue}e.trait=[],e.action=[],e.reaction=[],e.legendary=[];let a={},i=!0,j=!1,k=!1,l=!1,m=!1;for(;h<d.length;){c(g)&&(i=!1,j=!g.toUpperCase().indexOf_handleColon("ACTIONS"),k=!g.toUpperCase().indexOf_handleColon("REACTIONS"),l=!g.toUpperCase().indexOf_handleColon("LEGENDARY ACTIONS"),m=l,h++,g=d[h]),a.name="",a.entries=[];const f=b=>{a.name=b.split(/([.!?])/g)[0],a.entries.push(b.substring(a.name.length+1,b.length).trim())};if(m){const a=g.replace(/\s*/g,"").toLowerCase();a.includes("legendary")||a.includes("action")||(m=!1)}for(m?(a.entries.push(g.trim()),m=!1):f(g),h++,g=d[h];g&&!ConvertUtil.isNameLine(g)&&!c(g);)a.entries.push(g.trim()),h++,g=d[h];(a.name||a.entries)&&(DiceConvert.convertTraitActionDice(a),i&&(a.name.toLowerCase().includes("spellcasting")?(a=this._tryParseSpellcasting(a,!1,b),a.success?e.spellcasting?e.spellcasting=e.spellcasting.concat(a.out):e.spellcasting=a.out:e.trait.push(a.out)):StatblockConverter._hasEntryContent(a)&&e.trait.push(a)),j&&StatblockConverter._hasEntryContent(a)&&e.action.push(a),k&&StatblockConverter._hasEntryContent(a)&&e.reaction.push(a),l&&StatblockConverter._hasEntryContent(a)&&e.legendary.push(a)),a={}}0===e.trait.length&&delete e.trait,0===e.reaction.length&&delete e.reaction,0===e.legendary.length&&delete e.legendary}(function(){e.legendary&&(e.legendary=e.legendary.map(a=>{if(!a.name.trim()&&!a.entries.length)return null;const b=/can take (\d) legendary actions/gi.exec(a.entries[0]);return!a.name.trim()&&b?("3"!==b[1]&&(e.legendaryActions=+b[1]),null):a}).filter(Boolean))})(),this._doStatblockPostProcess(e,b);const h=PropOrder.getOrdered(e,"monster");b.cbOutput(h,b.isAppend)}doParseMarkdown(a,b){function c(a){return a.replace(/^\s*>\s*/,"").trim()}function d(a){return a.replace(/\**/g,"").replace(/^-/,"").trim()}function e(a){return a.replace(/^###/,"").trim()}function f(a){const b=a.trim().startsWith("*"),c=a.replace(/^[^A-Za-z0-9]*/,"").trim();return b?c.replace(/\*/,""):c}function g(a){return a.trim().startsWith("**")}function h(a){return a.replace(/^\*\*\*?/,"").split(/.\s*\*\*\*?/).map(a=>a.trim())}function j(){9===t?k():10===t?l():11===t?m():12==t&&n()}function k(){StatblockConverter._hasEntryContent(B)&&(r.trait=r.trait||[],DiceConvert.convertTraitActionDice(B),B.name.toLowerCase().includes("spellcasting")?(B=p._tryParseSpellcasting(B,!0,b),B.success?r.spellcasting?r.spellcasting=r.spellcasting.concat(B.out):r.spellcasting=B.out:r.trait.push(B.out)):r.trait.push(B)),B=null}function l(){StatblockConverter._hasEntryContent(B)&&(r.action=r.action||[],DiceConvert.convertTraitActionDice(B),r.action.push(B)),B=null}function m(){StatblockConverter._hasEntryContent(B)&&(r.reaction=r.reaction||[],DiceConvert.convertTraitActionDice(B),r.reaction.push(B)),B=null}function n(){StatblockConverter._hasEntryContent(B)&&(r.legendary=r.legendary||[],DiceConvert.convertTraitActionDice(B),r.legendary.push(B)),B=null}function o(a){return a.trim().replace(/<br\s*(\/)?>/gi,"")}b=StatblockConverter._getValidOptions(b);const p=this;if(!a||!a.trim())return b.cbWarning("No input!");const q=StatblockConverter._getCleanInput(a).split("\n");let r=null;const s=()=>({source:b.source,page:b.pageNumber});let t=0,u=!1;const v=()=>{if(null!=B&&j(),r){this._doStatblockPostProcess(r,b);const a=PropOrder.getOrdered(r,"monster");b.cbOutput(a,b.isAppend)}r=s(),u&&(b.isAppend=!0),t=0};let w=null,x=null,y=null,z=!0,A=!0,B=null,C=0;for(;C<q.length;C++){if(w=y,x=o(q[C]),y=x,""===y||"\\pagebreak"===y.toLowerCase()||"\\columnbreak"===y.toLowerCase()){z=!0;continue}else A=!1;if(y=c(y).trim(),""===y)continue;else if("___"===y&&z||"___"===x){null!==r&&(u=!0),v(),z=A;continue}else if("___"===y){z=A;continue}if(0==t){y=y.replace(/^\s*##/,"").trim(),r.name=this._getCleanName(y,b),t++;continue}if(1==t){y=y.replace(/^\**(.*?)\**$/,"$1"),StatblockConverter._setCleanSizeTypeAlignment(r,y,b),t++;continue}if(2==t){r.ac=d(y).replace(/Armor Class/g,"").trim(),t++;continue}if(3==t){StatblockConverter._setCleanHp(r,d(y)),t++;continue}if(4==t){this._setCleanSpeed(r,d(y),b),t++;continue}if(5==t||6==t||7==t){if(y.replace(/\s*/g,"").startsWith("|STR")||y.replace(/\s*/g,"").startsWith("|:-")){t++;continue}const a=y.split("|").map(a=>a.trim()).filter(Boolean);Parser.ABIL_ABVS.map((b,c)=>r[b]=StatblockConverter._tryGetStat(a[c])),t++;continue}if(8==t){if(~y.indexOf("Saving Throws")){StatblockConverter._setCleanSaves(r,d(y),b);continue}if(~y.indexOf("Skills")){StatblockConverter._setCleanSkills(r,d(y));continue}if(~y.indexOf("Damage Vulnerabilities")){StatblockConverter._setCleanDamageVuln(r,d(y));continue}if(~y.indexOf("Damage Resistance")){StatblockConverter._setCleanDamageRes(r,d(y));continue}if(~y.indexOf("Damage Immunities")){StatblockConverter._setCleanDamageImm(r,d(y));continue}if(~y.indexOf("Condition Immunities")){StatblockConverter._setCleanConditionImm(r,d(y));continue}if(~y.indexOf("Senses")){StatblockConverter._setCleanSenses(r,d(y));continue}if(~y.indexOf("Languages")){StatblockConverter._setCleanLanguages(r,d(y));continue}if(~y.indexOf("Challenge")){StatblockConverter._setCleanCr(r,d(y)),t++;continue}}const a=e(y);if("actions"===a.toLowerCase()){j(),t=10;continue}else if("reactions"===a.toLowerCase()){j(),t=11;continue}else if("legendary actions"===a.toLowerCase()){j(),t=12;continue}if(9==t)if(g(y)){k(),B={name:"",entries:[]};const[a,b]=h(y);B.name=a,B.entries.push(f(b))}else B.entries.push(f(y));if(10==t)if(g(y)){l(),B={name:"",entries:[]};const[a,b]=h(y);B.name=a,B.entries.push(f(b))}else B.entries.push(f(y));if(11==t)if(g(y)){m(),B={name:"",entries:[]};const[a,b]=h(y);B.name=a,B.entries.push(f(b))}else B.entries.push(f(y));if(12==t)if(g(y)){n(),B={name:"",entries:[]};const[a,b]=h(y);B.name=a,B.entries.push(f(b))}else B?B.entries.push(f(y)):!y.toLowerCase().includes("can take 3 legendary actions")&&(B={name:"",entries:[f(y)]})}v()}getSample(a){switch(a){case"txt":return StatblockConverter.SAMPLE_TEXT;case"md":return StatblockConverter.SAMPLE_MARKDOWN;default:throw new Error(`Unknown format "${a}"`);}}_doStatblockPostProcess(a,b){AcConvert.tryPostProcessAc(a,a=>b.cbWarning(`AC "${a}" requires manual conversion`),a=>b.cbWarning(`Failed to parse AC "${a}"`)),TagAttack.tryTagAttacks(a,a=>b.cbWarning(`Manual attack tagging required for "${a}"`)),TagHit.tryTagHits(a),TagDc.tryTagDcs(a),TagCondition.tryTagConditions(a),TraitActionTag.tryRun(a),LanguageTag.tryRun(a),SenseTag.tryRun(a),SpellcastingTypeTag.tryRun(a),DamageTypeTag.tryRun(a),MiscTag.tryRun(a),(()=>{Object.keys(a).forEach(b=>{a[b]instanceof Array&&0===a[b].length&&delete a[b]})})()}static _tryConvertNumber(a){try{return+a.replace(/—/g,"-")}catch(b){return a}}static _tryParseType(a){try{const b=/^(.*?) (\(.*?\))\s*$/.exec(a);return b?{type:b[1].toLowerCase(),tags:b[2].split(",").map(a=>a.replace(/\(/g,"").replace(/\)/g,"").trim().toLowerCase())}:a.toLowerCase()}catch(b){return a}}static _tryGetStat(a){try{return StatblockConverter._tryConvertNumber(/(\d+) \(.*?\)/.exec(a)[1])}catch(a){return 0}}static _tryParseDamageResVulnImmune(a,b){a.toLowerCase().includes(", bludgeoning, piercing, and slashing from")&&(a=a.replace(/, (bludgeoning, piercing, and slashing from)/gi,"; $1"));const c=a.toLowerCase().split(";"),d=[];try{return c.forEach(a=>{const c={};let e=d;a.includes("from")&&(c[b]=[],e=c[b],c.note=/from .*/.exec(a)[0],a=/(.*) from /.exec(a)[1]),a=a.replace(/and/g,""),a.split(",").forEach(a=>e.push(a.trim())),"note"in c&&d.push(c)}),d}catch(b){return a}}_tryParseSpellcasting(a,b,c){return SpellcastingTraitConvert.tryParseSpellcasting(a,b,a=>c.cbWarning(a))}static _getCleanInput(a){return a.replace(/[−–‒]/g,"-")}_getCleanName(a,b){return b.isTitleCaseName?a.toLowerCase().toTitleCase():a}static _setCleanSizeTypeAlignment(a,b,c){const d=/^(\d+)(?:st|nd|rd|th)\s*\W+\s*level\s+(.*)$/i.exec(b.trim());d?(a.level=+d[1],a.size=d[2].trim()[0].toUpperCase(),a.type=d[2].split(" ").splice(1).join(" ")):(a.size=b[0].toUpperCase(),a.type=b.split(StrUtil.COMMAS_NOT_IN_PARENTHESES_REGEX)[0].split(" ").splice(1).join(" "),a.alignment=b.split(StrUtil.COMMAS_NOT_IN_PARENTHESES_REGEX)[1].toLowerCase(),AlignmentConvert.tryConvertAlignment(a,a=>c.cbWarning(`Alignment "${a}" requires manual conversion`))),a.type=StatblockConverter._tryParseType(a.type)}static _setCleanHp(a,b){const c=b.split_handleColon("Hit Points ",1)[1],d=/^(\d+) \((.*?)\)$/.exec(c);d?(a.hp={average:+d[1],formula:d[2]},DiceConvert.cleanHpDice(a)):a.hp={special:c}}_setCleanSpeed(a,b,c){a.speed=b,SpeedConvert.tryConvertSpeed(a,c.cbWarning)}static _setCleanSaves(a,b,c){if(a.save=b.split_handleColon("Saving Throws",1)[1].trim(),a.save&&a.save.trim()){const b=a.save.split(",").map(a=>a.trim().toLowerCase()).filter(a=>a),d={};b.forEach(a=>{const b=/(\w+)\s*([-+])\s*(\d+)/.exec(a);b?d[b[1]]=`${b[2]}${b[3]}`:c.cbWarning(`Save "${a}" requires manual conversion`)}),a.save=d}}static _setCleanSkills(a,b){a.skill=b.split_handleColon("Skills",1)[1].trim().toLowerCase();const c=a.skill.split(","),d={};try{c.forEach(a=>{const b=a.split(" "),c=b.pop().trim();let e=b.join(" ").toLowerCase().trim().replace(/ /g,"");e=StatblockConverter.SKILL_SPACE_MAP[e]||e,d[e]=c}),a.skill=d,a.skill[""]&&delete a.skill[""]}catch(a){return 0}}static _setCleanDamageVuln(a,b){a.vulnerable=b.split_handleColon("Vulnerabilities",1)[1].trim(),a.vulnerable=StatblockConverter._tryParseDamageResVulnImmune(a.vulnerable,"vulnerable")}static _setCleanDamageRes(a,b){a.resist=(b.toLowerCase().includes("resistances")?b.split_handleColon("Resistances",1):b.split_handleColon("Resistance",1))[1].trim(),a.resist=StatblockConverter._tryParseDamageResVulnImmune(a.resist,"resist")}static _setCleanDamageImm(a,b){a.immune=b.split_handleColon("Immunities",1)[1].trim(),a.immune=StatblockConverter._tryParseDamageResVulnImmune(a.immune,"immune")}static _setCleanConditionImm(a,b){a.conditionImmune=b.split_handleColon("Immunities",1)[1],a.conditionImmune=StatblockConverter._tryParseDamageResVulnImmune(a.conditionImmune,"conditionImmune")}static _setCleanSenses(a,b){const c=b.toLowerCase().split_handleColon("senses",1)[1].trim(),d=[];c.split(StrUtil.COMMA_SPACE_NOT_IN_PARENTHESES_REGEX).forEach(b=>{b=b.trim(),b&&(b.includes("passive perception")?a.passive=StatblockConverter._tryConvertNumber(b.split("passive perception")[1].trim()):d.push(b.trim()))}),d.length?a.senses=d:delete a.senses}static _setCleanLanguages(a,b){a.languages=b.split_handleColon("Languages",1)[1].trim(),a.languages&&/^([-–‒—]|\\u201\d)$/.exec(a.languages.trim())?delete a.languages:a.languages=a.languages.split(StrUtil.COMMA_SPACE_NOT_IN_PARENTHESES_REGEX)}static _setCleanCr(a,b){a.cr=b.split_handleColon("Challenge",1)[1].trim().split("(")[0].trim()}static _hasEntryContent(a){return a&&(a.name||1===a.entries.length&&a.entries[0]||1<a.entries.length)}}StatblockConverter.SKILL_SPACE_MAP={sleightofhand:"sleight of hand",animalhandling:"animal handling"},StatblockConverter.SAMPLE_TEXT=`Mammon
Huge fiend (devil), lawful evil
Armor Class 20 (natural armor)
Hit Points 378 (28d12 + 196)
Speed 50 ft.
STR DEX CON INT WIS CHA
22 (+6) 13 (+1) 24 (+7) 23 (+6) 21 (+5) 26 (+8)
Saving Throws Dex +9, Int +14, Wis +13, Cha +16
Skills Deception +16, Insight +13, Perception +13, Persuasion +16
Damage Resistances cold
Damage Immunities fire, poison; bludgeoning, piercing, and slashing from weapons that aren't silvered
Condition Immunities charmed, exhaustion, frightened, poisoned
Senses truesight 120 ft., passive Perception 23
Languages all, telepathy 120 ft.
Challenge 25 (75,000 XP)
Innate Spellcasting. Mammon's innate spellcasting ability is Charisma (spell save DC 24, +16 to hit with spell attacks). He can innately cast the following spells, requiring no material components:
At will: charm person, detect magic, dispel magic, fabricate (Mammon can create valuable objects), heat metal, magic aura
3/day each: animate objects, counterspell, creation, instant summons, legend lore, teleport
1/day: imprisonment (minimus containment only, inside gems), sunburst
Spellcasting. Mammon is a 6th level spellcaster. His spellcasting ability is Intelligence (spell save DC 13; +5 to hit with spell attacks). He has the following wizard spells prepared:
Cantrips (at will): fire bolt, light, mage hand, prestidigitation
1st level (4 slots): mage armor, magic missile, shield
2nd level (3 slots): misty step, suggestion
3rd level (3 slots): fly, lightning bolt
Legendary Resistance (3/day). If Mammon fails a saving throw, he can choose to succeed instead.
Magic Resistance. Mammon has advantage on saving throws against spells and other magical effects.
Magic Weapons. Mammon's weapon attacks are magical.
ACTIONS
Multiattack. Mammon makes three attacks.
Purse. Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage plus 18 (4d8) radiant damage.
Molten Coins. Ranged Weapon Attack: +14 to hit, range 40/120 ft., one target. Hit: 16 (3d6 + 6) bludgeoning damage plus 18 (4d8) fire damage.
Your Weight In Gold (Recharge 5-6). Mammon can use this ability as a bonus action immediately after hitting a creature with his purse attack. The creature must make a DC 24 Constitution saving throw. If the saving throw fails by 5 or more, the creature is instantly petrified by being turned to solid gold. Otherwise, a creature that fails the saving throw is restrained. A restrained creature repeats the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the creature receives a greater restoration spell or comparable magic.
LEGENDARY ACTIONS
Mammon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Mammon regains spent legendary actions at the start of his turn.
Attack. Mammon makes one purse or molten coins attack.
Make It Rain! Mammon casts gold and jewels into a 5-foot radius within 60 feet. One creature within 60 feet of the treasure that can see it must make a DC 24 Wisdom saving throw. On a failure, the creature must use its reaction to move its speed toward the trinkets, which vanish at the end of the turn.
Deep Pockets (3 actions). Mammon recharges his Your Weight In Gold ability.`,StatblockConverter.SAMPLE_MARKDOWN=`___
>## Lich
>*Medium undead, any evil alignment*
>___
>- **Armor Class** 17
>- **Hit Points** 135 (18d8 + 54)
>- **Speed** 30 ft.
>___
>|STR|DEX|CON|INT|WIS|CHA|
>|:---:|:---:|:---:|:---:|:---:|:---:|
>|11 (+0)|16 (+3)|16 (+3)|20 (+5)|14 (+2)|16 (+3)|
>___
>- **Saving Throws** Con +10, Int +12, Wis +9
>- **Skills** Arcana +19, History +12, Insight +9, Perception +9
>- **Damage Resistances** cold, lightning, necrotic
>- **Damage Immunities** poison; bludgeoning, piercing, and slashing from nonmagical attacks
>- **Condition Immunities** charmed, exhaustion, frightened, paralyzed, poisoned
>- **Senses** truesight 120 ft., passive Perception 19
>- **Languages** Common plus up to five other languages
>- **Challenge** 21 (33000 XP)
>___
>***Legendary Resistance (3/Day).*** If the lich fails a saving throw, it can choose to succeed instead.
>
>***Rejuvenation.*** If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its hit points and becoming active again. The new body appears within 5 feet of the phylactery.
>
>***Spellcasting.*** The lich is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks). The lich has the following wizard spells prepared:
>
>• Cantrips (at will): mage hand, prestidigitation, ray of frost
>• 1st level (4 slots): detect magic, magic missile, shield, thunderwave
>• 2nd level (3 slots): detect thoughts, invisibility, Melf's acid arrow, mirror image
>• 3rd level (3 slots): animate dead, counterspell, dispel magic, fireball
>• 4th level (3 slots): blight, dimension door
>• 5th level (3 slots): cloudkill, scrying
>• 6th level (1 slot): disintegrate, globe of invulnerability
>• 7th level (1 slot): finger of death, plane shift
>• 8th level (1 slot): dominate monster, power word stun
>• 9th level (1 slot): power word kill
>
>***Turn Resistance.*** The lich has advantage on saving throws against any effect that turns undead.
>
>### Actions
>***Paralyzing Touch.*** Melee Spell Attack: +12 to hit, reach 5 ft., one creature. Hit: 10 (3d6) cold damage. The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
>
>### Legendary Actions
>The lich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The lich regains spent legendary actions at the start of its turn.
>
>***Cantrip.*** The lich casts a cantrip.
>
>***Paralyzing Touch (Costs 2 Actions).*** The lich uses its Paralyzing Touch.
>
>***Frightening Gaze (Costs 2 Actions).*** The lich fixes its gaze on one creature it can see within 10 feet of it. The target must succeed on a DC 18 Wisdom saving throw against this magic or become frightened for 1 minute. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to the lich's gaze for the next 24 hours.
>
>***Disrupt Life (Costs 3 Actions).*** Each non-undead creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.
>
>`;class TableConverter{showSample(a){switch(a){case"html":return TableConverter.SAMPLE_HTML;case"md":return TableConverter.SAMPLE_MARKDOWN;default:throw new Error(`Unknown format "${a}"`);}}doParseHtml(a,b){if(!a||!a.trim())return b.cbWarning("No input!");const c=(a,c)=>{const d={type:"table",caption:c,colLabels:[],colStyles:[],rows:[]},e=a=>{let b=a.text().trim();return b.toUpperCase()===b&&(b=b.toTitleCase()),b};if(a.find(`caption`)&&(d.caption=a.find(`caption`).text().trim()),a.find(`thead`)){const c=a.find(`thead tr`);1!==c.length&&b.cbWarning(`Table header had ${c.length} rows!`),c.each((a,b)=>{const c=$(b);if(0===a)c.find(`th, td`).each((a,b)=>d.colLabels.push(e($(b))));else{const a=[];c.find(`th, td`).each((b,c)=>a.push(e($(c)))),a.length&&d.rows.push(a)}}),a.find(`thead`).remove()}else a.find(`th`)&&(a.find(`th`).each((a,b)=>d.colLabels.push(e($(b)))),a.find(`th`).parent().remove());const f=(a,b)=>{const c=$(b),e=[];c.find(`td`).each((a,b)=>{const c=$(b);e.push(c.text().trim())}),d.rows.push(e)};a.find(`tbody`)?a.find(`tbody tr`).each(f):a.find(`tr`).each(f),MarkdownConverter.postProcessTable(d),b.cbOutput(d,b.isAppend)},d=$(a);if(d.is("table"))c(d);else{d.find("table").each((a,b)=>{const d=$(b);c(d,"")})}}doParseMarkdown(a,b){if(!a||!a.trim())return b.cbWarning("No input!");const c=a.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(/\n/g),d=[];let e=null;c.forEach(a=>{a.trim().startsWith("##### ")?(e&&e.lines.length&&d.push(e),e={caption:a.trim().replace(/^##### /,""),lines:[]}):(e=e||{lines:[]},e.lines.push(a))}),e&&e.lines.length&&d.push(e);const f=d.map(a=>MarkdownConverter.getConvertedTable(a.lines,a.caption)).reverse();f.forEach((a,c)=>{b.isAppend?b.cbOutput(a,!0):0===c?b.cbOutput(a,!1):b.cbOutput(a,!0)})}}TableConverter.SAMPLE_HTML=`<table>
  <thead>
    <tr>
      <td><p><strong>Character Level</strong></p></td>
      <td><p><strong>Low Magic Campaign</strong></p></td>
      <td><p><strong>Standard Campaign</strong></p></td>
      <td><p><strong>High Magic Campaign</strong></p></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>1st–4th</p></td>
      <td><p>Normal starting equipment</p></td>
      <td><p>Normal starting equipment</p></td>
      <td><p>Normal starting equipment</p></td>
    </tr>
    <tr>
      <td><p>5th–10th</p></td>
      <td><p>500 gp plus 1d10 × 25 gp, normal starting equipment</p></td>
      <td><p>500 gp plus 1d10 × 25 gp, normal starting equipment</p></td>
      <td><p>500 gp plus 1d10 × 25 gp, one uncommon magic item, normal starting equipment</p></td>
    </tr>
    <tr>
      <td><p>11th–16th</p></td>
      <td><p>5,000 gp plus 1d10 × 250 gp, one uncommon magic item, normal starting equipment</p></td>
      <td><p>5,000 gp plus 1d10 × 250 gp, two uncommon magic items, normal starting equipment</p></td>
      <td><p>5,000 gp plus 1d10 × 250 gp, three uncommon magic items, one rare item, normal starting equipment</p></td>
    </tr>
    <tr>
      <td><p>17th–20th</p></td>
      <td><p>20,000 gp plus 1d10 × 250 gp, two uncommon magic items, normal starting equipment</p></td>
      <td><p>20,000 gp plus 1d10 × 250 gp, two uncommon magic items, one rare item, normal starting equipment</p></td>
      <td><p>20,000 gp plus 1d10 × 250 gp, three uncommon magic items, two rare items, one very rare item, normal starting equipment</p></td>
    </tr>
  </tbody>
</table>`,TableConverter.SAMPLE_MARKDOWN=`| Character Level | Low Magic Campaign                                                                | Standard Campaign                                                                                | High Magic Campaign                                                                                                     |
|-----------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| 1st–4th         | Normal starting equipment                                                         | Normal starting equipment                                                                        | Normal starting equipment                                                                                               |
| 5th–10th        | 500 gp plus 1d10 × 25 gp, normal starting equipment                               | 500 gp plus 1d10 × 25 gp, normal starting equipment                                              | 500 gp plus 1d10 × 25 gp, one uncommon magic item, normal starting equipment                                            |
| 11th–16th       | 5,000 gp plus 1d10 × 250 gp, one uncommon magic item, normal starting equipment   | 5,000 gp plus 1d10 × 250 gp, two uncommon magic items, normal starting equipment                 | 5,000 gp plus 1d10 × 250 gp, three uncommon magic items, one rare item, normal starting equipment                       |
| 17th–20th       | 20,000 gp plus 1d10 × 250 gp, two uncommon magic items, normal starting equipment | 20,000 gp plus 1d10 × 250 gp, two uncommon magic items, one rare item, normal starting equipment | 20,000 gp plus 1d10 × 250 gp, three uncommon magic items, two rare items, one very rare item, normal starting equipment |`;const statblockConverter=new StatblockConverter,tableConverter=new TableConverter,ui=new ConverterUi;ui.statblockConverter=statblockConverter,ui.tableConverter=tableConverter;async function doPageInit(){ExcludeUtil.pInitialise(),await BrewUtil.pAddBrewData();const a=await SpellcastingTraitConvert.pGetSpellData();SpellcastingTraitConvert.init(a),ui.init()}