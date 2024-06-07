import TonConnect from '@tonconnect/sdk';

const connector = new TonConnect({
    manifestUrl: 'https://frontend.nmikser.xyz/tonconnect-manifest.json',
});

// connector.restoreConnection();

export { connector };