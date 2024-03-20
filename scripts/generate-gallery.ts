import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
const galleryStart = '<!--gallery-start-->';
const galleryEnd = '<!--gallery-end-->';

process.chdir(__dirname + '/..');

let indexHtml = fs.readFileSync('index.html').toString();

const startIndex = indexHtml.indexOf(galleryStart) + galleryStart.length;
const endIndex = indexHtml.indexOf(galleryEnd);

const files = fastGlob.sync('images/gallery/**/*.*').sort();

const htmlChunks = [
    indexHtml.substring(0, startIndex),
    ...files.slice(0, 3).map((file, index) => {
        return `
            <a href="${file}" target="_blank">
                <img src="${file}" alt="${file}" loading="lazy"/>
            </a>
        `;
    }),
    `
        <a href="${files[3]}" class="view-all" target="_blank">
            View all ${files.length} images
        </a>
    `,
    '<div class="hidden">',
    ...files.slice(4).map((file) => {
        return `
            <a href="${file}" target="_blank"></a>
        `;
    }),
    '</div>',
    indexHtml.substring(endIndex)
];

fs.writeFileSync('index.html', htmlChunks.join('\n'));
