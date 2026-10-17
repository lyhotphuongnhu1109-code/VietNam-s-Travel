const playwright = require('/root/.bun/install/global/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

// SVG for the Emblem Graphic
const emblemSvg = `
  <g id="emblem-group">
    <!-- 1. STYLIZED NÓN LÁ (Vietnamese Conical Hat) -->
    <path d="M 430 140 
             C 415 180 375 260 365 315 
             C 360 345 375 355 405 340 
             C 445 315 485 275 560 220
             C 530 205 475 165 430 140 Z" 
          fill="none" 
          stroke="#006699" 
          stroke-width="17" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>

    <!-- Hat top triangle inner edge -->
    <path d="M 430 140 L 555 220" 
          fill="none" 
          stroke="#006699" 
          stroke-width="15" 
          stroke-linecap="round"/>

    <!-- Green bamboo tie lines inside hat -->
    <path d="M 420 190 L 408 275" 
          fill="none" 
          stroke="#009c48" 
          stroke-width="9" 
          stroke-linecap="round"/>
    <path d="M 432 195 L 426 270" 
          fill="none" 
          stroke="#009c48" 
          stroke-width="8" 
          stroke-linecap="round"/>

    <!-- 2. SOARING CHIM LẠC (Bird of Freedom & Heritage) -->
    <path d="M 555 220 
             C 565 175 588 135 645 110
             C 628 140 610 170 588 188
             C 620 192 650 205 662 216
             C 638 220 610 212 588 206
             C 572 224 560 258 548 292
             C 560 248 578 224 588 212
             C 568 212 545 228 528 250
             C 535 228 546 216 555 220 Z" 
          fill="#006699"/>

    <!-- 3. WINDING RIVER S-CURVES (Dòng sông xanh) -->
    <!-- Upper river swoop -->
    <path d="M 350 420 
             C 410 420 480 365 555 310" 
          fill="none" 
          stroke="#006699" 
          stroke-width="19" 
          stroke-linecap="round"/>

    <!-- Middle river flow -->
    <path d="M 375 415 
             C 430 415 485 380 545 348" 
          fill="none" 
          stroke="#006699" 
          stroke-width="14" 
          stroke-linecap="round"/>

    <!-- Lower river base loop & swirl -->
    <path d="M 385 480 
             C 375 450 410 425 448 412 
             C 482 400 498 408 465 430 
             C 425 458 395 485 390 522 
             C 385 550 415 560 458 538 
             C 485 525 518 500 540 478" 
          fill="none" 
          stroke="#006699" 
          stroke-width="20" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>

    <!-- 4. LUSH PALM / COCONUT FRONDS (Lá dừa xanh nhiệt đới) -->
    <g fill="#009c48">
      <path d="M 518 435 C 512 385 522 340 535 312 C 530 340 526 385 526 430 Z"/>
      <path d="M 526 430 C 536 385 558 345 585 322 C 568 348 552 390 538 432 Z"/>
      <path d="M 532 432 C 552 395 585 362 622 345 C 598 372 568 405 544 436 Z"/>
      <path d="M 538 438 C 564 412 608 385 650 378 C 618 398 582 424 548 444 Z"/>
      <path d="M 540 448 C 574 428 618 412 660 418 C 622 432 585 446 548 454 Z"/>
      <path d="M 536 456 C 566 446 606 446 648 460 C 612 460 576 460 540 460 Z"/>
    </g>

    <!-- 5. TERRACOTTA ARCHED BRIDGE (Cầu ngói cổ kính) -->
    <path d="M 452 552 
             C 485 495 532 432 596 422 
             C 632 416 652 448 670 520
             C 652 458 620 442 590 445
             C 538 455 496 515 464 556 Z" 
          fill="#b84224"/>
          
    <!-- Inner arch clearance -->
    <path d="M 500 542 C 538 475 585 470 638 530 C 590 490 548 495 510 546 Z" fill="#faf7f2"/>

    <!-- Water wave under the bridge -->
    <path d="M 530 534 C 562 520 600 540 648 528 C 670 522 686 528 692 534 C 670 546 638 538 606 546 C 568 554 546 540 530 534 Z" fill="#006699"/>
  </g>
`;

const fullLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 850" width="1000" height="850">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800;900&family=Montserrat:wght@400;500;600;700&display=swap');
      .title-vietnam { 
        font-family: 'Cinzel', serif; 
        font-weight: 900; 
        font-size: 88px; 
        fill: #0c2b48; 
        letter-spacing: 5px; 
      }
      .title-travel { 
        font-family: 'Montserrat', sans-serif; 
        font-weight: 400; 
        font-size: 68px; 
        fill: #0c2b48; 
        letter-spacing: 24px; 
      }
      .title-tagline { 
        font-family: 'Montserrat', sans-serif; 
        font-weight: 600; 
        font-size: 21px; 
        fill: #0c2b48; 
        letter-spacing: 7px; 
      }
    </style>
  </defs>

  <rect width="1000" height="850" fill="#faf7f2" />

  <!-- Emblem graphic shifted slightly for balance -->
  <g transform="translate(0, 20)">
    ${emblemSvg}
  </g>

  <!-- Typography matching exact user image -->
  <g text-anchor="middle" transform="translate(500, 640)">
    <text y="0" class="title-vietnam">VIETNAM'S</text>
    <text y="72" class="title-travel">TRAVEL</text>
    <text y="125" class="title-tagline">THE LAND OF ENDLESS DISCOVERY</text>
  </g>
</svg>
`;

// Square Emblem Icon for Avatar / Navbar (Tightly cropped, 512x512)
const squareIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="320 80 400 480" width="512" height="512">
  <rect x="300" y="50" width="500" height="600" fill="#faf7f2" />
  ${emblemSvg}
</svg>
`;

async function buildAllLogos() {
  const browser = await playwright.chromium.launch({ headless: true });
  
  // 1. Render Full Logo (1000x850)
  const pageFull = await browser.newPage({ viewport: { width: 1000, height: 850 } });
  await pageFull.setContent(`
    <!DOCTYPE html><html><head><meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@800;900&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* { margin: 0; padding: 0; } body { background: #faf7f2; overflow: hidden; }</style>
    </head><body>${fullLogoSvg}</body></html>
  `);
  await pageFull.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 600));

  const pngPath = path.join(process.cwd(), 'public', 'logo.png');
  const jpgPath = path.join(process.cwd(), 'public', 'logo.jpg');
  const svgPath = path.join(process.cwd(), 'public', 'logo.svg');
  const assetPath = path.join(process.cwd(), 'src', 'assets', 'images', 'vietnam_travel_logo_1792241679393.jpg');
  const assetLegacy = path.join(process.cwd(), 'src', 'assets', 'images', 'app_logo_1791123199904.jpg');

  fs.writeFileSync(svgPath, fullLogoSvg);

  const fullBody = await pageFull.$('body');
  const bufferFullPng = await fullBody.screenshot({ type: 'png' });
  const bufferFullJpg = await fullBody.screenshot({ type: 'jpeg', quality: 95 });

  fs.writeFileSync(pngPath, bufferFullPng);
  fs.writeFileSync(jpgPath, bufferFullJpg);
  fs.writeFileSync(assetPath, bufferFullJpg);
  fs.writeFileSync(assetLegacy, bufferFullJpg);

  // 2. Render Square Icon (512x512) for crisp icon containers
  const pageIcon = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await pageIcon.setContent(`
    <!DOCTYPE html><html><head><meta charset="utf-8">
    <style>* { margin: 0; padding: 0; } body { background: #faf7f2; overflow: hidden; }</style>
    </head><body>${squareIconSvg}</body></html>
  `);
  await new Promise(r => setTimeout(r, 400));
  const iconBody = await pageIcon.$('body');
  const bufferIconPng = await iconBody.screenshot({ type: 'png' });
  const iconPath = path.join(process.cwd(), 'public', 'logo-icon.png');
  const iconJpgPath = path.join(process.cwd(), 'public', 'logo-icon.jpg');
  fs.writeFileSync(iconPath, bufferIconPng);
  fs.writeFileSync(iconJpgPath, bufferIconPng);

  console.log('All logo assets successfully rendered!');
  await browser.close();
}

buildAllLogos().catch(console.error);
