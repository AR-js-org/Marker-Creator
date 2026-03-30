# Marker-Creator

Marker-Creator is a tool to generate AR.js compatible pattern markers from your own images. It allows you to create custom markers for AR.js-based applications easily and quickly.

## Project Intent

The goal of this project is to generate a pattern marker file (and marker image) from a user-provided image. The generated marker can be used in AR.js and other ARToolKit-based frameworks.

## Installation

You can install Marker-Creator via npm:

```
npm install @ar-js-org/marker-creator
```

## Usage

### Import as ES Module (in your code)

```js
// Import in a JavaScript/TypeScript project
import { ArPatternFile } from '@ar-js-org/marker-creator';

// Example usage:
ArPatternFile.encodeImageURL(imageDataUrl, (patternFileString) => {
  // Do something with the pattern file string
});
```

### Load from CDN (browser, e.g. with raw.githack.com)

You can use the UMD bundle directly in the browser without npm:

```html
<script src="https://raw.githack.com/AR-js-org/Marker-Creator/main/dist/marker-creator.umd.js"></script>
<script>
  // Access via window.MarkerCreator.ArPatternFile
  window.MarkerCreator.ArPatternFile.encodeImageURL(imageDataUrl, function(patternFileString) {
    // Do something with the pattern file string
  });
</script>
```

## Example

A complete example is provided in the `examples/generator.html` file. This example demonstrates how to use the Marker-Creator library to upload an image, adjust marker parameters, preview the result, and download the generated marker files.

---

For more information, see the documentation or open an issue on the repository.
