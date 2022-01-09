import { Client } from "minio";
import { ReadStream } from "fs";

export default class FileStorageService {
  constructor(private minio: Client) {}

  uploadStream(bucket: string, filename: string, stream: ReadStream) {
    return this.minio.putObject(bucket, filename, stream);
  }

  async downloadStream(bucket: string, filename: string) {
    const stream = await this.minio.getObject(bucket, filename);
    return stream;
  }
}
