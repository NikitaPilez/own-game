import TonConnect from '@tonconnect/ui';

const TonConnectUI = new TonConnect.TonConnectUI({
    manifestUrl: 'https://frontend.nmikser.xyz/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});

export { TonConnectUI };