export default function clear(
    elements: string[],
    goodiebag: App.Terminal.GoodiebagProps,
) {
    goodiebag.changeContent([]);
}
