var u = Object.defineProperty;
var p = (d, i, t) => i in d ? u(d, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[i] = t;
var w = (d, i, t) => p(d, typeof i != "symbol" ? i + "" : i, t);
const o = class o {
  constructor() {
  }
  static toCanvas(i, t) {
    console.assert(!1, "not yet implemented");
  }
  static encodeImageURL(i, t) {
    const a = new Image();
    a.onload = function() {
      const r = o.encodeImage(a);
      t(r);
    }, a.src = i;
  }
  static encodeImage(i) {
    const t = o.sharedCanvas, a = o.sharedContext;
    if (!a) return "";
    t.width = 16, t.height = 16;
    let r = "";
    for (let c = 0; c > -2 * Math.PI; c -= Math.PI / 2) {
      a.save(), a.clearRect(0, 0, t.width, t.height), a.translate(t.width / 2, t.height / 2), a.rotate(c), a.drawImage(i, -t.width / 2, -t.height / 2, t.width, t.height), a.restore();
      const s = a.getImageData(0, 0, t.width, t.height);
      c !== 0 && (r += `
`);
      for (let g = 2; g >= 0; g--)
        for (let n = 0; n < s.height; n++) {
          for (let e = 0; e < s.width; e++) {
            e !== 0 && (r += " ");
            const h = n * s.width * 4 + e * 4 + g, l = s.data[h];
            r += String(l).padStart(3);
          }
          r += `
`;
        }
    }
    return r;
  }
  static triggerDownload(i, t = "pattern-marker.patt") {
    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([i], { type: "text/plain" })), a.download = t, document.body.appendChild(a), a.click(), document.body.removeChild(a);
  }
  static buildFullMarker(i, t, a, r, c) {
    const n = 0.1 + 0.8 * ((1 - t) / 2), e = o.sharedCanvas, h = o.sharedContext;
    if (!h) return;
    e.width = e.height = a, h.fillStyle = "white", h.fillRect(0, 0, e.width, e.height), h.fillStyle = r, h.fillRect(
      0.1 * e.width,
      0.1 * e.height,
      e.width * (1 - 2 * 0.1),
      e.height * (1 - 2 * 0.1)
    ), h.fillStyle = "white", h.fillRect(
      n * e.width,
      n * e.height,
      e.width * (1 - 2 * n),
      e.height * (1 - 2 * n)
    );
    const l = document.createElement("img");
    l.addEventListener("load", function() {
      h.drawImage(
        l,
        n * e.width,
        n * e.height,
        e.width * (1 - 2 * n),
        e.height * (1 - 2 * n)
      );
      const f = e.toDataURL();
      c(f);
    }), l.src = i;
  }
};
w(o, "sharedCanvas", document.createElement("canvas")), w(o, "sharedContext", o.sharedCanvas.getContext("2d"));
let m = o;
export {
  m as ArPatternFile
};
