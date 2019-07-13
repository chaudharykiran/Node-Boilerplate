import { Buffer } from 'buffer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'es6-promisify';

const writeFile = promisify(fs.writeFile);

const STORAGE_URI = `${__dirname}/../../upload/`;

/**
 * @param  {string} filename
 */
export function encodeBase64(filename) {
  fs.readFile(path.join(STORAGE_URI, filename), function(error, data) {
    if (error) {
      throw error;
    } else {
      const buf = Buffer.from(data);
      const base64 = buf.toString('base64');

      // console.log('Base64 ' + filename + ': ' + base64);
      return base64;
    }
  });
}
/**
 * @param  {string} base64str
 * @param  {string} filename
 */
export async function decodeBase64(base64str, filename) {
  const buf = Buffer.from(base64str, 'base64');
  const location = path.join(STORAGE_URI, filename);

  try {
    await writeFile(location, buf);

    return location;
  } catch (error) {
    throw error;
  }
}

// encode_base64('ddr.jpg');
// decode_base64('any_base64_string_goes_here', 'rane.jpg');
// eslint-disable-next-line require-jsdoc
// function uploadImage(filename) {
//   const base64Data = filename.replace(/^data:([A-Za-z-+/]+);base64,/, '');

//   const isUploaded = decodeBase64(base64Data);

//   console.log(isUploaded);
// }

/**
 *
 * @param {Binary} file
 */
export async function saveFile(file) {
  const location = path.join(STORAGE_URI, file.originalname);

  try {
    await writeFile(location, file);

    return location;
  } catch (error) {
    throw error;
  }
}
