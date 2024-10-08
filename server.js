const express = require("express");
const axios = require("axios");
const app = express();
const xml2js = require("xml2js");
// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");
// const scrape = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const url = "https://soundcloud.com/search?q=%EC%8B%9C%EC%B9%B4%EA%B3%A0";

//     await page.goto(url);
//     //#content > div > div > div.l-main > div > div > div > ul > li:nth-child(5) > div > div > div > div.sound__content > div.sound__footer.g-all-transitions-300 > div.sound__trackList > div > div > div > ul > li:nth-child(1)
//     const test = await page.evaluate(() => {
//         // const elements = document.querySelector(".compactTrackListItem__trackTitle").textContent.trim();

//         const elements = Array.from(
//             document.querySelectorAll(".compactTrackListItem__trackTitle")
//             // compactTrackListItem__trackTitle sc-text-primary sc-text-h4
//             // compactTrackListItem__trackTitle sc-text-primary sc-text-h4
//         ).map((element) => element.textContent.trim());
//         return elements;
//     });

//     console.log(test);
//     await browser.close();
// };
// scrape();
app.get("/api/kopis", async (req, res) => {
    const text = encodeURIComponent("시카고");
    try {
        const response = await axios.get(
            `http://www.kopis.or.kr/openApi/restful/pblprfr?service=41cc2c339f7b4c66b8b0f47b25a377d1&shprfnm=${text}&stdate=20240901&eddate=20241030&cpage=1&rows=20`,
            {
                params: {
                    serviceKey: "41cc2c339f7b4c66b8b0f47b25a377d1",
                    otherParam: "value",
                },
                responseType: "text",
            }
        );
        const parser = new xml2js.Parser();
        parser.parseString(response.data, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to parse XML" });
            }
            // 변환된 JSON 응답 전송
            res.json(result);
        });
    } catch (error) {
        res.status(500).json({ error: "API call failed" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});