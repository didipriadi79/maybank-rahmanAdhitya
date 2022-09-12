const puppeteer = require("puppeteer"); 
const hbs = require("handlebars");
const fs = require("fs-extra")
const path = require("path");

const compile = async (templateName, data) => {
	const filePath = `${__dirname}/../template/${templateName}.hbs`
	console.log(file)
	if (!filePath) {
		throw new Error(`Could not find ${templateName}.hbs in generatePDF`);
	}
	const html = await fs.readFile(filePath, "utf-8");
	return hbs.compile(html)(data);
};

const pdfGenerator = async(content)=>{
	try {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		content = compile("template")
		await page.setContent(content)
		await page.emulateMediaFeatures("screen")
		await page.pdf({
			path:mypdf.pdf,
			format: "a4",
			printBackground: true
		})
	} catch (err) {
		console.log("pdf", err)
	}
}

module.export = {compile, pdfGenerator}