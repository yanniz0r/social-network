import { Client } from "minio";
import { createReadStream, ReadStream } from "fs";

export default class UploadService {
  constructor(private minio: Client) {}

  uploadStream(bucket: string, filename: string, stream: ReadStream) {
    return this.minio.putObject(bucket, filename, stream)
  }

  async downloadStream(bucket: string, filename: string) {
    const stream = await this.minio.getObject(bucket, filename)
    return stream
  }

}
