import Vibrant from "node-vibrant";

// import { shade } from "polished";
import { useLayoutEffect, useEffect, useState } from "react";

import { ChainId } from "../constants/networks";

import { uriToHttp } from "../utils/urls/uriToHttp";
import { hex } from "wcag-contrast";

// async function getColorFromToken(token) {
//   if (token.chainId === ChainId.RINKEBY && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {
//     return Promise.resolve('#FAAB14')
//   }

//   const path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`

//   return Vibrant.from(path)
//     .getPalette()
//     .then(palette => {
//       if (palette?.Vibrant) {
//         let detectedHex = palette.Vibrant.hex
//         let AAscore = hex(detectedHex, '#FFF')
//         while (AAscore < 3) {
//           detectedHex = shade(0.005, detectedHex)
//           AAscore = hex(detectedHex, '#FFF')
//         }
//         return detectedHex
//       }
//       return null
//     })
//     .catch(() => null)
// }

async function getColorFromUriPath(uri) {
  const formattedPath = uriToHttp(uri)[0];

  try {
    return Vibrant.from(formattedPath)
      .getPalette()
      .then((palette) => {
        console.log(palette);
        if (palette?.Vibrant) {
          return palette.Vibrant.hex;
        }
        return null;
      })
      .catch(() => null);
  } catch (e) {
    console.error(e);
    return;
  }
}

async function getColorsFromUriPath(uri) {
  const formattedPath = uriToHttp(uri)[0];
  console.log({ formattedPath });
  try {
    return Vibrant.from(formattedPath)
      .getPalette()
      .then((palette) => {
        let aggregatedSwatch = {};
        for (const [vibrantKey, swatch] of Object.entries(palette)) {
          aggregatedSwatch[vibrantKey] = swatch.hex;
        }
        return aggregatedSwatch;
      })
      .catch((e) => null);
  } catch (e) {
    console.error(e);
    return;
  }
}

// export function useColor(token) {
//   const [color, setColor] = useState('#0094ec')

//   useLayoutEffect(() => {
//     let stale = false

//     if (token) {
//       getColorFromToken(token).then(tokenColor => {
//         if (!stale && tokenColor !== null) {
//           setColor(tokenColor)
//         }
//       })
//     }

//     return () => {
//       stale = true
//       setColor('#0094ec')
//     }
//   }, [token])

//   return color
// }

const DEFAULT_COLOR_PALETTE = {};
export function useImgPalette(listImageUri) {
  const [colorPalette, setColorPalette] = useState(DEFAULT_COLOR_PALETTE);

  useLayoutEffect(() => {
    let stale = false;

    if (listImageUri) {
      getColorsFromUriPath(listImageUri).then((calculatedPalette) => {
        if (!stale && calculatedPalette !== null) {
          setColorPalette(calculatedPalette);
        }
      });
    }

    return () => {
      stale = true;
      setColorPalette(DEFAULT_COLOR_PALETTE);
    };
  }, [listImageUri]);

  return colorPalette;
}

export function useImgColor(listImageUri) {
  const [color, setColor] = useState("#0094ec");

  useLayoutEffect(() => {
    let stale = false;

    if (listImageUri) {
      getColorFromUriPath(listImageUri).then((color) => {
        if (!stale && color !== null) {
          setColor(color);
        }
      });
    }

    return () => {
      stale = true;
      setColor("#0094ec");
    };
  }, [listImageUri]);

  return color;
}
