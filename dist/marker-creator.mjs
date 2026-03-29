class g {
  constructor() {
  }
  static toCanvas(h, e) {
    console.assert(!1, "not yet implemented");
  }
  static encodeImageURL(h, e) {
    const i = new Image();
    i.onload = function() {
      const a = g.encodeImage(i);
      e(a);
    }, i.src = h;
  }
  static encodeImage(h) {
    const e = document.createElement("canvas"), i = e.getContext("2d");
    e.width = 16, e.height = 16;
    let a = "";
    for (let c = 0; c > -2 * Math.PI; c -= Math.PI / 2) {
      i.save(), i.clearRect(0, 0, e.width, e.height), i.translate(e.width / 2, e.height / 2), i.rotate(c), i.drawImage(h, -e.width / 2, -e.height / 2, e.width, e.height), i.restore();
      const r = i.getImageData(0, 0, e.width, e.height);
      c !== 0 && (a += `
`);
      for (let d = 2; d >= 0; d--)
        for (let n = 0; n < r.height; n++) {
          for (let t = 0; t < r.width; t++) {
            t !== 0 && (a += " ");
            const o = n * r.width * 4 + t * 4 + d, l = r.data[o];
            a += String(l).padStart(3);
          }
          a += `
`;
        }
    }
    return a;
  }
  static triggerDownload(h, e = "pattern-marker.patt") {
    const i = window.document.createElement("a");
    i.href = window.URL.createObjectURL(new Blob([h], { type: "text/plain" })), i.download = e, document.body.appendChild(i), i.click(), document.body.removeChild(i);
  }
  static buildFullMarker(h, e, i, a, c) {
    const n = 0.1 + 0.8 * ((1 - e) / 2), t = document.createElement("canvas"), o = t.getContext("2d");
    t.width = t.height = i, o.fillStyle = "white", o.fillRect(0, 0, t.width, t.height), o.fillStyle = a, o.fillRect(
      0.1 * t.width,
      0.1 * t.height,
      t.width * (1 - 2 * 0.1),
      t.height * (1 - 2 * 0.1)
    ), o.fillStyle = "white", o.fillRect(
      n * t.width,
      n * t.height,
      t.width * (1 - 2 * n),
      t.height * (1 - 2 * n)
    );
    const l = document.createElement("img");
    l.addEventListener("load", function() {
      o.drawImage(
        l,
        n * t.width,
        n * t.height,
        t.width * (1 - 2 * n),
        t.height * (1 - 2 * n)
      );
      const s = t.toDataURL();
      c(s);
    }), l.src = h;
  }
}
export {
  g as ArPatternFile
};
