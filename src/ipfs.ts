// @ts-nocheck
// @ts-ignore

async function runIpfs() {
    console.log("IPFS time!");
    const { ipfs } = window;
    const node = await ipfs;
    const dir = await node.files.ls("/");
    console.log(dir);
}

export default function ipfsFunc(ipfsReady: boolean): void {
    console.log("ipfsReady", ipfsReady);
    if (!ipfsReady) return;
    runIpfs();

    // console.dir(dir);
    // const file = dir.find(el => el.name === "flemse.js");
    // console.log("file", file);
    // await ipfs.files.mkdir("/coolstuff");
    // await ipfs.files.write("/flemse.js", new Blob(["mockText"]), { create: true });
    // const ipfs = new IPFS();

    // const data = "Hello Dudes!";

    // once the ipfs is ready
    // ipfs.once("ready", () => {
    // convert your data to a Buffer and add it to IPFS
    // @ts-ignore
    // ipfs.add(IPFS.Buffer.from(data), (err, files) => {
    // if (err) return console.error(err);

    // 'hash', known as CID, is a string uniquely addressing the data
    // and can be used to get it again. 'files' is an array because
    // 'add' supports multiple additions, but we only added one entry
    // console.log("target!", files[0].hash);
    // });
    // });
    // console.dir(ipfs);

    // getipfs();

    // @ts-ignore
    // ipfs.get("QmWf9bpyGuDTXb1z42gYV3DYmfSMfiXREL6BrzNuqpCkGw", (err, data) => {
    // console.log(data, err);
    // if (err) return console.error(err);
    // if (!data) data = "hello world dudes!";

    // // convert Buffer back to string
    // console.log(data);
    // });
}
