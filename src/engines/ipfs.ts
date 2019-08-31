function init() {
    //@ts-ignore
    import("ipfs").then(async ipfs => {
        const node = await ipfs.create();
        const dir = await ipfs.files.ls("/");
        console.dir(dir);
    });
}

export default init;
