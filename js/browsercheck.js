"use strict";window.addEventListener("load",()=>{if("function"!=typeof[].flat){const d=$(`body`);d.addClass("edge__body");const a=$(`<button class="btn btn-danger edge__btn-close"><span class="glyphicon glyphicon-remove"/></button>`).click(()=>{b.remove(),d.removeClass("edge__body")}),b=$(`<div class="flex-col flex-vh-center relative edge__overlay"/>`);a.appendTo(b),b.append(`<div class="flex-col flex-vh-center">
			<div class="edge__title mb-2">UPDATE YOUR BROWSER</div>
			<div><i>It looks like you're using an outdated browser.<br>
			5etools recommends and supports the latest <a href="https://www.google.com/chrome/" class="edge__link">Chrome</a> and the latest <a href="https://www.mozilla.org/firefox/" class="edge__link">Firefox</a>.</i></div>
		</div>`).appendTo(d)}});