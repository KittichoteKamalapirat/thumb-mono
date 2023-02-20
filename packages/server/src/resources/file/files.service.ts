import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GenArrbufFromUrl } from './gen-arr-buf-from-url.input';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async genArrbufFromUrl({ url, filename, type }: GenArrbufFromUrl) {
    // process aud
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(res.data, 'binary');
    const localPath = `${__dirname}/../../../tmp/${filename}.${type}`; // get out from dist/
    fs.writeFileSync(localPath, buffer);

    console.log('localPathh', localPath);
    console.log('buffer', buffer);

    return { localPath };
  }
}
