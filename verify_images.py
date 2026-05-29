import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 1200})

        try:
            await page.goto('http://localhost:5173', wait_until='networkidle')
            print("Page loaded")

            await page.wait_for_timeout(2000)

            # Scroll to gallery
            await page.evaluate("document.getElementById('gallery').scrollIntoView()")
            await page.wait_for_timeout(2000)

            await page.screenshot(path='/home/jules/verification/screenshots/gallery_fixed_2.png')
            print("Gallery screenshot taken")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
