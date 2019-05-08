const { AZURE_STORAGE_CONNECTION_STRING } = require('./env');

module.exports = {
  getStorageAccountName: () => {
    const matches = /AccountName=(.*?);/.exec(AZURE_STORAGE_CONNECTION_STRING);
    return matches[1];
  },
  getStorageEndpoint: (accountName, containerName) => `https://${accountName}.blob.core.windows.net/${containerName}`
}
