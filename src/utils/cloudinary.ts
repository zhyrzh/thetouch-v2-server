import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: 'rhyzschoolwebapp',
  api_key: '311467433777757',
  api_secret: 'PxJ2HBphKbE_b90HiORiTPRNNZg',
});

export { cloudinary };
