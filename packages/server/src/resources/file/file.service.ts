import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GenArrbufFromUrl } from './gen-arr-buf-from-url.input';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async genArrbufFromUrl({ url, filename, type }: GenArrbufFromUrl) {
    // process aud
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(res.data, 'binary');
    const localPath = `${__dirname}/../tmp/${filename}.${type}`;
    fs.writeFileSync(localPath, buffer);

    return { localPath };
  }
}
