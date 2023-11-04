import {CID} from 'multiformats/cid';
const debug = require('debug')('dpack')
const es6loader = require('../es6loader')

let hnode = null;

async function getHelia() {
  if (hnode === null) {
    const createHelia = await es6loader.loadModule('helia', 'createHelia')
    const fsBlockstore = await es6loader.loadModule('blockstore-fs', 'FsBlockstore')
    const store = new fsBlockstore('~/.dpack/blockstore')
    hnode =  await createHelia({store})
  }
  return hnode
}

async function getHeliaJson() {
  const heliaJson = await es6loader.loadModule('@helia/json', 'json')
  const helia = await getHelia()
  return heliaJson(helia);
}

export async function getIpfsJson(cid: string | CID): Promise<any> {
  const heliaJson = await getHeliaJson();
  const cidObject = typeof cid === 'string' ? CID.parse(cid) : cid;
  return await heliaJson.get(cidObject);
}

export async function putIpfsJson(obj: any, pin: boolean = true): Promise<string> {
  const heliaJson = await getHeliaJson();
  const cid = await heliaJson.add(obj);
  return cid.toString();
}

export async function pinIpfsCid(cid: string | CID): Promise<void> {
  const helia = await getHelia()
  const cidObject = typeof cid === 'string' ? CID.parse(cid) : cid;
  await helia.pins.add(cidObject)
}

// 'If a CID is 46 characters starting with "Qm", it's a CIDv0'
// https://docs.ipfs.io/concepts/content-addressing/#identifier-formats
export function isV0CID (cidStr: string): boolean {
  return (cidStr.length == 46 && cidStr.slice(0, 2) == 'Qm')
}

export function isCid (cidStr: string): boolean {
  try {
    CID.parse(cidStr)
    return true
  } catch {
    return false
  }
}
