const basePath = 'http://localhost:8080';

export const addClientUrl = `${basePath}/addnewclient`;
export const getAllClientUrl = `${basePath}/getallclient`;
export const getClientUrl = `${basePath}/getclient?id=`;
export const deleteClientUrl = `${basePath}/deleteclient`;
export const addItemsUrl = `${basePath}/additems`;
export const viewItemsUrl = `${basePath}/viewitems?id=`;
export const addItemInCartUrl = `${basePath}/additemincart`;
export const getCartDataUrl = `${basePath}/getcartdata?cid=<cid>&tid=<tid>`;
export const confirmPaymentUrl = `${basePath}/confirmpayment`;
export const placeOrderUrl = `${basePath}/placeorder`;
export const viewTableUrl = `${basePath}/viewtables?cid=`;
