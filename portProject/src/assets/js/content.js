export default {
    setRem() {
        var uiw = 1366,
            winw = document.documentElement.clientWidth || document.body.clientWidth;
        document.documentElement.style.fontSize = (winw / uiw) * 10 + 'px';
    }
}
