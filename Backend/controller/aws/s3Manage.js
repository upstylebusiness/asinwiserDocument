import pkg from "aws-sdk";
const { S3 } = pkg;
import { v4 } from "uuid";

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  accessKeyId: "AKIAWWXZMVKAZJEBLITA",
  secretAccessKey: "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",
});

export const uploadImages = async (image, folder) => {
  const uuid = v4;
  // console.log(uuid);
  console.log(`${folder}/${uuid()}helll.o.o.o.o.o.o.o`);

  try {
    //   var buf = Buffer.from(image) 
    var buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
    console.log(buf,'hksjhdkfhsdhjf');
    var uploadData = {
      Bucket: "upstylegroup.com",
      Body: Buffer.from(image, 'base64'),
    //   ACL : 'public-read',
    Key : `${folder}/${uuid()}.${'jpg'}`,
    ContentType: 'application/pdf/image'
    };
    const data = await s3.upload(uploadData).promise();
    return {
      img_url: data.Location,
      img_key: data.Key,
    };
  } catch (err) {
    console.log(err);
  }
};
