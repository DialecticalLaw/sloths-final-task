import { ctpClient } from './BuildClient';
import {
//   ApiRoot, //it looks like it doesn't use here
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: 'sloths_rss_ecommerce' });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  return apiRoot
    .get()
    .execute();
};

// Retrieve Project information and output the result to the log
getProject()
  .then(console.log)
  .catch(console.error);
