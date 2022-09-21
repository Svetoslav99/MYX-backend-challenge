import util from 'util';
import mv from 'mv';
import fs from 'fs';

export const mvPromise = util.promisify(mv);
export const writeFilePromise = util.promisify(fs.writeFile);
