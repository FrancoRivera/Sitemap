const puppeteer = require('puppeteer');
const fs = require('fs');

async function takeScreenshot(browser, URL){
	const tokens = URL.replace(":", "_").split("/")
	console.log(tokens)
	let filename = tokens.slice(3).join();
	if (filename.length === 0) filename = "root"
	var dir = tokens[2];
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir)
	}
	console.log("Navigating URL", URL)
	const page = await browser.newPage();
	console.log("Created page")
	await page.setViewport({width: 1920, height: 1080});
	console.log("set viewpoert")
	await page.goto(URL, {timeout: 50 * 1000 }); // 4 seconds timeout
	console.log("went to url")
	await page.waitForTimeout(5000);
	console.log("Waited for 5 seconds|")
	await page.screenshot({ path: dir + "/" + filename +'.png', fullPage: true });
	console.log("Saved screenshot", filename)
}


async function main(){
	const browser = await puppeteer.launch({});
	var pages = [
		'http://google.com/',
	]

	for(var i = 0; i < pages.length; i++){
		await takeScreenshot(browser, pages[i]);
	}
	return browser;
}
(async () => {
	var b = await main();
	b.close()
})();
