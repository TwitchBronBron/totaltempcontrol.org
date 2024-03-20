import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
const galleryStart = '<!--gallery-start-->';
const galleryEnd = '<!--gallery-end-->';

process.chdir(__dirname + '/..');

let indexHtml = fs.readFileSync('index.html').toString();

const startIndex = indexHtml.indexOf(galleryStart) + galleryStart.length;
const endIndex = indexHtml.indexOf(galleryEnd) + galleryEnd.length;

const files = fastGlob.sync('images/gallery/**/*.*');

const imageHtml = files.map((file) => {
    return `
        <a href="${file}" target="_blank">
            <img src="${file}" alt="${file}" />
        </a>
    `;
});

indexHtml = indexHtml.substring(0, startIndex) + '\n' + imageHtml.join('') + '\n' + indexHtml.substring(endIndex);
fs.writeFileSync('index.html', indexHtml);
